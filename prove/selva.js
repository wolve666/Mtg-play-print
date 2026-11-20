// Prova del tema Selva: pagina iniziale, tavolo (un telefono e H&O), radici in partenza e in arrivo, effetti principali
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'selva');
fs.mkdirSync(SHOTS, {recursive:true});
const ORIGIN = 'http://mpp.test';
let fails = 0;
const check = (ok, msg) => { console.log((ok ? 'OK   ' : 'FAIL ') + msg); if(!ok) fails++ };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:412, height:880}, reducedMotion:'no-preference'});
  await ctx.route(ORIGIN + '/**', async route => {
    const f = new URL(route.request().url()).pathname, fp = path.join(ROOT, f);
    if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
    route.fulfill({status:200, contentType:f.endsWith('.html') ? 'text/html' : f.endsWith('.png') ? 'image/png' : 'application/octet-stream', body:fs.readFileSync(fp)});
  });
  await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
  await ctx.addInitScript(() => {
    const dev = new URLSearchParams(location.search).get('dev') || '';
    const P = Storage.prototype, g = P.getItem, s = P.setItem, r = P.removeItem;
    P.getItem = function(k){ return g.call(this, dev + ':' + k) };
    P.setItem = function(k, v){ return s.call(this, dev + ':' + k, v) };
    P.removeItem = function(k){ return r.call(this, dev + ':' + k) };
    if(g.call(localStorage, dev + ':smtg-tut-014') == null) s.call(localStorage, dev + ':smtg-tut-014', '1');
    window.confirm = () => true;
  });
  const errs = [];
  const open = async dev => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(dev + ': ' + e.message)); await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`); await wait(600); return p };
  const shot = (p, n) => p.screenshot({path:path.join(SHOTS, n + '.png')});
  const selva = p => p.evaluate(() => { SET.theme = 'selva'; saveSet(); applyTheme(true) });
  const fxOn = p => p.evaluate(() => $('#fx2').classList.contains('on'));

  // pagina iniziale e scelta dal simbolo verde
  const C = await open('C');
  await C.click('.seed[data-seed="verde"]'); await wait(1600);
  check(await C.evaluate(() => SET.theme === 'selva' && document.body.classList.contains('th-selva')), 'il simbolo verde accende Selva');
  await shot(C, '01-pagina-iniziale');
  await C.click('.wzOpt[data-f="commander"]'); await wait(900); await shot(C, '02-giocatori');
  // un telefono, 4 giocatori
  await C.evaluate(() => startGame('commander', 4)); await wait(500); await shot(C, '03-inizio'); await wait(3000);
  await C.evaluate(() => closeAllOv()); await wait(300); await shot(C, '04-tavolo');
  const nm = await C.locator('.cell[data-i="3"] .pname').boundingBox(), c1 = await C.locator('.cell[data-i="1"]').boundingBox();
  await C.mouse.move(nm.x + nm.width / 2, nm.y + nm.height / 2); await C.mouse.down();
  await C.mouse.move(nm.x + nm.width / 2, nm.y - 80, {steps:5}); await wait(150);
  await C.mouse.move(c1.x + c1.width / 2, c1.y + c1.height / 2, {steps:8}); await wait(200); await shot(C, '05-radice-viva');
  await C.mouse.up(); await wait(450);
  await C.click('.cqQuick button[data-v="3"]'); await wait(260); await shot(C, '06-colpo'); await wait(350); await shot(C, '07-radici-sul-campo'); await wait(500); await shot(C, '08-radici-dopo');
  await C.click('.cqPop [data-ok]'); await wait(1800);
  check(!(await fxOn(C)), 'effetti spenti a fine colpo');
  // vita: + e −, e 5 punti di fila (graffio)
  const half = async (i, cls) => { const b = await C.locator(`.cell[data-i="${i}"] .half.${cls}`).boundingBox(); await C.mouse.click(b.x + b.width / 2, b.y + b.height / 2) };
  await half(0, 'plus'); await half(0, 'plus'); await wait(250); await shot(C, '09-vita-piu');
  for(let k = 0; k < 5; k++){ await half(2, 'minus'); await wait(40) } await wait(150); await shot(C, '10-graffio');
  await wait(1500);
  // pannello personale
  await C.evaluate(() => openPP(3)); await wait(500); await shot(C, '11-pannello'); await C.evaluate(() => closePP(3)); await wait(500);

  // H&O
  const A = await open('A'); await selva(A);
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('commander', 2) }); await wait(3500);
  await A.evaluate(() => openNet()); await wait(300); await A.click('[data-na="host"]'); await wait(300);
  const B = await open('B'); await B.evaluate(() => { SET.theme = 'forgia'; saveSet(); applyTheme(true) });
  await B.click('#wzNet'); await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client'); await wait(300);
  await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(400);
  await A.evaluate(() => closeAllOv()); await B.evaluate(() => closeAllOv()); await wait(3000);
  await A.bringToFront(); await shot(A, '12-ho-tavolo');
  await A.click('.ntile[data-i="1"]'); await wait(500); await shot(A, '13-ho-combattimento');
  await A.click('[data-cb="dmg"][data-v="5"]'); await A.click('[data-cbgo]'); await wait(480); await shot(A, '14-ho-radice-esce');
  await wait(120);
  check(await fxOn(B), 'le radici arrivano sul telefono dell\'ospite (che è in Forgia)');
  await shot(B, '15-ho-ospite-preso'); await wait(500); await shot(B, '16-ho-ospite-preso-dopo');
  await wait(2500);
  check(!(await fxOn(A)) && !(await fxOn(B)), 'effetti spenti sui due telefoni');
  // l'ospite in Forgia colpisce il principale in Selva: arriva il fulmine
  await B.click('.ntile[data-i="0"]'); await wait(500); await B.click('[data-cb="dmg"][data-v="5"]'); await B.click('[data-cbgo]'); await wait(420);
  check(await fxOn(A), 'il fulmine dell\'ospite arriva sul principale in Selva');
  await shot(A, '17-ho-principale-fulmine');
  // vittoria
  await wait(1500); await C.bringToFront(); await C.evaluate(() => { S.players.forEach((p, i) => { if(i) p.life = 0 }); showWinner(0) });
  await wait(1700); await shot(C, '18-vittoria');
  check(errs.length === 0, 'nessun errore JavaScript' + (errs.length ? ': ' + errs.join(' | ') : ''));
  const logged = await C.evaluate(() => localStorage.getItem('smtg-errors'));
  check(!logged || logged === '[]', 'nessun errore registrato: ' + (logged || ''));
  await browser.close();
  console.log(fails ? `\n${fails} controlli falliti` : '\nTutti i controlli passati');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2) });

// Prova del fulmine di Forgia: trascinamento, colpo, scosse; H&O (elemento centrale, Combattimento) e un telefono
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'fulmine');
fs.mkdirSync(SHOTS, {recursive:true});
const ORIGIN = 'http://mpp.test';
const TYPES = {html:'text/html', js:'text/javascript', png:'image/png', json:'application/json', webmanifest:'application/manifest+json'};
let fails = 0;
const check = (ok, msg) => { console.log((ok ? 'OK   ' : 'FAIL ') + msg); if(!ok) fails++ };
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:412, height:880}, reducedMotion:'no-preference'});
  await ctx.route(ORIGIN + '/**', async route => {
    const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
    const fp = path.join(ROOT, f);
    if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
    if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
    route.fulfill({status:200, contentType:TYPES[f.split('.').pop()] || 'application/octet-stream', body:fs.readFileSync(fp)});
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
  const forgia = p => p.evaluate(() => { SET.theme = 'forgia'; saveSet(); applyTheme(true) });
  const bolts = p => p.evaluate(() => $('#fx2').classList.contains('on'));

  // --- H&O
  const A = await open('A'); await forgia(A);
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('commander', 2) }); await wait(3500);
  await A.evaluate(() => openNet()); await wait(300); await A.click('[data-na="host"]'); await wait(300);
  const B = await open('B'); await forgia(B);
  await B.click('#wzNet'); await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client'); await wait(300);
  await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(400);
  await A.evaluate(() => closeAllOv()); await B.evaluate(() => closeAllOv()); await wait(3000);
  await B.bringToFront();
  const hb = await B.locator('#tokenBtn').boundingBox(), t0 = await B.locator('.ntile[data-i="0"]').boundingBox();
  await B.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await B.mouse.down();
  await B.mouse.move(hb.x + hb.width / 2 - 40, hb.y - 120, {steps:6}); await wait(120);
  check(await bolts(B), 'fulmine vivo durante il trascinamento');
  await shot(B, '1-trascinamento');
  await B.mouse.move(t0.x + t0.width / 2, t0.y + t0.height / 2, {steps:8}); await wait(100);
  await shot(B, '2-agganciato');
  await B.mouse.up(); await wait(80); await shot(B, '3-rilascio'); await wait(400);
  check(await B.evaluate(() => !!cqp), 'finestrella aperta dopo il rilascio');
  await B.click('.cqQuick button[data-v="3"]'); await wait(70); await shot(B, '4-colpo'); await wait(250); await shot(B, '5-scosse');
  await B.click('.cqPop [data-ok]'); await wait(1500);
  check(await A.evaluate(() => S.players[0].cmd['1'] || S.players[0].life), 'danno arrivato al principale');
  // Combattimento dal quadratino: la pagina scorre via e parte il fulmine
  await B.click('.ntile[data-i="0"]'); await wait(500);
  await B.click('[data-cb="dmg"][data-v="5"]'); await B.click('[data-cb="poison"][data-v="1"]');
  const before = await A.evaluate(() => S.players[0].life);
  await B.click('[data-cbgo]'); await wait(200); await shot(B, '6-pagina-scorre');
  await wait(170); await shot(B, '7-combattimento-colpo'); await wait(300); await shot(B, '8-combattimento-scosse');
  check(await B.evaluate(() => !stack.includes('combat')), 'pagina Combattimento chiusa');
  await wait(1500);
  check(await A.evaluate(() => S.players[0].life) === before - 5, 'vita del principale -5');
  // Combattimento dalla scheda completa: si chiudono tutte e due
  await B.evaluate(() => openPlayer(NET.me)); await wait(450);
  await B.click('.qCb'); await wait(450);
  await B.click('[data-cb="dmg"][data-v="1"]'); await B.click('[data-cbgo]'); await wait(700);
  check(await B.evaluate(() => stack.length === 0), 'dalla scheda: scheda e Combattimento chiuse: ' + await B.evaluate(() => stack.join(',')));
  await wait(1500);

  // --- un telefono
  const C = await open('C'); await forgia(C);
  await C.evaluate(() => startGame('commander', 4)); await wait(3500); await C.evaluate(() => closeAllOv()); await wait(300);
  const nm = await C.locator('.cell[data-i="3"] .pname').boundingBox(), c1 = await C.locator('.cell[data-i="1"]').boundingBox();
  await C.mouse.move(nm.x + nm.width / 2, nm.y + nm.height / 2); await C.mouse.down();
  await C.mouse.move(nm.x + nm.width / 2, nm.y - 80, {steps:5}); await wait(100); await shot(C, '9-solo-trascinamento');
  await C.mouse.move(c1.x + c1.width / 2, c1.y + c1.height / 2, {steps:8}); await wait(100); await shot(C, '10-solo-agganciato');
  await C.mouse.up(); await wait(450);
  await C.click('.cqQuick button[data-v="3"]'); await wait(70); await shot(C, '11-solo-colpo'); await wait(300); await shot(C, '12-solo-scosse');
  await wait(2200);
  check(await C.evaluate(() => !$('#fx2').classList.contains('on')), 'livello degli effetti spento a fine animazione');
  check(errs.length === 0, 'nessun errore JavaScript' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await browser.close();
  console.log(fails ? `\n${fails} controlli falliti` : '\nTutti i controlli passati');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2) });

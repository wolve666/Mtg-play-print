// Prova: il principale lancia fulmini e poi le animazioni devono continuare
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'fulmine');
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
    route.fulfill({status:200, contentType:f.endsWith('.html') ? 'text/html' : 'application/octet-stream', body:fs.readFileSync(fp)});
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
  const open = async dev => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(dev + ': ' + e.message)); p.on('console', m => { if(m.type() === 'error') errs.push(dev + ' console: ' + m.text()) }); await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`); await wait(600); return p };
  const forgia = p => p.evaluate(() => { SET.theme = 'forgia'; saveSet(); applyTheme(true) });
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
  await A.bringToFront();
  const me = await A.evaluate(() => NET.me), foe = me === 0 ? 1 : 0;
  for(let round = 0; round < 3; round++){
    const hb = await A.locator('#tokenBtn').boundingBox(), t = await A.locator(`.ntile[data-i="${foe}"]`).boundingBox();
    await A.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await A.mouse.down();
    await A.mouse.move(hb.x + hb.width / 2, hb.y - 100, {steps:5}); await wait(80);
    await A.mouse.move(t.x + t.width / 2, t.y + t.height / 2, {steps:8}); await wait(80);
    await A.mouse.up(); await wait(400);
    await A.click('.cqQuick button[data-v="3"]'); await wait(120);
    await A.screenshot({path:path.join(SHOTS, `host-${round}.png`)});
    const got = await B.evaluate(() => $('#fx2').classList.contains('on'));
    check(got, `giro ${round}: il colpo arriva ed esplode sul telefono dell'ospite`);
    if(round === 0){ await wait(0); await B.screenshot({path:path.join(SHOTS, 'ospite-colpito-1.png')}); await wait(250); await B.screenshot({path:path.join(SHOTS, 'ospite-colpito-2.png')}) }
    await A.click('.cqPop [data-ok]'); await wait(2200);
    const st = await A.evaluate(() => ({on:$('#fx2').classList.contains('on')}));
    check(!st.on, `giro ${round}: livello degli effetti spento dopo il colpo`);
  }
  // l'ospite colpisce il principale: il messaggio passa e il principale esplode
  await B.bringToFront(); await wait(300);
  await B.click(`.ntile[data-i="${me}"]`); await wait(500);
  await B.click('[data-cb="dmg"][data-v="5"]'); await B.click('[data-cbgo]'); await wait(420);
  check(await A.evaluate(() => $('#fx2').classList.contains('on')), 'colpo dell\'ospite: esplode sul telefono del principale');
  await A.screenshot({path:path.join(SHOTS, 'principale-colpito.png')});
  await wait(2500);
  check(await B.evaluate(() => JSON.parse(localStorage.getItem('smtg-errors') || '[]').length === 0) && await A.evaluate(() => JSON.parse(localStorage.getItem('smtg-errors') || '[]').length === 0), 'nessun errore registrato negli effetti');
  const real = errs.filter(e => !/Failed to load resource/.test(e));
  check(real.length === 0, 'nessun errore' + (real.length ? ': ' + real.join(' | ') : ''));
  await browser.close(); process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2) });

// Prova della V2: tre schede = tre telefoni, collegati con il trasporto di prova (?nettest)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = require('path').resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'shots');
fs.mkdirSync(SHOTS, {recursive:true});
const ORIGIN = 'http://mpp.test';
const TYPES = {html:'text/html', js:'text/javascript', png:'image/png', json:'application/json', webmanifest:'application/manifest+json'};
const log = (...a) => console.log(...a);
let fails = 0;
const check = (ok, msg) => { log((ok ? 'OK   ' : 'FAIL ') + msg); if(!ok) fails++ };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({viewport:{width:412, height:880}, reducedMotion:'reduce', hasTouch:false});
  await ctx.route(ORIGIN + '/**', async route => {
    const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
    const fp = path.join(ROOT, f);
    if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
    if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
    route.fulfill({status:200, contentType:TYPES[f.split('.').pop()] || 'application/octet-stream', body:fs.readFileSync(fp)});
  });
  // tutto il resto (Scryfall, font...) non serve alla prova
  await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
  // ogni scheda ha la sua memoria, come un telefono diverso
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
  const open = async dev => {
    const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(dev + ': ' + e.message));
    await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`);
    await p.waitForTimeout(600);
    return p;
  };
  const shot = (p, n) => p.screenshot({path:path.join(SHOTS, n + '.png')});
  const wait = ms => new Promise(r => setTimeout(r, ms));



  const A = await open('A');
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('standard', 2) }); await wait(700);
  await A.evaluate(() => openNet()); await wait(300); await A.click('[data-na="host"]'); await wait(300);
  const B = await open('B');
  await B.click('#wzNet'); await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client'); await wait(300);
  await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(400);
  await A.evaluate(() => closeAllOv()); await wait(400);
  for(const pause of [0, 450]){
    const hb = await B.locator('#tokenBtn').boundingBox(), t0 = await B.locator('.ntile[data-i="0"]').boundingBox();
    await B.mouse.move(hb.x + hb.width / 2, hb.y + hb.height / 2); await B.mouse.down();
    if(pause) await wait(pause);
    let line = false;
    await B.mouse.move(hb.x + hb.width / 2, hb.y - 40, {steps:4});
    await B.mouse.move(t0.x + t0.width / 2, t0.y + t0.height / 2, {steps:8});
    line = await B.evaluate(() => $('#dragLine').classList.contains('on') && !!drag);
    await B.mouse.up(); await wait(300);
    check(line, `scia del trascinamento visibile (dito fermo ${pause} ms prima di muoversi)`);
    const m = await B.evaluate(() => cqp && cqp.mode);
    check(m === 'dmg', `finestrella aperta su «Combattimento» (Standard): ${m}`);
    if(pause === 0) await shot(B, '30-standard-combattimento');
    await B.click('.cqQuick button[data-v="3"]'); await wait(100);
    await B.click('.cqPop [data-ok]'); await wait(600);
  }
  check(await A.evaluate(() => S.players[0].life) === 14, 'Federico perde 3 + 3 di vita sul telefono principale');
  check(errs.length === 0, 'nessun errore JavaScript' + (errs.length ? ': ' + errs.join(' | ') : ''));
  await browser.close();
  log(fails ? `\n${fails} controlli falliti` : '\nTutti i controlli passati');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2) });

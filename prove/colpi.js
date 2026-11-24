// colpi dei temi nell'app: un telefono (scheda → scheda) e H&O (da un telefono all'altro), colpo normale e colpo grosso
// node prove/colpi.js  (THEMES=forgia,abisso per sceglierli; foto in prove/out/colpi/)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'colpi'), ORIGIN = 'http://mpp.test';
fs.mkdirSync(SHOTS, {recursive:true});
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch(), errs = [];
  const ctx = await browser.newContext({viewport:{width:412, height:880}});
  await ctx.route(ORIGIN + '/**', route => {
    const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
    if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
    const fp = path.join(ROOT, f); if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
    route.fulfill({status:200, contentType:f.endsWith('.html') ? 'text/html' : f.endsWith('.js') ? 'text/javascript' : undefined, body:fs.readFileSync(fp)});
  });
  await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
  await ctx.addInitScript(() => {
    const dev = new URLSearchParams(location.search).get('dev') || '';
    const P = Storage.prototype, g = P.getItem, s = P.setItem, r = P.removeItem;
    P.getItem = function(k){ return g.call(this, dev + ':' + k) }; P.setItem = function(k, v){ return s.call(this, dev + ':' + k, v) }; P.removeItem = function(k){ return r.call(this, dev + ':' + k) };
    if(g.call(localStorage, dev + ':smtg-tut-014') == null) s.call(localStorage, dev + ':smtg-tut-014', '1');
    window.confirm = () => true;
  });
  const open = async dev => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(dev + ': ' + e.message)); await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`); await wait(500); return p };
  const themes = (process.env.THEMES || 'forgia,selva,abisso,cripta,santuario,mox').split(',');
  const logs = async p => p.evaluate(() => JSON.parse(localStorage.getItem('smtg-errors') || '[]').filter(e => /colpi/.test(e.m)).map(e => e.m));
  // --- un telefono
  const P = await open('solo');
  await P.evaluate(() => { startGame('commander', 4) }); await wait(800);
  const n = await P.evaluate(() => COLPI.load()); console.log('pacchetti di immagini caricati:', n, 'su 6');
  for(const th of themes){
    await P.evaluate(th => { SET.theme = th; SET.full = true; saveSet(); applyTheme(true) }, th); await wait(500);
    for(const [k, dmg] of [['normale', 3], ['grosso', 12]]){
      await P.evaluate(d => fgStrike(0, 2, d), dmg); await wait(k === 'grosso' ? 1400 : 1000);
      await P.screenshot({path:path.join(SHOTS, `${th}-solo-${k}.png`)});
      for(let i = 0; i < 50 && await P.evaluate(() => COLPI.busy()); i++) await wait(300);
      const still = await P.evaluate(() => COLPI.busy()); if(still) errs.push(`${th} ${k}: il colpo non finisce`);
    }
  }
  console.log('errori dei colpi (un telefono):', JSON.stringify(await logs(P)));
  // --- H&O: Federico (principale) colpisce Bea
  const A = await open('hA');
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('commander', 4) }); await wait(700);
  await A.evaluate(() => openNet()); await wait(300); await A.click('[data-na="host"]'); await wait(300);
  const B = await open('hB');
  await B.click('#wzNet'); await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client'); await wait(300);
  await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(300);
  await A.evaluate(() => closeAllOv()); await B.evaluate(() => closeAllOv()); await wait(400);
  await Promise.all([A, B].map(p => p.evaluate(() => COLPI.load())));
  const seatB = await B.evaluate(() => NET.me), me = await A.evaluate(() => NET.me);
  console.log('H&O: Federico posto', me, '· Bea posto', seatB);
  for(const th of themes){
    await A.evaluate(th => { SET.theme = th; SET.full = true; saveSet(); applyTheme(true) }, th); await wait(400);
    for(const [k, dmg] of [['normale', 3], ['grosso', 12]]){
      await A.evaluate(([v, d]) => fgStrike(NET.me, v, d), [seatB, dmg]);
      // FRAMES=1: la partenza fotogramma per fotogramma sul telefono di chi attacca
      if(process.env.FRAMES) for(let f = 0; f < 8; f++){ await wait(130); await A.screenshot({path:path.join(SHOTS, `${th}-HO-${k}-partenza-${f}.png`)}) }
      else await wait(900);
      await A.screenshot({path:path.join(SHOTS, `${th}-HO-${k}-attacca.png`)});
      await wait(600);
      await B.screenshot({path:path.join(SHOTS, `${th}-HO-${k}-colpita.png`)});
      for(let i = 0; i < 30 && (await A.evaluate(() => COLPI.busy()) || await B.evaluate(() => COLPI.busy())); i++) await wait(300);
    }
  }
  console.log('errori dei colpi (H&O):', JSON.stringify([...await logs(A), ...await logs(B)]));
  console.log(errs.length ? 'ERRORI:\n' + errs.join('\n') : 'nessun errore JavaScript');
  await browser.close();
})();

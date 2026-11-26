// colpo grosso del Santuario sul tavolo comune (un telefono): bottone, aureola, nuvole, spada dal tappeto di fronte
// node prove/santuario-tavolo.js  (foto in prove/out/santuario-tavolo/)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'santuario-tavolo'), ORIGIN = 'http://mpp.test';
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
  await ctx.addInitScript(() => { localStorage.setItem('smtg-tut-014', '1'); window.confirm = () => true });
  const P = await ctx.newPage(); P.on('pageerror', e => errs.push(e.message));
  await P.goto(`${ORIGIN}/index.html`); await wait(500);
  for(const [n, a, v] of [[4, 0, 1], [3, 0, 2], [3, 1, 0], [2, 0, 1]]){
    await P.evaluate(n => { startGame('commander', n) }, n); await wait(600);
    await P.evaluate(() => COLPI.load());
    await P.evaluate(() => { SET.theme = 'santuario'; SET.full = true; saveSet(); applyTheme(true); closeAllOv && closeAllOv() }); await wait(500);
    const before = await P.evaluate(v => S.players[v].life, v);
    await P.evaluate(([a, v]) => fgStrike(a, v, 10), [a, v]);
    for(const ms of [900, 1900, 2500, 3300]){ await wait(ms - (ms === 900 ? 0 : [900, 1900, 2500, 3300][[900, 1900, 2500, 3300].indexOf(ms) - 1])); await P.screenshot({path:path.join(SHOTS, `n${n}-${a}a${v}-${ms}.png`)}) }
    for(let i = 0; i < 40 && await P.evaluate(() => COLPI.busy() || !!document.getElementById('cpSL')?.width); i++) await wait(250);
    const after = await P.evaluate(v => [S.players[v].life, document.querySelector(`.cell[data-i="${v}"] .life`)?.textContent, document.getElementById('cpSL')?.width], v);
    console.log(`n${n} ${a}→${v}: vita ${before} → ${after[0]} (a schermo ${after[1]}), tela finita: ${after[2] === 0}`);
  }
  const logs = await P.evaluate(() => JSON.parse(localStorage.getItem('smtg-errors') || '[]').filter(e => /colpi/.test(e.m)).map(e => e.m));
  console.log('errori:', JSON.stringify(errs), JSON.stringify(logs));
  await browser.close();
})();

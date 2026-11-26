// la vita di chi è colpito scende quando arriva il colpo, un punto alla volta (tavolo comune)
// node prove/vita.js  (THEMES=forgia,abisso per sceglierli)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), ORIGIN = 'http://mpp.test';
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
  await P.evaluate(() => { startGame('commander', 4) }); await wait(800);
  await P.evaluate(() => COLPI.load());
  const themes = (process.env.THEMES || 'forgia,selva,abisso,cripta,santuario,mox').split(',');
  let ok = true;
  for(const th of themes){
    await P.evaluate(th => { SET.theme = th; SET.full = true; saveSet(); applyTheme(true) }, th); await wait(500);
    for(const [k, dmg, how] of [['normale', 3, 'win'], ['grosso', 9, 'win'], ['pagina', 4, 'cb']]){
      const res = await P.evaluate(async ([dmg, how]) => {
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        const lf = document.querySelector('.cell[data-i="2"] .life'), start = S.players[2].life, seen = [], t0 = performance.now();
        let land = null; const L = window.lifeLand; window.lifeLand = v => { if(land == null) land = performance.now() - t0; L(v) };
        if(how === 'win'){ for(let i = 0; i < dmg; i++){ lifeHold(2); changeLife(2, -1) } setTimeout(() => fgStrike(0, 2, dmg, true), 60) }
        else { CB = {by:0, to:2, dmg, cmd:0, poison:0, rad:0, heal:0}; combatApply() }
        for(let i = 0; i < 120; i++){ seen.push([Math.round(performance.now() - t0), +lf.textContent]); await sleep(40) }
        window.lifeLand = L;
        const firstDrop = seen.find(s => s[1] !== start);
        return {start, end:+lf.textContent, real:S.players[2].life, land, firstDrop:firstDrop && firstDrop[0], vals:[...new Set(seen.map(s => s[1]))]};
      }, [dmg, how]);
      const good = res.end === res.real && res.real === res.start - dmg && res.firstDrop >= (res.land || 0) - 50 && res.land != null;
      if(!good) ok = false;
      console.log(`${good ? 'OK ' : 'NO '} ${th} ${k}: urto a ${Math.round(res.land)} ms, vita scende da ${res.firstDrop} ms, valori ${res.vals.join(' ')}`);
      for(let i = 0; i < 30 && await P.evaluate(() => COLPI.busy()); i++) await wait(300);
      await P.evaluate(() => { S.players[2].life = 40; updateCell(2) });
    }
  }
  console.log(errs.length ? 'ERRORI:\n' + errs.join('\n') : ok ? 'Tutti i controlli passati' : 'Qualcosa non va');
  await browser.close();
})();

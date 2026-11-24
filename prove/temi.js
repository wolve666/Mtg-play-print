// foto dei temi su un telefono: pagina iniziale, Menu e impostazioni di stampa, in versione completa e liscia
// node prove/temi.js  (THEMES=abisso,cripta per sceglierli; foto in prove/out/temi/)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'temi'), ORIGIN = 'http://mpp.test';
fs.mkdirSync(SHOTS, {recursive:true});
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch(), errs = [];
  const themes = (process.env.THEMES || 'forgia,selva,abisso,cripta,santuario,mox').split(',');
  for(const th of themes) for(const full of [true, false]){
    const ctx = await browser.newContext({viewport:{width:412, height:880}, reducedMotion:'reduce'});
    await ctx.route(ORIGIN + '/**', route => {
      const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
      if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
      const fp = path.join(ROOT, f); if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
      route.fulfill({status:200, contentType:f.endsWith('.html') ? 'text/html' : undefined, body:fs.readFileSync(fp)});
    });
    await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
    await ctx.addInitScript(() => { localStorage.setItem('smtg-tut-014', '1') });
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(th + ': ' + e.message));
    await p.goto(`${ORIGIN}/index.html`); await wait(600);
    await p.evaluate(([th, full]) => { SET.theme = th; SET.full = full; saveSet(); applyTheme(true); $('#wzNet').hidden = false }, [th, full]); await wait(700);
    const n = `${th}-${full ? 'completo' : 'liscio'}`;
    await p.screenshot({path:path.join(SHOTS, `${n}-1-home.png`)});
    await p.evaluate(() => startGame('commander', 4)); await wait(900);
    await p.screenshot({path:path.join(SHOTS, `${n}-2-tavolo.png`)});
    await p.evaluate(() => openTokens()); await wait(500);
    await p.screenshot({path:path.join(SHOTS, `${n}-3-menu.png`)});
    await p.evaluate(() => { $('#tkMenu').scrollIntoView(); }); await wait(200);
    await p.evaluate(() => { const b = document.querySelector('#ov-tokens .ovBody'); b.scrollTop = b.scrollHeight }); await wait(200);
    await p.screenshot({path:path.join(SHOTS, `${n}-4-menu-fondo.png`)});
    await p.evaluate(() => { renderMenu(); openOv('menu') }); await wait(500);
    await p.screenshot({path:path.join(SHOTS, `${n}-5-stampa.png`)});
    await ctx.close();
  }
  console.log(errs.length ? 'ERRORI:\n' + errs.join('\n') : 'nessun errore JavaScript');
  await browser.close();
})();

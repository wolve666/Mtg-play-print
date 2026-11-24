// Foto di prova della pagina dei colpi: node grafica/prove/strumenti/foto-prova.js prove/out/colpi <tema> "<codice da eseguire>" <secondi separati da virgola> <nome>
// Esempio: node grafica/prove/strumenti/foto-prova.js prove/out/colpi mox "SEATS=[0,2,3,1]; renderBars(); TH.mox.big()" 1.6,2.6,3.4 laser
// Poi un foglio unico: python3 grafica/prove/strumenti/foglio-foto.py laser 3 F   (R = solo il telefono colpito)
const {chromium} = require('playwright');
const S = process.argv[2], t = process.argv[3], expr = process.argv[4], times = process.argv[5].split(',').map(Number), tag = process.argv[6] || t;
(async () => {
  const b = await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']}); const p = await b.newPage({viewport:{width:700,height:1000}});
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if(m.type() !== 'log') console.log('CONSOLE', m.type(), m.text().slice(0, 300)) });
  await p.goto('file://' + require('path').resolve('grafica/prove/prova-colpi.html') + ''); await p.waitForTimeout(600);
  await p.click(`.th[data-k=${t}]`); await p.waitForTimeout(800);
  await p.evaluate(() => document.querySelector('.phones').scrollIntoView());
  await p.waitForFunction(() => !DR); await p.waitForTimeout(4000);
  await p.evaluate(e => { window.T0 = T; eval(e) }, expr);
  const got = [];
  for(const [i, s] of times.entries()){ await p.waitForFunction(s => T - T0 >= s && (window.FREEZE = true), s); got.push(await p.evaluate(() => (T - T0).toFixed(2))); await p.locator('.phones').screenshot({path:`${S}/${tag}-${i}.png`}); await p.evaluate(() => window.FREEZE = false) }
  console.log(tag, got.join(' '));
  await b.close();
})();

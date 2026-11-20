// foto del campo H&O nei due temi + confronto del gioco su un telefono con la versione precedente
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = require('path').resolve(__dirname, '..'), SHOTS = path.join(__dirname, 'out', 'field'), ORIGIN = 'http://mpp.test';
fs.mkdirSync(SHOTS, {recursive:true});
// versione di confronto per il gioco su un telefono: la beta (ramo ccr-cf6217e4-l2vj20); BASE=<ramo o commit> per cambiarla
require('child_process').execSync(`git show ${process.env.BASE || 'origin/ccr-cf6217e4-l2vj20'}:index.html > "${path.join(__dirname, 'out', 'old-index.html')}"`, {cwd:ROOT});
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const mk = async (file) => {
    const ctx = await browser.newContext({viewport:{width:412, height:880}, reducedMotion:'reduce'});
    await ctx.route(ORIGIN + '/**', route => {
      const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
      if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
      if(f === '/index.html') return route.fulfill({status:200, contentType:'text/html', body:fs.readFileSync(file)});
      const fp = path.join(ROOT, f); if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
      route.fulfill({status:200, body:fs.readFileSync(fp)});
    });
    await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
    await ctx.addInitScript(() => {
      const dev = new URLSearchParams(location.search).get('dev') || '';
      const P = Storage.prototype, g = P.getItem, s = P.setItem, r = P.removeItem;
      P.getItem = function(k){ return g.call(this, dev + ':' + k) }; P.setItem = function(k, v){ return s.call(this, dev + ':' + k, v) }; P.removeItem = function(k){ return r.call(this, dev + ':' + k) };
      if(g.call(localStorage, dev + ':smtg-tut-014') == null) s.call(localStorage, dev + ':smtg-tut-014', '1');
      window.confirm = () => true;
    });
    return ctx;
  };
  const errs = [];
  // --- un telefono solo: vecchia e nuova versione devono essere identiche
  for(const th of ['classico', 'forgia']) for(const n of [2, 4]){
    const shots = [];
    for(const file of [path.join(__dirname, 'out', 'old-index.html'), path.join(ROOT, 'index.html')]){
      const ctx = await mk(file), p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
      await p.goto(`${ORIGIN}/index.html?dev=solo${th}${n}`); await wait(500);
      await p.evaluate(([th, n]) => { SET.theme = th; saveSet(); applyTheme(); startGame('commander', n); }, [th, n]); await wait(900);
      await p.evaluate(() => { S.players[0].counters.poison = 3; S.players[1].flags.monarch = true; save(); renderBoard() }); await wait(500);
      shots.push(await p.screenshot()); await ctx.close();
    }
    console.log((Buffer.compare(shots[0], shots[1]) === 0 ? 'OK   ' : 'DIFF ') + `un telefono, ${th}, ${n} giocatori: identico alla versione precedente`);
    if(Buffer.compare(shots[0], shots[1])){ fs.writeFileSync(path.join(SHOTS, `solo-${th}${n}-old.png`), shots[0]); fs.writeFileSync(path.join(SHOTS, `solo-${th}${n}-new.png`), shots[1]) }
  }
  // --- H&O: principale + ospite, nei due temi
  const ctx = await mk(path.join(ROOT, 'index.html'));
  const open = async dev => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(dev + ': ' + e.message)); await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`); await wait(500); return p };
  const A = await open('A');
  await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); startGame('commander', 4) }); await wait(700);
  await A.evaluate(() => openNet()); await wait(300); await A.click('[data-na="host"]'); await wait(300);
  const B = await open('B');
  await B.click('#wzNet'); await B.fill('#netName', 'Bea'); await B.dispatchEvent('#netName', 'change');
  await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
  await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
  await B.waitForFunction(() => NET.role === 'client'); await wait(300);
  await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(300);
  await A.evaluate(() => closeAllOv()); await wait(400);
  for(const th of ['classico', 'forgia']){
    for(const p of [A, B]) await p.evaluate(th => { SET.theme = th; saveSet(); applyTheme(); renderBoard() }, th);
    await wait(500);
    await B.screenshot({path:path.join(SHOTS, `${th}-1-campo.png`)});
    // tanti indicatori insieme
    await A.evaluate(() => { const b = S.players[1]; Object.assign(b.counters, {poison:4, rad:2, energy:7, exp:3, tax:4}); b.cmd = {0:6, 2:9, 3:3}; b.flags.monarch = b.flags.initiative = b.flags.blessing = true; S.turn.on = true; S.turn.active = 1; S.turn.started = S.turn.turnStart = Date.now(); save(); renderBoard() });
    await wait(700);
    await B.screenshot({path:path.join(SHOTS, `${th}-2-indicatori.png`)});
    await A.screenshot({path:path.join(SHOTS, `${th}-2b-principale.png`)});
    // pannello personale
    await B.evaluate(() => { PP.add(NET.me); $(`.cell[data-i="${NET.me}"]`).classList.add('pp'); renderPP(NET.me) }); await wait(700);
    await B.screenshot({path:path.join(SHOTS, `${th}-3-pannello.png`)});
    await B.evaluate(() => closePP(NET.me)); await wait(500);
    await B.evaluate(() => openPlayer(1)); await wait(500);
    await B.screenshot({path:path.join(SHOTS, `${th}-4-scheda.png`)});
    await B.click('#plBody .qCb'); await wait(400);
    await B.click('[data-cb="dmg"][data-v="5"]'); await B.click('[data-cb="cmd"][data-v="1"]');
    await B.screenshot({path:path.join(SHOTS, `${th}-5-combattimento.png`)});
    await B.evaluate(() => closeAllOv()); await wait(400);
    await B.evaluate(() => openTokens()); await wait(400);
    await B.screenshot({path:path.join(SHOTS, `${th}-6-menu-ospite.png`), fullPage:true});
    await B.evaluate(() => closeAllOv()); await wait(400);
    await A.evaluate(() => { const b = S.players[1]; b.counters = {}; b.cmd = {}; b.flags = {}; S.turn.on = false; save(); renderBoard() }); await wait(500);
  }
  // scollegato: riga rossa
  await B.evaluate(() => { NET.online = false; renderNetBar() }); await wait(200);
  await B.screenshot({path:path.join(SHOTS, 'forgia-7-scollegato.png'), clip:{x:0, y:0, width:412, height:130}});
  console.log(errs.length ? 'ERRORI: ' + errs.join(' | ') : 'nessun errore JavaScript');
  await browser.close();
})().catch(e => { console.error(e); process.exit(2) });

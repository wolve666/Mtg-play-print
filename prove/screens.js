// prova sugli schermi: foto e controlli automatici su più misure, nei due temi, un telefono e H&O
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = require('path').resolve(__dirname, '..'), OUT = path.join(__dirname, 'out', 'screens'), ORIGIN = 'http://mpp.test';
fs.mkdirSync(OUT, {recursive:true});
const SIZES = (process.env.SIZES || '360x640,360x780,393x852,412x915,430x932,673x841,800x1280').split(',').map(s => s.split('x').map(Number));
const THEMES = (process.env.THEMES || 'classico,forgia').split(',');
const wait = ms => new Promise(r => setTimeout(r, ms));
const issues = [];
// controlli fatti dentro la pagina: ritorna un elenco di problemi
const AUDIT = (where) => {
  const out = [], R = el => el.getBoundingClientRect(), vis = el => { const r = R(el), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > .05 };
  const W = innerWidth, H = innerHeight;
  if(document.documentElement.scrollWidth > W + 1) out.push(`pagina più larga dello schermo (${document.documentElement.scrollWidth} > ${W})`);
  const inter = (a, b, m = 1) => a.left < b.right - m && b.left < a.right - m && a.top < b.bottom - m && b.top < a.bottom - m;
  const top = stack[stack.length - 1];
  const ovEl = top && document.querySelector('#ov-' + top), turned = ovEl && /\br(90|180|270)\b/.test(ovEl.className);
  const scopes = top ? [ovEl] : [...document.querySelectorAll('#board,#netBar,#hub')];
  const scope = {querySelectorAll:q => scopes.flatMap(x => [...x.querySelectorAll(q)])};
  // testo tagliato in tasti e caselle
  scope.querySelectorAll('button,.chip,.lbl,.ppC,.ppF,.cbFoe,.ntN,.nlChip,.wzOpt b,.wzOpt span').forEach(el => {
    if(!vis(el)) return;
    const s = getComputedStyle(el);
    if((s.overflow === 'hidden' || s.textOverflow === 'ellipsis') && el.scrollWidth > el.clientWidth + 2) out.push(`${el.matches('.pname,.ntN') ? '(nome accorciato) ' : ''}testo tagliato: «${el.textContent.trim().slice(0, 30)}» (${el.scrollWidth}/${el.clientWidth})`);
    const r = R(el);
    if(!turned && el.textContent.trim() && (r.right > W + 1 || r.left < -1)) out.push(`fuori dallo schermo: «${el.textContent.trim().slice(0, 30)}»`);
  });
  // tasti troppo piccoli da toccare (sotto 32 px)
  const small = [...scope.querySelectorAll('button')].filter(b => vis(b) && !(b.closest('.ov') && !b.closest('.ov.open')) && (R(b).width < 32 || R(b).height < 32) && !b.matches('.sw,.ppSw,.nline,.verBtn,.spia'));
  if(small.length) out.push(`tasti piccoli (<32 px): ${[...new Set(small.map(b => (b.className || b.id || b.tagName) + ' ' + Math.round(R(b).width) + '×' + Math.round(R(b).height)))].slice(0, 6).join(', ')}`);
  if(!top){
    // tavolo: spie, simbolo centrale, vita e nome non si devono pestare né uscire dal proprio pannello
    const hub = document.querySelector('#tokenBtn'), hr = R(hub);
    document.querySelectorAll('#board .cell').forEach(cell => {
      if(cell.classList.contains('pp')) return;
      const cr = R(cell), i = cell.dataset.i;
      const els = [...cell.querySelectorAll('.spia.on,.pname')].filter(vis);
      els.forEach(e => { const r = R(e); if(r.left < cr.left - 2 || r.right > cr.right + 2 || r.top < cr.top - 2 || r.bottom > cr.bottom + 2) out.push(`pannello ${i}: «${e.className.split(' ')[0]} ${e.textContent.trim().slice(0, 12)}» esce dal pannello`) });
      const sp = els.filter(e => e.matches('.spia'));
      for(let a = 0; a < sp.length; a++) for(let b = a + 1; b < sp.length; b++) if(inter(R(sp[a]), R(sp[b]), 2)) out.push(`pannello ${i}: due indicatori sovrapposti`);
      sp.forEach(e => { if(inter(R(e), hr, 3)) out.push(`pannello ${i}: indicatore sotto il simbolo centrale`) });
      const nm = cell.querySelector('.pname'); if(nm && vis(nm) && inter(R(nm), hr, 3)) out.push(`pannello ${i}: nome sotto il simbolo centrale`);
      // vita: le cifre occupano circa l'84% della grandezza del carattere
      const lf = cell.querySelector('.life'), lr = R(lf), fs = parseFloat(getComputedStyle(lf).fontSize), cy = (lr.top + lr.bottom) / 2;
      const glyph = {left:lr.left, right:lr.right, top:cy - fs * .42, bottom:cy + fs * .42};
      if(document.body.classList.contains('netv')){
        if(inter(glyph, hr, 4)) out.push(`H&O: il simbolo centrale copre la vita`);
        sp.forEach(e => { if(inter(R(e), glyph, 4)) out.push(`H&O: indicatore sopra le cifre della vita`) });
        if(sp.length && Math.min(...sp.map(e => R(e).top)) < cr.top) out.push('H&O: indicatori sopra il bordo del campo');
        const tiny = sp.filter(e => parseFloat(getComputedStyle(e).fontSize) < 15); if(tiny.length) out.push(`H&O: indicatori piccoli (${tiny.length})`);
      }
    });
    document.querySelectorAll('#netBar .ntile').forEach(t => { const n = t.querySelector('.ntN'); if(n.scrollWidth > n.clientWidth + 2) out.push(`quadratino: nome tagliato «${n.textContent}»`) });
  }
  document.querySelectorAll('.ppIn').forEach(b => { if(!vis(b) || !b.closest('.cell.pp')) return; const f = parseFloat(b.style.fontSize || getComputedStyle(b).fontSize); if(f < 11) out.push(`pannello personale: testo molto piccolo (${f}px)`); if(b.scrollHeight > b.clientHeight + 2) out.push('pannello personale: contenuto tagliato') });
  if(document.querySelector('.cqPop')){ const r = R(document.querySelector('.cqPop')); if(r.left < 0 || r.right > W || r.top < 0 || r.bottom > H) out.push('finestrella dei danni fuori dallo schermo') }
  return out;
};
(async () => {
  const browser = await chromium.launch();
  const errs = [];
  for(const [w, h] of SIZES) for(const th of THEMES){
    const tag = `${w}x${h}-${th}`, shots = [];
    const ctx = await browser.newContext({viewport:{width:w, height:h}, reducedMotion:'reduce', hasTouch:false});
    await ctx.route(ORIGIN + '/**', route => {
      const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
      if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
      const fp = path.join(ROOT, f); if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
      route.fulfill({status:200, contentType:f.endsWith('.html') ? 'text/html' : undefined, body:fs.readFileSync(fp)});
    });
    await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
    await ctx.addInitScript(th => {
      const dev = new URLSearchParams(location.search).get('dev') || '';
      const P = Storage.prototype, g = P.getItem, s = P.setItem, r = P.removeItem;
      P.getItem = function(k){ return g.call(this, dev + ':' + k) }; P.setItem = function(k, v){ return s.call(this, dev + ':' + k, v) }; P.removeItem = function(k){ return r.call(this, dev + ':' + k) };
      if(g.call(localStorage, dev + ':smtg-tut-014') == null) s.call(localStorage, dev + ':smtg-tut-014', '1');
      window.confirm = () => true;
    }, th);
    const page = async dev => { const p = await ctx.newPage(); p.on('pageerror', e => errs.push(`${tag} ${dev}: ${e.message}`)); await p.goto(`${ORIGIN}/index.html?nettest&dev=${dev}`); await wait(500); await p.evaluate(th => { SET.theme = th; SET.intro = false; saveSet(); applyTheme(true) }, th); await wait(300); return p };
    const snap = async (p, name) => {
      await wait(450);
      const found = await p.evaluate(AUDIT);
      found.forEach(m => issues.push(`${tag} · ${name}: ${m}`));
      shots.push({name, buf:await p.screenshot()});
    };
    // ---- un telefono solo
    const A = await page('A');
    await snap(A, 'pagina iniziale');
    for(const n of [2, 4, 6]){
      await A.evaluate(n => { startGame('commander', n); }, n); await wait(500);
      await A.evaluate(() => { const p = S.players; p[0].counters.poison = 4; p[0].counters.tax = 2; p[1].cmd = {0:7}; p[1].counters.rad = 3; p[1].counters.energy = 5; p[0].name = 'Giocatrice lunga'; p[1].flags.monarch = true; save(); renderBoard() });
      await snap(A, `${n} giocatori`);
    }
    await A.evaluate(() => openPP(0)); await snap(A, '6 giocatori, pannello');
    await A.evaluate(() => closePP(0));
    await A.evaluate(() => startGame('commander', 4)); await wait(400);
    await A.evaluate(() => openPP(1)); await snap(A, '4 giocatori, pannello'); await A.evaluate(() => closePP(1));
    await A.evaluate(() => openPlayer(0)); await snap(A, 'scheda'); await A.evaluate(() => closeAllOv()); await wait(400);
    await A.evaluate(() => openTokens()); await snap(A, 'menu'); await A.evaluate(() => closeAllOv()); await wait(400);
    await A.evaluate(() => openDice()); await snap(A, 'dadi'); await A.evaluate(() => closeAllOv()); await wait(400);
    await A.evaluate(() => openCmdQuick(1, 0)); await snap(A, 'finestrella danni'); await A.evaluate(() => closeCqPop());
    // ---- H&O: principale A, ospite B al posto 2
    await A.evaluate(() => { SET.netName = 'Federico'; saveSet(); openNet() }); await wait(300); await A.click('[data-na="host"]'); await wait(300);
    const B = await page('B');
    await B.click('#wzNet'); await wait(400); await B.fill('#netName', 'Beatrice'); await B.dispatchEvent('#netName', 'change');
    await B.waitForSelector('[data-na="join"]'); await B.click('[data-na="join"]');
    await A.waitForSelector('[data-na="yes"]'); await A.click('[data-na="yes"]');
    await B.waitForFunction(() => NET.role === 'client'); await wait(300);
    await A.evaluate(() => netSeat(Object.keys(NET.names).find(id => id !== NID()), 1)); await wait(400);
    await A.evaluate(() => closeAllOv()); await wait(400);
    await snap(B, 'H&O campo');
    await A.evaluate(() => { const b = S.players[1]; Object.assign(b.counters, {poison:4, rad:2, energy:7, exp:3, tax:4}); b.cmd = {0:6, 2:9, 3:3}; b.flags.monarch = b.flags.initiative = b.flags.blessing = true; S.turn.on = true; S.turn.active = 1; S.turn.started = S.turn.turnStart = Date.now(); S.players[1].life = 124; save(); renderBoard() }); await wait(600);
    await snap(B, 'H&O tanti indicatori');
    await snap(A, 'H&O principale');
    await B.evaluate(() => { openPP(NET.me) }); await snap(B, 'H&O pannello'); await B.evaluate(() => closePP(NET.me));
    await B.evaluate(() => openCombat(2)); await B.click('[data-cb="dmg"][data-v="5"]'); await snap(B, 'H&O danni');
    await B.evaluate(() => closeAllOv()); await wait(400);
    await B.evaluate(() => openPlayer(NET.me)); await snap(B, 'H&O scheda'); await B.evaluate(() => closeAllOv()); await wait(400);
    await B.evaluate(() => openTokens()); await snap(B, 'H&O menu ospite'); await B.evaluate(() => closeAllOv()); await wait(400);
    await B.evaluate(() => openCmdQuick(NET.me, 0)); await snap(B, 'H&O finestrella'); await B.evaluate(() => closeCqPop());
    await A.evaluate(() => openNet()); await snap(A, 'H&O posti'); await A.evaluate(() => { closeAllOv(); netLeave() });
    await ctx.close();
    // foglio con tutte le foto di questa misura
    fs.writeFileSync(path.join(OUT, tag + '.json'), JSON.stringify(shots.map(s => s.name)));
    shots.forEach((s, k) => fs.writeFileSync(path.join(OUT, `${tag}-${String(k).padStart(2, '0')}.png`), s.buf));
    console.log('fatto', tag);
  }
  fs.writeFileSync(path.join(OUT, 'problemi.txt'), issues.join('\n'));
  console.log(`\n${issues.length} problemi, ${errs.length} errori JS`);
  errs.forEach(e => console.log('ERR', e));
  await browser.close();
})().catch(e => { console.error(e); process.exit(2) });

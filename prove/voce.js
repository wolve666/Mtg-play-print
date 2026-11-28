// prova delle richieste a voce: frasi come le scrive Android in italiano → cosa capisce l'app e cosa cerca su Scryfall
//   node prove/voce.js            (VERBOSE=1 per vedere anche le frasi riuscite)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), ORIGIN = 'http://mpp.test';

// [trascrizioni di Android (fino a 5), cosa mi aspetto: tipo, e se serve pw / emblema / nome / sottotipi]
const CASI = [
  [['due tesori'], {type:'Treasure', qty:2}],
  [['tre goblin uno uno rossi'], {type:'Goblin', qty:3, pow:1}],
  [['emblema di Tezzeret'], {type:'Emblem', pw:'Tezzeret'}],
  [['emblema di tesserette'], {type:'Emblem', pw:'Tezzeret'}],
  [['emblema di tezeret'], {type:'Emblem', pw:'Tezzeret'}],
  [['emblema di tesoretto', 'emblema di tezzeret'], {type:'Emblem', pw:'Tezzeret'}],
  [['emblema di elspeth'], {type:'Emblem', pw:'Elspeth'}],
  [['emblema di elspet'], {type:'Emblem', pw:'Elspeth'}],
  [['emblema di cianda'], {type:'Emblem', pw:'Chandra'}],
  [['emblema di ciandra'], {type:'Emblem', pw:'Chandra'}],
  [['emblema di gideon'], {type:'Emblem', pw:'Gideon'}],
  [['emblema di sorin'], {type:'Emblem', pw:'Sorin'}],
  [['emblema di vraska'], {type:'Emblem', pw:'Vraska'}],
  [['emblema di nissa'], {type:'Emblem', pw:'Nissa'}],
  [['emblema di teferi'], {type:'Emblem', pw:'Teferi'}],
  [['emblema di jace'], {type:'Emblem', pw:'Jace'}],
  [['emblema di geis'], {type:'Emblem', pw:'Jace'}],
  [['emblema di tezzeret cruel captain'], {type:'Emblem', emblem:'Tezzeret, Cruel Captain'}],
  [['tezzeret'], {type:'Emblem', pw:'Tezzeret'}],
  [['phyrexiano'], {type:'Phyrexian'}],
  [['phirexiano'], {type:'Phyrexian'}],
  [['fire xiano'], {type:'Phyrexian'}],
  [['zombie phirexiano'], {type:'Zombie', sub:['Phyrexian']}],
  [['un germe phyrexiano'], {type:'Germ', sub:['Phyrexian']}],
  [['marit lage'], {exact:'Marit Lage'}],
  [['marito lage'], {exact:'Marit Lage'}],
  [['un tottero'], {type:'Thopter'}],
  [['un topter'], {type:'Thopter'}],
  [['un servo'], {type:'Servo'}],
  [['un eldrazi spawn'], {type:'Eldrazi'}],
  [['un construct'], {type:'Construct'}],
  [['wurm sei sei'], {type:'Wurm', pow:6}],
  [['un orso due due verde'], {type:'Bear', pow:2}],
  [['una spora', 'un saproling'], {type:'Saproling'}],
  [['un cervo'], {type:'Elk'}],
  [['un incubatore'], {type:'Incubator'}],
  [['due cibi'], {type:'Food', qty:2}],
  [['un elementale quattro quattro'], {type:'Elemental', pow:4}],
  [['un vampiro con volare'], {type:'Vampire'}],
  [['emblema di agiani'], {type:'Emblem', pw:'Ajani'}],
  [['emblema di iughin'], {type:'Emblem', pw:'Ugin'}],
  [['un mir'], {type:'Myr'}],
  [['una spia'], {type:'Spy'}],
  [['un soldato'], {type:'Soldier', sub:[]}],
  [['gatto soldato'], {type:'Cat', sub:['Soldier']}],
  [['un soldato umano bianco'], {type:'Soldier', sub:['Human']}],
  [['un guerriero elfo'], {type:'Warrior', sub:['Elf']}],
  // prova sul telefono del 28 novembre (S21, dettatura sul telefono)
  [['soldato direxiano'], {type:'Soldier', sub:['Phyrexian']}],
  [['pirexano'], {type:'Phyrexian'}],
  [['soldato pyrexano'], {type:'Soldier', sub:['Phyrexian']}],
  [['file exiano'], {type:'Phyrexian'}],
  [['thezareth emblema'], {type:'Emblem', pw:'Tezzeret'}],
  [['sahili emblema'], {type:'Emblem', pw:'Saheeli'}],
  [['tesserete Cruel Captain'], {type:'Emblem', emblem:'Tezzeret, Cruel Captain'}],
  [['Go'], {type:null, free:''}],
  // non devono somigliare a niente
  [['ciao come stai'], {type:null}],
  [['veleno'], {type:null}],
  [['un mostro'], {type:null}],
  [['una farfalla'], {type:null}],
  [['monarca'], {type:null}],
];

(async () => {
  const b = await chromium.launch(), ctx = await b.newContext();
  await ctx.route(ORIGIN + '/**', route => {
    const u = new URL(route.request().url()); let f = u.pathname === '/' ? '/index.html' : u.pathname;
    if(f === '/app-config.js') return route.fulfill({status:200, contentType:'text/javascript', body:''});
    const fp = path.join(ROOT, f); if(!fs.existsSync(fp)) return route.fulfill({status:404, body:''});
    route.fulfill({status:200, contentType:f.endsWith('.html') ? 'text/html' : undefined, body:fs.readFileSync(fp)});
  });
  await ctx.route(/^https?:\/\/(?!mpp\.test)/, r => r.abort());
  const p = await ctx.newPage(), errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(ORIGIN + '/index.html');
  await p.waitForFunction(() => typeof pickRequest === 'function');
  const out = await p.evaluate(casi => casi.map(([alts, want]) => {
    const t0 = performance.now(), k = pickRequest(alts), r = k.req, ms = performance.now() - t0;
    const bad = Object.entries(want).filter(([f, v]) => JSON.stringify(r[f]) !== JSON.stringify(v)).map(([f, v]) => `${f}: ${JSON.stringify(r[f])} invece di ${JSON.stringify(v)}`);
    return {alts, bad, ms, desc:describe(r), q:buildQueries(r)[0].q.join(' '), fz:r.fz, emb:r.type === 'Emblem' && (r.pw || r.emblem) ? emblemsOf(r).map(e => e.name) : null};
  }), CASI);
  let ko = 0, slow = 0;
  for(const o of out){
    if(o.bad.length) ko++;
    if(o.ms > 60) slow++;
    if(o.bad.length || process.env.VERBOSE){
      console.log(`${o.bad.length ? 'NO ' : 'ok '} «${o.alts.join('» | «')}» → ${o.desc}   [${o.q}]  ${o.ms.toFixed(1)} ms`);
      if(o.fz && o.fz.length) console.log('     a orecchio:', o.fz.map(h => `${h.heard}→${h.en} ${h.s}`).join(', '));
      if(o.emb) console.log('     emblemi:', o.emb.join('; '));
      o.bad.forEach(x => console.log('     ' + x));
    }
  }
  console.log(`\n${out.length - ko} su ${out.length} giuste${slow ? `, ${slow} lente (oltre 60 ms)` : ''}`);
  if(errs.length) console.log('errori nella pagina:', errs.slice(0, 5));
  await b.close();
  process.exit(ko || errs.length ? 1 : 0);
})();

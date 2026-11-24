# Mox: scheda di stile e richieste per le immagini

Il tema dell'**Incolore** (prima chiamato «Officina», nome proposto; deciso **Mox** da Federico il 21 novembre 2026). Le immagini le disegna ChatGPT, io le controllo, le comprimo in WebP, le salvo qui in `grafica/mox/` e le animo. Prima una pagina di prova pubblicata da provare sul telefono (`grafica/prove/prova-mox.html`); nell'app si monta solo dopo il sì di Federico.

## Lo stile
- **Mondo**: artefatti antichi e macchine a orologeria, costruiti da un popolo scomparso. Ottone, acciaio, ingranaggi, lenti, e al centro di ogni congegno un **nucleo di cristallo incolore** che brilla di una luce ciano pallida. Preciso, prezioso, un po' misterioso: niente sporcizia, niente sangue.
- **Il nome**: «Mox» richiama le gemme montate nell'ottone. Le immagini restano **generiche**: nessuna carta di Magic copiata, nessun gioiello preso da un'illustrazione esistente.
- **Materiali**: acciaio spazzolato, ottone antico, rame, grafite, vetro e lenti, rivetti, ingranaggi, cristallo incolore sfaccettato con riflessi ciano.
- **Colori**: fondo grafite #0C0E11, acciaio #1A1E24 / #2A3038 / #4A535E, acciaio chiaro #A9B3BD, ottone #C9A24A, ottone chiaro #E3C478, rame #B8683A, nucleo ciano #9FE8FF, luce del nucleo #E6FBFF, testo #EEF2F5.
- **Resa**: realistica dipinta, fantasy, ricca di dettagli meccanici. Niente cartone animato, niente foto, niente fantascienza al neon.
- **Luce**: morbida da in alto a sinistra, più il bagliore ciano del nucleo.
- **Vista**: gli oggetti del campo (bomba, crepe, schegge, ingranaggi) dall'alto, leggermente di lato quando sono oggetti. Le parti dell'interfaccia (cornice, tasti, elemento centrale) di fronte, piatte.
- **Forme**: angoli tagliati e linee dritte, come una macchina di precisione; tondi solo dove c'è un meccanismo (quadranti, ingranaggi, lenti).
- **Carattere**: da decidere con Federico. Proposta: Barlow Condensed per i numeri della vita (leggibilissimo, già usato) e un maiuscolo squadrato per i titoli; nella pagina di prova metto due proposte a confronto. Numeri, tasti + e − e contatori restano puliti.
- **Regole fisse**: sfondo trasparente vero (niente quadrettato finto, niente fondo nero o bianco pieno), soggetto intero con un po' di margine, niente testo, lettere, numeri sui quadranti, loghi o simboli, niente ombra sotto, niente stile di artisti o carte di Magic.

## Il colpo, come lo immagino
Deciso in `V2.md`: **una bomba**; arriva sul campo, esplode e lo schermo si frantuma (crepe e schegge che cadono), poi torna intero. È diversa dalla bomba del goblin in Forgia: **niente miccia**, è un congegno a orologeria con una chiavetta di carica e il nucleo di cristallo che si vede da un oblò.

1. **Mira**: trascinando dall'elemento centrale, la bomba compare sotto il dito e la chiavetta gira (si carica). Una **traiettoria a puntini** ad arco va dall'elemento centrale al dito; sopra il quadratino dell'avversario compare un **mirino meccanico** (anello con tacche che si stringe) e la traiettoria si aggancia.
2. **Lancio**: al rilascio la bomba vola lungo l'arco girando su se stessa, attraversa il quadratino ed esce dal bordo in alto. Un ticchettio e qualche vite che cade.
3. **Sul telefono colpito**: la bomba entra dal bordo in alto, sopra il quadratino di chi attacca, cade al centro del campo, **rimbalza una volta** con un colpo metallico e si ferma. Il nucleo lampeggia tre volte, sempre più veloce (tic, tic, tic), i gusci si aprono…
4. **Esplosione**: lampo bianco-ciano, onda d'urto ad anello, ingranaggi e viti che schizzano via. Nello stesso istante lo **schermo si frantuma**: le crepe del vetro si allargano dal punto dell'esplosione in un attimo, il campo trema.
5. **Il vetro cade**: dopo mezzo secondo le **schegge di vetro** si staccano dalle crepe e cadono girando, con riflessi; sotto, dove mancano, si vede il campo un po' più scuro.
6. **Si ricompone**: in un secondo crepe e buchi si richiudono con un lampo sottile (come un meccanismo che si rimette a posto) e lo schermo torna intero. In tutto circa due secondi e mezzo. Il numero della vita resta sempre leggibile (gli metto dietro un'ombra durante l'effetto).

Traiettoria, mirino, lampo, onda d'urto, tremolio, ticchettio della luce, rotazione e caduta li faccio io a codice; le immagini danno la materia: la bomba, le crepe, le schegge, gli ingranaggi.

Con «riduci animazioni» restano solo il lampo e il numero del danno.

**Colpo grosso** (5 punti persi di fila): **da decidere con Federico**. Proposta: il **pugno del colosso**, un enorme pugno meccanico di ottone e acciaio che cala dall'alto sul campo; lo schermo si frantuma tutto, più forte del colpo normale, e i pezzi cadono a cascata prima di ricomporsi. In alternativa: una **pioggia di tre bombe** piccole.

## Come lavorare
1. Sempre **nella stessa chat** di ChatGPT per tutto Mox, così tiene lo stile.
2. **Incolla prima il blocco base**, poi la richiesta del pezzo.
3. Prima di mandarmele, apri ogni immagine su uno sfondo **chiaro e uno scuro**: qui ci sono vetro e cristallo, quindi un fondo finto si nota su tutti e due. Se vedi i quadretti o un riquadro pieno, va rifatta. Il vetro deve essere trasparente dentro, non grigio pieno.
4. Mandamele qui in chat anche a gruppi: le controllo, le taglio, le comprimo e le metto nella pagina di prova.

## Blocco base (da mettere prima di ogni richiesta)
```
Game asset for a mobile fantasy companion app, theme "Mox" (colorless artifacts, ancient clockwork machines built around a colorless crystal core). Painterly-realistic fantasy style with rich mechanical detail; not cartoon, not a photo, not neon sci-fi. Materials: brushed steel, antique brass, copper, graphite, glass lenses, gears, rivets, a faceted colorless crystal core with a pale cyan glow. Palette: steel grey, brass, copper, graphite, pale cyan glow. Soft light from the top-left plus the cyan glow of the core. Fully transparent background (real PNG alpha, no checkerboard, no black or white background), the whole subject visible with a small empty margin, not cropped. No text, no letters, no numbers, no logos, no symbols, no cast shadow. Same style and lighting as the previous images.
```

## Le richieste, in ordine
### A. Il colpo (prima di tutto)
1. **Bomba a orologeria**, 1024×1024
```
A round clockwork bomb seen from slightly above: a shell of brass and brushed steel plates held by rivets, small exposed gears on one side, a round glass porthole on the front showing a faceted colorless crystal core glowing pale cyan inside, a small brass winding key on top. No fuse, no rope. 1024×1024.
```
2. **La stessa bomba che si apre** (un attimo prima di esplodere), 1024×1024
```
The same clockwork bomb as in the previous image, same size, same view and same lighting, now about to burst: the brass and steel plates split open along their seams like petals, springs and small gears popping out, the crystal core blazing bright white-cyan inside. 1024×1024.
```
3. **Crepe del vetro** (lo schermo si frantuma), 1536×1536
```
Seen from directly in front: a shattered glass crack pattern radiating from a small point in the center, like a phone screen hit hard: a dense web of thin bright crack lines near the center, long straight cracks reaching outward, a few concentric cracks, small chipped areas with bright edges. Only the crack lines are visible; everything else is fully transparent, the glass itself is invisible. 1536×1536.
```
4. **Seconde crepe, diverse**, 1536×1536 (ogni colpo ne pesca una, così non sembra mai lo stesso)
```
A second shattered glass crack pattern, different from the first: the impact point slightly off-center, fewer but longer cracks, two big curved concentric cracks, sharp chipped spots. Only the crack lines are visible; everything else is fully transparent. 1536×1536.
```
5. **Foglio di 8 schegge di vetro**, 1536×1024 (le taglio io)
```
A sheet of 8 separate sharp glass shards of different shapes and sizes (long splinters, triangles, irregular pieces), clear and see-through with bright white-cyan reflective edges, arranged on a 4×2 grid, evenly spaced and not touching. 1536×1024.
```
6. **Foglio di 6 pezzi meccanici**, 1536×1024 (volano via nell'esplosione)
```
A sheet of 6 separate small mechanical parts on a 3×2 grid, evenly spaced and not touching: 3 gears of different sizes (brass and steel), 1 coil spring, 1 screw, 1 bent brass plate with rivets. 1536×1024.
```
7. **Segno dell'esplosione** (facoltativo: resta un attimo sotto le crepe), 1024×1024
```
Seen from directly above: a scorched blast mark, a ring of soot and tiny melted brass splatters around a small bright pale-cyan spot in the center, everything else transparent. 1024×1024.
```

### B. Il colpo grosso (dopo la scelta di Federico)
8. **Pugno del colosso** (proposta), 1024×1024
```
A giant mechanical fist seen from directly above, punching downward toward the viewer: brass knuckles, brushed steel finger plates, rivets, exposed gears and pistons at the wrist, a faint pale cyan glow in the joints. 1024×1024.
```

### C. L'interfaccia (dopo, quando Federico dice di passarci)
9. **Cornice delle caselle**, 1024×1024
```
A rectangular frame border of brushed steel and antique brass with rivets, front view, flat; the four corners are cut at 45° and carry small gears, copper pipes and a tiny colorless crystal; the straight sides are simple and uniform so they can be stretched; frame thickness about 70 px; the center is completely empty and transparent. 1024×1024.
```
10. **Elemento centrale largo (H&O)**, 2048×768
```
UI element, front view, flat: a wide horizontal machine panel of brushed steel framed in antique brass, rectangular with cut corners, proportion about 8:3, small gears and a pressure gauge without numbers on the two short ends, rivets along the border. The center is a smooth dark glass recessed area, completely empty: the center must be dark, empty and unlit. Transparent background around it. 2048×768.
```
11. **Elemento centrale quadrato**, 1024×1024
```
UI element, front view, flat: a square machine panel of brushed steel framed in antique brass with cut corners, small gears on the four corners, rivets along the border. The center is a smooth dark glass recessed area, completely empty: the center must be dark, empty and unlit. Transparent background around it. 1024×1024.
```
12. **Tasto principale**, 1024×256
```
A horizontal button plate of brushed steel with an antique brass frame and a pale cyan glowing glass strip in the middle, rivets at the two ends, front view, flat; the middle is plain and uniform, empty for text, so it can be stretched. 1024×256.
```

### D. Pagina iniziale e inizio partita
13. **Sfondo**, tre immagini 1080×2400 (verticali)
- 13a, lontano (senza trasparenza):
```
Background, NOT transparent: a vast ancient clockwork workshop, giant gears and brass pipes fading into dim light, a few faint pale cyan crystal lights in the distance, soft light from the top-left, very dark at the bottom, no people. Portrait 1080×2400.
```
- 13b, medio:
```
Transparent background: silhouettes of big gears and pipes only along the left and right edges, the center completely empty. Portrait 1080×2400.
```
- 13c, vicino:
```
Transparent background: hanging chains and small gears in the two top corners, steam valves in the two bottom corners, the center completely empty. Portrait 1080×2400.
```
14. **Inizio partita**, 1024×1024
```
A brass clockwork core opening like a flower, its petals made of brass plates and gears, a faceted colorless crystal in the middle glowing pale cyan. 1024×1024.
```

## Dove finiscono
- Originali PNG in `grafica/mox/originali/`, versioni leggere WebP in `grafica/mox/`.
- Pagina di prova del colpo: `grafica/prove/prova-mox.html`, pubblicata a parte da provare sul telefono. Nell'app si monta solo dopo il sì di Federico.

## Stato
- 21 novembre 2026: scheda pronta. Si parte dal colpo (A, prima la bomba e le crepe); la pagina di prova si fa appena arrivano le prime immagini. Colpo grosso (B) da decidere; interfaccia e pagina iniziale (C, D) solo dopo le indicazioni di Federico.

## Pezzi senza tagli (22 novembre)
I tagli netti nascono quando un'immagine fatta per il mezzo finisce all'inizio o alla fine di un flusso. Con la punta del getto dell'Abisso si è visto: un pezzo pensato per la fine e il taglio sparisce. Quindi per ogni flusso servono **partenza**, **corpo** e **punta**, più qualche **tappo**: pezzi morbidi da mettere sopra gli attacchi.
Regole per tutti i pezzi qui sotto (si aggiungono al blocco base):
- il lato che si attacca a un altro pezzo **sfuma piano fino al trasparente**, senza bordo;
- un **corpo ripetibile** ha il bordo sinistro e il destro **uguali**, così lo ripeto senza giunta, e non ha teste né code;
- un **tappo** ha i bordi sfrangiati e morbidi tutto intorno, niente forme tagliate;
- i fogli con più pezzi: pezzi separati, ben distanziati, che non si toccano.

### Il cannone nuovo
Oggi il cannone è disegnato a codice e si vede. Lo voglio in **due pezzi**, visti **dall'alto**, così la canna la giro verso il bersaglio e la faccio rinculare da sola.
C1. **Base del cannone**, 1024×1024
```
Seen from directly above: the round base of a small antique clockwork cannon turret, a heavy ring of polished brass and brushed steel with rivets, small gears and dials around the edge, a glowing colorless crystal core with pale cyan light set in the center where the barrel pivots, circular. Everything else transparent. 1024×1024.
```
C2. **Canna del cannone** (il perno a sinistra, la bocca a destra), 1024×512
```
Seen from directly above: the barrel of an antique clockwork cannon pointing to the right, long and elegant, brushed steel with engraved brass rings, rivets and small pistons along its sides, a faint pale cyan glow inside the muzzle, the left end is a round brass pivot cap. Everything else transparent. 1024×512.
```
C3. **Vampata di sparo**, 1024×512
```
Seen from directly above: the muzzle blast of a magical cannon pointing to the right, a short burst of pale cyan energy and white light with a ring of grey steam and brass sparks, the left end clean and fading softly to transparent so it can sit on the barrel mouth. Everything else transparent. 1024×512.
```

### Tappi e pezzi morbidi
K1. **Foglio di 6 sbuffi di vapore** (escono dal cannone e coprono gli attacchi), 1536×1024
```
A sheet of 6 separate puffs of grey-white steam and graphite smoke of different shapes, soft wispy edges fading to transparent all around, a faint cyan tint inside, on a 3×2 grid, evenly spaced and not touching. Everything else transparent. 1536×1024.
```
K2. **Carica del nucleo** (il cannone che si carica prima di sparare), 1024×1024
```
Front view of a gathering sphere of colorless crystal energy: a bright pale cyan core, thin rings of light and tiny brass sparks drawn inward, the outer glow fading softly to transparent, circular. Everything else transparent. 1024×1024.
```
K3. **Foglio di 4 esplosioni** (per la bomba; oggi l'esplosione ha un bordo), 2048×1024
```
A sheet of 4 separate explosions seen from above, each a round billowing cloud of grey smoke lit pale cyan from inside, with brass fragments and sparks flying outward, soft edges fading to transparent, on a 2×2 grid, evenly spaced and not touching. Everything else transparent. 2048×1024.
```
- Quando arrivano li monto nella pagina di prova e segno qui cosa è arrivato.

## Colpo grosso nuovo: il laserone (24 novembre, idea di Federico, sostituisce il pugno)
Dal centro sbuca la torretta (C1 + C2). Poi **cambia testa**: la canna classica si apre e si trasforma nella canna potenziata (L1), con vapore e un lampo. Le particelle di energia vengono risucchiate nella bocca (la carica la faccio a codice, più K2). Poi spara un **laser blu grosso e fisso** dritto nel tappeto avversario e lo **trascina tracciando una riga**, come il fuoco del drago della Forgia: dietro resta un **solco bruciato** con il **metallo fuso** che cola e si raffredda piano (da bianco a arancio a rosso scuro).
Stessa vista della torretta: tutto **dall'alto**. Il laser è più blu e più forte del ciano del nucleo, ma sempre «magico», non fantascienza al neon.

L1. **Canna potenziata** (stessa misura, vista e perno di C2: la scambio al volo), 1024×512
```
Seen from directly above: the same antique clockwork cannon barrel transformed into a powered crystal laser emitter, pointing to the right: the barrel opened into rings of brass fins and focusing glass lenses, glowing blue energy coils wrapped around it, a large faceted colorless crystal set at the muzzle glowing intense blue, the left end is the same round brass pivot cap as before. Everything else transparent. 1024×512.
```
L2. **Bocca del laser** (la partenza), 1024×512
```
Seen from directly above: the muzzle flare where a powerful magical laser beam is born, pointing to the right: a blinding white-blue star of light with a ring of blue energy and small crackling arcs, the beam leaving it to the right, the right end clean and fading softly to transparent so it can join a beam. Everything else transparent. 1024×512.
```
L3. **Corpo del laser, ripetibile**, 2048×512
```
A thick straight horizontal magical laser beam seen from the side: a blinding white core, an intense blue body, thin blue energy filaments twisting along it, tiny sparkles. Seamless and tileable horizontally: the left and right edges match exactly, uniform along its whole length, no head, no tail. Everything else transparent. 2048×512.
```
L4. **Punto d'impatto del laser**, 1024×1024
```
Seen from directly above: the point where a powerful blue laser hits and melts a dark steel surface: a white-hot glowing spot, a small crater of molten orange metal splashing outward, blue energy flare and sparks around it, the edge fading softly to transparent, circular. Everything else transparent. 1024×1024.
```
L5. **Solco bruciato, ripetibile** (lo stendo lungo la riga tracciata), 2048×512
```
Seen from directly above: a straight horizontal burned cut groove sliced into a dark metal plate by a laser, running from left to right: a narrow channel glowing with molten metal, bright orange at the center fading to dark red and black scorched edges, small drips and bubbles of melted metal along it, a faint smoke haze. Seamless and tileable horizontally: the left and right edges match exactly, no ends. Everything around the groove transparent. 2048×512.
```
L6. **Foglio di 8 schizzi di metallo fuso**, 1536×1024
```
A sheet of 8 separate splashes and drops of molten metal seen from above, different shapes and sizes, glowing white-yellow at the center, orange and dark red at the edges, a few cooling to grey, on a 4×2 grid, evenly spaced and not touching. Everything else transparent. 1536×1024.
```
- Insieme servono anche C1, C2 (torretta), K1 (sbuffi di vapore) e K2 (carica del nucleo) delle richieste sopra.

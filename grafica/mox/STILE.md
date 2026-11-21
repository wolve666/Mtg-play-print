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

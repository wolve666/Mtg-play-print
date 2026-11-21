# Santuario: scheda di stile e richieste per le immagini

Il tema del Bianco. Le immagini le disegna ChatGPT, io le animo e le monto nell'app. Questa scheda serve a farle tutte coerenti.

## Lo stile
- **Mondo**: luce sacra, angeli e spiriti benevoli, un santuario di marmo sopra le nuvole all'alba. Sereno e luminoso, mai freddo né «da chiesa»: **niente simboli religiosi** (croci, aureole con raggi a croce, scritte).
- **Materiali**: marmo bianco venato, oro lucido, filigrana d'oro, piume bianche morbide, luce che brilla.
- **Colori**: avorio #F6F0E1, crema #EFE3C4, oro #D4A93E, oro chiaro #F3D98A, azzurro cielo #BFD8EE, ombra del marmo #B9B2A3. Per i fondi scuri (centro dell'elemento centrale, campo): ardesia #2B2F38.
- **Resa**: realistica dipinta, fantasy, ricca di dettagli. Niente cartone animato, niente foto.
- **Luce**: morbida, sempre da in alto a sinistra, con un leggero bagliore dorato.
- **Vista**: gli oggetti del campo (raggi, nuvole, piume, aureole, impatto, ali) dall'alto o leggermente di lato. Le parti dell'interfaccia (cornice, tasti, elemento centrale) di fronte, piatte.
- **Regole fisse**: sfondo trasparente vero (niente quadrettato finto, **niente fondo bianco**), soggetto intero con un po' di margine, niente testo, loghi o simboli, niente ombra sotto, niente stile di artisti o carte di Magic.
- **Carattere**: da decidere con Federico. Proposta: un maiuscolo inciso nel marmo per i titoli (per esempio Cinzel, licenza libera), Barlow Condensed per i numeri della vita, che devono restare leggibilissimi.

## Il colpo, come lo immagino
**Raggio di grazia**: un raggio di luce divina, dritto e pieno (scelta di Federico: niente spade né armi). Tre momenti:
1. **Mira**: dall'elemento centrale di chi attacca esce un raggio sottile e tremolante che va dritto verso il dito, come un filo di luce; sopra il quadratino dell'avversario si aggancia e si accende di più.
2. **Lancio**: al rilascio il raggio si allarga di colpo in un fascio pieno e dorato, attraversa il quadratino dell'avversario ed esce dal bordo in alto; qualche piuma si stacca e cade.
3. **Sul telefono colpito**: in cima al campo le nuvole si aprono e il raggio scende dall'alto fino al centro; dove tocca si accende una pozza di luce e un anello (aureola) si allarga; poi il **lampo bianco** copre tutto il campo e si dissolve lentamente; piume e piumini scendono ondeggiando. Il numero della vita resta sempre leggibile (gli metto dietro un'ombra durante il lampo).

Lampo, bagliori e tremolio li faccio io a codice; le immagini danno la materia della luce (il fascio con i suoi filamenti), le nuvole, l'impatto, l'aureola e le piume.

## Come lavorare
1. Sempre **nella stessa chat** di ChatGPT, così tiene lo stile.
2. **Incolla prima il blocco base**, poi la richiesta del pezzo.
3. Prima di mandarmele, apri ogni immagine su uno sfondo **scuro**: qui conta doppio, perché i soggetti sono bianchi e su fondo chiaro non si capisce se il trasparente è vero. Se vedi i quadretti o un riquadro bianco, va rifatta.
4. Mandamele qui in chat anche a gruppi: le controllo, le taglio, le comprimo e le metto nella pagina di prova.

## Blocco base (da mettere prima di ogni richiesta)
```
Game asset for a mobile fantasy companion app, theme "Santuario" (holy light, angels and benevolent spirits). Painterly-realistic fantasy style with rich detail; serene and luminous, not cartoon, not a photo. Materials: white marble, polished gold, soft white feathers, glowing light. Palette: ivory white, warm gold, pale sky blue, soft cream. Soft light from the top-left with a gentle golden glow. Fully transparent background (real PNG alpha, no checkerboard, no white background), the whole subject visible with a small empty margin, not cropped. No text, no logos, no symbols, no religious symbols, no cast shadow. Same style and lighting as the previous images.
```

## Le richieste, in ordine
### A. Il colpo (prima di tutto)
Due raggi diversi, così ogni colpo ne pesca uno e non sembra mai lo stesso. Il raggio lo stendo io dalla partenza al bersaglio: deve essere uniforme in lunghezza.

1. **Raggio di grazia** (il colpo), 2048×512
```
A straight horizontal beam of radiant holy light seen from the side, running from left to right: a bright white core, warm golden glow around it, fine luminous streaks running along the beam and tiny motes of light floating in it, uniform along its whole length, the two short ends fading softly to transparent. 2048×512.
```
2. **Secondo raggio, intrecciato**, 2048×512
```
A second beam, different from the first: a straight horizontal ray made of several thin strands of white-gold light gently twisting around a bright core, like braided light, a few tiny white feathers drifting along it, uniform along its whole length, the two short ends fading softly to transparent. 2048×512.
```
3. **Nuvole che si aprono** (in cima al campo colpito, da lì scende il raggio), 2048×768
```
A horizontal band of soft white and golden clouds seen from below, parting in the middle to open a bright gap where warm light pours through, the clouds thinning out toward the two short ends, everything else transparent. 2048×768.
```
4. **Impatto visto dall'alto** (il raggio tocca il campo), 1024×1024
```
Seen from directly above: a burst of white-gold light exploding outward in all directions from a small bright point in the center, soft rays of light of different lengths, small white feathers blown outward among the rays, everything else transparent. 1024×1024.
```
5. **Aureola** (anello di luce che si allarga), 1024×1024
```
A single thin golden halo ring of light seen from directly above, glowing softly, a fine filigree texture in the gold, everything else transparent. 1024×1024.
```
6. **Piume**, un foglio unico 1536×1024 (le taglio io)
```
A sheet of 6 separate single white feathers of different sizes and curves, soft and slightly glowing at the edges, a hint of gold on the quill, on a 3×2 grid, evenly spaced and not touching. 1536×1024.
```
7. **Piumini e scintille**, un foglio unico 1536×1024
```
A sheet of 8 separate small things on a 4×2 grid, evenly spaced and not touching: 4 tiny soft white down feathers, fluffy and curled, and 4 small sparkles of golden light of different shapes. 1536×1024.
```

### B. Il colpo grosso
8. **Ali** (5 punti persi di fila: le ali si aprono sul campo e lo coprono di luce), 2048×1024
```
A pair of large white angelic wings fully spread, seen from the front, symmetrical, long flight feathers with soft glowing edges and a hint of gold, no body, nothing between the wings. 2048×1024.
```

### C. L'interfaccia
9. **Cornice delle caselle**, 1024×1024
```
A rectangular frame border of white marble with polished gold filigree and small feathers on the four corners, front view, flat; straight sides simple and uniform; frame thickness about 70 px; center completely empty and transparent. 1024×1024.
```
10. **Elemento centrale largo (H&O)**, 2048×768
```
UI element, front view, flat: a wide horizontal plaque of white marble framed in polished gold, rectangular with rounded corners, proportion about 8:3, two small feathered wings on the two short ends. The center is a smooth dark slate-grey recessed area, completely empty and unlit: no glow, no symbol. Transparent background. 2048×768.
```
11. **Elemento centrale quadrato**, 1024×1024
```
UI element, front view, flat: a square plaque of white marble framed in polished gold with rounded corners, small feathers on the four corners. The center is a smooth dark slate-grey recessed area, completely empty and unlit: no glow, no symbol. Transparent background. 1024×1024.
```
12. **Tasto principale**, 1024×256
```
A horizontal button plate of white marble with a gold frame and a pale gold inlay in the middle, small feathers at the two ends, front view, flat; the middle is plain and uniform, empty for text. 1024×256.
```
13. **Sfondo della pagina iniziale**, tre immagini 1080×2400 (verticali)
- 13a, lontano (questa senza trasparenza):
```
Background, NOT transparent: a vast sanctuary of white marble above the clouds at dawn, tall columns, golden light from the top-left, soft and bright at the top but darker toward the bottom, no people. Portrait 1080×2400.
```
- 13b, medio:
```
Transparent background: white marble columns only along the left and right edges, the center completely empty. Portrait 1080×2400.
```
- 13c, vicino:
```
Transparent background: drifting feathers and soft light rays in the two top corners, soft clouds in the two bottom corners, the center completely empty. Portrait 1080×2400.
```

### D. I grandi momenti
14. **Colomba di luce** (inizio partita), 1024×1024
```
A glowing white dove with spread wings made of soft light, seen from the front, golden glow at the edges of the feathers. 1024×1024.
```

## Dove finiscono
- Originali PNG in `grafica/santuario/originali/`, versioni leggere WebP in `grafica/santuario/`.
- Pagina di prova del colpo: `grafica/prove/prova-santuario.html`, pubblicata a parte da provare sul telefono. Nell'app si monta solo dopo il sì di Federico.

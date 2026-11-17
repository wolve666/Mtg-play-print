# Magic Play&Print

Segnapunti per Magic: The Gathering da 2 a 6 giocatori, con stampa delle pedine ufficiali su stampantina termica portatile da 58 mm.
App Android realizzata da **E-Duck Garage**.

## Download

Scarica l'ultima `MagicPlayPrint.apk` da [Releases](https://github.com/wolve666/Mtg-play-print/releases/latest) e installala sul telefono. Android chiederà di consentire l'installazione da origini sconosciute.

## Cosa fa

**Tavolo di gioco**
- Formati Standard, Commander, Brawl e Oathbreaker, da 2 a 6 giocatori, con i punti vita iniziali già impostati.
- Pannelli orientati verso ogni giocatore, con colori o illustrazioni personalizzabili.
- Segnalini mostrati solo quando servono: veleno, energia, esperienza, radiazioni, tassa del comandante e un indicatore per ogni avversario che ha fatto danno da comandante, con una luce interna nel suo colore.
- Pannello personale: uno swipe in su sulla linguetta in fondo alla scheda la fa salire e scopre energia, esperienza, tassa, radiazioni, monarca, iniziativa, benedizione della città, nome, colore e sfondo del comandante.
- Trascinando il proprio nome sulla scheda di un avversario si assegnano danni da comandante, veleno o radiazioni.
- Dadi e moneta con lancio animato, più dadi insieme con la somma, «Chi inizia?», registro della partita e rilevamento del vincitore con rivincita.

**Pagina iniziale**
- Tasti «Stampa pedine» e «Dadi e moneta», usabili anche senza aprire una partita.
- Accanto a ogni formato, il cerchietto con la «i» mostra le regole principali.

**Pedine**
- Tieni premuto il simbolo centrale e chiedi a voce la pedina, ad esempio «drago 5/5 volare rapidità».
- L'app capisce tipo, forza/costituzione e abilità, mostra la pedina e dopo 3 secondi la stampa. Se tocchi la finestra entro quel tempo, la stampa si annulla.
- Le pedine sono solo quelle ufficiali Wizards, prese da [Scryfall](https://scryfall.com).
- C'è un archivio offline con l'ultima versione di ogni pedina, per giocare anche senza rete.

**Stampa**
- Stampanti termiche ESC/POS da 58 mm in Bluetooth classico. È stata provata sulla NetumScan NS1809DD.
- Il ricollegamento è automatico. Nelle impostazioni puoi regolare luminosità, modalità di stampa (fluida, bilanciata, prudente) e dimensione della pedina.

**Aggiornamenti**
- La versione è visibile accanto al nome. Toccandola, l'app verifica gli aggiornamenti.
- L'app controlla anche da sola. Quando trova una nuova versione mostra un avviso con i tasti «Aggiorna» e «Dopo».
- Se cambia solo la pagina dell'app, l'aggiornamento avviene dentro l'app (circa 450 kB). Se cambia la parte nativa, l'app scarica la nuova APK.

## Compilazione

L'APK viene compilata da GitHub Actions (`.github/workflows/build.yml`) a ogni push su `main`. Il workflow pubblica la release `v<versione>`, leggendo la versione da `var APPV` in `index.html`.

Segreti richiesti nel repository:
- `KEYSTORE_B64`: il keystore di firma codificato in base64.
- `KEYSTORE_PASS`: la password del keystore.

Struttura:
- `index.html`: tutta l'app (interfaccia e logica), basata su Capacitor.
- `native/`: la parte Java (Bluetooth classico, dettatura, esclusione dei gesti di sistema). Quando cambia, va alzato `APPN` in `index.html`.
- `icon-512.png`: l'icona dell'app.

## Registro delle modifiche

### v0.15.6
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Pannello personale: risolto il glitch alla prima apertura, con i contatori sovrapposti. Il font delle icone si caricava solo in quel momento e il pannello veniva misurato prima che arrivasse. Ora il font si carica all'avvio e i pannelli aperti vengono rimisurati quando arriva.

### v0.15.5
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Pagina iniziale: il passaggio tra le schede ora si vede scorrere. Nella 0.15.4 la scheda faceva quasi metà corsa nel primo decimo di secondo e sembrava comparire di colpo. Ora parte dolce, accelera e frena in mezzo secondo, con passi regolari a ogni fotogramma.
- Le schede non visibili restano pronte invece di spegnersi, così all'inizio del passaggio il telefono non deve ridisegnarle.

### v0.15.4
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Pagina iniziale più fluida: il passaggio tra «A cosa vuoi giocare?», «In quanti siete» e «Chi gioca?» ora lo fa la scheda grafica, invece dello scorrimento automatico del browser che nell'app dava un micro-scatto. Stesso movimento verso l'alto. A passaggio finito le schede non visibili si spengono, così le loro sfocature non pesano mentre lo sfondo si muove.
- Zoom degli sfondi ripristinato: riparte insieme alla dissolvenza ogni volta che compare un'immagine, già in movimento dal primo istante, e lo sfondo visibile ha un livello proprio sulla scheda grafica.

### v0.15.3
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Pagina iniziale: l'alone della pedina rapida torna a girare anche a finestra chiusa, come nella 0.14.3. Fermarlo (0.14.5) è l'unica differenza rimasta rispetto a quando lo zoom dello sfondo e la fluidità della pagina iniziale erano a posto.

### v0.15.2
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Tornato lo zoom lento degli sfondi nella pagina iniziale e nelle finestre «Vuoi continuare?» e «Vittoria». La regola aggiunta nella 0.14.5 per fermarlo quando è coperto da un pannello lo bloccava anche quando si vedeva: tolta.

### v0.15.1
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK (se hai già la 0.15.0).
- Font Big Shoulders Display e Barlow incorporati nell'app: stesso aspetto, ma funzionano anche al primo avvio senza rete e non c'è più il cambio di carattere all'apertura. Il file dell'app cresce di circa 155 kB.
- Tolto il codice di «Annulla», che non era collegato a nessun tasto: ogni tocco è più leggero.

### v0.15.0
Cambia la parte nativa: serve la nuova APK.
- La stampante spenta o fuori portata viene riconosciuta subito: l'alone blu si spegne e il ricollegamento automatico riparte da solo. Prima l'app la credeva collegata fino alla stampa successiva, che restava in attesa a lungo.
- Alla chiusura dell'app la porta Bluetooth e la ricerca vengono liberate.
- Compilazione con versioni fissate delle librerie (`package-lock.json`): ogni APK nasce dalle stesse versioni di Capacitor.

### v0.14.5
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK. Stesso aspetto, meno lavoro per il telefono.
- Fermate le animazioni che giravano senza essere viste: l'alone e le scintille della pedina rapida a finestra chiusa, i puntini della stampante quando è scollegata, l'alone del tasto versione nei pannelli chiusi.
- Particelle legate al tempo e non ai fotogrammi: stessa durata e velocità sugli schermi a 60, 90 e 120 Hz. Prima sugli schermi veloci duravano la metà.
- Tela delle particelle più leggera: non viene più ricreata a ogni effetto.
- Ombre dei dadi disegnate con un gradiente al posto della sfocatura: stesso aspetto, lancio più fluido.
- Tavolo: quando cambia solo la vita, i segnalini non vengono ridisegnati né rimisurati.

### v0.14.4
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK. Nessun cambiamento visibile: è un aggiornamento di stabilità.
- La partita viene salvata subito quando l'app va in secondo piano o viene chiusa: prima l'ultimo tocco poteva andare perso.
- Una partita salvata incompleta o di una versione vecchia viene riparata all'avvio invece di bloccare l'app.
- Un aggiornamento scaricato non viene più scartato per errore se chiudi l'app nei primi secondi. Se lo scaricamento arriva a metà, l'app riprova al controllo successivo invece di proporre l'APK.
- Una stampa alla volta: due pedine chieste di fila non mescolano più i dati sulla carta.
- Archivio offline: durante lo scaricamento la memoria viene liberata immagine per immagine, e se lo spazio finisce lo scaricamento si ferma con un avviso invece di restare «in corso».
- Tutte le richieste di rete hanno un tempo massimo: una connessione che non risponde non lascia l'app in attesa.
- Quando arrivano i font, spie e linguette vengono rimisurate.
- Il tasto indietro sul tavolo chiude prima la finestrella dei danni o il pannello personale aperto.
- Gli errori imprevisti vengono annotati (gli ultimi 20) e finiscono nei dati da esportare. Se la memoria è piena compare un avviso.
- «Chi inizia?» non va più in errore se tutti i giocatori sono eliminati.

### v0.14.3
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Dadi 3D veri, disegnati da un piccolo motore interno (nessuna libreria, funziona senza rete): d4, d6 con i pallini, d8, d10, d12 e d20, visti dall'alto. Rotolano, rimbalzano con l'ombra e si fermano con il risultato sulla faccia in alto. Fino a 6 dadi con la somma, cinque colori (la scelta viene ricordata).
- Moneta 3D con le facce disegnate da Federico (drago su Testa, runa su Croce): bordo zigrinato, riflessi sul metallo e oscillazione finale prima di posarsi. Si lancia sempre una moneta sola.
- «Chi inizia?» mostra i nomi che scorrono sopra il tavolo.

### v0.14.2
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Risolto il rallentamento della pagina iniziale. Gli indicatori del comandante animavano la luce anche quando erano nascosti: il telefono ricalcolava la grafica 60 volte al secondo, anche sotto le finestre aperte. Ora la luce anima solo l'opacità (lavoro della scheda grafica) e solo sugli indicatori visibili, e con una finestra aperta le animazioni del tavolo si fermano.
- Tornata la trasparenza sfocata sui tasti «Stampa pedine» e «Dadi e moneta».

### v0.14.1
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Linguetta dello swipe come nell'anteprima: angoli superiori più tondi, freccina che si muove, larga quanto il numero della vita.
- Il numero della vita non si rimpicciolisce più quando compaiono gli indicatori del comandante.
- Pagina iniziale più leggera: le finestre chiuse non vengono più disegnate e i tasti «Stampa pedine» e «Dadi e moneta» non usano la sfocatura.

### v0.14.0
Revisione dell'interfaccia. Cambia anche la parte nativa (APPN 3): l'aggiornamento scarica l'APK.
- Tavolo: un indicatore del danno da comandante per ogni avversario, con luce interna che respira nel suo colore. Quando la riga in alto è accesa, il numero della vita si riduce all'84% per non toccare le icone.
- Tavolo: spie in basso (monarca, benedizione, iniziativa, turno) spente per ora. Restano nel codice.
- Tavolo: la finestra dei danni da comandante compare senza ruotare.
- Pannello personale a scheda, aperto con lo swipe sulla linguetta. La zona della linguetta è esclusa dai gesti di Android.
- Trascinando il nome si sceglie tra danni da comandante, veleno e radiazioni.
- Scheda completa del giocatore: la freccia indietro non finisce più sotto i tasti del telefono.
- Pagina iniziale: tasti «Stampa pedine» e «Dadi e moneta», regole dei formati con il tasto «i».
- Dadi e moneta rifatti: disegni grandi, lancio animato, risultato illuminato, più dadi con la somma, ultimi 6 lanci e «Chi inizia?».
- Guida aggiornata con i passi nuovi. Chi l'aveva già vista la rivede una volta.

## Privacy

Il microfono si attiva solo mentre tieni premuto il pulsante. Dal menu puoi scegliere se salvare le clip audio delle richieste di pedina, per migliorare il riconoscimento. Le clip restano sul telefono finché non le esporti tu.

## Note legali

Magic: The Gathering e le immagini delle pedine sono proprietà di Wizards of the Coast. Quest'app è un progetto amatoriale non ufficiale, non approvato né sponsorizzato da Wizards of the Coast. Dati e immagini sono forniti da Scryfall.

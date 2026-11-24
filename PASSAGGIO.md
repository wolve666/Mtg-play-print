# Passaggio a una nuova chat

Documento per riprendere il lavoro in una sessione nuova senza rileggere la chat precedente.
Aggiornato al 24 novembre 2026 (per la ripartenza vedi in fondo «Ripartenza 24 novembre: si fa la Selva»). Leggere anche `V2.md` (decisioni e storia della V2) e `README.md` (registro delle modifiche e compilazione).

## Chi e come
- Progetto di **Federico** (E-Duck Garage): **Magic Play&Print**, segnapunti per Magic: The Gathering con stampa delle pedine su stampantina termica Bluetooth da 58 mm. App Android (Capacitor 8).
- **Si scrive sempre in italiano**, semplice e diretto, senza gergo tecnico inutile.
- Quando Federico dice «prendi nota e non andare avanti»: si annota in `V2.md` e non si esegue finché non dice di farlo.
- Prima di pubblicare qualcosa che vedono altri (push su `main`, release nella vetrina) si chiede conferma.
- Le APK Federico fatica a trovarle su GitHub: scaricarle dagli allegati della compilazione e **mandargliele come file in chat**.
- Niente nomi di modelli nei commit. Nessuna pull request se non la chiede.

## Repository e rami
- Codice: `wolve666/Mtg-play-print` (da rendere privato: lo fa Federico).
- Vetrina pubblica con sole APK: `wolve666/MagicPlayPrint-app` (release, `index.html` per gli aggiornamenti dentro l'app, README pubblico).
- **`v2-prerelease`**: ramo di lavoro attuale (temi nuovi, interfacce, animazioni, ottimizzazioni). Le APK da qui escono solo come allegato, per Federico.
- `ccr-cf6217e4-l2vj20`: ramo della **V2 beta, ferma alla 2.1.3** (pubblicata nella vetrina come `v2.1.3-beta`, scade intorno al 20 dicembre 2026). Solo correzioni urgenti, da riportare anche sulla prerelease.
- `main`: versione definitiva per tutti (ancora la 0.19.x). Un push su `main` pubblica una release definitiva: mai senza conferma.

## Com'è fatta l'app
- Tutto sta in `index.html` (interfaccia e logica, circa 4600 righe). La parte nativa Java in `native/`: Bluetooth classico, dettatura, gesti, Nearby Connections (`NearbyPlugin.java`). Se cambia `native/` va alzato `APPN` in `index.html`.
- Versione: `var APPV = '2.1.3', APPN = 7;` in `index.html`.
- Due modalità:
  - **gioco su un telefono** (la v0.19): considerata perfetta da Federico, **non si tocca** se non per bug veri;
  - **H&O** (host e ospiti, partita su più telefoni): tutto il lavoro grafico nuovo vale solo qui. La funzione `NV()` dice se si è nella vista su più telefoni; `NET.role` è `host`, `client` o `null`.
- Temi: **Classico** e **Forgia** (classe `th-forgia` sul body). Ogni cosa nuova va fatta e provata nei due temi. I colori nuovi (Verde, Blu, Nero, Bianco, Incolore) sono da fare nella prerelease.
- Android minimo: **12** (minSdkVersion 31, impostato nella compilazione).

## Compilazione e uscite (GitHub Actions, «Compila APK»)
- Avvio a mano da terminale:
  `gh api -X POST repos/wolve666/Mtg-play-print/actions/workflows/build.yml/dispatches -f ref=<ramo> -f 'inputs[uscita]=solo-allegato'`
- Uscite: `solo-allegato` (APK tra gli allegati, nessun link pubblico), `beta` e `prova-generale` (pre-release nella vetrina con scadenza, campo `giorni`, 30 di base), push su `main` = definitiva.
- Scaricare l'allegato: `gh api repos/wolve666/Mtg-play-print/actions/runs/<id>/artifacts`, poi `gh api repos/wolve666/Mtg-play-print/actions/artifacts/<id>/zip > a.zip`. Le APK si tengono in `apk-prova/` (ignorata da git) e si mandano a Federico in chat.
- Segreti già impostati: `VETRINA_TOKEN`, `KEYSTORE_B64`, `KEYSTORE_PASS`. Il token non va mai chiesto né scritto in chat.

## Prove automatiche (cartella `prove/`)
Girano con Playwright (già installato nell'ambiente cloud). Le foto finiscono in `prove/out/` (ignorata da git). `?nettest` nella pagina sostituisce Nearby con un canale tra schede, così più schede fanno da più telefoni.
- `node prove/nettest.js`: partita su 3 telefoni (posti, vita contemporanea, danni da comandante, menu ospite, stampa tramite il principale, Combattimento, rientro, uscita, domanda all'avvio). Deve dire «Tutti i controlli passati».
- `node prove/bye.js`: tasto indietro, principale che chiude, «Continua qui, offline».
- `node prove/drag.js`: trascinamento dei danni anche dopo un attimo di dito fermo; Standard H&O parte su Combattimento.
- `node prove/field.js`: foto H&O nei due temi e **confronto al pixel del gioco su un telefono con la beta**. Deve dire OK; piccole differenze sotto soglia sono le animazioni.
- `node prove/screens.js`: prova sugli schermi (7 misure, due temi). Problemi in `prove/out/screens/problemi.txt`. `SIZES=412x915 THEMES=classico` per una misura sola.
- `node prove/solo.js`, `node prove/exp.js`: gioco su un telefono e scadenza delle uscite di prova.

## Stato al passaggio
Fatto nella V2 (vedi `README.md`, voci da 2.0.0 a 2.1.3, e `V2.md`):
- telefoni collegati (Nearby), posti assegnati dal principale, rientro automatico, domanda all'avvio «Rientra / Esci e torna al menu»;
- menu degli ospiti ridotto; stampa delle pedine degli ospiti tramite il principale;
- campo H&O nuovo (quadratini con pallino, riga del collegamento, elemento centrale fisso sopra la vita, indicatori in fila), pannello personale stretto;
- pagina dei danni (tocco sul quadratino di un avversario o tasto Combattimento nella scheda): combattimento, comandante, veleno, radiazioni, recupero, tutto in un colpo;
- tasto indietro: si esce dall'app solo dalla pagina di scelta del gioco;
- «Collegamento perso» e «Partita chiusa» per gli ospiti;
- prova sugli schermi con correzioni (ultimo commit della prerelease).

Da fare / aperto:
- **Interfacce della prerelease**: prossimo lavoro. Federico decide da dove partire.
- Temi a colori nuovi; animazioni e interazione (il colpo che passa da un telefono all'altro, già previsto un solo messaggio per colpo).
- Idea da valutare: il pannello personale H&O più ampio al posto della scheda completa.
- Gioco su un telefono, trovato nella prova sugli schermi ma non toccato (decide Federico): con 6 giocatori il pannello personale ha tasti piccoli sugli schermi fino a 393; interruttori del menu e pallini dei dadi sotto i 32 px.
- Prova al tavolo con più di 2 telefoni (fatta solo con principale + un ospite).
- Federico deve rendere privato il repository del codice.

## Aggiornamento 21 novembre 2026 (sera): temi con immagini vere
- **Forgia**: il danno è un fulmine (cuore blu, aloni bianchi) che esplode sul telefono di chi è colpito (messaggio `zap`); prove `prove/fulmine.js`, `prove/fulmine-host.js`. Approvato da Federico.
- **Selva** (Verde): nel ramo c'è un'anteprima (commit «Selva, il tema del Verde») che Federico ha giudicato non convincente (carattere Fraunces bocciato, radici disegnate a codice poco materiche). Decisioni nuove in `V2.md` («Selva, seconda strada»): Barlow Condensed, pagina iniziale con lucciole e foglie, elemento centrale rettangolare («Lastra del druido»), colpo = lancio della liana (trascinamento, frusta, liane che avvolgono il campo colpito, radici dal centro).
- **Nuovo metodo**: le parti materiche le disegna ChatGPT come PNG trasparenti, io le animo. Richieste per **tutti i temi** in `grafica/PROMPT-TEMI.md`; Selva in dettaglio in `grafica/selva/STILE.md`; immagini arrivate in `grafica/selva/` (tre radici spinose, originali e WebP).
- Prove grafiche come pagine pubblicate (artifact) fuori dal repository: «Anteprima Selva» e «Prova radici Selva» (lancio della liana). I sorgenti sono in `grafica/prove/` (pagine complete, immagini incluse).
- **In pausa** (chiesto da Federico): compilazione e lavoro nell'app. Si riprende quando arrivano le immagini.
- **Santuario** (Bianco), 21 novembre sera: nome confermato; scheda di stile e richieste in `grafica/santuario/STILE.md`. Si parte dal colpo: **raggio di grazia** (niente spade, deciso da Federico), nuvole che si aprono sul campo colpito, aureola, lampo bianco, piume; pagina di prova `grafica/prove/prova-santuario.html` appena arrivano le immagini.
- **Mox** (Incolore, prima «Officina»), 21 novembre sera: nome deciso; scheda di stile e richieste in `grafica/mox/STILE.md`. Si parte dal colpo: **bomba a orologeria** che cade, esplode e frantuma lo schermo, poi si ricompone; pagina di prova `grafica/prove/prova-mox.html` appena arrivano le immagini.

## Aggiornamento 21 novembre 2026 (notte): immagini arrivate, prova dei colpi
- Federico ha caricato le immagini di **tutti i temi** in `grafica/<tema>/` sul ramo `v2-prerelease`. Controllate tutte (trasparenza vera, misure): quasi tutte buone.
- Sistemate da me: `abisso/Griglia di gocce…` (fondo grigio finto tolto), `mox/Sfera steampunk esplosiva…` (fondo nero tolto).
- Da rifare o da non usare: `selva/Zampa Mostruosa con Artigli Curvi.png` (fondo nero pieno; c'è l'altra zampa, buona), `abisso/Tentacolo di polpo gigante bagnato.png` (alone scuro intorno; l'altro tentacolo è pulito).
- Nuova pagina **`grafica/prove/prova-colpi.html`**: due telefoni finti, si sceglie il tema (Santuario, Mox, Abisso, Cripta, Forgia) e si prova il colpo con le immagini vere: mira trascinando, lancio, arrivo sul telefono colpito. Forgia con il goblin bombarolo («Sorpresa: il goblin»). Pubblicata anche come pagina (artifact) per Federico.
- Come si rifà: `prova-colpi.src.html` è il sorgente senza immagini; `strumenti/prepara-immagini.py` ritaglia, separa i fogli e comprime in WebP; `strumenti/costruisci-prova-colpi.py` mette le immagini dentro la pagina (servono Pillow, numpy, scipy; si lanciano dalla cartella del repository).
- Non ancora nella prova: colpi grossi (ali, pugno del colosso, tentacolo, mano scheletrica, fuoco del drago), interfacce, pagine iniziali. Selva ha già la sua prova (`prova-radici.html`).
- Sul ramo `main` è finito per sbaglio un caricamento di 7 immagini di Abisso nella cartella principale (commit «Add files via upload» del 21 novembre): sono doppioni di `grafica/abisso/`. Non toccato: un push su `main` pubblica una release, si decide con Federico.
- Seconda versione della prova (dopo il parere di Federico: «effetti appiccicati», Abisso il più brutto, Selva mancante): molle elastiche (campo che si schiaccia e rimbalza, vita che sobbalza, schermo spinto nella direzione del colpo, elemento centrale che rimbalza), punta che insegue il dito con ritardo, oggetti con altezza e ombra che rimbalzano, particelle a codice (scintille, gocce, cerchi d'onda, fumo, briciole, gocce sul vetro), immagini piegate lungo le curve, crepe e venature che si aprono dal centro. Abisso rifatto; Selva aggiunta con le immagini nuove (`strumenti/prepara-selva.py`). `window.FREEZE = true` ferma l'immagine per le foto di prova.
- Terza versione (Federico: «deve essere vivo, un tutt'uno con il campo, come il fulmine della vecchia Forgia»): il campo H&O della prova è disegnato in WebGL (`makeField`/`renderF` nella pagina). Gli effetti accendono luci sul campo (anche luce negativa = buio, per la Cripta), onde d'urto che lo piegano, increspatura dell'acqua, tremolio del calore, il campo che si rompe in pezzi (Mox), la stretta a clessidra (Selva), avvizzimento, colori sdoppiati all'impatto. Le macchie a terra stanno su un livello che entra nel campo e si deforma con lui. La luce arriva anche sul numero della vita e sull'elemento centrale. Senza WebGL il campo resta fermo come prima.
- Santuario: colpo grosso «la spada» (immagine «Spada Celestiale Alata di Luce», `strumenti/prepara-spada.py`): buio, luce che si raccoglie, la spada cala, trafigge, vibra, fenditure di luce, si scioglie in luce e piume.
- Selva: il colpo diventa il boa (deciso da Federico): la liana si avvolge in spirale intorno a tutto il campo (davanti si vede, dietro sparisce), stritola una volta, molla e scivola via.
- Pulizia di `main` (7 immagini di Abisso doppie nella cartella principale): Federico è d'accordo a toglierle. Attenzione: la compilazione copia nell'APK tutti i PNG della cartella principale, quindi il caricamento ha rifatto la release v0.19.1 a 20 MB invece di 8. Il commit che le toglie (albero identico alla v0.19.1 originale) è pronto ma non spinto: la spinta su `main` rifà la release, serve il via esplicito di Federico.
- 22 novembre: **tappeto** = l'area dei punti vita (Federico). Nei testi per Federico si dice tappeto; nel codice resta «field».
- Mox, colpo grosso scelto: **il pugno del colosso** che cala sul tappeto (non sullo schermo: la frattura del vetro resta la firma del colpo normale), sfonda il tappeto e si spacca in frammenti ritagliati dalla sua immagine, con ingranaggi e viti. Il tasto «Colpo grosso» ora compare per ogni tema che ne ha uno (`bigName`/`big()`).
- Corretto nel motore: gli effetti creati mentre un livello si disegna (es. l'esplosione nata dalla bomba) andavano persi; ora `runFX` li tiene.
- Mox, pugno del colosso: accettato da Federico così com'è («si vedrà poco»), ma non lo entusiasma. Se c'è tempo più avanti: idee da proporre in `V2.md`/qui prima di rifarlo.
- Abisso rifatto (Federico: «pare un pisello moscio»): il **gorgo e il getto**. Sul bottone si forma un gorgo (a codice) e il tappeto si avvita davvero (nuova torsione `uSw` nel motore del tappeto); al rilascio parte un getto d'acqua a spirale con spruzzi; da Federico il getto trivella il tappeto, splash, e resta un gorgo che avvita il tappeto e poi si srotola. Le quattro immagini delle onde non si usano più.
- Cripta rifatta sullo schema dell'Abisso (chiesto da Federico): **la voragine e il fiume di anime**. Sul bottone si apre una voragine di fumo (i sei vortici dipinti che girano in anello, buco nero al centro), il tappeto si avvita al contrario e si spegne, le anime vengono risucchiate; al rilascio esce un fiume di fumo con le anime che lo cavalcano e il dardo in testa; da Federico il fiume si pianta, voragine che avvita il tappeto, buio, venature che pulsano, teschio che sale dal buco, anime a spirale, avvizzimento. Il corpo del getto ora è comune ad Abisso e Cripta (`jetBody`). Richieste facoltative V1-V3 in `grafica/cripta/STILE.md`. Tolte dalla prova le quattro onde dell'Abisso non più usate (pagina da 6 a 5,6 MB).
- Cripta, seconda idea di Federico (sostituisce la voragine): **la mano che prosciuga**. Scia leggera di fumo; la nebbia si apre sul tappeto di chi attacca ed esce la mano scheletrica; il tappeto colpito avvizzisce e manda le sue anime in un raggio verso chi attacca; il raggio scende sulla mano, che si accende di viola e si chiude. Colpo grosso: il teschio che esce dal tappeto colpito, da invisibile sempre più grande, e lo prosciuga (disegnato sotto il numero della vita). Nell'app il ritorno lo fa partire da solo chi attacca, senza un secondo messaggio. Scheda aggiornata in `grafica/cripta/STILE.md`.
- Cripta, correzioni di Federico: mano che nasce dal bottone; selezione con filo di particelle, bollicine nere e nuvole che si diramano (niente liana); sul tappeto colpito non cade nulla, solo avvizzimento, gruppetto di anime risucchiato e raggio verso la mano, nessuna onda; colpo grosso con pentacolo rovesciato e glifi, nebbia nera, teschio, tutto a ritroso. Federico vedeva «artefatti» sulla mano nel suo telefono: tolti la seconda copia luminosa e lo schiacciamento della mano, i sospetti più probabili; da verificare con lui.
- Cripta, ritocchi: raggio d'arrivo nel palmo (disegnato dietro le dita, nubi sul palmo che coprono il taglio dell'immagine), partenza del raggio dal bottone dell'avversario con nubi intense e particelle; colpo grosso con pentacolo più spesso centrato sul bottone, teschio più piccolo avvolto dalla nebbia nera (molta sulle fiamme, poca sul volto), occhi che si accendono di viola al colpo.
- Cripta, colpo grosso: il pentacolo compare anche sul bottone di chi attacca quando appare il teschio, fa un lampo al colpo e svanisce (stesso disegno, funzione `pentacle`).
- Cripta, colpo grosso: i due pentacoli (avversario e chi attacca) si disegnano insieme fin dall'inizio, come un rito; al colpo il mio brilla, poi resta l'impronta bruciata con due fili di fumo dalle punte della stella, che svanisce.
- Forgia: colpo grosso «il fuoco del drago» nella prova (ombra su entrambi i tappeti, getto di fuoco in diagonale sotto il numero, lava che si raffredda); immagini del cratere preparate con `strumenti/prepara-forgia.py`. Il fulmine (colpo normale) non toccato: approvato in passato, da sentire Federico.
- Forgia: fulmine d'arrivo più grosso e frastagliato (`bolt` con scala e frastagliatura); goblin nuovo che sbuca da un angolo in basso e lancia la bomba piegando solo le braccia (immagine piegata a strisce, senza tagli).
- Forgia, goblin rifatto: compare con la bomba e sparisce; la bomba cade dall'alto in prospettiva (enorme → piccola), 3-4 rimbalzi, si ferma ed esplode quando capita.
- **Prossimo lavoro (deciso da Federico): Selva.** Cripta e Forgia concluse nella prova dei colpi (link della pagina pubblicata: https://claude.ai/artifact/WwnnurLvTgtmTV4Mw5DQf4). Attenzione: i colpi nuovi vivono solo nella pagina di prova, non ancora nell'app; un'APK compilata oggi non li contiene.
- 22 novembre: in ogni `grafica/<tema>/STILE.md` c'è la sezione «Pezzi senza tagli» (partenza, corpo ripetibile, punta, tappi, carica, esplosioni) e per Mox il cannone nuovo in due pezzi (C1–C3).

## Ripartenza 24 novembre: si fa la Selva
**Prossimo lavoro, deciso da Federico: la Selva** (colpo, colpo grosso, pezzi nuovi). Gli altri cinque temi nella prova dei colpi Federico li ha approvati («stratosferico»): non si toccano se non li chiede lui.

Dove sta tutto:
- Ramo di lavoro della prova dei colpi: **`claude/optimistic-bohr-l0asp9`** (codice e testi). Le immagini originali stanno **solo** su `v2-prerelease` in `grafica/<tema>/`: non si fanno commit di PNG sul ramo di lavoro (un tentativo è stato fermato). Per usarle: `git fetch origin v2-prerelease && git checkout origin/v2-prerelease -- grafica/<tema>` e poi si tolgono (o si spostano fuori dal repository) prima del commit.
- Pagina pubblicata per Federico (sempre la stessa, si aggiorna): https://claude.ai/artifact/WwnnurLvTgtmTV4Mw5DQf4 (arrivata alla versione 35). Si ripubblica con lo stesso link (`url`), dopo averla letta.
- Sorgente: `grafica/prove/prova-colpi.src.html` (senza immagini). Pagina costruita: `grafica/prove/prova-colpi.html` (circa 8,7 MB, immagini dentro).
- C'era anche un'altra sessione sul ramo `claude/nifty-feynman-1jc911` (Cripta, Forgia), ferma dal 22 novembre: prima di pubblicare controllare se ha cose nuove.

Come si ricostruisce la pagina in una chat nuova (la cartella temporanea non c'è più), dalla cartella del repository:
1. `python3 grafica/prove/strumenti/estrai-immagini.py`: rifà `/tmp/prova-colpi/as` dalle immagini già dentro la pagina (provato: la pagina ricostruita è identica al byte).
2. Solo se servono i pezzi preparati ma non ancora usati (vedi sotto): prendere i PNG da `v2-prerelease` e lanciare `python3 grafica/prove/strumenti/prepara-immagini-24nov.py` (qualche minuto).
3. Dopo ogni modifica al sorgente: `python3 grafica/prove/strumenti/costruisci-prova-colpi.py`. Mette nella pagina solo le immagini scritte per esteso nel sorgente come `I('tema', 'nome'` o `L('tema', 'nome'` (attenzione: con un nome costruito al volo l'immagine non entra).
4. Controllo degli errori di sintassi: estrarre lo script e `node --check`. Foto di prova: `grafica/prove/strumenti/foto-prova.js` e `foglio-foto.py` (istruzioni in cima al file). `window.FREEZE = true` ferma il disegno; `window.TENT = ['L', true]` forza il tentacolo dell'Abisso.

Cosa c'è di nuovo nella prova (22-24 novembre):
- **Avversari in posizione come nell'app**: in alto i quadratini degli altri giocatori in ordine di posto senza sé stessi (`renderBars`, `SEATS`, comandi «Giocatori» e «Cambia posti»). Il bersaglio sul telefono di Bea è il quadratino di Federico (`.tile.t`), su quello di Federico il colpo arriva dal quadratino di Bea (`srcX()`). Colpi normali e grossi arrivano dal lato giusto; gli schizzi dei colpi grossi tornano sul tappeto di chi attacca uscendo dal quadratino colpito (`fromTile`). **Anche la Selva deve seguire queste regole.**
- Abisso: tentacolo (uno a caso tra blu e rosso) che entra da un bordo a caso e dà una sferzata; partenza del getto dipinta; esplosioni e tappi di schiuma.
- Santuario: nuvola d'arrivo unica; spada che affonda di più con un solo movimento, preceduta da una luce dalle nubi, cade e resta inclinata dal lato di chi attacca; mirino piccolo che si allarga in dissolvenza; piume e lucette sul tappeto di chi attacca.
- Mox: torretta nuova (base e canna dipinte), colpo grosso **laserone** (la torretta sbuca, cambia testa, si carica, spara; il raggio traccia una riga e lascia un solco rovente con metallo fuso). Il pugno non c'è più.
- Forgia: fulmini doppi in selezione e tripli all'arrivo; goblin da ogni lato (anche dall'alto); bomba che si crepa e si spacca in dissolvenza; frammenti; risate «HA! HA! HA!» da fumetto (niente Joker, solo le scritte).
- Cripta: il raggio di anime è inclinato verso chi attacca.

Selva oggi nella prova: colpo «il boa» (la liana avvolge il tappeto, stritola, molla), selezione e lancio della liana; **nessun colpo grosso** (il tasto non compare). Immagini già usate: `liana`, `vine`, `clod`, `leaf` (e preparate `root`, `hole`, `claw` = zampa). Pezzi nuovi del 24 novembre preparati ma **non ancora montati**: `jstart` (vite e terra che esplode, partenza), `jbody` (bordo di liane, corpo ripetibile), `jtip` (ramo di vite, punta), `caps` (6 nuvole di polvere e detriti), `bush` (6 composizioni di fogliame). Idee nelle schede: zampa della bestia e squarci degli artigli (`grafica/selva/STILE.md`, punti 13 e 14). Il colpo grosso della Selva lo decide Federico.

Regola di Federico: quando ci sono due versioni della stessa immagine (es. «-1» e «-2») si usano tutte e due a caso, una per colpo. Già così: impatti della Forgia, venature della Cripta, crepe di Mox, tentacoli dell'Abisso, sfere di carica di Mox. Da fare così anche le due sfere di carica di Santuario quando si montano.

Ancora da montare negli altri temi (pezzi preparati): cariche di tutti i temi; partenza, corpo e punta dei flussi di Cripta, Santuario e Forgia; tappi di Santuario e Cripta. Federico ha detto di partire dalla Selva.

## 24 novembre (pomeriggio): Selva, liana senza tagli
- Montati nella prova i pezzi nuovi della Selva: **partenza** (`jstart`, la zolla che esplode sull'elemento centrale), **corpo** (`jbody`, ripetuto lungo la curva senza giunte, il disegno scorre con la punta), **punta** (`jtip`, ramo di vite), **sbuffi di polvere** (`caps`), **ciuffi di fogliame** (`bush`, restano sul tappeto dopo lo stritolamento e svaniscono). Funzioni nuove: `vineTile`, `vineStart`, `vineFlow`, `dust`. La liana vecchia (`liana`, `vine`) non si usa più ed è uscita dalla pagina (ora 9,4 MB).
- Valgono sia per la selezione e il lancio sia per il boa sul telefono colpito. Pagina pubblicata aggiornata (versione 36).
- Ancora da decidere con Federico: il **colpo grosso della Selva** (idee in `grafica/selva/STILE.md`, punti 13 e 14: zampa della bestia e squarci degli artigli).
- Per ricostruire in una chat nuova servono anche `pip install scipy` e i PNG di `v2-prerelease` (poi `git checkout HEAD -- grafica && git clean -fd grafica` per non lasciarli nel ramo: il checkout da `v2-prerelease` sovrascrive anche gli `STILE.md`).

## 25 novembre: Selva, richieste di Federico
- Tolto il giro della liana intorno al quadratino dell'avversario (il «cerchio di selezione», brutto). Al lancio foglioline e zollette volano dal mio tappeto verso l'avversario e ricadono dal quadratino.
- Boa: tre liane sfasate, cinque giri ciascuna (molto più fitto); la stretta è un cappio (lenta all'inizio, poi decisa, nessun rimbalzo), poi si allenta piano. Animazioni della liana approvate da Federico («perfette»).
- Zampe: Federico ne ha fatte tre (raptor, muschio, pelo scuro su fondo nero). Scelta la **zampa col muschio** (verde come il tema, trasparente, quattro artigli come i quattro squarci); quella su fondo nero andrebbe scontornata.
- Colpi grossi scelti da Federico, tutti e due nella prova (secondo tasto «Colpo grosso 2», `big2`/`bigName2`): **la zampata** (ombra dal lato di chi attacca, zampa che cala e squarcia in diagonale, quattro squarci che restano e svaniscono) e **il bosco che invade** (tronchi e felci dal basso, chiome dall'alto, liane che strisciano, cespugli che spuntano; poi tutto secca e cade). Nell'app si potranno alternare.
- Immagini nuove: `strumenti/prepara-selva-25nov.py` (`paw`, `slash`, `wood1`, `wood2`). Pagina da 10 MB. Nelle foto di prova conviene svuotare gli effetti prima del comando: `for(const k in FX) FX[k].length = 0;`.
- 25 novembre, dopo la prova di Federico: **la zampata è tolta** (decisione di Federico); il colpo grosso della Selva è solo **il bosco che invade** (tasto «Colpo grosso»). L'avvizzimento andava a scatti: usava un filtro (`c.filter`) su ogni immagine a ogni fotogramma. Ora le copie secche (seppia) si preparano una volta sola all'inizio del colpo (`dryIm`) e si sfumano sopra quelle verdi: nel browser di prova da 2 a 18 fotogrammi al secondo, come nel resto del colpo. Regola per l'app: niente `filter` dentro il disegno di ogni fotogramma.

## 25 novembre (sera): Selva più naturale, due colpi grossi
- **Boa casuale** (Federico: «troppo innaturale»): ogni liana ha numero di giri, verso di avvolgimento, altezza, ampiezza, spessore, ritardo, passo irregolare, onda verticale diversa a ogni giro e inclinazione che cambia lungo la liana; entra dall'alto con una curva ed esce dal basso spostata (`boaStrand`, `boaPath`). Tutte con lo stesso verso d'inclinazione (stesso punto di vista): con versi misti venivano ovali finti.
- **Colpo grosso 1, il bosco che invade**: in più cinque liane che perforano il tappeto da sotto (`sprout`: buco a terra, terra che schizza, la punta che sbuca grande con l'ombra lontana, poi si abbatte e striscia). Seccano anche loro.
- **Colpo grosso 2, le frustate** (idea di Federico): sei liane grosse sbucano in punti a caso, si alzano, caricano all'indietro e frustano; dove sbattono si apre uno squarcio spesso (i quattro graffi del foglio ritagliati uno per uno, `gash`), con terra, foglie e polvere; poi rientrano nel buco. Squarci e buchi restano e svaniscono.
- Ombra delle liane alzate: striscia morbida continua (`o.lift` in `vineFlow`); quella a pezzi veniva a righe.
- Immagini: `prepara-selva-25nov.py` ora prepara `wood1`, `wood2`, `hole`, `gash` (la zampa non serve più).
- Fluidità nel browser di prova (lento): boa 23, bosco 16, frustate 29 fotogrammi al secondo, nessuno scatto lungo.

## 25 novembre (notte): mani della Cripta, boa con testa e coda
- **Cripta**: la mano si sceglie a caso a ogni colpo tra la scheletrica (`claw`) e la spiritica di fumo (`jtip`, «Artiglio spettrale di fumo viola»), tutte e due inclinate verso il quadratino di chi viene prosciugato (`HANDS`, `handPos().tilt`; il punto del palmo dove entra il raggio gira con l'inclinazione). Quella di fumo ondeggia di più e quando si chiude si stringe di traverso. Nelle prove: prima di chiamare un colpo della Cripta mettere anche `HAND = null`, se no resta la mano del colpo di prima.
- **Selva, boa con testa e coda** (idea di Federico, approvata): richieste B1–B4 in `grafica/selva/STILE.md` (testa a bocca chiusa e aperta, coda, corpo a squame facoltativo). Si monta quando arrivano le immagini.
- **Cripta, mano rifatta** (Federico: «l'effetto delle mani è brutto»): la mano nasce **al centro del bottone**. Prima escono sbuffi di fumo (`handPuff`) e animelle che scappano (`handSoul`); la mano sale da sotto uscendo dal fumetto (sotto la linea del fumo è tagliata, il fumo copre il taglio), inclinata verso il quadratino di chi viene prosciugato; quando arriva la coda del raggio si chiude e **ridiscende nel fumetto**, che sbuffa un'ultima volta e svanisce (`h.hold = h.a + B1 + .3`). Mano scheletrica o spiritica sempre a caso.
- **Cripta, ritocchi** (Federico: «meno fumetto, animelle meno schizzanti, più spiritico»): fumetto più leggero e lento; le animelle salgono piano ondeggiando e si dissolvono. Colpo grosso: le nuvolette dal quadratino colpito sul tappeto di chi attacca andavano a scatti sul telefono: ora sono la metà e più piccole, i fili di fumo dalla stella meno fitti, e il **pentacolo non usa più `shadowBlur`** (sfocato pesantissimo a ogni fotogramma): il bagliore è fatto ripassando i tratti più larghi e trasparenti. Regola per l'app: niente `shadowBlur` né `filter` nei disegni di ogni fotogramma.
- **Cripta, mano ferma** (Federico: «molleggia come un elastico»): tolti ondeggiamento, deformazione e rimbalzo del bottone; la mano sale e scende ferma, con un movimento morbido, trasparente in basso e sempre più concreta mentre sale. Aggiunta una nuvoletta fissa sul bottone che nasconde lo stacco dove la mano esce dal fumo.
- **Selva, il boa di liane** (immagini B1–B4 arrivate in chat il 25 novembre): avevano un alone chiaro semitrasparente e il lato da attaccare sfumava nel bianco; ripulite da `strumenti/prepara-boa.py` (vuole i file in `grafica/selva/` con i nomi «Boa testa.png», «Boa testa aperta.png», «Boa coda.png», «Boa corpo.png»; **gli originali non sono ancora nel repository**: vanno caricati su `v2-prerelease` con questi nomi). Nel colpo: delle tre liane una è il boa (`boaOne`, `boaFlow`): più grosso, disegnato sopra, coda in fondo, corpo a squame, testa una volta e mezza il collo; dopo l'ultimo giro risale davanti al tappeto e si ferma con la testa al centro sotto il bottone; apre la bocca quando comincia a stringere e la richiude quando molla, poi scivola via.
- **Selva, boa in selezione e in attacco** (Federico): nella selezione (telefono di chi attacca) la punta della liana è la testa del boa, rivolta in alto verso il quadratino, e apre la bocca quando il dito è sopra il quadratino; anche nel lancio vola via a bocca aperta (`vineFlow` con `o.boa` 0..1: testa e corpo a squame al posto del ramo di vite). Nell'attacco (telefono colpito) il boa, finiti i giri, sale davanti al tappeto e si ferma con la **testa di fianco** (tratto finale orizzontale lungo quanto la testa) nella parte alta del tappeto, sopra il bottone, così non finisce dietro il numero della vita; il lato è quello del verso in cui si è avvolto.
- **25 novembre: Selva approvata da Federico** («finalmente ci siamo riusciti, mi piace!»): boa con testa e coda, bosco che invade, frustate. Come gli altri temi approvati, non si tocca se non lo chiede lui. Da fare ancora: caricare su `v2-prerelease` gli originali del boa; montare i flussi preparati degli altri temi (le cariche sono montate); poi portare i colpi nell'app.
- **Cariche montate** (25 novembre, chiesto da Federico): mentre si trascina, sul bottone di chi attacca si raccoglie la carica del tema: cresce in 1,2 secondi, gira, risucchia particelle del suo colore, al massimo trema; al rilascio si sprigiona in un lampo che si allarga e svanisce (`chargeAim`, `chargePop`, `CHG`, `CHGIM`). Abisso (sfera d'acqua), Cripta (carica oscura), Forgia (carica di lava). Santuario: la sfera che c'era sul bottone ora è una delle due cariche di luce, a caso per ogni trascinamento (l'immagine `orb` non si usa più). Mox: la carica resta nel laserone. Selva: nessuna carica (c'è la zolla che esplode).

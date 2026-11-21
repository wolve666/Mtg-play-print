# Passaggio a una nuova chat

Documento per riprendere il lavoro in una sessione nuova senza rileggere la chat precedente.
Aggiornato al 21 novembre 2026 (sera). Leggere anche `V2.md` (decisioni e storia della V2) e `README.md` (registro delle modifiche e compilazione).

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

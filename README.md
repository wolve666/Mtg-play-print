# Magic Play&Print

Segnapunti per Magic: The Gathering da 2 a 6 giocatori, con stampa delle pedine ufficiali su stampantina termica portatile da 58 mm.
App Android realizzata da **E-Duck Garage**.

## Download

Scarica l'ultima `MagicPlayPrint.apk` da [Releases](https://github.com/wolve666/MagicPlayPrint-app/releases/latest) e installala sul telefono. Android chiederà di consentire l'installazione da origini sconosciute.

## Cosa fa

**Tavolo di gioco**
- Formati Standard, Commander, Brawl e Oathbreaker, da 2 a 6 giocatori, con i punti vita iniziali già impostati.
- Pannelli orientati verso ogni giocatore, con colori o illustrazioni personalizzabili.
- Segnalini mostrati solo quando servono: veleno, energia, esperienza, radiazioni, tassa del comandante e un indicatore per ogni avversario che ha fatto danno da comandante, con una luce interna nel suo colore.
- Pannello personale: uno swipe in su sulla linguetta in fondo alla scheda la fa salire e scopre energia, tassa, radiazioni, monarca, iniziativa, benedizione della città, nome, colore e sfondo del comandante. L'ingranaggio dorato apre la scheda completa del giocatore.
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

**Più telefoni (V2, primo pezzo)**
- Ogni giocatore può usare il proprio telefono: uno crea la partita condivisa, gli altri si uniscono. I telefoni si collegano tra loro senza internet (Bluetooth e Wi‑Fi di Android).
- Ognuno vede il proprio campo in grande e in alto i quadratini degli avversari, con vita, veleno, danni da comandante, monarca, iniziativa e benedizione.

**Temi**
- Due temi da scegliere nel Menu: Classico e Forgia (acciaio scuro, braci, angoli tagliati, animazioni particellari).
- In prova (prerelease): i sei temi a colori, Forgia, Selva, Abisso, Cripta, Santuario e Mox, ognuno in versione completa (immagini dipinte) e liscia.

**Aggiornamenti**
- La versione è visibile accanto al nome. Toccandola, l'app verifica gli aggiornamenti.
- L'app controlla anche da sola. Quando trova una nuova versione mostra un avviso con i tasti «Aggiorna» e «Dopo».
- Se cambia solo la pagina dell'app, l'aggiornamento avviene dentro l'app (circa 450 kB). Se cambia la parte nativa, l'app scarica la nuova APK.

## Compilazione

L'APK viene compilata da GitHub Actions (`.github/workflows/build.yml`) e pubblicata nella **vetrina**, `wolve666/MagicPlayPrint-app`: un repository pubblico che contiene solo le APK, la pagina dell'app per gli aggiornamenti e un README. Il codice sorgente resta in questo repository, privato. La versione si legge da `var APPV` in `index.html`.

Tre uscite:
- **push su `main`**: versione definitiva, release `v<versione>` nella vetrina, la ricevono tutti;
- **a mano, «beta»**: come la prova generale, ma con tag `v<versione>-beta` e la scritta «beta» accanto alla versione. È la V2 da mostrare ai tester;
- **a mano, «prova-generale»** (Actions, «Compila APK», «Run workflow», sul ramo scelto): pre-release `v<versione>-prova` nella vetrina. Scade dopo i giorni indicati (30 se non si cambia) e poi si ferma, proponendo la versione definitiva quando esce. Chi ha la definitiva non la riceve; chi ha la prova riceve i suoi aggiornamenti;
- **a mano, «solo-allegato»**: nessuna release, l'APK resta tra gli allegati della compilazione.

Prova della V2 senza telefoni: aprendo `index.html?nettest` nel browser, più schede si collegano tra loro come farebbero i telefoni.

Segreti richiesti nel repository:
- `KEYSTORE_B64`: il keystore di firma codificato in base64.
- `KEYSTORE_PASS`: la password del keystore.
- `VETRINA_TOKEN`: token GitHub con permesso di scrittura sui contenuti della vetrina.

Variabile facoltativa `VETRINA` (Settings, Variables), se la vetrina cambia nome.

Struttura:
- `index.html`: tutta l'app (interfaccia e logica), basata su Capacitor.
- `native/`: la parte Java (Bluetooth classico, dettatura, esclusione dei gesti di sistema, telefoni collegati con Nearby Connections). Quando cambia, va alzato `APPN` in `index.html`.
- `icon-512.png`: l'icona dell'app.

## Registro delle modifiche

### v2.2.7 (prerelease, da compilare)
Solo per Federico. Codice pronto, APK non ancora compilata: si compila quando lo dice lui.
- **Santuario, colpo grosso sul tavolo comune (un telefono)**: parte dal bottone centrale. Il bottone si accende di luce, l'aureola si allarga dal centro ed esplode svanendo; poi la spada viene evocata. Arriva dal tappeto di fronte a quello colpito (con 4 giocatori 1↔2 e 4↔3; con 3 i due tappeti in alto si guardano, e se è colpito il tappeto intero la spada arriva da uno dei due a caso; con 2 l'uno di fronte all'altro).
- **Nuvole**: ferme, sul bordo dello schermo dalla parte di sopra di chi è colpito. Con 2 giocatori e sul tappeto intero del 3 sono grandi e larghe come lo schermo, un po' spostate verso il tappeto da cui arriva il colpo; con 4 e nei mezzi campi del 3 stanno sopra il tappeto di fronte. Al colpo lo spostamento d'aria le apre in due e le spazza via.
- **La spada** è quella di H&O: scende dalle nuvole e si pianta inclinata nel tappeto colpito, senza rimbalzi. L'urto lo danno uno scossone secco del tappeto colpito, il lampo, la luce e le crepe nuove: poco estese, a raggiera dal foro e ad anelli, con la luce che esce dalle fessure. Gli effetti sono centrati sul tappeto colpito e sbordano sfumando, senza tagli. La vita scende quando la spada arriva.
- **Santuario, colpo base sul tavolo comune**: stessa regola del colpo grosso. Le nuvole nascono dalla parte «di sopra» di chi è colpito, dritte per lui, dal tappeto di fronte (dal campo di chi lancia, quando è lì); restano ferme e si inclina solo il raggio. Esempio con 2 giocatori: chi lancia da sotto fa nascere le nuvole nel suo campo e il raggio sale fino all'avversario.
- **Santuario in H&O, colpo grosso**: le crepe nuove (raggiera e anelli) e le nuvole spazzate via dallo spostamento d'aria, come sul tavolo comune. Le nuvole del Santuario non ondeggiano più in nessun colpo.
- **Numeri della vita durante i colpi**: sopra le cifre e i + e − gli effetti si schiariscono a metà, con la forma esatta delle cifre e senza contorno: i numeri si vedono ma non sovrastano la scena. Prima sparivano in un riquadro sfumato che si vedeva come una macchia.
- **Menù rapido dei danni**: quando la finestrella è stretta (per esempio con 3 giocatori) i tasti veloci vanno a capo invece di uscire dal bordo.
- **Tema chiaro (Santuario)**: le icone della barra in alto e i tasti di Android in basso diventano scuri, così si vedono sul fondo chiaro. È una modifica alla parte Java: `APPN` passa a 9.
- **Forgia, colpo grosso sul tavolo comune**: il drago fa un giro a caso su tutto il tappeto condiviso (entra ed esce da lati qualunque, passa sopra gli altri tappeti, gira attorno a quello colpito mentre sputa fuoco). Il getto parte dalla sua testa, che si muove: arriva da direzioni sempre diverse e spazza il tappeto colpito lungo una curva a caso. Gli schizzi sugli altri tappeti partono solo quando il fuoco tocca il tappeto colpito (prima arrivavano in anticipo). H&O invariato.
- Prove: `node prove/santuario-tavolo.js`, `THEMES=santuario,forgia node prove/colpi.js`.

### v2.2.6 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Tavolo virtuale (H&O, da 3 a 6 giocatori)**: nel menu di collegamento il principale sceglie la forma del tavolo (quadrato, rettangolare, rotondo) e vede i posti disegnati attorno, in senso orario; trascina ogni telefono al posto di chi lo usa. La forma arriva a tutti i telefoni.
- **Direzioni vere**: ogni telefono sa da che parte siede ogni altro giocatore. I quadratini in alto sono in ordine di posto (da sinistra a destra come li vedi al tavolo). Si mira sempre con il bottone sul quadratino, ma il colpo esce verso il posto vero di chi è colpito (di lato per i vicini, in alto per chi sta di fronte) ed entra dal lato di chi attacca. Con 2 giocatori non cambia nulla.
- **Menu di collegamento**: la partita aperta è un riquadro ben visibile (pallino che pulsa, formato, giocatori, telefoni collegati); chi chiede di entrare compare in cima, evidenziato, con il codice grande e i tasti Accetta e Rifiuta grandi. Per chi si unisce, le partite trovate sono riquadri con «Entra».

### v2.2.5 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Numeri della vita sempre leggibili**: nessuna animazione copre più il numero della vita e i + e −. Sopra di loro gli effetti diventano quasi trasparenti (se ne vede poco più di un decimo), con il bordo sfumato. Vale per i colpi dei temi, per gli effetti della Forgia e della Selva e per le scintille di Mana, sul tavolo e in H&O.
- **Cripta**: candele della pagina iniziale molto più piccole.

### v2.2.4 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Cripta, pagina iniziale**: le candele sono quelle nere dipinte (cinque, di altezze diverse), con la fiamma accesa sullo stoppino.
- **Finestrella dei danni**: il titolo è «Danni da X a Y», così sta su una riga e la finestrella non si rimpicciolisce.

### v2.2.3 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Santuario, pagina iniziale**: le piume che cadono sono quelle dipinte dei colpi del Santuario (al posto di quelle disegnate a codice); le nuvole che passano sono bianche (prima avevano un bordo grigio).

### v2.2.2 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Cripta, pagina iniziale**: al posto delle anime viola, candele che fluttuano in alto e in basso (non sopra i tasti) con la fiamma che tremola, e un fuoco fatuo che gira a caso tra le candele. Restano pochi brillii viola.
- **Santuario, pagina iniziale**: piume bianche che cadono dondolando; brillii d'oro più piccoli e più radi.

### v2.2.1 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Vita al momento giusto** (gioco su un telefono, temi con i colpi): la vita di chi è colpito resta ferma finché il colpo non arriva, poi scende un punto alla volta come il conteggio d'inizio partita. Il colpo grosso parte da 8 danni.
- **Caratteri**: nei temi a colori le voci principali (titoli, scelte della pagina iniziale, tasti, schede, nomi) sono in maiuscolo come nella Forgia, con il carattere del tema; il resto non cambia.
- **Santuario**: il passaggio al tema è una tenda di luce dorata che scende dall'alto (prima era uno stacco netto).
- **Passaggi dei temi più leggeri**: il tavolo coperto dalla pagina iniziale o dal Menu si ridisegna quando torna visibile, immagini e caratteri del tema nuovo si preparano mentre il velo entra, il velo della Cripta non ingrandisce più un'immagine enorme.
- **Pagina iniziale**: effetti propri per ogni tema. Forgia schizzi di lava e rivoli di fumo; Abisso bolle d'aria e pulviscolo che luccica; Santuario brillii d'oro e nuvole che passano; Cripta anime viola che salgono e brillii viola; Mox lampi azzurri e scintille. Selva come prima.
- **Mana**: il tema base (prima «Classico») si chiama Mana ed è quello del primo avvio.
- **Mini menù dei danni**: stessa grandezza su tutte le schede; passando a Combattimento non cresce più.
- **Stampa indipendente da chi ospita** (H&O): chi chiede la pedina ed è collegato a una stampante la stampa da sé; altrimenti la stampa il principale; se nemmeno il principale ha la stampante, la stampa il telefono collegato con il numero di giocatore più basso. Gli ospiti possono collegare la stampante dal Menu delle pedine.

### v2.2.0 (prerelease)
Solo per Federico (APK tra gli allegati della compilazione).
- **Sei temi a colori**: oltre a Forgia (Rosso) e Selva (Verde) arrivano **Abisso** (Blu: acqua profonda, Marcellus SC), **Cripta** (Nero: pietra e viola, Pirata One), **Santuario** (Bianco: marmo e oro, Cinzel, l'unico tema chiaro) e **Mox** (Incolore: ottone e cristallo, Chakra Petch). Ognuno veste pagina iniziale, Menu, tavolo, pannello personale, scheda, finestre e H&O, con particelle e colori degli effetti propri. I colpi da un telefono all'altro dei quattro temi nuovi per ora sono il fulmine: quelli veri arrivano dalla prova dei colpi.
- **Due versioni per tema**: **completa**, con sfondo dipinto, bordi, cornici sulle caselle, sui tasti e sulle sezioni del Menu, targhe per il tasto principale e per l'elemento centrale H&O (immagini disegnate con ChatGPT); **liscia**, tutta a codice. Il tavolo resta pulito in tutte e due.
- **Semi**: primo tocco tema completo (seme tutto colorato), secondo tocco tema liscio (seme colorato a metà), terzo tocco si torna al Classico. I semi ci sono sulla pagina iniziale e nel Menu alla voce «Tema».
- **Selva**: numeri e titoli in Barlow Condensed al posto di Fraunces.
- **Numero della vita in Oswald** in tutti i temi, Forgia compresa, dritto (anche sui quadratini H&O, nella pagina Combattimento e nella striscia del pannello personale).
- **Selva**: tolto il seme che germogliava all'inizio della partita.
- **Finestrella dei danni**: la voce «Combattimento» (danni normali) c'è anche nel gioco su un telefono.
- **Colpi su un telefono, rifatti sulle posizioni vere** (schermata segnata da Federico): il colpo nasce dal nome di chi attacca e va dritto al centro del tappeto colpito; entra dal lato da cui arriva (lato lungo per chi sta di fronte, lato corto per i vicini) e sul tappeto colpito tutto è nel verso di quel tappeto, orizzontale in Commander a 4. Resta sul bersaglio; quello che in H&O riempie lo schermo sfuma attorno al tappeto.
- **Schizzi sugli altri tappeti** (un telefono): Santuario piume, Mox schegge di vetro e pezzi, Abisso goccioline, Forgia scintille, lava e pezzi di bomba, Selva foglie e polvere, Cripta anime e fumo.
- **Selva, boa**: le spire girano sempre attorno al lato corto del tappeto, una dopo l'altra lungo la lunghezza; nella stretta il tappeto si ritira e tra le spire si vede il fondo scuro.
- **Finestrella dei danni**: il colpo parte con OK (o alla chiusura), con tutto quello che è stato segnato, non mentre si scelgono i punti; i danni da comandante contano per il colpo grosso. Nel Santuario la finestrella è scura su chiaro, leggibile.
- **Passaggi dei temi** (dalla prova generale): toccando un seme un velo del tema nuovo copre lo schermo e il tema cambia a metà (calore in Forgia, foglie in Selva, onda in Abisso, fumo in Cripta, luce in Santuario, saracinesche in Mox, dissolvenza per il Classico). I veli sono sfumati davanti e dietro (niente bordi dritti), coprono tutto nel momento del cambio e li anima la scheda grafica, così non scattano mentre l'app cambia tema. Menu e pagina Stampa si aprono con l'animazione del tema (solo movimento e trasparenza) e le sezioni entrano una dopo l'altra.
- **I colpi dei temi** (quelli approvati nella prova dei colpi) entrano nell'app, per tutti e sei i temi, in H&O e nel gioco su un telefono:
  - trascinando dall'elemento centrale (H&O) o dal proprio nome (un telefono) si vede la carica del tema e la mira verso l'avversario;
  - alla conferma del danno (finestrella o pagina Combattimento) parte il colpo: in H&O esce dal mio telefono ed esplode su quello di chi è colpito, con lo stile di chi attacca; su un telefono va da scheda a scheda, girato verso ogni giocatore;
  - tocchi veloci di fila (+1 +1 +1…) fanno un colpo solo con tutto il danno;
  - **colpo grosso** con 10 o più danni in una volta, e ogni tanto a caso (circa uno su otto); in Forgia ogni tanto arriva il goblin bombarolo;
  - il tappeto colpito è vivo (luci, onde, crepe), disegnato dalla scheda grafica solo durante il colpo;
  - le immagini dei colpi (circa 10 MB) stanno nell'APK, nella cartella `colpi/`: per questo serve la nuova APK (parte nativa 8) e la pagina non si aggiorna da sola sulle APK precedenti.
- La pagina dell'app pesa circa 3 MB per le immagini dei temi completi.

### v2.1.3 (V2 beta)
- **Android 12 come minimo**: da questa APK l'app si installa solo su Android 12 o successivo (telefoni da fine 2021 in poi, circa l'80% di quelli in uso). Chi ha Android 11 o precedente tiene la versione che ha.
- **Corretto**: ogni tanto il trascinamento dei danni dall'elemento centrale non partiva (niente animazione né scia). Succedeva se il dito restava fermo un attimo prima di muoversi: l'app lo prendeva per una richiesta a voce. Ora, in H&O, se il dito si sposta il microfono si annulla e parte il trascinamento.
- **Danno da combattimento dal trascinamento**: in H&O la finestrella che si apre trascinando su un avversario ha anche «Combattimento» (toglie vita, con +2 +3 +5). Nella partita Standard è la scelta di partenza; in Commander resta il comandante.

### v2.1.2 (V2 beta)
- **Tasto indietro**: si esce dall'app solo dalla pagina di scelta del gioco. Dal tavolo il tasto indietro porta lì; per un ospite chiede «Torna al tavolo» o «Esci e torna al menu».
- **Principale scollegato**: all'ospite compare «Collegamento perso» con «Resta nella partita» (si gioca offline e l'app continua a cercarlo; quando si ricollega la finestra si chiude da sola) oppure «Esci e torna al menu».
- **Principale che chiude la partita**: all'ospite compare «Partita chiusa» con «Continua qui, offline» (la partita resta sul suo telefono, con tutte le vite) oppure «Torna al menu».
- **Danni dal quadratino**: toccando il quadratino di un avversario si apre la pagina dei danni con lui già scelto. In cima c'è la sua scheda: vita attuale e vita dopo il colpo, danni da comandante ricevuti da te, veleno e radiazioni, con il valore nuovo. Si segnano combattimento, comandante, veleno, radiazioni e recupero, poi il tasto **Combattimento** manda tutto insieme. In fondo «Scheda completa» di quel giocatore.

### v2.1.1 (V2 beta)
- **Prima di tutto il gioco normale.** Aprendo l'app non si rientra più da soli nella partita su più telefoni: compare la domanda «Rientra nella partita» oppure «Esci e torna al menu» (sul principale «Chiudila e torna al menu»).
- Uscire dalla partita condivisa riporta sempre alla pagina iniziale, da dove si crea una partita normale o se ne ospita una nuova. Vale anche per gli ospiti quando il principale chiude.
- Ospiti: nel menu c'è «Esci dalla partita condivisa». Principale: nel menu c'è «Chiudi la partita condivisa». La riga del collegamento in cima ha una zona di tocco più alta.

### v2.1.0 (V2 beta)
Solo la pagina dell'app: chi ha la 2.0.0 la riceve dentro l'app. Tutto vale solo per la partita su più telefoni (H&O); il gioco su un telefono solo non cambia. Temi: Classico e Forgia.
- **Menu degli ospiti ridotto.** Chi si unisce vede solo le pedine (voce, testo, recenti), «Dadi e moneta», i contatori del pannello, i comandi del telefono (tenendo premuto, vibrazione, schermo, suoni, tema, animazione) e la guida. Niente stampante, archivio offline, nuova partita, giocatori, formato, vita iniziale, turni, registro, diagnostica, suggerimenti, dati e aggiornamenti: li decide il principale.
- **Stampa condivisa.** Un ospite sceglie la pedina e le copie come sempre, ma la stampa il telefono principale con la sua stampantina. Sul principale compare «Stampo per Bea: …» e nel registro resta per chi è stata stampata; all'ospite arriva la conferma.
- **Campo nuovo.** Quadratini degli avversari più alti e larghi tutto lo schermo, con un pallino: verde collegato, rosso scollegato, cerchio vuoto per il posto libero. Il collegamento è una riga sottile in cima (verde o rossa, toccandola si apre la partita condivisa). Il proprio nome non c'è più.
- La vita scende verso la linguetta del pannello personale. Appoggiato sopra c'è l'elemento centrale fisso, arrotondato nel Classico e con gli angoli tagliati in Forgia: tocco per le pedine, dito fermo per la pedina a voce, dito che si muove subito per trascinare i danni da comandante sui quadratini.
- Sopra ancora, in fila, tutti gli indicatori: veleno, energia, esperienza, radiazioni, tassa, danni da comandante, monarca, iniziativa, benedizione e turno. Grandi fino a un massimo; se sono tanti rimpiccioliscono e poi vanno su due righe.
- **Pannello personale stretto**: alto quanto il suo contenuto, appoggiato in fondo, con la striscia della vita attaccata sopra.
- **Scheda completa**: + e − grandi ai lati della vita e, tra −1 e +1, il tasto **Combattimento** (due spade incrociate). Si sceglie un avversario e si segnano insieme danni da combattimento, da comandante (con il partner si sceglie quale dei due comandanti), veleno, radiazioni e recupero di vita per chi attacca. Con «Colpisci» arriva tutto in un colpo solo, anche sugli altri telefoni.
- Uscite per i tester: nuova uscita «beta» nella vetrina (tag `-beta`, scritta «beta» accanto alla versione). L'app riconosce sia le prove generali sia le beta.

### v2.0.0
Prima versione della V2. Serve la nuova APK (cambia la parte nativa).
- **V2, telefoni collegati (primo pezzo).** Dal Menu, «Gioca su più telefoni», poi «Condividi questa partita»: questo telefono diventa il principale e tiene la partita. Sugli altri telefoni, dalla pagina iniziale, «Unisciti a una partita».
- Collegamento senza internet con le Nearby Connections di Android (Bluetooth e Wi‑Fi diretto). Chi si unisce vede un codice di 4 cifre, e sul principale compare lo stesso codice con «Accetta» e «Rifiuta».
- Posti al tavolo: sul principale si trascina ogni telefono sul posto di chi lo usa (oppure si tocca il telefono e poi il posto). Il nome del telefono diventa il nome del giocatore.
- Ognuno vede il proprio campo in grande e in alto i quadratini degli avversari, con vita, veleno, radiazioni, danni da comandante, monarca, iniziativa e benedizione. Toccando un quadratino si apre la scheda di quel giocatore. Il simbolo centrale sta nell'angolo in alto del proprio campo.
- Vita, contatori, stati, turni e registro si aggiornano su tutti i telefoni. Se due telefoni cambiano la stessa vita insieme, le due modifiche si sommano.
- Danni da comandante: si trascina il proprio nome sul quadratino dell'avversario.
- Se un telefono si scollega o l'app si chiude, alla riapertura torna da solo al suo campo e alla partita. Le modifiche fatte nel frattempo arrivano appena si ricollega.
- Nuova partita, numero di giocatori e formato li decide il principale. La rivincita si può chiedere da qualsiasi telefono.
- Uscendo dalla partita condivisa, su quel telefono torna la partita che c'era prima.
- Non ancora: i colpi animati tra un telefono e l'altro e la stampa condivisa.
- Aggiornamenti dalla vetrina `wolve666/MagicPlayPrint-app` (le app già installate ci arrivano da sole). Prova generale: pre-release con scadenza e la scritta «prova» accanto alla versione; dopo la scadenza l'app si ferma e porta alla versione definitiva.

### v0.19.1
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Forgia, simbolo centrale: tolta la corona di fiamme fissa. Ora il fuoco compare quando lo usi: al tocco un soffio di braci con un anello di luce, tenendolo premuto per parlare un vortice di braci che gira intorno (al posto dell'alone che pulsa nel Classico, che l'esagono di Forgia tagliava).
- L'alone blu con le scintille a stampante collegata è rimasto com'era, anche in Forgia.

### v0.19.0
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK (se hai già la 0.17.x o successiva).
- Pagina iniziale: in fondo ci sono i simboli di mana dei sei colori dei temi (Rosso, Verde, Blu, Nero, Bianco, Incolore), puri, senza tasto attorno. Il simbolo del tema in uso è colorato e luminoso, gli altri sono grigi finché i loro temi non sono pronti. Toccando il Rosso si passa a Forgia. I simboli vengono dal font Mana già incorporato (+1 kB).
- Menu, alla voce «Tema»: oltre a Classico e Forgia compaiono i colori in arrivo, in grigio. Il Classico si sceglie solo da qui.
- Forgia: il simbolo centrale delle pedine arde, con una corona di fiamme che gira, un bagliore che tremola e braci che salgono. Si ferma quando una finestra copre il tavolo.

### v0.18.0
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK (se hai già la 0.17.x).
- Forgia, pannello personale: chiudendolo con la linguetta la scheda non diventa più trasparente mentre scende. Lo sfondo della scheda ora è sempre pieno.
- Forgia, pagina iniziale: le caselle perdono la sfocatura solo mentre si muovono e la riprendono appena si fermano, per alleggerire il passaggio tra le schede.
- Forgia, nuove animazioni (il Classico non cambia):
  - inizio partita: il simbolo centrale cade con un'onda d'urto e una pioggia di scintille, il tavolo trema, le schede escono dal centro e i punti vita salgono da zero (un tocco salta l'animazione);
  - vita: il + fa salire scintille dorate verso il giocatore, il − fa cadere braci rosse; 5 punti persi di fila danno un colpo con due tagli di luce, lampo e scheda che trema;
  - danni da comandante: mentre trascini il nome lasci una scia di braci del tuo colore; alla conferma una scia vola fino al bersaglio e lo colpisce;
  - pannello personale: le caselle entrano a cascata con braci dalla linguetta; i contatori scorrono e il + fa scintille;
  - pedina rapida: le scintille convergono, la carta entra girando, raggi che ruotano al posto dell'alone sfocato (più leggeri), scintille sulla barra del conto e sulla stampa;
  - vittoria: le lettere cadono una alla volta, la targhetta del vincitore sbatte nel suo colore, fuochi d'artificio.

### v0.17.1
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK (se hai già la 0.17.0).
- Scheda giocatore: la chiusura scorre senza lo scatto iniziale. Prima il tavolo veniva ridisegnato da capo proprio mentre partiva l'animazione, e il primo tratto saltava (più evidente con il tema Forgia). Ora si ridisegna solo se nella scheda sono cambiati colore, nome, sfondo o partner, e prima che la scheda inizi a scorrere.

### v0.17.0
Serve la nuova APK solo se non hai già la 0.16.1.
- Nuovo tema **Forgia**, da scegliere nel Menu alla voce «Tema». Il tema Classico resta identico ed è quello predefinito.
- Forgia: acciaio scuro e braci, angoli tagliati, numeri della vita inclinati, nomi su targhette, segnalini del comandante con la luce nel colore di chi ha colpito, simbolo centrale esagonale incandescente, colori dei giocatori più saturi. Pannello personale, finestrella dei danni, pulsanti e Menu nello stesso stile.
- Forgia, pagina iniziale: le schede scorrono verso sinistra e le caselle entrano una dopo l'altra (indietro al contrario). Braci che salgono dal fondo, riflesso e scintille sulla casella toccata. Lo sfondo con le illustrazioni casuali che zoomano resta.
- Le braci girano solo sulla pagina iniziale e su «Vuoi continuare?», e si spengono in mezzo secondo quando parte la partita.

### v0.16.1
Cambia la parte nativa: serve la nuova APK. Correzioni nate dai dati della diagnostica raccolti su un Galaxy S21 Ultra.
- L'app chiede ad Android la frequenza più alta dello schermo (120 Hz sui telefoni che la hanno). Prima girava a 60 Hz: metà dei fotogrammi in ogni animazione.
- Pedina rapida: la preparazione dell'immagine per la stampa avviene dopo l'entrata della carta. Prima bloccava il telefono per circa 140 ms proprio durante l'animazione.
- Pagina iniziale, «Vuoi continuare?», regole e vittoria: il primo disegno di sfondo e sfocature avviene con la finestra ancora invisibile, poi parte la dissolvenza. Prima dava uno scatto all'apertura.
- Pedine: tra le versioni trovate viene scelta prima quella generica («Soldier», «Dog») invece di quelle con un nome proprio («Ajani's Pridemate», «Porthos»).
- La ricerca libera confronta l'inizio delle parole: «dea» non trova più «Icingdeath».
- Nuove parole capite: pirexiano, unicorno, falco.

### v0.16.0
Cambia la parte nativa: serve la nuova APK.
- «Esporta i dati raccolti» ora funziona anche nell'app: crea il file e apre il menu «Condividi» di Android, da cui lo mandi con WhatsApp, mail, Drive o altro. Prima nell'app il tasto non faceva nulla, perché la WebView non sa scaricare né condividere file.
- Se la condivisione non è disponibile, i dati vengono copiati negli appunti, pronti da incollare in un messaggio.
- Aggiunti i plugin ufficiali di Capacitor Filesystem e Share.

### v0.15.10
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Nuova «Diagnostica della fluidità» nel Menu, sezione «Voce e miglioramento dell'app». Quando è attiva, dopo ogni azione (schede iniziali, finestre, pannello personale, tocchi sulla vita, dadi, pedina rapida, vittoria) misura per poco più di un secondo quanto dura ogni fotogramma e se il telefono si blocca. Fuori da quei momenti non gira nulla. In alto compare la scritta DIAG come promemoria.
- Le misure, insieme ai dati del telefono, finiscono in «Esporta i dati raccolti». «Cancella i dati raccolti» cancella anche queste.

### v0.15.9
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Ingranaggio del pannello personale pieno, con il foro al centro, e centrato nel tasto anche con molti giocatori. Prima il margine interno predefinito del tasto lo spingeva a destra nei pannelli piccoli.

### v0.15.8
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Pannello personale ridisegnato. Il tasto «Scheda completa» diventa un tasto quadrato dorato con l'ingranaggio, sulla stessa riga di Monarca, Iniziativa e Benedizione.
- Lo spazio liberato va ai tre contatori, che stanno sempre su una riga. Quando il pannello è alto (2 giocatori, o le schede dritte) ogni contatore si dispone su due righe, con icona e numero sopra e i tasti − e + larghi sotto. Quando è basso (le schede girate) restano in fila. Il pannello sceglie da solo la disposizione che permette la misura più grande.
- I sei colori vanno a capo tutti insieme, mai un pallino da solo.

### v0.15.7
Solo la pagina dell'app: si aggiorna dentro l'app, senza APK.
- Pannello personale: tolto il contatore Esperienza, che resta nella Scheda completa (lì ora è attivo per tutti). Con tre contatori stanno su una riga sola e il pannello è più grande: circa un terzo in più con 2 giocatori, un decimo con 4.

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

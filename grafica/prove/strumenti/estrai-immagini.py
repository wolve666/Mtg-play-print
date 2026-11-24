# Rifà la cartella delle immagini preparate (/tmp/prova-colpi/as) partendo dalla pagina già costruita:
# dentro prova-colpi.html ci sono tutte le immagini usate (WebP in base64), l'elenco per tema e i bottoni centrali.
# Serve in una chat nuova, dove la cartella temporanea non c'è più. Si lancia dalla cartella del repository:
#   python3 grafica/prove/strumenti/estrai-immagini.py
# Poi, per avere anche i pezzi preparati ma non ancora usati (cariche, flussi, tappi, fogliame della Selva...):
#   prendere le immagini originali da v2-prerelease (git checkout origin/v2-prerelease -- grafica, senza fare commit dei PNG)
#   e lanciare python3 grafica/prove/strumenti/prepara-immagini-24nov.py
import json, base64, os, re
OUT = '/tmp/prova-colpi/as'; os.makedirs(OUT, exist_ok=True)
h = open('grafica/prove/prova-colpi.html').read()
def grab(name):
    i = h.index('const %s = ' % name) + len('const %s = ' % name); return json.JSONDecoder().raw_decode(h, i)[0]
A, MAN, HUBS = grab('A'), grab('MAN'), grab('HUBS')
for k, b in A.items():
    raw = base64.b64decode(b); open(f'{OUT}/{k}.webp', 'wb').write(raw)
    # quelle grandi sono già la copia compressa: la metto anche dove la cerca il costruttore, così non le ricomprime
    if len(raw) > 90000: open(f'/tmp/prova-colpi/{k}_s.webp', 'wb').write(raw)
json.dump(MAN, open(OUT + '/manifest.json', 'w')); json.dump(HUBS, open(OUT + '/hubs.json', 'w'))
print(len(A), 'immagini;', {t: len(v) for t, v in MAN.items()})

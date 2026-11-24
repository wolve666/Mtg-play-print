# Selva, boa di liane (25 novembre): testa chiusa, testa aperta, coda, corpo a squame.
# Le immagini arrivate hanno un alone chiaro semitrasparente e il lato che si attacca al corpo sfuma nel bianco, non nel trasparente:
# tolgo i pixel chiari e poco saturi semitrasparenti, indurisco il bordo, tengo il pezzo più grande e rifaccio la sfumatura verso il trasparente.
# Si lancia dalla cartella del repository con le immagini in grafica/selva/ («Boa testa.png», «Boa testa aperta.png», «Boa coda.png», «Boa corpo.png»).
import json, os, numpy as np
from PIL import Image
from scipy import ndimage as nd
OUT = '/tmp/prova-colpi/as'
def clean(f, cut=None):
    a = np.asarray(Image.open('grafica/selva/' + f).convert('RGBA')).astype(float); al = a[..., 3] / max(1, a[..., 3].max()); rgb = a[..., :3]
    mx = rgb.max(-1); mn = rgb.min(-1); sat = (mx - mn) / (mx + 1)
    al = np.where((mn > 115) & (sat < .3) & (al < .97), 0, al)
    al = np.clip((al - .12) / (.85 - .12), 0, 1)
    m = al > .3; lab, n = nd.label(m)
    if n > 1: sz = nd.sum(m, lab, range(1, n + 1)); al = al * nd.binary_dilation(lab == (np.argmax(sz) + 1), iterations=6)
    if cut:
        s, e = cut; r = np.clip((np.arange(al.shape[1])[None, :] / al.shape[1] - s) / (e - s), 0, 1); al = al * (r * r * (3 - 2 * r))
    a[..., 3] = al * 255; return Image.fromarray(a.astype(np.uint8), 'RGBA')
def save(im, key, w):
    im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS); p = f'{OUT}/{key}.webp'; im.save(p, 'WEBP', quality=82, method=6)
    return [{'k': key, 'w': im.width, 'h': im.height, 'b': os.path.getsize(p)}]
M = json.load(open(OUT + '/manifest.json'))
# niente ritagli: le proporzioni contano (spessore del collo = spessore del corpo); il corpo resta intero perché si ripete
M['selva']['bhead']  = save(clean('Boa testa.png', (.13, .24)), 'v_bh1', 800)
M['selva']['bhead2'] = save(clean('Boa testa aperta.png', (.11, .2)), 'v_bh2', 800)
M['selva']['btail']  = save(clean('Boa coda.png', (.92, .82)), 'v_bt', 800)
M['selva']['bbody']  = save(clean('Boa corpo.png'), 'v_bb', 1100)
json.dump(M, open(OUT + '/manifest.json', 'w'), indent=0)
print({k: M['selva'][k] for k in ('bhead', 'bhead2', 'btail', 'bbody')})

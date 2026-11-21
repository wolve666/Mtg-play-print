import sys; sys.argv=['x']
exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0])
import json
H={}
H['santuario']=one('santuario/Targa fantasy in marmo, oro e ali.png','h_s',420)
H['mox']=one('mox/Pannello steampunk in ottone e acciaio.png','h_m',420)
H['abisso']=one('abisso/Cornice Fantasy d’Acqua e Cristallo.png','h_a',420)
H['cripta']=one('cripta/Banner gotico con teschi viola al neon.png','h_c',420)
H['forgia']=one('forgia/Pannello metallico con fessure incandescenti.png','h_f',420)
H['emb']=save(Image.open('emblema.png').convert('RGBA'),'emb',160)
json.dump(H,open(OUT+'/hubs.json','w'))
print(H)

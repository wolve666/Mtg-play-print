exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0].replace('OUT="/tmp/prova-colpi/as"','OUT="/tmp/prova-colpi/as"'))
import json
M=json.load(open(OUT+'/manifest.json'))
M['abisso']['gorgo']=one("abisso/Gorgo visto dall'alto.png",'a_gorgo',560)
M['abisso']['jet']=one("abisso/Getto d'acqua a spirale.png",'a_jet',1100)
M['abisso']['spray']=sheet('abisso/Foglio di 8 spruzzi.png','a_sp',260)
M['abisso']['bubble']=sheet('abisso/Foglio di 9 bolle.png','a_b',110)
json.dump(M,open(OUT+'/manifest.json','w'))
print({k:len(M['abisso'][k]) for k in ['gorgo','jet','spray','bubble']}, M['abisso']['jet'])

import json, os, numpy as np
from PIL import Image
from scipy import ndimage as nd
OUT="/tmp/prova-colpi/as"
G='grafica/'
def load(f, fix=None):
    im=Image.open(G+f).convert('RGBA'); a=np.asarray(im).astype(np.float32)
    if fix=='gocce':
        a[...,3]=np.clip((a[...,3]-55)/(255-55),0,1)*255
    if fix=='black':
        mx=a[...,:3].max(-1); dark=mx<38
        lab,_=nd.label(dark); edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
        bg=np.isin(lab,list(edge))
        bg=nd.binary_dilation(bg,iterations=1)&(mx<70)
        al=np.where(bg,np.clip((mx-6)/50,0,1),1.0)
        al=nd.gaussian_filter(al,0.8)
        a[...,3]=al*255
    return Image.fromarray(a.astype(np.uint8),'RGBA')
def crop(im,pad=4):
    al=np.asarray(im)[...,3]; ys,xs=np.where(al>8)
    if not len(xs): return im
    x0,x1,y0,y1=max(0,xs.min()-pad),min(im.width,xs.max()+pad+1),max(0,ys.min()-pad),min(im.height,ys.max()+pad+1)
    return im.crop((x0,y0,x1,y1))
def save(im,key,mx,q=82):
    im=im.copy(); im.thumbnail((mx,mx),Image.LANCZOS)
    p=f'{OUT}/{key}.webp'; im.save(p,'WEBP',quality=q,method=6); return {'k':key,'w':im.width,'h':im.height,'b':os.path.getsize(p)}
def one(f,key,mx,fix=None,docrop=True,q=82):
    im=load(f,fix); im=crop(im) if docrop else im; return [save(im,key,mx,q)]
def sheet(f,key,mx,fix=None,minfrac=.002,q=82):
    im=load(f,fix); al=np.asarray(im)[...,3]>20
    al=nd.binary_dilation(al,iterations=6)
    lab,n=nd.label(al); objs=nd.find_objects(lab); res=[]
    areas=[(lab[s]==i+1).sum() for i,s in enumerate(objs)]
    tot=al.size; i2=0
    order=sorted(range(n),key=lambda i:(objs[i][0].start//200,objs[i][1].start))
    for i in order:
        if areas[i]<tot*minfrac: continue
        s=objs[i]; piece=np.asarray(im).copy(); m=(lab==i+1)
        piece[...,3]=np.where(m,piece[...,3],0)
        p=Image.fromarray(piece,'RGBA').crop((s[1].start,s[0].start,s[1].stop,s[0].stop))
        res.append(save(crop(p,2),f'{key}{i2}',mx,q)); i2+=1
    return res
M={}
def T(t,k,v): M.setdefault(t,{})[k]=v
os.makedirs(OUT,exist_ok=True)
# Santuario
T('santuario','beam',  one('santuario/Scia di luce dorata scintillante.png','s_beam',1000))
T('santuario','beam2', one('santuario/Nastro di luce dorata con piume candide.png','s_beam2',1000))
T('santuario','clouds',one('santuario/Nuvole dorate con raggi di luce.png','s_clouds',800))
T('santuario','burst', one('santuario/Esplosione dorata di luce e piume.png','s_burst',560))
T('santuario','halo',  one('santuario/Aureola dorata ornamentale luminosa.png','s_halo',560))
T('santuario','orb',   one('santuario/Sfera magica dorata luminosissima.png','s_orb',300))
T('santuario','feath', sheet('santuario/Sei piume luminose dorate su trasparenza.png','s_f',150))
T('santuario','down',  sheet('santuario/Piume e scintille dorate luminose.png','s_d',110))
T('santuario','wings', one('santuario/Ali d’angelo bianche e luminose.png','s_wings',800))
# Mox
T('mox','bomb',  one('mox/Sfera Steampunk dal Cristallo Luminoso.png','m_bomb',300))
T('mox','bomb2', one('mox/Sfera steampunk esplosiva di luce ciano.png','m_bomb2',340,fix='black'))
T('mox','crack', one('mox/Vetro Frantumato con Crepe Radianti.png','m_crack',800,docrop=False))
T('mox','crack2',one('mox/Frattura di vetro radiale ghiacciata.png','m_crack2',800,docrop=False))
T('mox','shard', sheet('mox/Frammenti di vetro trasparenti in fila.png','m_sh',170))
T('mox','parts', sheet('mox/Componenti meccanici steampunk in ottone e acciaio.png','m_p',110)+sheet('mox/Componenti meccanici steampunk metallici.png','m_q',110))
T('mox','blast', one('mox/Impatto magico ciano e oro.png','m_blast',520))
T('mox','fist',  one('mox/Pugno Meccanico Steampunk in Ottone.png','m_fist',600))
# Abisso
for i,f in enumerate(['Onda oceanica blu in movimento','Onda oceanica luminosa in movimento','Onda oceanica turchese con schiuma luminosa','Onda oceanica turchese in esplosione']):
    T('abisso',f'wave{i}', one(f'abisso/{f}.png',f'a_w{i}',700))
T('abisso','trail', one('abisso/Fascia d’acqua oceanica luminosa.png','a_trail',900))
T('abisso','burst', one('abisso/Esplosione di schiuma turchese.png','a_burst',600))
T('abisso','ring',  one('abisso/Anello d’onda d’acqua trasparente.png','a_ring',560))
T('abisso','splash',sheet('abisso/Sei effetti di schizzi d’acqua realistici.png','a_s',220))
T('abisso','foam',  sheet('abisso/Sei chiazze di schiuma marina bianca realistico-dettagliate.png','a_f',220))
T('abisso','drop',  sheet('abisso/Griglia di gocce d’acqua realistiche.png','a_d',120,fix='gocce'))
T('abisso','tent',  one('abisso/Tentacolo Gigante Lucido con Ventose.png','a_tent',900))
# Cripta
T('cripta','dart',  one('cripta/Dardo di Fumo Viola Oscuro.png','c_dart',900))
T('cripta','dart2', one('cripta/Proiettile spettrale di volti urlanti.png','c_dart2',900))
T('cripta','trail', one('cripta/Scia di Fumo Magico Viola.png','c_trail',900))
T('cripta','souls', sheet('cripta/Sei Volti Spettrali di Fumo Viola.png','c_s',170))
T('cripta','puffs', sheet('cripta/Tavola di sei vortici di fumo viola.png','c_p',200))
T('cripta','vein',  one('cripta/Fenditura di energia viola oscura-2.png','c_v1',800))
T('cripta','vein2', one('cripta/Nucleo di Corruzione Violetta-1.png','c_v2',800))
T('cripta','skull', one('cripta/Teschio Infuocato dalle Fiamme Viola.png','c_skull',360))
T('cripta','claw',  one('cripta/Artiglio scheletrico di magia viola.png','c_claw',600))
# Forgia
T('forgia','burn',  one('forgia/Impatto Incandescente sul Metallo-1.png','f_b1',560))
T('forgia','burn2', one('forgia/Impatto fulmineo su metallo incandescente-2.png','f_b2',560))
T('forgia','burn3', one('forgia/Impatto elettrificato su metallo fuso.png','f_b3',560))
T('forgia','shard', sheet('forgia/Sei frammenti di roccia lavica incandescente.png','f_sh',130))
T('forgia','ember', sheet('forgia/Sei braci ardenti incandescenti su sfondo bianco.png','f_e',100))
T('forgia','arc',   sheet('forgia/Sei effetti di fulmini elettrici blu.png','f_a',200))
T('forgia','gob1',  one('forgia/Goblin con Bomba Fiammeggiante.png','f_g1',360))
T('forgia','gob2',  one('forgia/Goblin saltellante con equipaggiamento logoro.png','f_g2',360))
T('forgia','bomb',  one('forgia/Bomba di ferro con miccia scintillante.png','f_bomb',200))
T('forgia','dragon',one('forgia/Sagoma d’ombra di drago alato.png','f_drag',900))
T('forgia','fire',  one('forgia/Soffio di fuoco draconico in esplosione.png','f_fire',900))
T('forgia','lava',  one('forgia/Isola di Roccia Vulcanica Incandescente.png','f_lava',700))
json.dump(M,open(OUT+'/manifest.json','w'),indent=0)
tot=sum(x['b'] for t in M.values() for v in t.values() for x in v)
for t,v in M.items(): print(t,{k:len(x) for k,x in v.items()})
print('total KB',tot//1024)

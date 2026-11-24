exec(open('grafica/prove/strumenti/prepara-immagini.py').read().split('M={}')[0].replace('OUT="/tmp/prova-colpi/as"','OUT="/tmp/prova-colpi/as"'))
import json
M=json.load(open(OUT+'/manifest.json'))
def T(t,k,v): M.setdefault(t,{})[k]=v
def bbox(im,th=8):
    al=np.asarray(im)[...,3]; ys,xs=np.where(al>th); return [xs.min(),ys.min(),xs.max()+1,ys.max()+1]
def vtile(f,key,mx):
    # corpo ripetibile: taglio solo sopra e sotto, i lati restano interi
    im=load(f); b=bbox(im); im=im.crop((0,max(0,b[1]-4),im.width,min(im.height,b[3]+4))); return [save(im,key,mx)]
def pair(f1,f2,k1,k2,mx):
    # due immagini con lo stesso perno: taglio con lo stesso riquadro
    a,b=load(f1),load(f2); x=bbox(a); y=bbox(b); u=(min(x[0],y[0])-4,min(x[1],y[1])-4,max(x[2],y[2])+4,max(x[3],y[3])+4)
    return [save(a.crop(u),k1,mx)],[save(b.crop(u),k2,mx)]
c2,l1=pair('mox/Cannone steampunk in ottone e acciaio.png','mox/Cannone steampunk a cristallo energetico.png','m_barrel','m_barrel2',640)
T('mox','barrel',c2); T('mox','barrel2',l1)
T('mox','base',  one('mox/Emblema di Torretta Steampunk Luminosa.png','m_base',440))
T('mox','muzzle',one('mox/Esplosione energetica ciano con scintille auree.png','m_muz',560))
T('mox','lmouth',one('mox/Esplosione Magica Laser Ciano-Gold.png','m_lmouth',700))
T('mox','limp',  one('mox/Impatto energetico su metallo fuso.png','m_limp',520))
T('mox','groove',vtile('mox/Fenditura Metallica di Lava Incandescente.png','m_groove',1100))
T('mox','molten',sheet('mox/Tavola di schizzi di lava incandescente.png','m_mo',150))
T('mox','steam', sheet('mox/Sei Scie di Fumo Luminoso Grigio e Ciano.png','m_st',230))
T('mox','charge',one('mox/Sfera energetica magica ciano e oro-1.png','m_ch1',380)+one('mox/Sfera magica di energia luminosa-2.png','m_ch2',380))
T('mox','boom',  sheet('mox/Esplosioni Steampunk di Fumo e Ottone.png','m_bo',320))
T('abisso','jstart',one("abisso/Vortice d’acqua blu scintillante.png",'a_js',800))
T('abisso','jbody', vtile("abisso/Bordo d’onda marina scintillante.png",'a_jb',1100))
T('abisso','jtip',  one("abisso/Esplosione d’acqua blu dinamica.png",'a_jt',700))
T('abisso','caps',  sheet("abisso/Sei elementi di schiuma marina blu‑turchese.png",'a_c',230))
T('abisso','charge',one("abisso/Sfera d’acqua magica incandescente.png",'a_ch',380))
T('abisso','boom',  sheet("abisso/Esplosioni d’acqua blu in volo.png",'a_bo',320))
T('cripta','jstart',one('cripta/Vortice di anime spettrali violacee.png','c_js',800))
T('cripta','jbody', vtile('cripta/Fascia di Fumo Spettrale Viola.png','c_jb',1100))
T('cripta','jtip',  one('cripta/Artiglio spettrale di fumo viola.png','c_jt',800))
T('cripta','caps',  sheet('cripta/Sei nubi di fumo viola vorticante.png','c_c',230))
T('cripta','charge',one('cripta/Sfera Vorticosa di Spettri Viola.png','c_ch',380))
T('forgia','jstart',one('forgia/Scia di Fiamme e Scintille candenti.png','f_js',800))
T('forgia','jbody', vtile('forgia/Fiamme incandescenti senza soluzione di continuità.png','f_jb',1100))
T('forgia','jtip',  one('forgia/Proiettile di fuoco incandescente.png','f_jt',800))
T('forgia','caps',  sheet('forgia/Griglia di nuvole di fumo e braci'+[f for f in os.listdir(G+'forgia') if f.startswith('Griglia di nuvole')][0][len('Griglia di nuvole di fumo e braci'):],'f_c',230))
T('forgia','boom',  sheet('forgia/Quattro esplosioni di fuoco realistiche.png','f_bo',320))
T('forgia','charge',one('forgia/Sfera di fuoco incandescente in vortice.png','f_ch',380))
T('forgia','ha',    sheet('forgia/Tre Risate Comic Neon Verdi.png','f_ha',420))
T('forgia','bombx', sheet('forgia/Tre fasi di esplosione di una bomba.png','f_bx',300))
T('forgia','frag',  sheet('forgia/Frammenti di corazza incandescente.png','f_fr',150))
T('santuario','jstart',one("santuario/Anello d’oro e fascio luminoso.png",'s_js',800))
T('santuario','jbody', vtile('santuario/Raggio Magico Dorato con Scintille.png','s_jb',1100))
T('santuario','jtip',  one('santuario/Raggio dorato con piume luminose.png','s_jt',800))
T('santuario','caps',  sheet('santuario/Sei nuvole dorate fluttuanti.png','s_c',230))
T('santuario','charge',one('santuario/Sfera Magica di Luce Dorata-1.png','s_ch1',380)+one('santuario/Sfera di Energia Magica Dorata-2.png','s_ch2',380))
T('selva','jstart',one('selva/Vite e terra in esplosione.png','v_js',800))
T('selva','jbody', vtile('selva/Bordo di Liane Tropicali Intrecciate.png','v_jb',1100))
T('selva','jtip',  one('selva/Ramo di vite tropicale intrecciata.png','v_jt',800))
T('selva','caps',  sheet('selva/Sei nuvole di polvere e detriti.png','v_c',230))
T('selva','bush',  sheet('selva/Tavola di sei composizioni di fogliame fantasy.png','v_bu',230))
json.dump(M,open(OUT+'/manifest.json','w'))
for t in M:
    for k in ['barrel','barrel2','base','molten','steam','boom','caps','ha','bombx','frag','bush','charge','jbody']:
        if k in M[t]: print(t,k,len(M[t][k]),[(x['w'],x['h'],x['b']//1024) for x in M[t][k]][:3])

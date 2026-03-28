import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZjUXwI06n5qmUK2oof1awAM4EY_w0GOs",
  authDomain: "flash-cards-916cc.firebaseapp.com",
  projectId: "flash-cards-916cc",
  storageBucket: "flash-cards-916cc.firebasestorage.app",
  messagingSenderId: "74802688899",
  appId: "1:74802688899:web:599faee59a2671c96ffcb6"
};
const fbApp = initializeApp(firebaseConfig);
const db = getFirestore(fbApp);
const COLL = "flashcards";

const PRE = [
  {word:'Bargain',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'affare / occasione',lit:null,sy:['deal','good buy','steal'],ei:'Ho trovato un vero affare al mercato: scarpe di qualità a metà prezzo.',eo:'I found a real bargain at the market: quality shoes at half price.'}},
  {word:'Sorting out',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrasal',tr:'sistemare / risolvere',lit:null,sy:['figuring out','resolving','dealing with'],ei:'Sto cercando di sistemare tutti i documenti prima della scadenza.',eo:"I'm trying to sort out all the paperwork before the deadline."}},
  {word:'Run out',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrasal',tr:'esaurire / finire',lit:null,sy:['use up','deplete','exhaust'],ei:'Siamo rimasti senza latte proprio quando avevo voglia di caffè.',eo:'We ran out of milk just when I felt like having coffee.'}},
  {word:'Straddling',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'a cavalcioni / a cavallo di',lit:null,sy:['spanning','bridging','overlapping'],ei:'La città si trova a cavallo tra due regioni diverse.',eo:'The city is straddling two different regions.'}},
  {word:'Deprecate',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'deprecare / sconsigliare',lit:null,sy:['discourage','disapprove','phase out'],ei:"Questa funzione è stata deprecata nell'ultima versione del software.",eo:'This function was deprecated in the latest software version.'}},
  {word:'Tease',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'prendere in giro / stuzzicare',lit:null,sy:['mock','taunt','needle'],ei:'I suoi amici lo stuzzicavano bonariamente per il nuovo taglio.',eo:'His friends teased him good-naturedly about his new haircut.'}},
  {word:'Dripping',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'gocciolante / che stilla',lit:null,sy:['leaking','oozing','trickling'],ei:'Tornò a casa completamente fradicio, con i vestiti gocciolanti.',eo:'He came home completely soaked, his clothes dripping.'}},
  {word:'Spill the beans',dir:'fwd',lc:'en',ln:'inglese',data:{type:'idiom',tr:'rivelare un segreto / fare una soffiata',lit:'versare i fagioli',sy:['let the cat out of the bag','give the game away','blab'],ei:'Ha rivelato tutto alla festa e ha rovinato la sorpresa.',eo:'She spilled the beans at the party and ruined the surprise.'}},
  {word:'Giddy',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'stordito / euforico',lit:null,sy:['dizzy','lightheaded','euphoric'],ei:'Si sentiva euforica di eccitazione prima del concerto.',eo:'She felt giddy with excitement before the concert.'}},
  {word:'Left me reeling',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrase',tr:'mi ha lasciato sconvolto',lit:null,sy:['knocked me sideways','floored me','left me stunned'],ei:'La notizia mi ha lasciato completamente sconvolto per giorni.',eo:'The news left me reeling for days.'}},
  {word:'Rapturous',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'estatico / rapito',lit:null,sy:['ecstatic','elated','enraptured'],ei:'Il pubblico ha accolto lo spettacolo con un applauso estatico.',eo:'The audience greeted the performance with rapturous applause.'}},
  {word:'Heady',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'inebriante / esaltante',lit:null,sy:['intoxicating','exhilarating','thrilling'],ei:'I primi anni della startup erano un periodo inebriante di possibilità.',eo:'The early years of the startup were a heady time of endless possibilities.'}},
  {word:'Settle',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'sistemarsi / stabilirsi / risolvere',lit:null,sy:['resolve','establish','calm down'],ei:'Dopo anni di viaggi, decise finalmente di stabilirsi in campagna.',eo:'After years of travelling, she finally decided to settle in the countryside.'}},
  {word:'Brushing',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'sfiorando / spazzolando',lit:null,sy:['grazing','stroking','sweeping'],ei:'Le sue dita la sfiorarono leggermente mentre passava accanto.',eo:'His fingers brushed her lightly as he passed by.'}},
  {word:'Darting out',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrasal',tr:'schizzare fuori / balzare fuori',lit:null,sy:['rushing out','shooting out','springing out'],ei:'Il gatto schizzò fuori dalla porta appena la aprì.',eo:'The cat darted out of the door as soon as she opened it.'}},
  {word:'Spurt',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'getto / schizzo / scatto',lit:null,sy:['burst','gush','surge'],ei:'Un getto di sangue uscì dalla ferita prima che riuscisse a fermarla.',eo:'A spurt of blood came from the wound before he could stop it.'}},
  {word:'Shaking',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'tremante / scuotendo',lit:null,sy:['trembling','quivering','shuddering'],ei:'Le mani le tremavano mentre leggeva la lettera.',eo:'Her hands were shaking as she read the letter.'}},
  {word:'Catches',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'afferra / cattura / coglie',lit:null,sy:['grabs','seizes','snags'],ei:'Il portiere afferra la palla con un tuffo spettacolare.',eo:'The goalkeeper catches the ball with a spectacular dive.'}},
  {word:'Aching',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'dolente / che fa male / che anela',lit:null,sy:['throbbing','hurting','longing'],ei:"Le gambe dolenti dopo l'allenamento erano la prova di una buona sessione.",eo:'His aching legs after training were proof of a good session.'}},
  {word:'Pooling',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'raccogliersi in pozze / confluire',lit:null,sy:['collecting','gathering','accumulating'],ei:'Il sangue si raccoglieva lentamente sul pavimento di marmo.',eo:'Blood was pooling slowly on the marble floor.'}},
  {word:'Kneading',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'impastare / massaggiare con forza',lit:null,sy:['massaging','working','pressing'],ei:'Impastò il pane con le mani per dieci minuti.',eo:'She spent ten minutes kneading the bread dough by hand.'}},
  {word:'Coating',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'rivestimento / strato / ricoprire',lit:null,sy:['covering','layering','glazing'],ei:'Ricoprì il pollo di spezie prima di metterlo in forno.',eo:'She coated the chicken in spices before putting it in the oven.'}},
  {word:'Filthy',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'sporco / sudicio / osceno',lit:null,sy:['dirty','disgusting','foul'],ei:'Tornò a casa con le scarpe sudicie dopo la passeggiata nel fango.',eo:'He came home with filthy shoes after the walk through the mud.'}},
  {word:'Wield',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'maneggiare / esercitare (potere)',lit:null,sy:['brandish','handle','exercise'],ei:"Il generale esercitava un'autorità assoluta sui suoi uomini.",eo:'The general wielded absolute authority over his men.'}},
  {word:'Blunt',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'smusso / ottuso / diretto / brusco',lit:null,sy:['dull','direct','straightforward'],ei:'Fu diretto: disse esattamente quello che pensava senza giri di parole.',eo:'He was blunt: he said exactly what he thought without beating around the bush.'}},
  {word:'Seize',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'afferrare / impadronirsi / cogliere',lit:null,sy:['grab','grasp','capture'],ei:"Colse l'occasione al volo e accettò l'offerta di lavoro.",eo:'She seized the opportunity and accepted the job offer.'}},
  {word:'Clumsy',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'goffo / maldestro',lit:null,sy:['awkward','ungainly','ham-fisted'],ei:'Era così goffo che rovesciò il caffè sulla camicia nuova.',eo:'He was so clumsy he spilled coffee on his new shirt.'}},
  {word:'Thrill',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'brivido / emozione intensa',lit:null,sy:['excitement','rush','exhilaration'],ei:'Sentì un brivido di eccitazione quando salì sul palco per la prima volta.',eo:'She felt a thrill of excitement when she stepped on stage for the first time.'}},
  {word:'Refined',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'raffinato / elegante',lit:null,sy:['sophisticated','polished','cultured'],ei:'Il suo gusto raffinato si notava in ogni dettaglio della casa.',eo:'Her refined taste was evident in every detail of her home.'}},
  {word:'Help myself',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrase',tr:'servirmi da solo / non riuscire a trattenermi',lit:null,sy:["serve myself","can't resist","treat myself"],ei:'Non riuscivo a trattenermi dal mangiare un altro pezzo di torta.',eo:"I couldn't help myself from eating another piece of cake."}},
  {word:'Left hand down a bit',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrase',tr:'sterza leggermente a sinistra',lit:null,sy:['steer left','turn left','left a bit'],ei:"Sterza un po' a sinistra — stai andando verso il fosso!",eo:"Left hand down a bit — you're heading for the ditch!"}},
  {word:'Breath catches',dir:'fwd',lc:'en',ln:'inglese',data:{type:'phrase',tr:'il respiro si blocca / manca il fiato',lit:null,sy:['gasp','lose your breath','catch your breath'],ei:'Il respiro le si bloccò in gola quando vide chi era alla porta.',eo:'Her breath catches in her throat when she sees who is at the door.'}},
  {word:'Thaw',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'scongelare / disgelo / ammorbidirsi',lit:null,sy:['melt','defrost','soften'],ei:"Il ghiaccio cominciò a sciogliersi con l'arrivo della primavera.",eo:'The ice began to thaw with the arrival of spring.'}},
  {word:'Deluge',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'diluvio / alluvione / inondazione',lit:null,sy:['flood','downpour','torrent'],ei:'Un vero diluvio di email invase la sua casella dopo l\'annuncio.',eo:'A deluge of emails flooded his inbox after the announcement.'}},
  {word:'Ceiling',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'soffitto / limite massimo',lit:null,sy:['roof','upper limit','cap'],ei:"Il governo ha fissato un tetto massimo ai prezzi dell'energia.",eo:'The government has set a ceiling on energy prices.'}},
  {word:'Aforementioned',dir:'fwd',lc:'en',ln:'inglese',data:{type:'word',tr:'summenzionato / sopra citato / suddetto',lit:null,sy:['above-mentioned','previously stated','said'],ei:'Il suddetto accordo entrerà in vigore a partire dal primo gennaio.',eo:'The aforementioned agreement will come into effect from the first of January.'}}
];

var LN={en:'inglese',es:'spagnolo',fr:'francese',de:'tedesco',pt:'portoghese',ja:'giapponese',zh:'cinese',ru:'russo',ar:'arabo'};
var PI=1/1e6,PO=5/1e6;
var TM={word:{c:'tw',l:'parola'},phrasal:{c:'tp',l:'phrasal verb'},idiom:{c:'ti',l:'idiom'},phrase:{c:'tf',l:'frase'}};
function tm(t){return TM[t]||TM.word;}

var cards=[], iDir='fwd', qMode='mixed', qInputMode='write';
var qQueue=[], qIdx=0, qOk=0, qDone=false;

// ── SYNC ──
function syncStatus(state,msg){
  document.getElementById('sync-dot').className='sync-dot '+state;
  document.getElementById('sync-lbl').textContent=msg;
}

// ── FIRESTORE ──
async function loadFromFirestore(){
  syncStatus('loading','Caricamento dal cloud...');
  try{
    var snap=await getDocs(collection(db,COLL));
    if(snap.empty){
      syncStatus('loading','Prima configurazione...');
      for(var i=0;i<PRE.length;i++){
        var p=PRE[i];
        await addDoc(collection(db,COLL),{word:p.word,dir:p.dir,lc:p.lc,ln:p.ln,data:p.data,createdAt:Date.now()+i,hard:false,stats:{ok:0,no:0}});
      }
      snap=await getDocs(collection(db,COLL));
    }
    cards=[];
    snap.forEach(function(d){
      var c=d.data();
      cards.push({id:d.id,word:c.word,dir:c.dir||'fwd',lc:c.lc||'en',ln:c.ln||'inglese',status:'ready',data:c.data,tok:null,createdAt:c.createdAt||0,hard:c.hard||false,stats:c.stats||{ok:0,no:0}});
    });
    cards.sort(function(a,b){return b.createdAt-a.createdAt;});
    syncStatus('ok','Sincronizzato · '+cards.length+' card');
    renderCards();
  }catch(e){syncStatus('err','Errore: '+e.message);}
}

async function saveCard(card){
  try{
    var ref=await addDoc(collection(db,COLL),{word:card.word,dir:card.dir,lc:card.lc,ln:card.ln,data:card.data,createdAt:card.createdAt,hard:false,stats:{ok:0,no:0}});
    card.id=ref.id;
    syncStatus('ok','Salvato · '+cards.length+' card');
  }catch(e){syncStatus('err','Errore salvataggio: '+e.message);}
}

async function deleteCard(id){
  try{await deleteDoc(doc(db,COLL,id));syncStatus('ok','Eliminato · '+cards.length+' card');}
  catch(e){syncStatus('err','Errore eliminazione: '+e.message);}
}

async function updateCard(id,fields){
  try{await updateDoc(doc(db,COLL,id),fields);}
  catch(e){console.error('update error',e);}
}

// ── IMPORT MERGE ──
async function importFromFile(e){
  var f=e.target.files[0];if(!f)return;
  var reader=new FileReader();
  reader.onload=async function(ev){
    try{
      var parsed=JSON.parse(ev.target.result);
      var incoming=parsed.cards||parsed;
      var existing={};
      cards.forEach(function(c){existing[c.word.toLowerCase().trim()]=true;});
      var added=0,skipped=0;
      syncStatus('loading','Importazione in corso...');
      for(var i=0;i<incoming.length;i++){
        var c=incoming[i];
        var key=(c.word||'').toLowerCase().trim();
        if(existing[key]){skipped++;continue;}
        var ref=await addDoc(collection(db,COLL),{word:c.word,dir:c.dir||'fwd',lc:c.lc||'en',ln:c.ln||'inglese',data:c.data,createdAt:Date.now()+i,hard:false,stats:{ok:0,no:0}});
        cards.unshift({id:ref.id,word:c.word,dir:c.dir||'fwd',lc:c.lc||'en',ln:c.ln||'inglese',status:'ready',data:c.data,tok:null,createdAt:Date.now()+i,hard:false,stats:{ok:0,no:0}});
        existing[key]=true;added++;
      }
      syncStatus('ok',added+' nuove card · '+skipped+' duplicate saltate');
      renderCards();
    }catch(err){syncStatus('err','Errore importazione: '+err.message);}
  };
  reader.readAsText(f);e.target.value='';
}
window.importFromFile=importFromFile;

// ── TOGGLE HARD ──
async function toggleHard(id,ev){
  ev.stopPropagation();
  var card=cards.find(function(c){return c.id===id;});
  if(!card)return;
  card.hard=!card.hard;
  await updateCard(id,{hard:card.hard});
  renderCards();
}
window.toggleHard=toggleHard;

// ── VIEWS ──
function showView(v){
  ['cards','quiz','stats'].forEach(function(x){
    document.getElementById('view-'+x).style.display=x===v?'block':'none';
    document.getElementById('nb-'+x).className='nb'+(x===v?' on':'');
  });
  if(v==='quiz')startQuiz();
  if(v==='stats')renderStats();
}
window.showView=showView;

function setDir(d){
  iDir=d;
  document.getElementById('db-fwd').className='db'+(d==='fwd'?' on':'');
  document.getElementById('db-rev').className='db'+(d==='rev'?' on':'');
  var ln=LN[document.getElementById('lang').value]||'inglese';
  var wi=document.getElementById('win');
  if(d==='fwd'){wi.placeholder='Parola in '+ln+'...';document.getElementById('hint').textContent='Scrivi in '+ln+' → ottieni la traduzione italiana';}
  else{wi.placeholder='Parola in italiano...';document.getElementById('hint').textContent='Scrivi in italiano → ottieni la parola in '+ln;}
}
window.setDir=setDir;

function chkKey(){
  var k=document.getElementById('akey').value.trim();
  var s=document.getElementById('ast');
  if(k.startsWith('sk-ant-')&&k.length>20){s.textContent='ok';s.className='ast ok';try{localStorage.setItem('fc_apikey',k);}catch(e){}}
  else{s.textContent='non impostata';s.className='ast no';}
}
window.chkKey=chkKey;

function loadApiKey(){try{var k=localStorage.getItem('fc_apikey');if(k){document.getElementById('akey').value=k;chkKey();}}catch(e){}}

document.getElementById('win').addEventListener('keydown',function(e){if(e.key==='Enter')addCard();});

async function addCard(){
  var wi=document.getElementById('win');
  var lc=document.getElementById('lang').value;
  var ak=document.getElementById('akey').value.trim();
  var entry=wi.value.trim();
  if(!entry){wi.focus();return;}
  if(!ak||!ak.startsWith('sk-ant-')){document.getElementById('akey').focus();alert('Inserisci prima la tua API key Anthropic.');return;}
  wi.value='';
  var ln=LN[lc];
  var card={id:null,word:entry,dir:iDir,lc:lc,ln:ln,status:'loading',data:null,err:'',tok:null,createdAt:Date.now(),hard:false,stats:{ok:0,no:0}};
  cards.unshift(card);renderCards();syncStatus('loading','Generazione in corso...');
  var sys,msg;
  if(iDir==='fwd'){
    if(lc==='ja'){
      sys='You are a Japanese-Italian dictionary. Respond ONLY with valid JSON, no markdown.\nSchema: {"type":"word|phrasal|idiom|phrase","tr":"Italian translation","lit":"literal if idiom else null","furigana":"word with furigana in format kanji(reading) e.g. 食(た)べる","sy":["syn1 in Japanese with furigana","syn2 in Japanese with furigana","syn3 in Japanese with furigana"],"ei":"example in Italian","eo":"same in Japanese","eo_furi":"Japanese example with furigana annotations"}';
    } else {
      sys='You are a bilingual dictionary (source→Italian). Respond ONLY with valid JSON, no markdown.\nSchema: {"type":"word|phrasal|idiom|phrase","tr":"Italian translation","lit":"literal if idiom else null","sy":["syn1 in '+ln+'","syn2 in '+ln+'","syn3 in '+ln+'"],"ei":"example in Italian","eo":"same in '+ln+'"}';
    }
    msg=ln+': "'+entry+'"';
  }else{
    if(lc==='ja'){
      sys='You are an Italian-Japanese dictionary. Respond ONLY with valid JSON, no markdown.\nSchema: {"type":"word|phrasal|idiom|phrase","tr":"best equivalent in Japanese","furigana":"translation with furigana in format kanji(reading)","lit":"literal back-translation if idiom else null","sy":["syn1 in Japanese with furigana","syn2 in Japanese with furigana","syn3 in Japanese with furigana"],"ei":"example in Italian","eo":"same in Japanese","eo_furi":"Japanese example with furigana annotations"}';
    } else {
      sys='You are a bilingual dictionary (Italian→target). Respond ONLY with valid JSON, no markdown.\nSchema: {"type":"word|phrasal|idiom|phrase","tr":"best equivalent in '+ln+'","lit":"literal back-translation if idiom else null","sy":["syn1 in '+ln+'","syn2 in '+ln+'","syn3 in '+ln+'"],"ei":"example in Italian","eo":"same in '+ln+'"}';
    }
    msg='Italian: "'+entry+'" → translate to '+ln;
  }
  try{
    var res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':ak,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:lc==='ja'?500:350,system:sys,messages:[{role:'user',content:msg}]})});
    if(!res.ok){var er=await res.json();throw new Error(er&&er.error?er.error.message:'HTTP '+res.status);}
    var d=await res.json();
    var txt=(d.content&&d.content[0]?d.content[0].text:'').replace(/```json|```/g,'').trim();
    var p=JSON.parse(txt);
    card.status='ready';
    card.data={type:p.type||'word',tr:p.tr||'',lit:p.lit||null,sy:Array.isArray(p.sy)?p.sy:[],ei:p.ei||'',eo:p.eo||'',furigana:p.furigana||null,eo_furi:p.eo_furi||null};
    card.tok=d.usage||null;
    await saveCard(card);
  }catch(e){card.status='error';card.err=e.message;syncStatus('err','Errore: '+e.message);}
  renderCards();
}
window.addCard=addCard;

function tog(id){
  var b=document.getElementById('cb-'+id);
  var t=document.getElementById('ct-'+id);
  if(!b)return;
  b.classList.toggle('open');
  if(t)t.textContent=b.classList.contains('open')?'▲':'▼';
}
window.tog=tog;

async function del(id){
  cards=cards.filter(function(c){return c.id!==id;});
  renderCards();
  await deleteCard(id);
}
window.del=del;

async function clearAll(){
  if(!confirm('Eliminare tutte le flashcard?'))return;
  syncStatus('loading','Eliminazione in corso...');
  for(var i=0;i<cards.length;i++){if(cards[i].id)await deleteCard(cards[i].id);}
  cards=[];renderCards();syncStatus('ok','Vocabolario svuotato');
}
window.clearAll=clearAll;

async function removeDuplicates(){
  if(!confirm('Rimuovere i duplicati? Verrà tenuta una sola copia per ogni parola.'))return;
  syncStatus('loading','Ricerca duplicati...');
  var seen={};
  var toDelete=[];
  // ordina per createdAt crescente — tiene la più vecchia, elimina le più recenti
  var sorted=[].concat(cards).sort(function(a,b){return (a.createdAt||0)-(b.createdAt||0);});
  sorted.forEach(function(c){
    var key=c.word.toLowerCase().trim();
    if(seen[key]){toDelete.push(c);}
    else{seen[key]=true;}
  });
  if(toDelete.length===0){syncStatus('ok','Nessun duplicato trovato');return;}
  for(var i=0;i<toDelete.length;i++){
    var c=toDelete[i];
    if(c.id)await deleteCard(c.id);
    cards=cards.filter(function(x){return x.id!==c.id;});
  }
  syncStatus('ok','Rimossi '+toDelete.length+' duplicati · '+cards.length+' card rimaste');
  renderCards();
}
window.removeDuplicates=removeDuplicates;

function cost(t){if(!t)return null;return{c:t.input_tokens*PI+t.output_tokens*PO,i:t.input_tokens,o:t.output_tokens};}

function renderCards(){
  var q=document.getElementById('search').value.trim().toLowerCase();
  var filtered=q?cards.filter(function(c){
    return c.word.toLowerCase().includes(q)||(c.data&&c.data.tr&&c.data.tr.toLowerCase().includes(q));
  }):cards;

  var list=document.getElementById('clist');
  var cnt=document.getElementById('cnt');
  var bc=document.getElementById('bclr');
  var tc=document.getElementById('tcost');
  var sc=document.getElementById('search-count');

  if(cards.length===0){
    list.innerHTML='<div class="empty">Nessuna flashcard ancora.<br>Aggiungi parole, phrasal verbs, idioms o frasi.</div>';
    cnt.textContent='';bc.style.display='none';tc.textContent='';sc.textContent='';return;
  }
  var rdy=cards.filter(function(c){return c.status==='ready';}).length;
  cnt.textContent=cards.length+' cards · '+rdy+' pronte';
  bc.style.display='';
  sc.textContent=q?filtered.length+' risultati':'';
  var tot=0;cards.forEach(function(c){var r=cost(c.tok);if(r)tot+=r.c;});
  tc.textContent=tot>0?'costo sessione: $'+tot.toFixed(5):'';

  list.innerHTML=filtered.map(function(c){
    if(c.status==='loading')return '<div class="fc"><div class="cf" style="cursor:default"><div style="display:flex;align-items:center;flex:1"><span class="cw">'+c.word+'</span></div><div class="ca"><div class="spin"></div></div></div><div class="lbar"><div class="spin"></div><span class="ltx">Generazione in corso...</span></div></div>';
    if(c.status==='error')return '<div class="fc"><div class="cf" style="cursor:default"><div style="display:flex;align-items:center;flex:1"><span class="cw">'+c.word+'</span></div><div class="ca"><button class="del" onclick="del(\''+c.id+'\')">×</button></div></div><div class="err">Errore: '+(c.err||'riprova')+'</div></div>';
    var d=c.data,t=tm(d.type);
    var dfwd=c.dir!=='rev';
    var syL=d.type==='idiom'?'Espressioni simili ('+c.ln+')':d.type==='phrasal'?'Phrasal simili ('+c.ln+')':'Sinonimi ('+c.ln+')';
    var sy=(d.sy||[]).map(function(s){return'<span class="syn">'+s+'</span>';}).join('');
    var hardBtn='<span class="diff-badge'+(c.hard?' hard':'')+'" onclick="toggleHard(\''+c.id+'\',event)" title="'+(c.hard?'Rimuovi da difficili':'Segna come difficile')+'">'+(c.hard?'★':'☆')+'</span>';
    var statsHtml='';
    if(c.stats&&(c.stats.ok||c.stats.no)){
      var tot2=c.stats.ok+c.stats.no;
      var pct=Math.round(c.stats.ok/tot2*100);
      statsHtml='<div class="card-stats"><span class="cs-ok">✓ '+c.stats.ok+'</span><span class="cs-no">✗ '+c.stats.no+'</span><span>'+pct+'% corretto</span></div>';
    }
    var furiganaHtml=d.furigana?'<div class="furigana-block"><span class="sl">Furigana</span><div class="furigana-txt">'+d.furigana+'</div></div>':'';
    var eoFuriHtml=d.eo_furi?'<div class="example-furi">'+d.eo_furi+'</div>':'';
    var ci=c.tok?{c:c.tok.input_tokens*PI+c.tok.output_tokens*PO,i:c.tok.input_tokens,o:c.tok.output_tokens}:null;
    var costHtml=ci?'<div class="tki">'+ci.i+'↑ '+ci.o+'↓ · ~$'+ci.c.toFixed(5)+'</div>':'';
    return '<div class="fc"><div class="cf" onclick="tog(\''+c.id+'\')"><div style="display:flex;align-items:center;min-width:0;flex:1;flex-wrap:wrap;gap:2px"><span class="cw">'+c.word+'</span><span class="tb '+t.c+'">'+t.l+'</span><span class="db2 '+(dfwd?'dfwd':'drev')+'">'+(dfwd?c.ln+'→IT':'IT→'+c.ln)+'</span>'+hardBtn+'</div><div class="ca"><span id="ct-'+c.id+'" class="ctog">▼</span><button class="del" onclick="event.stopPropagation();del(\''+c.id+'\')">×</button></div></div><div class="cb" id="cb-'+c.id+'"><div class="sl">'+(dfwd?'Traduzione italiana':'Parola in '+c.ln)+'</div><div class="tr2">'+d.tr+'</div>'+(d.lit?'<div class="lit">lett. "'+d.lit+'"</div>':'')+furiganaHtml+'<div class="sl">'+syL+'</div><div class="syns">'+sy+'</div><div class="sl">Esempio</div><div class="eit">'+d.ei+'</div><div class="eor">'+d.eo+'</div>'+eoFuriHtml+statsHtml+costHtml+'</div></div>';
  }).join('');
}
window.renderCards=renderCards;

// ── STATS VIEW ──
function renderStats(){
  var rdy=cards.filter(function(c){return c.status==='ready'&&c.stats;});
  var totalOk=0,totalNo=0,hard=0;
  rdy.forEach(function(c){totalOk+=c.stats.ok||0;totalNo+=c.stats.no||0;if(c.hard)hard++;});
  var total=totalOk+totalNo;
  var pct=total>0?Math.round(totalOk/total*100):0;
  document.getElementById('stats-overview').innerHTML=
    '<div class="stat-card"><div class="stat-num">'+rdy.length+'</div><div class="stat-lbl">card totali</div></div>'+
    '<div class="stat-card"><div class="stat-num">'+hard+'</div><div class="stat-lbl">difficili</div></div>'+
    '<div class="stat-card"><div class="stat-num">'+total+'</div><div class="stat-lbl">risposte totali</div></div>'+
    '<div class="stat-card"><div class="stat-num">'+pct+'%</div><div class="stat-lbl">risposte corrette</div></div>';

  var studied=rdy.filter(function(c){return (c.stats.ok||0)+(c.stats.no||0)>0;});
  studied.sort(function(a,b){
    var pa=(a.stats.ok||0)/((a.stats.ok||0)+(a.stats.no||1));
    var pb=(b.stats.ok||0)/((b.stats.ok||0)+(b.stats.no||1));
    return pa-pb;
  });

  if(studied.length===0){
    document.getElementById('stats-list').innerHTML='<div class="empty">Nessuna statistica ancora.<br>Fai qualche quiz per vedere i risultati.</div>';
    return;
  }
  document.getElementById('stats-list').innerHTML=studied.map(function(c){
    var t2=(c.stats.ok||0)+(c.stats.no||0);
    var p=t2>0?Math.round((c.stats.ok||0)/t2*100):0;
    return '<div class="stat-row"><span class="stat-word">'+c.word+'</span>'+(c.hard?'<span class="stat-hard">[!]</span>':'')+'<div class="stat-bar-wrap"><div class="stat-bar" style="width:'+p+'%"></div></div><span class="stat-pct">'+p+'%</span></div>';
  }).join('');
}

// ── QUIZ ──
function setQMode(m){
  qInputMode=(m==='mc')?'mc':'write';
  qMode=(m==='mc')?'mixed':m;
  ['mixed','fwd','rev','hard','mc'].forEach(function(x){
    var el=document.getElementById('qm-'+x);
    if(el)el.className='qmb'+(x===m?' on':'');
  });
  startQuiz();
}
window.setQMode=setQMode;

function startQuiz(){
  var qlang=document.getElementById('qlang').value;
  var rdy=cards.filter(function(c){
    if(c.status!=='ready'||!c.data||!c.data.tr)return false;
    if(qMode==='hard'&&!c.hard)return false;
    if(qlang!=='all'&&c.lc!==qlang)return false;
    return true;
  });
  var qe=document.getElementById('qempty');
  var qm=document.getElementById('qmain');
  var qs=document.getElementById('qscore');
  if(rdy.length===0){
    qe.style.display='block';qm.style.display='none';qs.style.display='none';
    if(qMode==='hard')qe.textContent='Nessuna card segnata come difficile. Segna qualche card dal Vocabolario.';
    else qe.textContent='Nessuna flashcard disponibile.\nAggiungi qualche parola prima.';
    return;
  }
  qe.style.display='none';qs.style.display='none';qm.style.display='block';
  var items=[];
  rdy.forEach(function(c){
    if(qMode==='mixed'||qMode==='fwd'||qMode==='hard')items.push({c:c,ask:'fwd'});
    if(qMode==='mixed'||qMode==='rev')items.push({c:c,ask:'rev'});
  });
  qQueue=items.sort(function(){return Math.random()-.5;});
  qIdx=0;qOk=0;qDone=false;
  showQ();
}
window.startQuiz=startQuiz;

function showQ(){
  var tot=qQueue.length;
  document.getElementById('qpf').style.width=(qIdx/tot*100)+'%';
  document.getElementById('qpl').textContent=qIdx+' / '+tot;
  var item=qQueue[qIdx];
  var c=item.c,ask=item.ask;
  var t=tm(c.data.type);
  var tb=document.getElementById('qtb');
  tb.textContent=t.l+(c.hard?' [!]':'');tb.className='tb '+t.c;
  if(ask==='fwd'){
    document.getElementById('qql').textContent='Come si dice in italiano?';
    document.getElementById('qqw').textContent=c.word;
    document.getElementById('qll').textContent=c.ln;
    document.getElementById('qi').placeholder='Traduzione italiana...';
  }else{
    document.getElementById('qql').textContent='Come si dice in '+c.ln+'?';
    document.getElementById('qqw').textContent=c.data.tr;
    document.getElementById('qll').textContent='italiano';
    document.getElementById('qi').placeholder='Parola in '+c.ln+'...';
  }
  var isMC=qInputMode==='mc';
  var qi=document.getElementById('qi');
  qi.value='';qi.className='qi';qi.disabled=false;
  document.getElementById('qfb').style.display='none';
  document.getElementById('qfb').className='qfb';
  document.getElementById('bnxt').style.display='none';
  // show/hide write vs MC elements
  document.getElementById('qirow').style.display=isMC?'none':'';
  document.getElementById('qwrite-actions').style.display=isMC?'none':'';
  document.getElementById('bchk').style.display=isMC?'none':'';
  document.getElementById('brev').disabled=false;
  document.getElementById('bskip').disabled=false;
  var mcOpts=document.getElementById('qmc-opts');
  if(isMC){mcOpts.style.display='flex';buildMCOptions(item);}
  else{mcOpts.style.display='none';mcOpts.innerHTML='';}
  qDone=false;
  // auto-pronuncia la parola straniera
  if(ask==='fwd')speakWord();
  if(!isMC)setTimeout(function(){qi.focus();},50);
}

document.getElementById('qi').addEventListener('keydown',function(e){
  if(e.key==='Enter'){if(!qDone)checkAns();else nextQ();}
});

function norm(s){return(s||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,' ').trim();}

async function recordStat(card,ok){
  if(!card.id)return;
  card.stats=card.stats||{ok:0,no:0};
  if(ok)card.stats.ok++;else card.stats.no++;
  await updateCard(card.id,{stats:card.stats});
}

function checkAns(){
  if(qDone)return;
  var item=qQueue[qIdx];
  var c=item.c,ask=item.ask;
  var raw=document.getElementById('qi').value;
  if(!raw.trim())return;
  var correct=ask==='fwd'?c.data.tr:c.word;
  var parts=correct.split(/[\/,]/).map(function(p){return norm(p);}).filter(Boolean);
  var un=norm(raw);
  var ok=parts.some(function(p){return p===un;})||norm(correct)===un;
  qDone=true;if(ok)qOk++;
  recordStat(c,ok);
  var qi=document.getElementById('qi');
  qi.className='qi '+(ok?'ok':'no');qi.disabled=true;
  var fb=document.getElementById('qfb');
  fb.className='qfb '+(ok?'ok':'no');
  document.getElementById('qft').textContent=ok?'Corretto!':'Non esatto';
  if(ok){document.getElementById('qfd').textContent='"'+c.word+'" = "'+correct+'"';}
  else{
    var lit=c.data.lit?'<br><em>lett. "'+c.data.lit+'"</em>':'';
    document.getElementById('qfd').innerHTML='Risposta corretta: <strong>'+correct+'</strong>'+lit+'<br><span style="color:var(--tx3);font-style:italic">'+c.data.ei+'</span>';
  }
  fb.style.display='block';
  document.getElementById('bchk').style.display='none';
  document.getElementById('brev').disabled=true;
  document.getElementById('bskip').disabled=true;
  document.getElementById('bnxt').style.display='block';
  document.getElementById('bnxt').textContent=qIdx+1<qQueue.length?'Prossima →':'Risultati →';
}
window.checkAns=checkAns;

function revealAns(){
  if(qDone)return;
  var item=qQueue[qIdx];
  var c=item.c,ask=item.ask;
  var correct=ask==='fwd'?c.data.tr:c.word;
  qDone=true;
  recordStat(c,false);
  var qi=document.getElementById('qi');
  qi.className='qi no';qi.disabled=true;
  var fb=document.getElementById('qfb');
  fb.className='qfb no';
  document.getElementById('qft').textContent='Risposta';
  var lit=c.data.lit?'<br><em>lett. "'+c.data.lit+'"</em>':'';
  document.getElementById('qfd').innerHTML='<strong>'+correct+'</strong>'+lit+'<br><span style="color:var(--tx3);font-style:italic">'+c.data.ei+'</span>';
  fb.style.display='block';
  document.getElementById('bchk').style.display='none';
  document.getElementById('brev').disabled=true;
  document.getElementById('bskip').disabled=true;
  document.getElementById('bnxt').style.display='block';
  document.getElementById('bnxt').textContent=qIdx+1<qQueue.length?'Prossima →':'Risultati →';
}
window.revealAns=revealAns;

function skipQ(){
  if(qDone)return;
  var skipped=qQueue.splice(qIdx,1)[0];
  qQueue.push(skipped);
  if(qIdx>=qQueue.length)qIdx=0;
  showQ();
}
window.skipQ=skipQ;

function nextQ(){qIdx++;if(qIdx>=qQueue.length)showScore();else showQ();}
window.nextQ=nextQ;

function showScore(){
  document.getElementById('qmain').style.display='none';
  document.getElementById('qscore').style.display='block';
  document.getElementById('snum').textContent=qOk+'/'+qQueue.length;
  var pct=Math.round(qOk/qQueue.length*100);
  var msg=pct===100?'perfetto!':pct>=80?'ottimo risultato':pct>=60?'buon lavoro':pct>=40?"ancora un po' di ripasso":'ripassia ancora';
  document.getElementById('slbl2').textContent=pct+'% — '+msg;
}

// ── SPEECH ──
function speakWord(){
  var item=qQueue[qIdx];
  if(!item)return;
  var c=item.c,ask=item.ask;
  var text=ask==='fwd'?c.word:(c.data&&c.data.tr?c.data.tr:c.word);
  var lang=ask==='fwd'?c.lc:'it';
  var lcMap={en:'en-US',es:'es-ES',fr:'fr-FR',de:'de-DE',pt:'pt-PT',ja:'ja-JP',zh:'zh-CN',ru:'ru-RU',ar:'ar-SA'};
  var utter=new SpeechSynthesisUtterance(text);
  utter.lang=lcMap[lang]||lang;
  speechSynthesis.cancel();
  speechSynthesis.speak(utter);
}
window.speakWord=speakWord;

// ── MULTIPLE CHOICE ──
function buildMCOptions(item){
  var c=item.c,ask=item.ask;
  var correct=ask==='fwd'?(c.data&&c.data.tr?c.data.tr:c.word):c.word;
  // 3 distrattori da card della stessa lingua
  var pool=cards.filter(function(x){
    if(!x.data||!x.data.tr)return false;
    if(x.id===c.id)return false;
    if(x.lc!==c.lc)return false;
    return true;
  });
  pool.sort(function(){return Math.random()-.5;});
  var distractors=pool.slice(0,3).map(function(x){return ask==='fwd'?x.data.tr:x.word;});
  // se non ci sono abbastanza card della stessa lingua, prendi da altre
  if(distractors.length<3){
    var extra=cards.filter(function(x){
      if(!x.data||!x.data.tr)return false;
      if(x.id===c.id)return false;
      if(x.lc===c.lc)return false;
      return true;
    });
    extra.sort(function(){return Math.random()-.5;});
    extra.slice(0,3-distractors.length).forEach(function(x){distractors.push(ask==='fwd'?x.data.tr:x.word);});
  }
  var opts=[correct].concat(distractors).sort(function(){return Math.random()-.5;});
  var container=document.getElementById('qmc-opts');
  container.innerHTML='';
  opts.forEach(function(opt){
    var btn=document.createElement('button');
    btn.className='mc-opt';
    btn.textContent=opt;
    btn.onclick=function(){checkMC(opt,correct,btn);};
    container.appendChild(btn);
  });
}
window.buildMCOptions=buildMCOptions;

function checkMC(chosen,correct,btn){
  if(qDone)return;
  qDone=true;
  var ok=norm(chosen)===norm(correct);
  var btns=document.querySelectorAll('.mc-opt');
  btns.forEach(function(b){
    if(norm(b.textContent)===norm(correct))b.classList.add('mc-correct');
    else if(b===btn&&!ok)b.classList.add('mc-wrong');
    b.disabled=true;
  });
  recordStat(qQueue[qIdx].c,ok);
  if(ok)qOk++;
  var fb=document.getElementById('qfb');
  fb.className='qfb '+(ok?'ok':'no');
  document.getElementById('qft').textContent=ok?'Corretto!':'Non esatto';
  var c=qQueue[qIdx].c,ask=qQueue[qIdx].ask;
  if(ok){document.getElementById('qfd').textContent='"'+(ask==='fwd'?c.word:c.data.tr)+'" = "'+correct+'"';}
  else{
    var lit=c.data.lit?'<br><em>lett. "'+c.data.lit+'"</em>':'';
    document.getElementById('qfd').innerHTML='Risposta corretta: <strong>'+correct+'</strong>'+lit+'<br><span style="color:var(--tx3);font-style:italic">'+c.data.ei+'</span>';
  }
  fb.style.display='block';
  document.getElementById('bnxt').style.display='block';
  document.getElementById('bnxt').textContent=qIdx+1<qQueue.length?'Prossima →':'Risultati →';
}
window.checkMC=checkMC;

// ── START ──
setDir('fwd');
loadApiKey();
loadFromFirestore();
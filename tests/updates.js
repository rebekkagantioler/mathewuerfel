const assert=(value,message)=>{if(!value)throw Error(message)};
const buttons=[{disabled:false,textContent:''},{disabled:false,textContent:''}],statuses=[{textContent:''}],listeners={};let reloads=0;
const win={isSecureContext:true,addEventListener(){},location:{reload(){reloads++}}};
const doc={querySelectorAll:selector=>selector==='[data-update-status]'?statuses:buttons};buttons.forEach(b=>b.addEventListener=()=>{});
let updates=0;
const reg={waiting:null,installing:null,async update(){updates++},addEventListener(){}};
const nav={onLine:true,serviceWorker:{controller:{},addEventListener(name,fn){listeners[name]=fn},getRegistration:async()=>reg}};
const api=new Function('window','document','navigator',updatesSource+'\nreturn {checkAppUpdate,observeAppUpdates}')(win,doc,nav);
api.observeAppUpdates(reg);
listeners.controllerchange();assert(reloads===0,'Unexpected reload');
await api.checkAppUpdate();assert(updates===1&&statuses[0].textContent.includes('aktuell'),'Current version');
nav.onLine=false;await api.checkAppUpdate();assert(statuses[0].textContent.includes('offline')&&buttons.every(b=>!b.disabled),'Offline status');nav.onLine=true;
reg.update=async()=>{throw Error('offline')};await api.checkAppUpdate();assert(statuses[0].textContent.includes('nicht geladen')&&buttons.every(b=>!b.disabled),'Failed update recovery');
let workerEvents={};const installing={state:'installing',addEventListener(n,fn){workerEvents[n]=fn},removeEventListener(){}};
reg.update=async()=>{reg.installing=installing;setTimeout(()=>{installing.state='installed';reg.installing=null;reg.waiting={postMessage(msg){assert(msg.type==='SKIP_WAITING','Wrong activation message');listeners.controllerchange()}};workerEvents.statechange()},10)};
await api.checkAppUpdate();assert(reloads===1,'User requested update did not reload');listeners.controllerchange();assert(reloads===1,'Reload loop');
async function testWorker(manual,fail=false){
 const events={},deleted=[],assets=[];let skipped=0,claimed=0;
 const scope={registration:{active:{postMessage(message,ports){if(manual)ports[0].postMessage({manualUpdates:true})}}},location:{origin:'https://app.test'},addEventListener(name,fn){events[name]=fn},skipWaiting:async()=>{skipped++},clients:{claim:async()=>{claimed++}}};
 const cache={addAll:async requests=>{if(fail)throw Error('Asset missing');assets.push(...requests)},match:async req=>req.url.endsWith('app.js')?'cached app':null};
 const storage={open:async()=>cache,keys:async()=>['zahlen-abenteuer-v9','zahlen-abenteuer-v10','unrelated-cache'],delete:async key=>{deleted.push(key)}};
 class FakeRequest{constructor(url,options){this.url=url;this.cache=options.cache}}
 new Function('self','caches','Request','MessageChannel','setTimeout','clearTimeout','fetch',workerSource)(scope,storage,FakeRequest,MessageChannel,(fn,ms)=>setTimeout(fn,Math.min(ms,20)),clearTimeout,async()=> 'network');
 let installation;events.install({waitUntil(promise){installation=promise}});
 if(fail){let rejected=false;try{await installation}catch{rejected=true}assert(rejected&&skipped===0,'Incomplete update activated');return}
 await installation;assert(skipped===(manual?0:1),'Legacy/manual activation policy');
 assert(assets.some(a=>a.url==='./stories.js')&&assets.some(a=>a.url==='./updates.js')&&assets.every(a=>a.cache==='reload'),'Atomic asset cache');
 let activation;events.activate({waitUntil(promise){activation=promise}});await activation;assert(deleted.join(',')==='zahlen-abenteuer-v9'&&claimed===1,'Cache deletion touched foreign data');
 let response;events.fetch({request:{url:'https://app.test/app.js',method:'GET'},respondWith(promise){response=promise}});assert(await response==='cached app','Core cache missed');
 events.fetch({request:{url:'https://other.test/private',method:'GET'},respondWith(){throw Error('Cross-origin interception')}});
 let skip;events.message({data:{type:'SKIP_WAITING'},waitUntil(promise){skip=promise}});await skip;assert(skipped===(manual?1:2),'Explicit activation');
}
await testWorker(true);await testWorker(false);await testWorker(true,true);
return 'Passed: current version, offline, failure recovery, install/activate/reload, no reload loop, legacy upgrade, atomic cache, profile/cache preservation';

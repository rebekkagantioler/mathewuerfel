const assert=(value,message)=>{if(!value)throw Error(message)};
const buttons=[{disabled:false,textContent:''},{disabled:false,textContent:''}],statuses=[{textContent:''}],listeners={};let reloads=0;
const win={isSecureContext:true,addEventListener(){},setInterval(){},location:{reload(){reloads++}}};
const doc={addEventListener(){},querySelectorAll:selector=>selector==='[data-update-status]'?statuses:buttons};buttons.forEach(b=>b.addEventListener=()=>{});
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
// Automatic updates must wait for a safe screen, visibility and connectivity.
let safe=false,autoReloads=0,autoChecks=0,activations=0,intervalMs=0;
const autoEvents={},autoDoc={visibilityState:'visible',querySelectorAll:doc.querySelectorAll,addEventListener(name,fn){autoEvents[name]=fn}};
const autoWin={isSecureContext:true,canApplyAppUpdate:()=>safe,location:{reload(){autoReloads++}},addEventListener(name,fn){autoEvents[name]=fn},setInterval(fn,ms){intervalMs=ms}};
const autoNav={onLine:true,serviceWorker:{controller:{},addEventListener(name,fn){autoEvents[name]=fn}}};
const autoApi=new Function('window','document','navigator',updatesSource+'\nreturn {observeAppUpdates,checkAutomaticAppUpdate,applyPendingAppUpdate}')(autoWin,autoDoc,autoNav);
const autoReg={waiting:null,installing:null,addEventListener(){},async update(){autoChecks++}};
autoApi.observeAppUpdates(autoReg);
await autoApi.checkAutomaticAppUpdate(true);assert(autoChecks===1&&intervalMs===60000,'Automatic check missing');
await autoApi.checkAutomaticAppUpdate();assert(autoChecks===1,'Automatic check not throttled');
autoNav.onLine=false;await autoApi.checkAutomaticAppUpdate(true);assert(autoChecks===1,'Checked while offline');autoNav.onLine=true;
autoDoc.visibilityState='hidden';await autoApi.checkAutomaticAppUpdate(true);assert(autoChecks===1,'Checked while hidden');autoDoc.visibilityState='visible';
autoReg.waiting={postMessage(){activations++;autoEvents.controllerchange()}};
autoApi.applyPendingAppUpdate();assert(activations===0&&autoReloads===0,'Interrupted an exercise');
safe=true;autoDoc.visibilityState='hidden';autoApi.applyPendingAppUpdate();assert(activations===0,'Activated while hidden');
autoDoc.visibilityState='visible';autoApi.applyPendingAppUpdate();assert(activations===1&&autoReloads===1,'Safe automatic activation failed');
autoApi.applyPendingAppUpdate();autoEvents.controllerchange();assert(autoReloads===1,'Automatic reload loop');
async function testWorker(manual,fail=false){
 const events={},deleted=[],assets=[];let skipped=0,claimed=0;
 const scope={registration:{active:{postMessage(message,ports){if(manual)ports[0].postMessage({manualUpdates:true})}}},location:{origin:'https://app.test'},addEventListener(name,fn){events[name]=fn},skipWaiting:async()=>{skipped++},clients:{claim:async()=>{claimed++}}};
 const cache={addAll:async requests=>{if(fail)throw Error('Asset missing');assets.push(...requests)},match:async req=>req.url.endsWith('app.js')?'cached app':null};
 const storage={open:async()=>cache,keys:async()=>['zahlen-abenteuer-v13',workerSource.match(/const CACHE_NAME = '([^']+)'/)[1],'unrelated-cache'],delete:async key=>{deleted.push(key)}};
 class FakeRequest{constructor(url,options){this.url=url;this.cache=options.cache}}
 new Function('self','caches','Request','MessageChannel','setTimeout','clearTimeout','fetch',workerSource)(scope,storage,FakeRequest,MessageChannel,(fn,ms)=>setTimeout(fn,Math.min(ms,20)),clearTimeout,async()=> 'network');
 let installation;events.install({waitUntil(promise){installation=promise}});
 if(fail){let rejected=false;try{await installation}catch{rejected=true}assert(rejected&&skipped===0,'Incomplete update activated');return}
 await installation;assert(skipped===(manual?0:1),'Legacy/manual activation policy');
 assert(assets.filter(a=>a.url.startsWith('./assets/themes/')&&a.url.endsWith('.jpg')).length===9,'Offline theme illustrations missing');
 assert(assets.some(a=>a.url==='./stories.js')&&assets.some(a=>a.url==='./updates.js')&&assets.every(a=>a.cache==='reload'),'Atomic asset cache');
 let activation;events.activate({waitUntil(promise){activation=promise}});await activation;assert(deleted.join(',')==='zahlen-abenteuer-v13'&&claimed===1,'Cache deletion touched foreign data');
 let response;events.fetch({request:{url:'https://app.test/app.js',method:'GET'},respondWith(promise){response=promise}});assert(await response==='cached app','Core cache missed');
 events.fetch({request:{url:'https://other.test/private',method:'GET'},respondWith(){throw Error('Cross-origin interception')}});
 let skip;events.message({data:{type:'SKIP_WAITING'},waitUntil(promise){skip=promise}});await skip;assert(skipped===(manual?1:2),'Explicit activation');
}
await testWorker(true);await testWorker(false);await testWorker(true,true);
return 'Passed: automatic checks, throttle, safe activation, visibility, offline, current version, offline, failure recovery, install/activate/reload, no reload loop, legacy upgrade, atomic cache, profile/cache preservation';

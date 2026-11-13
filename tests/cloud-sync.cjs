const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('app.js','utf8');
const code=source.slice(source.indexOf('const CLOUD_QUEUE_KEY='),source.indexOf('async function backUpProfileOnline('));
const makeProfile=(stars=400)=>({id:'local',cloudId:'online',name:'Marilena',areaStars:{mal:stars},emoji:'🐰',sharedLevelVersion:1});
function setup(storage=new Map(),initial=[makeProfile()]){
 let response={data:true},requests=[],active=initial[0],confirm=true;
 const labels=[{textContent:''}],timers=[];
 const context={STORAGE_KEY:'test',profiles:initial,cloudClient:{rpc:async(name,args)=>{requests.push({name,args});return typeof response==='function'?response(name,args):response}},cloudPins:new Map(),cloudSyncTimer:null,teacherPreview:false,navigator:{onLine:true},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},window:{setTimeout:fn=>{timers.push(fn);return timers.length},clearTimeout(){},setInterval(){},addEventListener(){},confirm:()=>confirm,alert(){}},document:{visibilityState:'visible',querySelectorAll:()=>labels,addEventListener(){}},getProfile:()=>active,getTotalStars:p=>Object.values(p.areaStars||{}).reduce((a,b)=>a+b,0),getRewardLevel:p=>Math.floor(Object.values(p.areaStars||{}).reduce((a,b)=>a+b,0)/50)+1,migrateProfileAreas(){}};
 vm.createContext(context);vm.runInContext(code+'\nthis.api={scheduleCloudSync,flushCloudSaves,reconcileOpenedCloudProfile,renderCloudSyncStatus,pendingCloudSaves};',context);
 return {context,api:context.api,requests,storage,labels,setResponse:r=>response=r,setConfirm:v=>confirm=v};
}
(async()=>{
 let test=setup();test.context.cloudPins.set('online','123456');test.context.navigator.onLine=false;
 test.api.scheduleCloudSync();await test.api.flushCloudSaves();assert.equal(test.requests.length,0);assert.equal(test.api.pendingCloudSaves.size,1);assert.match(test.labels[0].textContent,/Offline/);assert.ok(!test.storage.get('test:pending-cloud').includes('123456'));
 test=setup(test.storage,[makeProfile(0)]);assert.equal(test.context.profiles[0].areaStars.mal,400);assert.equal(test.api.pendingCloudSaves.size,1);
 await test.api.flushCloudSaves();assert.equal(test.requests.length,0);assert.match(test.labels[0].textContent,/Passwort/);
 test.context.cloudPins.set('online','123456');await test.api.flushCloudSaves();assert.equal(test.api.pendingCloudSaves.size,0);assert.equal(JSON.parse(test.storage.get('test:pending-cloud')).length,0);assert.match(test.labels[0].textContent,/online gespeichert/);
 test=setup();test.context.cloudPins.set('online','123456');test.api.scheduleCloudSync();test.setResponse({error:{message:'offline'}});await test.api.flushCloudSaves();assert.equal(test.api.pendingCloudSaves.size,1);
 test.setResponse({data:false});await test.api.flushCloudSaves();assert.equal(test.api.pendingCloudSaves.size,1);assert.equal(test.context.cloudPins.size,0);
 // Only one writer may run; newer snapshots remain queued while an older save is in flight.
 test=setup();test.context.cloudPins.set('online','123456');test.api.scheduleCloudSync();let release;
 test.setResponse(()=>new Promise(resolve=>{release=resolve}));const first=test.api.flushCloudSaves(),second=test.api.flushCloudSaves();assert.equal(first,second);assert.equal(test.requests.length,1);
 test.context.profiles[0].areaStars.mal=450;test.api.scheduleCloudSync();release({data:true});await first;assert.equal(test.api.pendingCloudSaves.get('online').profile.areaStars.mal,450);
 test.setResponse({data:true});await test.api.flushCloudSaves();assert.equal(test.api.pendingCloudSaves.size,0);
 // Retain legacy higher progress until explicit confirmation, then upload before loading remote.
 test=setup();test.setConfirm(false);assert.equal(await test.api.reconcileOpenedCloudProfile('online','123456',{profile_data:makeProfile(0)}),null);assert.equal(test.requests.length,0);
 test.setConfirm(true);test.setResponse(name=>name==='save_student_profile'?{data:true}:{data:[{id:'online',profile_data:makeProfile(400)}]});
 const recovered=await test.api.reconcileOpenedCloudProfile('online','123456',{profile_data:makeProfile(0)});assert.equal(recovered.profile_data.areaStars.mal,400);assert.equal(test.requests[0].name,'save_student_profile');
 // A failed upload never replaces the retained local level with a stale download.
 test=setup();test.api.scheduleCloudSync();test.setResponse({error:{message:'network'}});assert.equal(await test.api.reconcileOpenedCloudProfile('online','123456',{profile_data:makeProfile(0)}),null);assert.equal(test.context.profiles[0].areaStars.mal,400);
 console.log('Passed: durable queue, offline/restart recovery, no persisted passwords, missing login, failed upload, invalid PIN, serialized saves, newer snapshots, higher-level recovery, stale-download protection');
})().catch(error=>{console.error(error);process.exitCode=1});

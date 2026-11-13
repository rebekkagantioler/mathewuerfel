const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('app.js','utf8');
(async()=>{
 const field={value:'1234567890123456',focus(){},select(){this.selected=true},setSelectionRange(start,end){this.range=[start,end]}},message={textContent:''},area={classList:{add(){this.hidden=true}}};let copied;
 const context={document:{getElementById:id=>id==='teacherResetCode'?field:id==='teacherResetCopyMessage'?message:area},navigator:{clipboard:{writeText:async value=>{copied=value}}}};
 vm.createContext(context);vm.runInContext(source.slice(source.indexOf('function clearTeacherResetCode('),source.indexOf('async function createTeacherResetCode(')),context);
 await context.copyTeacherResetCode();assert.equal(copied,'1234567890123456');assert.equal(message.textContent,'Code kopiert.');assert.equal(field.range[1],16);
 context.navigator.clipboard.writeText=async()=>{throw Error('denied')};await context.copyTeacherResetCode();assert.match(message.textContent,/markiert/);assert.equal(field.selected,true);
 delete context.navigator.clipboard;await context.copyTeacherResetCode();assert.match(message.textContent,/Kopieren/);
 context.clearTeacherResetCode();assert.equal(field.value,'');assert.equal(area.classList.hidden,true);assert.equal(message.textContent,'');
 // Multiple submit events share one pending operation; failed attempts unlock the form.
 let release,calls=0,fail=false;const submit={disabled:false};
 const createContext={elements:{profileForm:{querySelector:()=>submit}},window:{alert(){}},createProfileOnce:async()=>{calls++;if(fail)throw Error('network');return new Promise(resolve=>{release=resolve})}};
 vm.createContext(createContext);vm.runInContext(source.slice(source.indexOf('let profileCreationBusy='),source.indexOf('async function createProfileOnce(')),createContext);
 const first=createContext.createProfile('Marilena','rabbit','123456');await createContext.createProfile('Marilena','rabbit','123456');assert.equal(calls,1);assert.equal(submit.disabled,true);release(true);assert.equal(await first,true);assert.equal(submit.disabled,false);
 fail=true;await createContext.createProfile('Marilena','rabbit','123456');assert.equal(submit.disabled,false);
 // The online-connection operation also rejects repeat taps and already connected profiles.
 let backupRelease,backups=0;const profile={id:'local'};
 const backupContext={getProfile:()=>profile,backUpProfileOnlineOnce:async()=>{backups++;return new Promise(resolve=>{backupRelease=resolve})},window:{alert(){}}};
 vm.createContext(backupContext);vm.runInContext(source.slice(source.indexOf('const onlineBackupInFlight='),source.indexOf('async function backUpProfileOnlineOnce(')),backupContext);
 const backup=backupContext.backUpProfileOnline();await backupContext.backUpProfileOnline();assert.equal(backups,1);profile.cloudId='online';backupRelease();await backup;await backupContext.backUpProfileOnline();assert.equal(backups,1);
 console.log('Passed: copy exact code, clipboard denial/unavailability fallback, clear on profile change, double-submit guard, failure unlock, duplicate online-connection guard');
})().catch(error=>{console.error(error);process.exitCode=1});

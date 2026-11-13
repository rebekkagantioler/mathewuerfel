const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('app.js','utf8');
const functions=source.slice(source.indexOf('async function loadAllTeacherProfiles('),source.indexOf('function renderTeacherDashboard('));
(async()=>{
  const message={textContent:''},button={disabled:false},local=[{id:'local'}],calls=[];
  let fail=false;
  const context={teacherOnlineProfiles:null,teacherOnlineSecret:null,profiles:local,pendingCloudSaves:new Map(),document:{getElementById:id=>id==='teacherOnlineMessage'?message:button},window:{prompt:()=> 'secret'},migrateProfileAreas:p=>{p.migrated=true},openTeacherArea:()=>{},cloudClient:{rpc:async(name,args)=>{calls.push({name,args});if(fail)throw Error('offline');return name==='teacher_list_profiles'?{data:[{id:'one',profile_name:'Marilena',profile_data:{id:'legacy',areaStars:{mal:50}}},{id:'two',profile_name:'Marilena',profile_data:{id:'legacy',areaStars:{mal:150}}}]}:{data:true}}}};
  vm.createContext(context);vm.runInContext(functions,context);
  await context.loadAllTeacherProfiles();
  assert.equal(context.teacherOnlineProfiles.length,2);assert.equal(context.teacherOnlineProfiles[0].id,'one');assert.equal(context.teacherOnlineProfiles[1].id,'two');assert.equal(local.length,1);assert.equal(context.teacherOnlineSecret,'secret');assert.equal(button.disabled,false);
  const profile=context.teacherOnlineProfiles[0];await context.saveOnlineTeacherChanges(profile,{assignment:null},message);assert.equal(calls.at(-1).name,'teacher_update_profile');assert.equal(profile.assignment,null);assert.equal(profile.areaStars.mal,50);
  fail=true;await context.loadAllTeacherProfiles();assert.equal(context.teacherOnlineProfiles.length,2);assert.equal(button.disabled,false);assert.match(message.textContent,/nicht geladen/);
  await context.saveOnlineTeacherChanges(profile,{assignment:{target:9}},message);assert.equal(profile.assignment,null);assert.match(message.textContent,/Nicht gespeichert/);
  console.log('Passed: all profiles, duplicate names and legacy IDs, local isolation, teacher patch, load failure, save failure');
})().catch(error=>{console.error(error);process.exitCode=1});

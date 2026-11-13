const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync('app.js','utf8');
const helper=source.slice(source.indexOf('async function openWithPasswordOrReset('),source.indexOf('async function generateRecoveryCode('));
async function run(responses,answers){
  const calls=[],alerts=[],pins=new Map([['student','old']]),saves=new Map([['student',{}]]);
  const context={cloudClient:{rpc:async(name,args)=>{calls.push({name,args});assert.ok(responses.length,'Unexpected RPC');return responses.shift()}},window:{prompt:()=>answers.shift(),alert:text=>alerts.push(text)},cloudPins:pins,pendingCloudSaves:saves};
  vm.createContext(context);vm.runInContext(helper,context);
  const result=await context.openWithPasswordOrReset('student','1234567890123456');
  return {result,calls,alerts,pins,saves};
}
(async()=>{
  let test=await run([{data:[{id:'student'}]}],[]);
  assert.equal(test.calls.length,1);assert.equal(test.result.pin,'1234567890123456');
  test=await run([{data:[]},{data:false}],[]);assert.equal(test.calls.length,2);
  for(const answers of [[null],['123'],['123456','654321'],['123456',null]]){
    test=await run([{data:[]},{data:true}],answers);assert.equal(test.result.cancelled,true);assert.equal(test.calls.length,2);assert.equal(test.pins.size,1);
  }
  test=await run([{data:[]},{data:true},{data:true},{data:[{id:'student'}]}],['654321','654321']);
  assert.equal(test.result.pin,'654321');assert.equal(test.calls[2].name,'reset_student_password');assert.equal(test.calls[2].args.p_code,'1234567890123456');assert.equal(test.calls[3].args.p_pin,'654321');assert.equal(test.pins.size,0);assert.equal(test.saves.size,1);
  test=await run([{data:[]},{data:true},{error:{message:'expired'}}],['654321','654321']);assert.equal(test.result.cancelled,true);assert.equal(test.calls.length,3);
  test=await run([{error:{message:'offline'}}],[]);assert.equal(test.calls.length,1);
  console.log('Passed: normal login, invalid code, cancellation, validation, confirmation mismatch, successful reset, failed reset, connection error');
})().catch(error=>{console.error(error);process.exitCode=1});

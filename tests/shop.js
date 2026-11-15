const assert=(ok,message)=>{if(!ok)throw Error(message)};
const originalTimeout=window.setTimeout,originalRows=requestRows;
window.setTimeout=()=>0;requestRows=()=>false;
try{
 teacherPreview=false;
 for(const level of [1,4,9,11,100]){
  const profile={id:'shop-test',name:'Test',sharedLevelVersion:1,areaStars:{mal:(level-1)*50},facts:{},activityCounts:{}};
  profiles=[profile];activeProfileId=profile.id;activeRows=[2,3,6];
  startShopGame('fruit');
  assert(!elements.operationChoices.classList.contains('hidden'),'Choices missing at level '+level);
  assert(!document.querySelector('#shopEquationInput')&&!document.querySelector('#shopAnswerZone'),'Answer input still exists');
  for(const station of ['fruit','bakery','checkout','stock'])for(const operation of ['+','-','*','/']){
   shopState.station=station;shopState.question=0;shopState.operations=[operation];shopState.score=0;nextShopQuestion();
   const buttons=[...elements.operationChoices.querySelectorAll('button')];
   assert(buttons.length===4&&buttons.every(button=>!button.disabled&&!button.classList.contains('hidden')),'Four choices not available');
   const beforeStars=getTotalStars(profile),beforeCount=profile.activityCounts.shop||0;
   const wrong=buttons.find(button=>button.dataset.operation!==operation);chooseShopOperation(wrong.dataset.operation,wrong);
   assert(shopState.question===0&&getTotalStars(profile)===beforeStars,'Wrong operation completed task');
   const correct=buttons.find(button=>button.dataset.operation===operation);chooseShopOperation(operation,correct);
   assert(shopState.question===1&&shopState.locked,'Correct operation did not finish immediately');
   assert(getTotalStars(profile)===beforeStars+1&&profile.activityCounts.shop===beforeCount+1,'Progress not awarded');
   chooseShopOperation(operation,correct);completeShopTask();
   assert(getTotalStars(profile)===beforeStars+1&&profile.activityCounts.shop===beforeCount+1,'Repeated click awarded twice');
  }
  profile.shopPractice={rounds:{}};startShopGame('fruit');const correct=[...elements.operationChoices.querySelectorAll('button')].find(button=>button.dataset.operation===shopState.task.operation);chooseShopOperation(correct.dataset.operation,correct);
  assert(shopState.score===1,'First correct operation not counted');
 }
 return 'Passed: operation-only shop at levels 1/4/9/11/100, all stations and operations, four choices, no equation/result input, wrong-choice retry, immediate completion, progress and repeated-click protection';
}finally{window.setTimeout=originalTimeout;requestRows=originalRows}

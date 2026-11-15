const assert=(ok,message)=>{if(!ok)throw Error(message)};
const originalRows=requestRows;requestRows=()=>false;
try{
 teacherPreview=false;activeRows=[3,6];
 profiles=[{id:'round-test',name:'Test',sharedLevelVersion:1,facts:{},areaStars:{mal:500},activityCounts:{}}];activeProfileId='round-test';
 openStories();storyUI.storyTier.value='1';startStories();
 const solve=()=>{const task=storyState.task;storyUI.storyWork.value=task.steps.map((step,i)=>step+'='+task.results[i]).join('\n');checkStory()};
 for(let i=0;i<3;i++){solve();if(i<2)storyUI.storyNext.click()}
 const stars=getTotalStars(getProfile()),taskText=storyState.task.text;
 storyUI.storyHome.click();assert(getTotalStars(getProfile())===stars,'Leaving removed earned stars');
 // Reload the profile from storage and clear the transient round state.
 profiles=JSON.parse(localStorage.getItem(STORAGE_KEY));storyState={question:0,seenThisRound:new Set()};
 openStories();assert(document.getElementById('storyBegin').textContent.includes('3 von 7'),'Resume count missing');startStories();
 assert(storyState.locked&&storyState.question===2&&storyState.task.text===taskText,'Solved task was not restored');
 checkStory();assert(getTotalStars(getProfile())===stars,'Resumed solved task awarded twice');
 storyUI.storyNext.click();storyUI.storyWork.value='3 +';storyUI.storyWork.dispatchEvent(new Event('input'));
 const unfinishedText=storyState.task.text;storyUI.storyHome.click();openStories();startStories();
 assert(!storyState.locked&&storyUI.storyWork.value==='3 +'&&storyState.task.text===unfinishedText,'Unfinished work lost');
 for(let i=3;i<7;i++){solve();if(i<6)storyUI.storyNext.click()}
 assert(!document.getElementById('storyFinish').classList.contains('hidden'),'No seven-task finish');
 assert(getProfile().activityCounts.stories===7,'Incorrect solved count');
 assert(getProfile().storyPractice.round===null&&getProfile().storyPractice.lastRound.solved===7,'Round completion not persisted');
 const finalStars=getTotalStars(getProfile());storyUI.storyNext.click();checkStory();assert(getTotalStars(getProfile())===finalStars,'Finished round awarded twice');
 openStories();assert(!document.getElementById('storyBegin').textContent.includes('Fortsetzen'),'Completed round resumed');
 startShopGame('fruit');
 const solveShop=()=>{const button=[...elements.operationChoices.querySelectorAll('button')].find(button=>button.dataset.operation===shopState.task.operation);chooseShopOperation(button.dataset.operation,button)};
 for(let i=0;i<3;i++){solveShop();if(i<2)nextShopQuestion()}
 const shopStars=getTotalStars(getProfile());showScreen('games');
 profiles=JSON.parse(localStorage.getItem(STORAGE_KEY));shopState={};startShopGame('fruit');
 assert(shopState.question===3&&shopState.score===3&&getTotalStars(getProfile())===shopStars,'Shop round/score lost after restart');
 for(let i=3;i<7;i++){solveShop();if(i<6)nextShopQuestion()}
 assert(!screens.shopFinish.classList.contains('hidden'),'Shop did not finish after seven');
 assert(getProfile().activityCounts.shop===7&&getProfile().shopPractice.lastRound.solved===7,'Shop completion not saved');
 assert(!getProfile().shopPractice.rounds.fruit,'Completed shop round still pending');
 return 'Passed: seven stories, immediate finish, leave/reload retains stars and round, saved work and task, resume count, no duplicate awards, completion persistence';
}finally{requestRows=originalRows}

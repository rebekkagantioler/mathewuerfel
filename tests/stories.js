return (()=>{try {
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
 profiles=[{id:'test',name:'Test',emoji:'🌟',facts:{},areaStars:Object.fromEntries(AREAS.map(a=>[a,0]))}];activeProfileId='test';teacherPreview=true;activeRows=[1,3,7];
 let generated=0;
 for(const template of STORY_TEMPLATES)for(let i=0;i<30;i++){
   const task=makeStoryTask(template,i%2===0);
   const work=task.steps.map((step,j)=>step+'='+task.results[j]).join('\n');
   assert(validateStoryWork(task,work),'Canonical rejected: '+template.id);
   assert(task.answer>=0&&Number.isInteger(task.answer),'Invalid answer');generated++;
 }
 const task={numbers:[3,4,5],answer:17};
 assert(validateStoryWork({numbers:[37,8],answer:45},'(30+7)+(3+5)=45'),'Number decomposition');
 assert(validateStoryWork({numbers:[37,8],answer:45},'8=10-2\n37+10=47\n47-2=45'),'Compensation strategy');
 assert(validateStoryWork(task,'(3*4)+5=17'),'Bracket solution');
 assert(validateStoryWork(task,'4+4+4=12\n12+5=17'),'Alternate solution');
 for(const bad of ['17','3*4=12+5=17','3*4=13\n13+4=17','99-82=17','alert(1)','3/0']){
   let failed=false;try{validateStoryWork(task,bad)}catch{failed=true}assert(failed,'Bad work accepted: '+bad);
 }
 const prof=getProfile();prof.storyPractice={types:{},recent:[]};const pool=STORY_TEMPLATES.filter(t=>t.tier===1);
 const weak=pool[0];prof.storyPractice.types[weak.id]={attempts:3,wrong:3,lastFailed:true};
 assert(chooseStoryTemplate(prof,1,2,[]).id===weak.id,'Weak review');
 assert(chooseStoryTemplate(prof,1,0,[]).id!==weak.id,'New task');
 assert(chooseStoryTemplate(prof,1,2,[weak.id]).id!==weak.id,'Recent repeat');
 openStories();launchingRows=true;startStories();launchingRows=false;
 for(let i=0;i<8;i++){
   assert(storyUI.storyBadge.textContent.includes(i%2===0?'Warmwerden':'Knobeln'),'Difficulty alternation');
   const t=storyState.task;storyUI.storyWork.value=t.steps.map((x,j)=>x+'='+t.results[j]).join('\n');checkStory();assert(storyState.locked,'Completion');storyState.question++;nextStory();
 }
 teacherPreview=false;
 for(const level of [1,2,3,4,5,6]){
   prof.areaStars.mal=(level-1)*40;renderProfileHeader();
   assert(elements.gamesCatchCard.disabled===(level<gameRewardLevel('catch')),'Catch unlock');assert(elements.gamesPipeCard.disabled===(level<gameRewardLevel('pipe')),'Pipe unlock');assert(elements.gamesRaceCard.disabled===(level<gameRewardLevel('race')),'Race unlock');
 }
 storyState.task=makeStoryTask(STORY_TEMPLATES[0]);storyState.profileId=prof.id;storyState.failed=false;storyState.helped=false;storyState.locked=false;
 const before=prof.storyPractice.types[storyState.task.id]?.wrong||0;
 recordStoryAttempt(false);storyState.failed=true;recordStoryAttempt(false);recordStoryAttempt(true);
 assert(prof.storyPractice.types[storyState.task.id].wrong===before+1,'Duplicate failure');
 storyState.failed=false;storyState.helped=false;recordStoryAttempt(true);assert(!prof.storyPractice.types[storyState.task.id].lastFailed,'Recovery');
 assert(getStorySlotTier({storyPractice:{types:{buecher:{lastFailed:true}}}},3,2)===1,'Earlier difficulty review');
 const maxTier=getStoryTier(prof);assert(maxTier>=2,'Tier progression');
 openStories();launchingRows=true;startStories();launchingRows=false;
 const rect=storyUI.storyWork.getBoundingClientRect();assert(rect.width<=innerWidth,'Story overflow');
 assert(document.querySelectorAll('[data-update-check]').length===2,'Update buttons');
 return JSON.stringify({ok:true,width:innerWidth,templates:STORY_TEMPLATES.length,generated,checks:'solutions, invalid work, review, new tasks, easy/hard, unlocks, persisted stats, updates UI'});
}catch(e){throw e}})();

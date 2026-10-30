const assert=(ok,message)=>{if(!ok)throw Error(message)};
const timeout=window.setTimeout;window.setTimeout=()=>0;
try{
 teacherPreview=false;
 profiles=[{id:'minus',name:'Test',emoji:'🌟',facts:{},areaStars:Object.fromEntries(AREAS.map(a=>[a,0])),areaRecent:Object.fromEntries(AREAS.map(a=>[a,[]]))}];activeProfileId='minus';
 const profile=getProfile();
 for(const range of [100,1000,10000]){
  for(let n=0;n<500;n++){
   const {a,b}=makeMinusTask(profile,range);
   assert(a>0&&a<=range&&b>0&&a>=b,'Out of range');
   for(const unit of [1,10,100,1000])assert(Math.floor(a/unit)%10>=Math.floor(b/unit)%10,'Beginner needs borrowing');
  }
  const stats=minusLearning(profile,range);stats.correct=20;stats.recent=Array(10).fill(true);
  let exchanges=0;
  for(let n=0;n<500;n++){
   const {a,b}=makeMinusTask(profile,range);assert(a<=range&&a>=b,'Advanced range');
   if([1,10,100,1000].some(unit=>Math.floor(a/unit)%10<Math.floor(b/unit)%10))exchanges++;
  }
  assert(exchanges>0&&exchanges<230,'Missing easy/advanced mixture');
 }
 profile.minusPractice={};
 document.getElementById('minusRange').value='10000';startPlaceValueGame('minus');
 assert(elements.placeValueHouses.children.length===4,'Missing place values');
 placeValueState.counts=PLACE_VALUES.map(unit=>Math.floor(placeValueState.target/unit)%10);checkPlaceValue();
 assert(minusLearning(profile,10000).correct===1&&minusLearning(profile,100).correct===0,'Range progress mixed');
 const stats=minusLearning(profile,10000);stats.correct=20;stats.recent=Array(10).fill(true);nextPlaceValueQuestion();
 assert(!placeValueState.faded,'Automatic fade still active');
 openTeacherArea();
 const input=document.querySelector('[data-minus-without-houses="10000"]');input.checked=true;saveTeacherMinusSettings();
 assert(stats.tryWithoutHouses===true&&!minusLearning(profile,100).tryWithoutHouses,'Teacher range setting mixed');
 assert(JSON.parse(localStorage.getItem(STORAGE_KEY))[0].minusPractice['10000'].tryWithoutHouses===true,'Teacher setting not persisted');
 renderTeacherDashboard();assert(input.checked,'Setting not restored');
 showScreen('placeValue');nextPlaceValueQuestion();
 assert(placeValueState.faded&&!document.getElementById('placeMinusHelp').classList.contains('hidden'),'Missing help button');
 assert(elements.placeValueHouses.classList.contains('hidden'),'House visible before help');
 document.getElementById('placeMinusHelp').click();assert(!elements.placeValueHouses.classList.contains('hidden'),'Help did not restore houses');
 nextPlaceValueQuestion();assert(!placeValueState.helped&&elements.placeValueHouses.classList.contains('hidden'),'Help persisted into next task');
 placeValueState.answer='99999';checkPlaceValue();assert(minusLearning(profile,10000).recent.at(-1)===false,'Failure not recorded');
 const saved=JSON.parse(localStorage.getItem(STORAGE_KEY));assert(saved[0].minusPractice['10000'].recent.at(-1)===false,'Learning not persisted');
 // Use the existing actual exchange interaction to remove five hundreds.
 placeValueState.startValue=7000;placeValueState.subtrahend=500;placeValueState.target=6500;placeValueState.counts=[7,0,0,0];placeValueState.helped=true;renderPlaceValue();
 assert(exchangePlaceSelection(0,1,1),'Could not split thousand');
 for(let i=0;i<5;i++)removePlaceCount(1);
 assert(placeValueNumber(placeValueState.counts)===6500,'Borrowing changed value');
 nextPlaceValueQuestion();for(const digit of String(placeValueState.target))minusAnswerInput(digit);
 checkPlaceValue();assert(placeValueState.locked,'Mental answer rejected');
 input.checked=false;saveTeacherMinusSettings();nextPlaceValueQuestion();assert(!placeValueState.faded&&!elements.placeValueHouses.classList.contains('hidden'),'Could not restore always-visible houses');
 showScreen('activities');return 'Passed: 3,000 generated tasks, beginner exchanges excluded, easy review, range isolation, help reset, persistence, 7000−500';
}finally{window.setTimeout=timeout;teacherPreview=false}

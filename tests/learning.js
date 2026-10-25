const assert=(ok,message)=>{if(!ok)throw Error(message)};
const timeout=window.setTimeout;window.setTimeout=()=>0;
try{
 teacherPreview=true;
 profiles=[{id:'learning',name:'Test',emoji:'🌟',facts:{},areaStars:Object.fromEntries(AREAS.map(a=>[a,0]))}];activeProfileId='learning';
 document.querySelectorAll('.screen').forEach(screen=>screen.style.animation='none');
 openGamesCategory('mal');
 const cards=[...document.querySelectorAll('#gamesScreen button[data-game-category="mal"]')];
 assert(cards[0].id==='gamesTimesCard'&&cards[1].id==='gamesDivisionCard','Wrong practice order');
 practiceRows.times=new Set();renderPracticeRows('times');showScreen('start');
 elements.modeGrid.children[2].click();elements.modeGrid.children[6].click();
 assert(practiceRows.times.size===2&&screens.game.classList.contains('hidden'),'Click started round before Continue');
 document.querySelector('#timesContinue').click();
 assert(!document.querySelector('#rowsDialog').open&&!screens.game.classList.contains('hidden'),'Extra practice dialog');
 for(let n=0;n<100;n++){nextQuestion();assert([3,7].includes(state.a),'Unselected multiplication row')}
 selectMixedPractice('times');assert(practiceRows.times.size===10,'Mixed did not select all');
 practiceRows.division=new Set([4,8]);renderPracticeRows('division');continuePractice('division');
 for(let n=0;n<100;n++){nextDivisionQuestion();assert([4,8].includes(divisionState.divisor),'Unselected division row')}
 assert(!document.querySelector('#rowsDialog').open,'Division opened extra dialog');
 selectMixedPractice('division');assert(practiceRows.division.size===10,'Division mixed');
 practiceRows.times.clear();showScreen('start');continuePractice('times');assert(!screens.start.classList.contains('hidden'),'Empty rows started game');
 startPlaceValueGame('build');assert(elements.placeValueHouses.children.length===4,'Missing empty houses');
 for(let from=0;from<3;from++){
  startPlaceValueGame('minus');const s=placeValueState;s.counts=[0,0,0,0];s.counts[from]=1;renderPlaceValue();
  const before=placeValueNumber(s.counts);assert(exchangePlaceSelection(from,1,from+1),'Could not unbundle');
  assert(s.counts[from]===0&&s.counts[from+1]===10&&placeValueNumber(s.counts)===before,'Unbundle changed value');
  s.mode='trade';renderPlaceValue();
  const points=()=>elements.placeValueHouses.children[from+1].querySelectorAll('.filled');
  for(let i=0;i<10;i++)points()[i].click();
  assert(s.selectedTokens.length===10,'Cannot select ten actual points');
  elements.placeValueHouses.children[from].querySelector('.place-house-destination').click();
  assert(s.counts[from]===1&&s.counts[from+1]===0&&placeValueNumber(s.counts)===before,'Could not bundle ten to larger house');
  assert(!exchangePlaceSelection(from,1,from+2),'Allowed nonadjacent exchange');
 }
 // Exercise the same pointer handlers used on an iPad, with real drop hit testing.
 startPlaceValueGame('minus');placeValueState.counts=[1,0,0,0];renderPlaceValue();
 const destination=elements.placeValueHouses.children[1].querySelector('header');destination.scrollIntoView({block:'center'});
 const token=elements.placeValueHouses.children[0].querySelector('.filled');token.setPointerCapture=()=>{};
 const origin=token.getBoundingClientRect(),target=destination.getBoundingClientRect();
 const pointer=(type,x,y)=>token.dispatchEvent(new PointerEvent(type,{pointerId:77,pointerType:'touch',clientX:x,clientY:y,bubbles:true,cancelable:true}));
 pointer('pointerdown',origin.x+10,origin.y+10);pointer('pointermove',target.x+target.width/2,target.y+10);
 assert(document.querySelector('.place-token-ghost'),'Drag has no visual token');
 pointer('pointerup',target.x+target.width/2,target.y+10);
 assert(placeValueState.counts[0]===0&&placeValueState.counts[1]===10&&!document.querySelector('.place-token-ghost'),'Touch drag did not split T to H');
 startPlaceValueGame('build');const source=elements.placeValueTray.querySelector('.place-tray-token');source.setPointerCapture=()=>{};
 source.dispatchEvent(new PointerEvent('pointerdown',{pointerId:78,pointerType:'touch',clientX:10,clientY:10,bubbles:true,cancelable:true}));
 source.dispatchEvent(new PointerEvent('pointerup',{pointerId:78,pointerType:'touch',clientX:10,clientY:10,bubbles:true}));
 source.dispatchEvent(new MouseEvent('click',{detail:1,bubbles:true}));
 assert(placeValueState.counts[0]===1,'Touch tap added two build tokens');
 for(let question=0;question<6;question++)for(let sample=0;sample<100;sample++){
  const counts=makePlaceTradeCounts(question);assert(counts.some(n=>n>=10),'Generated already-correct exercise');
  const value=placeValueNumber(counts);let trades=0;
  for(let from=3;from>0;from--)while(counts[from]>=10){counts[from]-=10;counts[from-1]++;trades++}
  assert(placeValueNumber(counts)===value&&counts.every(n=>n<10),'Generated impossible exercise');
  assert(trades>=(question===0?1:2),'Generated exercise has no multiple trades');
 }
 startPlaceValueGame('trade');
 const canonical=[2,1,0,0];placeValueState.counts=[...canonical];renderPlaceValue();
 assert(!exchangePlaceSelection(0,1,1)&&placeValueState.counts.every((v,i)=>v===canonical[i]),'Trade asks to undo correct 2100');
 for(let question=0;question<6;question++){


  placeValueState.question=question;nextPlaceValueQuestion();const s=placeValueState;
  assert(!elements.placeValueActions.querySelector('button'),'Answer buttons remain');
  assert(elements.placeValueHouses.children.length===4,'Trade hid smaller units');
  assert(s.counts.some(n=>n>=10),'Already normalized trade exercise');
  assert(!s.counts.every((n,i)=>n===s.goalCounts[i]),'No trade needed');
  let moves=0;
  for(let from=3;from>=1;from--)while(s.counts[from]>=10){assert(exchangePlaceSelection(from,10,from-1),'Bundling task unsolvable');moves++}
  assert(moves>=(question===0?1:2),'Later task needs only one exchange');
  assert(s.counts.every((n,i)=>n===s.goalCounts[i]),'Goal representation differs');
  const before=s.score;checkPlaceValue();assert(s.score===before+1,'Correct exchange not accepted');
 }
 startPlaceValueGame('minus');assert(elements.placeValueHouses.children.length===4,'Minus hid units');
 startNumberLineGame();let tickSpacing=null;
 for(let question=0;question<8;question++){
  numberLineState.question=question;nextNumberLineQuestion();const s=numberLineState;
  assert(s.step===10&&s.start>=0&&s.result>=0&&s.result<=10000,'Unstable or invalid ruler');
  const ticks=elements.numberLineVisual.querySelectorAll('.ruler-tick');assert(ticks.length===1001,'Ruler extent changed');
  const width=parseFloat(ticks[1].style.left)-parseFloat(ticks[0].style.left);
  if(tickSpacing===null)tickSpacing=width;assert(width===tickSpacing,'Tick spacing changed');
  assert(Number(ticks[10].dataset.value)-Number(ticks[0].dataset.value)===100,'100 is not ten steps');
  s.position=s.result;positionNumberLineHandle();
  assert(document.querySelector('#numberLineJumpBadge').textContent.includes(formatNumber(s.result)),'No number at marked position');
  const before=s.score;checkNumberLine();assert(s.score===before+1,'Correct line answer rejected');
 }
 startNumberLineGame();numberLineState.start=500;numberLineState.position=500;numberLineState.result=600;numberLineState.jump=100;renderNumberLine();
 const lineViewport=document.querySelector('#numberLineViewport'),lineHandle=document.querySelector('#numberLineHandle');
 lineViewport.scrollIntoView({block:'center'});lineHandle.setPointerCapture=()=>{};
 const bounds=lineHandle.getBoundingClientRect(),originX=bounds.left+bounds.width/2;
 lineHandle.dispatchEvent(new PointerEvent('pointerdown',{pointerId:90,clientX:originX,clientY:bounds.top+10,bubbles:true,cancelable:true}));
 lineHandle.dispatchEvent(new PointerEvent('pointermove',{pointerId:90,clientX:originX+48,clientY:bounds.top+10,bubbles:true}));
 lineHandle.dispatchEvent(new PointerEvent('pointerup',{pointerId:90,bubbles:true}));
 assert(numberLineState.position===510,'Drag changed scale after scrolling');
 for(let i=0;i<9;i++)lineHandle.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true,cancelable:true}));
 assert(numberLineState.position===600,'100 is not ten fixed steps');checkNumberLine();assert(numberLineState.locked,'Fixed-ruler answer rejected');
 startNumberLineGame('free');
 assert([...elements.numberLineVisual.querySelectorAll('.free-ruler-label')].every(label=>label.textContent===''),'Free ruler is not empty');
 assert(Object.keys(numberLineState.labels).length===0,'Free ruler has preset values');
 for(const [index,value] of [[1,'−20'],[3,'0'],[6,'30']]){
  elements.numberLineVisual.querySelector(`[data-tick="${index}"]`).click();
  for(const digit of value)numberLineLabelInput(digit);
 }
 checkNumberLine();assert(elements.numberLineFeedback.classList.contains('correct'),'Valid user scale rejected');
 assert(Object.keys(numberLineState.labels).length===3,'Check filled unchosen ticks');
 const freeScore=numberLineState.score;checkNumberLine();assert(numberLineState.score===freeScore,'Free check awarded twice');
 assert(validateFreeNumberLine({0:'0',2:'20',5:'50'}).ok,'Sparse labels rejected');
 assert(validateFreeNumberLine({0:'1,5',2:'2,5',6:'4,5'}).ok,'Decimals rejected');
 assert(validateFreeNumberLine({0:'-100',3:'-70',5:'-50'}).ok,'Negative labels rejected');
 assert(!validateFreeNumberLine({0:'0',2:'20',5:'40'}).ok,'Wrong spacing accepted');
 assert(!validateFreeNumberLine({0:'30',1:'20',2:'10'}).ok,'Decreasing scale accepted');
 assert(!validateFreeNumberLine({0:'1',1:'1',2:'1'}).ok,'Repeated labels accepted');
 assert(!validateFreeNumberLine({0:'0',1:'10'}).ok,'Two labels treated as proof of scale');
 assert(!validateFreeNumberLine({0:'0',1:'10',2:'−'}).ok,'Incomplete input accepted');
 assert(!validateFreeNumberLine({0:'100000000000',1:'100000000010',2:'100000000021'}).ok,'Wrong large-number spacing accepted');
 showScreen('stories');storyState.locked=false;storyUI.storyWork.disabled=false;storyUI.storyWork.value='';storyUI.storyWork.setSelectionRange(0,0);
 assert(storyUI.storyWork.readOnly&&storyUI.storyWork.inputMode==='none','iPad system keyboard still requested');
 for(const key of ['1','2','+','3','=','1','5','Neue Zeile','8',':','2','=','4'])storyKeyInput(key);
 assert(storyUI.storyWork.value==='12+3=15\n8:2=4','Keypad input failed');
 storyUI.storyWork.setSelectionRange(0,2);storyKeyInput('7');assert(storyUI.storyWork.value.startsWith('7+3'),'Could not replace selection');
 storyKeyInput('⌫');assert(storyUI.storyWork.value.startsWith('+3'),'Backspace failed');
 const old=storyUI.storyWork.value;storyState.locked=true;storyKeyInput('9');assert(storyUI.storyWork.value===old,'Edited solved story');
 storyState.locked=false;storyKeyInput('Löschen');assert(!storyUI.storyWork.value,'Clear failed');
 showScreen('games');
 return 'Passed: direct multi-row selection, order, mixed, division filters; all houses; manual ten-to-one and one-to-ten including H/T; fixed ruler and fully free labeling; math keyboard, editing and input lock';
}finally{window.setTimeout=timeout;teacherPreview=false}

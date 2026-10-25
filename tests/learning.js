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
  startPlaceValueGame('trade');const s=placeValueState;s.counts=[0,0,0,0];s.counts[from]=1;renderPlaceValue();
  const before=placeValueNumber(s.counts);assert(exchangePlaceSelection(from,1,from+1),'Could not unbundle');
  assert(s.counts[from]===0&&s.counts[from+1]===10&&placeValueNumber(s.counts)===before,'Unbundle changed value');
  const points=()=>elements.placeValueHouses.children[from+1].querySelectorAll('.filled');
  for(let i=0;i<10;i++)points()[i].click();
  assert(s.selectedTokens.length===10,'Cannot select ten actual points');
  elements.placeValueHouses.children[from].querySelector('.place-house-destination').click();
  assert(s.counts[from]===1&&s.counts[from+1]===0&&placeValueNumber(s.counts)===before,'Could not bundle ten to larger house');
  assert(!exchangePlaceSelection(from,1,from+2),'Allowed nonadjacent exchange');
 }
 // Exercise the same pointer handlers used on an iPad, with real drop hit testing.
 startPlaceValueGame('trade');placeValueState.counts=[1,0,0,0];renderPlaceValue();
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
 startPlaceValueGame('trade');
 for(let question=0;question<6;question++){

  placeValueState.question=question;nextPlaceValueQuestion();const s=placeValueState;
  assert(!elements.placeValueActions.querySelector('button'),'Answer buttons remain');
  assert(elements.placeValueHouses.children.length===4,'Trade hid smaller units');
  if(s.exchangeFrom===null){const from=s.counts.findIndex(n=>n>=10);assert(from>0&&exchangePlaceSelection(from,10,from-1),'Bundling task unsolvable')}
  else assert(exchangePlaceSelection(s.exchangeFrom,1,s.exchangeFrom+1),'Unbundling task unsolvable');
  assert(s.counts.every((n,i)=>n===s.goalCounts[i]),'Goal representation differs');
  const before=s.score;checkPlaceValue();assert(s.score===before+1,'Correct exchange not accepted');
 }
 startPlaceValueGame('minus');assert(elements.placeValueHouses.children.length===4,'Minus hid units');
 startNumberLineGame();let labeling=0;
 for(let question=0;question<8;question++){
  numberLineState.question=question;nextNumberLineQuestion();const s=numberLineState;
  assert(elements.numberLineVisual.querySelectorAll('.number-line-label').length===9,'Unlabeled line');
  assert(s.start-4*s.step>=0,'Negative labels');
  if(s.labeling){
   labeling++;assert(elements.numberLineVisual.querySelectorAll('button[data-tick]').length===3,'Missing label exercise');
   for(const i of s.labelIndices){s.activeLabel=i;for(const digit of String(s.start+i*s.step))numberLineLabelInput(digit)}
  }else{s.jumps=s.jump/s.step;positionNumberLineHandle();assert(document.querySelector('#numberLineJumpBadge').textContent.includes(formatNumber(s.result)),'No number at marked position')}
  const before=s.score;checkNumberLine();assert(s.score===before+1,'Correct line answer rejected');
 }
 assert(labeling>=2,'No labeling tasks');
 showScreen('stories');storyState.locked=false;storyUI.storyWork.disabled=false;storyUI.storyWork.value='';storyUI.storyWork.setSelectionRange(0,0);
 assert(storyUI.storyWork.readOnly&&storyUI.storyWork.inputMode==='none','iPad system keyboard still requested');
 for(const key of ['1','2','+','3','=','1','5','Neue Zeile','8',':','2','=','4'])storyKeyInput(key);
 assert(storyUI.storyWork.value==='12+3=15\n8:2=4','Keypad input failed');
 storyUI.storyWork.setSelectionRange(0,2);storyKeyInput('7');assert(storyUI.storyWork.value.startsWith('7+3'),'Could not replace selection');
 storyKeyInput('⌫');assert(storyUI.storyWork.value.startsWith('+3'),'Backspace failed');
 const old=storyUI.storyWork.value;storyState.locked=true;storyKeyInput('9');assert(storyUI.storyWork.value===old,'Edited solved story');
 storyState.locked=false;storyKeyInput('Löschen');assert(!storyUI.storyWork.value,'Clear failed');
 showScreen('games');
 return 'Passed: direct multi-row selection, order, mixed, division filters; all houses; manual ten-to-one and one-to-ten including H/T; labeled lines and labeling exercises; math keyboard, editing and input lock';
}finally{window.setTimeout=timeout;teacherPreview=false}

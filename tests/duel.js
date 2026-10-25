return (()=>{try {
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
 for(const rows of [[1],[3],[3,7],Array.from({length:10},(_,i)=>i+1)])for(let round=0;round<100;round++){
   const tasks=makeDuelTasks(rows),keys=tasks.map(t=>[t.a,t.b].sort((a,b)=>a-b).join('x'));
   assert(tasks.length===10&&new Set(keys).size===10,'Duplicate multiplication');
   assert(tasks.every(t=>rows.includes(t.a)&&t.b>=1&&t.b<=10),'Disallowed row');
   const orders=makeDuelTaskOrders(tasks),key=t=>`${t.a}x${t.b}`;
   assert(orders.every(order=>order.map(key).sort().join(',')===tasks.map(key).sort().join(',')),'Different task sets');
   assert(orders[0].every((task,i)=>key(task)!==key(orders[1][i])),'Same task at same checkpoint');
   assert(new Set(orders[1].map(key)).size===10,'Order introduced repeats');
 }
 assert(DUEL_LANDSCAPE.length>30&&new Set(DUEL_LANDSCAPE.map(item=>item.type)).size===3,'Scenery missing');
 assert(DUEL_LANDSCAPE.every(item=>projectDuelPosition(item.x,item.y).distance>=DUEL_ROAD_WIDTH/2+38),'Scenery blocks road');
 activeRows=[3,7];
 profiles=[{id:'test',name:'Test',emoji:'🌟',facts:{},areaStars:Object.fromEntries(AREAS.map(a=>[a,0]))}];activeProfileId='test';teacherPreview=true;
 launchingRows=true;
 state.mode='mixed';state.roundFacts={};
 for(let i=0;i<150;i++)assert(activeRows.includes(chooseAdaptiveFact()[0]),'Adaptive rows');
 startNeighborGame();for(let i=0;i<100;i++){nextNeighborQuestion();assert(activeRows.includes(neighborState.a),'Neighbor rows')}
 startDoubleChainGame();for(let i=0;i<100;i++){nextDoubleChainQuestion();assert(activeRows.includes(doubleChainState.n),'Chain rows')}
 for(let i=0;i<100;i++)assert(activeRows.includes(makeShopTask('*').a),'Shop rows');
 startConceptGame('*');for(let i=0;i<100;i++){nextConceptQuestion();assert(activeRows.includes(conceptState.a),'Concept rows')}
 startRaceGame();for(let i=0;i<100;i++){nextRaceQuestion();assert(activeRows.includes(raceState.operation==='*'?raceState.a:raceState.b),'Race rows')}stopActiveGame();
 startPipeGame();for(let i=0;i<100;i++){nextPipeQuestion();assert(activeRows.includes(pipeState.op==='*'?pipeState.a:pipeState.b),'Pipe rows')}stopActiveGame();
 launchingRows=false;
 startDuel();document.querySelectorAll('#rowsOptions input').forEach(i=>i.checked=false);document.querySelector('#rowsStart').click();assert(document.querySelector('#rowsDialog').open,'Empty selection accepted');
 document.querySelectorAll('#rowsOptions input').forEach(i=>i.checked=['3','7'].includes(i.value));document.querySelector('#rowsStart').click();
 assert(duelState.running&&duelState.tasks.every(t=>[3,7].includes(t.a)),'Duel rows');
 const p=duelState.players[0],other=duelState.players[1];
 cancelAnimationFrame(duelState.frame);
 const panel=document.querySelector('.duel-player');
 assert(panel.querySelector('.duel-question').classList.contains('hidden')&&!panel.querySelector('.duel-task').textContent,'Task shown before arrival');
 const start={x:p.x,y:p.y};
 for(let i=0;i<100;i++)updateDuelPlayer(0,.01);
 assert(p.x===start.x&&p.y===start.y,'Car drove without input');
 duelInput(0,'3');assert(!p.answer,'Answered away from gate');
 document.dispatchEvent(new KeyboardEvent('keydown',{key:'w',bubbles:true}));
 for(let i=0;i<100;i++)updateDuelPlayer(0,.01);
 assert(p.x>start.x+80,'Gas did not move car');assert(other.x===start.x&&other.y===start.y,'Controls moved opponent');
 document.dispatchEvent(new KeyboardEvent('keyup',{key:'w',bubbles:true}));const released=p.x;updateDuelPlayer(0,.03);assert(p.x===released,'Car kept driving after gas release');
 const initialHeading=p.heading;setDuelControl(0,'up','test',true);setDuelControl(0,'left','test',true);updateDuelPlayer(0,.02);assert(p.heading!==initialHeading,'Steering did not turn car');clearDuelControls();
 // Drive off the first straight and back; later road segments must not bypass a gate.
 const saved={x:p.x,y:p.y,heading:p.heading,progress:p.progress};
 p.x=250;p.y=1180;p.heading=-Math.PI/2;
 setDuelControl(0,'up','offroad',true);
 for(let i=0;i<100;i++)updateDuelPlayer(0,.01);
 assert(p.y<1120&&p.step===0&&p.phase==='driving','Cannot drive off road');
 p.x=duelCoursePoint(DUEL_COURSE.gates[4]).x;p.y=duelCoursePoint(DUEL_COURSE.gates[4]).y;
 const bypass={x:p.x,y:p.y};updateDuelPlayer(0,.01);
 assert(p.step===0&&p.phase==='driving'&&p.x===bypass.x&&p.y===bypass.y,'Skipped unresolved gates');
 clearDuelControls();Object.assign(p,saved);p.speed=0;
 // Follow the real road using steering and gas, not scripted position changes.
 let frames=0,gateChecks=0;const testedPenalties=new Set();
 while(duelState.running&&frames<30000){
   if(p.phase==='question'){
     const stopped={x:p.x,y:p.y};const task=p.tasks[p.step];
     if(gateChecks===0&&!testedPenalties.has(0)){
       const buttons=[...panel.querySelectorAll('.duel-keypad button')];
       const buttonFor=key=>buttons.find(button=>button.textContent===key);
       const touch=key=>buttonFor(key).dispatchEvent(new PointerEvent('pointerdown',{pointerId:201,pointerType:'touch',isPrimary:false,bubbles:true,cancelable:true}));
       setDuelControl(1,'up','held-finger',true);setDuelControl(1,'left','second-held-finger',true);
       touch('7');assert(p.answer==='7','Non-primary touch ignored while opponent holds controls');
       buttonFor('7').dispatchEvent(new PointerEvent('click',{pointerId:201,pointerType:'touch',isPrimary:false,detail:1,bubbles:true}));
       assert(p.answer==='7','Pointer click counted twice');touch('⌫');assert(p.answer==='','Touch delete failed');
       buttonFor('4').click();assert(p.answer==='4','Keyboard or assistive activation failed');touch('⌫');
       const keypad=panel.querySelector('.duel-keypad').getBoundingClientRect();assert(keypad.height>40&&keypad.bottom<=innerHeight,'Keypad clipped');
       touch('9');touch('9');touch('9');touch('Prüfen');
       assert(p.phase==='driving'&&p.answer===''&&p.step===0&&p.progress===0,'First error did not return to start');
       assert(other.controls.up.has('held-finger')&&other.controls.left.has('second-held-finger'),'Penalty released opponent controls');
       const otherX=other.x;updateDuelPlayer(1,.02);assert(other.x!==otherX,'Opponent cannot drive while typing');clearDuelControls();
       testedPenalties.add(0);continue;
     }
     if(gateChecks===4&&!testedPenalties.has(4)){
       duelInput(0,'9');duelInput(0,'9');duelInput(0,'9');duelInput(0,'Prüfen');
       const previous=DUEL_COURSE.gates[3]+30;
       assert(p.step===4&&p.progress===previous&&p.phase==='driving'&&p.speed===0,'Did not return to previous solved gate');
       assert(p.tasks[p.step]===task,'Penalty changed the unresolved task');
       const reset={x:p.x,y:p.y};for(let i=0;i<100;i++)updateDuelPlayer(0,.01);
       assert(p.x===reset.x&&p.y===reset.y,'Penalty started automatic driving');
       duelInput(0,'2');assert(p.answer==='','Could answer before returning to gate');
       testedPenalties.add(4);continue;
     }
     for(const digit of String(task.a*task.b))duelInput(0,digit);duelInput(0,'Prüfen');
     assert(p.phase==='driving'&&p.speed===0,'Correct answer did not release controls');
     for(let i=0;i<100;i++)updateDuelPlayer(0,.01);
     assert(p.x===stopped.x&&p.y===stopped.y,'Answer made car drive automatically');
     assert(panel.querySelector('.duel-question').classList.contains('hidden'),'Question stayed visible while driving');
     gateChecks++;
   }
   if(!duelState.running)break;
   const target=duelCoursePoint(Math.min(DUEL_COURSE.length,p.progress+42));
   let turn=Math.atan2(target.y-p.y,target.x-p.x)-p.heading;turn=Math.atan2(Math.sin(turn),Math.cos(turn));
   setDuelControl(0,'up','test',true);setDuelControl(0,'left','test',turn<-.04);setDuelControl(0,'right','test',turn>.04);
   updateDuelPlayer(0,.01);frames++;
 }
 assert(testedPenalties.size===2,'Penalties not exercised');
 assert(gateChecks===10&&!duelState.running,'Could not drive course: '+JSON.stringify({gateChecks,frames,progress:p.progress,x:p.x,y:p.y}));
 assert(p.progress>=DUEL_COURSE.length-20,'Won before driving to finish');
 assert(document.querySelector('#duelWinner').textContent.includes('Person 1'),'No winner');
 beginDuel();cancelAnimationFrame(duelState.frame);setDuelControl(0,'up','test',true);window.dispatchEvent(new Event('blur'));assert(!duelState.players[0].controls.up.size,'Blur left gas pressed');
 showScreen('games');assert(!duelState.running&&!document.body.classList.contains('duel-active'),'Exit did not clean up');
 beginDuel();cancelAnimationFrame(duelState.frame);drawDuel();
 assert(document.documentElement.scrollHeight===innerHeight&&document.documentElement.scrollWidth===innerWidth,'Race scrolls');
 assert([...document.querySelectorAll('.duel-driving button')].every(button=>button.getBoundingClientRect().bottom<=innerHeight),'Controls clipped');
 return JSON.stringify({ok:true,width:innerWidth,height:innerHeight,gateChecks,frames,checks:'manual driving, steering, stop on release, checkpoints, maths, no automatic motion, finish, input cleanup, viewport'});
}catch(e){throw e}})();

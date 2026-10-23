return (()=>{try {
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
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
 // Follow the real road using steering and gas, not scripted position changes.
 let frames=0,gateChecks=0;
 while(duelState.running&&frames<30000){
   if(p.phase==='question'){
     const stopped={x:p.x,y:p.y};const task=duelState.tasks[p.step];
     if(gateChecks===0){
       duelInput(0,'9');duelInput(0,'9');duelInput(0,'9');duelInput(0,'Prüfen');assert(p.step===0&&p.phase==='question','Wrong answer opened barrier');
       const keypad=panel.querySelector('.duel-keypad').getBoundingClientRect();
       assert(keypad.height>40&&keypad.bottom<=innerHeight,'Keypad clipped');
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

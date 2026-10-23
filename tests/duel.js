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
 const p=duelState.players[0],task=duelState.tasks[0];duelInput(0,'9');duelInput(0,'9');duelInput(0,'Los!');assert(p.step===0&&!p.moving,'Wrong answer advanced');
 for(const digit of String(task.a*task.b))duelInput(0,digit);duelInput(0,'Los!');assert(p.moving,'Barrier closed');
 const panel=document.querySelector('.duel-player');const keypad=panel.querySelector('.duel-keypad').getBoundingClientRect();
 assert(document.documentElement.scrollHeight===innerHeight,'Page scrolls');assert(keypad.bottom<=innerHeight&&keypad.height>40,'Keypad clipped: '+JSON.stringify({bottom:keypad.bottom,height:keypad.height,viewport:innerHeight}));
 assert([...document.querySelectorAll('[data-archived]')].every(el=>getComputedStyle(el).display==='none'),'Archive visible');
 return JSON.stringify({ok:true,width:innerWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight,keypadHeight:keypad.height,checks:'rows, empty selection, barriers, archive, viewport'});
}catch(e){throw e}})();

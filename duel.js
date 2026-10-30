// Both drivers use the same course; position and heading always come from their controls.
const DUEL_ROAD_WIDTH = 94;
const DUEL_SPEED = 150;
function makeDuelCourse(layout=0){
  let corners=[{x:130,y:1180},{x:750,y:1180},{x:750,y:940},{x:170,y:940},{x:170,y:700},{x:750,y:700},{x:750,y:460},{x:170,y:460},{x:170,y:220},{x:710,y:220},{x:710,y:90}];
  if(layout===1)corners=[{x:130,y:1180},{x:650,y:1180},{x:750,y:950},{x:260,y:900},{x:130,y:700},{x:650,y:650},{x:750,y:450},{x:260,y:400},{x:170,y:220},{x:710,y:220},{x:710,y:90}];
  if(layout===2)corners=[{x:130,y:1180},{x:710,y:1180},{x:710,y:980},{x:320,y:980},{x:170,y:760},{x:600,y:700},{x:750,y:500},{x:170,y:460},{x:170,y:220},{x:710,y:220},{x:710,y:90}];
  const points=[corners[0]];
  for(let i=1;i<corners.length-1;i++){
    const prev=corners[i-1],here=corners[i],next=corners[i+1];
    const before=Math.hypot(here.x-prev.x,here.y-prev.y),after=Math.hypot(next.x-here.x,next.y-here.y);
    const radius=Math.min(80,before/3,after/3);
    const a={x:here.x+(prev.x-here.x)*radius/before,y:here.y+(prev.y-here.y)*radius/before};
    const b={x:here.x+(next.x-here.x)*radius/after,y:here.y+(next.y-here.y)*radius/after};
    points.push(a);
    for(let j=1;j<=16;j++){const t=j/16;points.push({x:(1-t)**2*a.x+2*(1-t)*t*here.x+t*t*b.x,y:(1-t)**2*a.y+2*(1-t)*t*here.y+t*t*b.y})}
  }
  points.push(corners.at(-1));
  let length=0;
  const segments=points.slice(1).map((b,i)=>{const a=points[i],distance=Math.hypot(b.x-a.x,b.y-a.y);const segment={a,b,distance,start:length};length+=distance;return segment});
  return {points,segments,length,gates:Array.from({length:10},(_,i)=>(i+1)*length/11)};
}
let selectedDuelRoute='meadow';
let DUEL_COURSE=makeDuelCourse();
let duelRoute=null;
let duelState={running:false,players:[],tasks:[],frame:0,lastTime:0};
function duelCoursePoint(distance){
  const segment=DUEL_COURSE.segments.find(s=>s.start+s.distance>=distance)||DUEL_COURSE.segments.at(-1);
  const t=Math.max(0,Math.min(1,(distance-segment.start)/segment.distance));
  return {x:segment.a.x+(segment.b.x-segment.a.x)*t,y:segment.a.y+(segment.b.y-segment.a.y)*t,angle:Math.atan2(segment.b.y-segment.a.y,segment.b.x-segment.a.x)};
}
function projectDuelPosition(x,y){
  let nearest={distance:Infinity,progress:0};
  for(const s of DUEL_COURSE.segments){
    const dx=s.b.x-s.a.x,dy=s.b.y-s.a.y;
    const t=Math.max(0,Math.min(1,((x-s.a.x)*dx+(y-s.a.y)*dy)/(s.distance*s.distance)));
    const px=s.a.x+dx*t,py=s.a.y+dy*t,distance=Math.hypot(x-px,y-py);
    if(distance<nearest.distance)nearest={distance,progress:s.start+s.distance*t};
  }
  return nearest;
}
function makeDuelTasks(rows){
  const pool=[],seen=new Set();
  for(const a of rows)for(let b=1;b<=10;b++){
    const key=[a,b].sort((x,y)=>x-y).join('×');
    if(!seen.has(key)){seen.add(key);pool.push({a,b})}
  }
  return shuffled(pool).slice(0,10);
}
function makeDuelTaskOrders(tasks){
  const second=[...tasks];
  // Sattolo's shuffle changes every position while keeping exactly the same tasks.
  for(let i=second.length-1;i>0;i--){
    const j=randomInt(0,i-1);[second[i],second[j]]=[second[j],second[i]];
  }
  return [[...tasks],second];
}
function makeDuelLandscape(){
  const objects=[];
  for(let row=-1;row<17;row++)for(let column=-1;column<12;column++){
    const seed=((row+3)*73856093^(column+3)*19349663)>>>0;
    const x=column*90+(seed%43)-21,y=row*90+((seed>>>7)%43)-21;
    if(projectDuelPosition(x,y).distance<DUEL_ROAD_WIDTH/2+38)continue;
    const type=seed%10<6?'tree':seed%10<8?'flowers':'rock';
    objects.push({x,y,type,size:19+(seed%12),variant:seed%3});
  }
  return objects;
}
let DUEL_LANDSCAPE=makeDuelLandscape();
function stopDuel(){
  duelState.running=false;cancelAnimationFrame(duelState.frame);clearDuelControls();
}
function clearDuelControls(){
  duelState.players.forEach(player=>{player.controls={up:new Set(),down:new Set(),left:new Set(),right:new Set()};player.speed=0});
}
function startDuel(){if(requestRows('duel',beginDuel))return;beginDuel()}
function beginDuel(){
  stopDuel();
  duelRoute=RACE_ROUTES.find(route=>route.id===selectedDuelRoute&&(teacherPreview||route.level<=getRewardLevel(getProfile())))||RACE_ROUTES[0];
  DUEL_COURSE=makeDuelCourse(duelRoute.layout);DUEL_LANDSCAPE=makeDuelLandscape();
  document.querySelector('#duelScreen .duel-header strong').textContent=`${duelRoute.icon} ${duelRoute.name}`;
  duelState.tasks=makeDuelTasks(activeRows);
  const orders=makeDuelTaskOrders(duelState.tasks);
  duelState.players=[0,1].map(index=>({tasks:orders[index],step:0,answer:'',phase:'driving',x:130,y:1180,heading:0,speed:0,progress:0,controls:{up:new Set(),down:new Set(),left:new Set(),right:new Set()},feedback:'Gas halten und selbst durch die Kurven lenken.'}));
  duelState.running=true;duelState.lastTime=0;
  document.querySelector('#duelResult').classList.add('hidden');
  const container=document.querySelector('#duelPlayers');container.replaceChildren();
  duelState.players.forEach((player,index)=>{
    const panel=document.createElement('section');panel.className=`duel-player player-${index}`;panel.setAttribute('aria-label',`Parcours ${index+1}`);
    panel.innerHTML=`<div class="duel-player-title"><strong>${index===0?'🔴':'🔵'} Person ${index+1}</strong><span class="duel-count">0 / 10</span></div><div class="duel-course"><canvas class="duel-canvas" role="img" aria-label="Kurviger Parcours mit zehn Schranken und Ziel"></canvas><div class="duel-question hidden"><div class="duel-equation"><span class="duel-task"></span><output class="duel-answer" aria-label="Antwort">?</output></div><div class="duel-keypad"></div></div></div><p class="duel-feedback" aria-live="polite"></p><div class="duel-driving"><button data-drive="left" aria-label="Nach links lenken">↶<small>Links</small></button><button data-drive="up" aria-label="Gas geben">↑<small>Gas</small></button><button data-drive="right" aria-label="Nach rechts lenken">↷<small>Rechts</small></button><button data-drive="down" aria-label="Rückwärts fahren">↓<small>Zurück</small></button></div><small class="duel-key-help">${index===0?'Tastatur: W Gas · A/D lenken · S zurück':'Tastatur: ↑ Gas · ←/→ lenken · ↓ zurück'}</small>`;
    const keypad=panel.querySelector('.duel-keypad');
    ['1','2','3','4','5','6','7','8','9','⌫','0','Prüfen'].forEach(key=>{
      const button=document.createElement('button');button.type='button';button.textContent=key;button.setAttribute('aria-label',key==='⌫'?'Letzte Ziffer löschen':key==='Prüfen'?'Antwort prüfen':key);
      // Touch clicks may be withheld while another finger is holding the gas.
      // Process every pointer directly, including non-primary fingers.
      button.addEventListener('pointerdown',event=>{
        event.preventDefault();
        if(!button.disabled)duelInput(index,key);
      });
      // Keep keyboard and assistive-technology activation without double-counting pointer clicks.
      button.addEventListener('click',event=>{
        if(event.detail===0&&!event.pointerType&&!button.disabled)duelInput(index,key);
      });
      keypad.append(button);
    });
    panel.querySelectorAll('[data-drive]').forEach(button=>{
      button.type='button';const direction=button.dataset.drive;
      button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);setDuelControl(index,direction,`pointer-${event.pointerId}`,true)});
      const release=event=>setDuelControl(index,direction,`pointer-${event.pointerId}`,false);
      button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
    });
    container.append(panel);renderDuelPlayer(index);
  });
  showScreen('duel');drawDuel();duelState.frame=requestAnimationFrame(animateDuel);
}
function setDuelControl(index,direction,source,pressed){
  const player=duelState.players[index];if(!player||!player.controls[direction])return;
  if(pressed&&duelState.running&&player.phase==='driving')player.controls[direction].add(source);else player.controls[direction].delete(source);
}
function setupDuelControls(){
  const keys={w:[0,'up'],s:[0,'down'],a:[0,'left'],d:[0,'right'],ArrowUp:[1,'up'],ArrowDown:[1,'down'],ArrowLeft:[1,'left'],ArrowRight:[1,'right']};
  for(const type of ['keydown','keyup'])document.addEventListener(type,event=>{
    if(!duelState.running||screens.duel.classList.contains('hidden'))return;
    const key=event.key.length===1?event.key.toLowerCase():event.key,control=keys[key];
    if(control){event.preventDefault();setDuelControl(control[0],control[1],`key-${key}`,type==='keydown')}
  });
  window.addEventListener('blur',clearDuelControls);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearDuelControls()});
}
function renderDuelPlayer(index){
  const player=duelState.players[index],panel=document.querySelectorAll('.duel-player')[index];if(!panel)return;
  const atGate=player.phase==='question';
  panel.querySelector('.duel-count').textContent=`${player.step} / 10`;
  panel.querySelector('.duel-question').classList.toggle('hidden',!atGate);
  // Do not reveal the next multiplication until the car reaches its gate.
  const task=atGate?player.tasks[player.step]:null;
  panel.querySelector('.duel-task').textContent=task?`${task.a} × ${task.b} =`:'';
  panel.querySelector('.duel-answer').textContent=atGate?(player.answer||'?'):'';
  panel.querySelector('.duel-feedback').textContent=player.feedback;
  panel.querySelectorAll('.duel-keypad button').forEach(button=>button.disabled=!duelState.running||!atGate);
  panel.querySelectorAll('[data-drive]').forEach(button=>button.disabled=!duelState.running||atGate);
}
function updateDuelPlayer(index,dt){
  const player=duelState.players[index];if(!duelState.running||player.phase!=='driving')return;
  const controls=player.controls,gas=Number(controls.up.size>0)-Number(controls.down.size>0),steer=Number(controls.right.size>0)-Number(controls.left.size>0);
  // Releasing the gas stops the car immediately; solving a gate never supplies motion.
  player.speed=gas>0?Math.min(DUEL_SPEED,player.speed+240*dt):gas<0?Math.max(-85,player.speed-240*dt):0;
  if(!player.speed)return;
  const heading=player.heading+steer*2.6*dt*Math.sign(player.speed);
  const traction=projectDuelPosition(player.x,player.y).distance>DUEL_ROAD_WIDTH/2?.55:1;
  const x=player.x+Math.cos(heading)*player.speed*dt*traction,y=player.y+Math.sin(heading)*player.speed*dt*traction;
  const projected=projectDuelPosition(x,y);
  // The countryside is drivable, with slower traction and a bounded map.
  if(x<40||x>850||y<30||y>1270){player.speed=0;player.heading=heading;return}
  const nextGate=DUEL_COURSE.gates[player.step];
  const gate=nextGate===undefined?null:duelCoursePoint(nextGate);
  const atGate=gate&&Math.hypot(x-gate.x,y-gate.y)<DUEL_ROAD_WIDTH/2;
  if(nextGate!==undefined&&projected.progress>=nextGate-26&&!atGate){
    player.speed=0;player.heading=heading;
    if(player.feedback!==`Zuerst Schranke ${player.step+1} lösen!`){player.feedback=`Zuerst Schranke ${player.step+1} lösen!`;renderDuelPlayer(index)}
    return;
  }
  if(atGate&&projected.progress>=nextGate-26){
    // Keep the car on its approach side, even if a fast frame reaches beyond the arm.
    const approach=duelCoursePoint(nextGate-28);player.x=approach.x;player.y=approach.y;player.heading=approach.angle;
    player.progress=nextGate-28;player.speed=0;player.phase='question';player.answer='';
    Object.values(player.controls).forEach(control=>control.clear());
    player.feedback='Schranke erreicht! Löse jetzt deine Malaufgabe.';renderDuelPlayer(index);return;
  }
  player.x=x;player.y=y;player.heading=heading;player.progress=projected.progress;
  const finish=duelCoursePoint(DUEL_COURSE.length);
  if(player.step===10&&projected.progress>=DUEL_COURSE.length-20&&Math.hypot(x-finish.x,y-finish.y)<25)finishDuel(index);
}
function duelInput(index,key){
  const player=duelState.players[index];if(!duelState.running||!player||player.phase!=='question')return;
  if(key==='⌫'){player.answer=player.answer.slice(0,-1);renderDuelPlayer(index);return}
  if(key!=='Prüfen'){
    if(/^\d$/.test(key)&&player.answer.length<3)player.answer+=key;
    renderDuelPlayer(index);return;
  }
  if(!player.answer)return;
  const task=player.tasks[player.step];
  if(Number(player.answer)!==task.a*task.b){
    const distance=player.step===0?0:DUEL_COURSE.gates[player.step-1]+30;
    const previous=duelCoursePoint(distance);
    player.x=previous.x;player.y=previous.y;player.heading=previous.angle;player.progress=distance;
    player.answer='';player.phase='driving';player.speed=0;
    Object.values(player.controls).forEach(control=>control.clear());
    player.feedback=player.step===0?'Nicht richtig: zurück zum Start! Fahre noch einmal zur ersten Schranke.':`Nicht richtig: zurück zu Schranke ${player.step}! Fahre wieder zu Schranke ${player.step+1}.`;
    renderDuelPlayer(index);drawDuel();return;
  }
  player.step++;player.answer='';player.phase='driving';player.speed=0;
  Object.values(player.controls).forEach(control=>control.clear());
  player.feedback=player.step===10?'Alle Schranken offen! Fahre selbst bis zur Zielflagge.':'Schranke offen! Gib Gas und lenke zur nächsten.';
  renderDuelPlayer(index);drawDuel();
}
function finishDuel(index){
  stopDuel();
  const winner=document.querySelector('#duelWinner');
  winner.textContent=`${index===0?'🔴 Rot':'🔵 Blau'} – Person ${index+1} gewinnt!`;
  document.querySelector('#duelResult').dataset.winner=index===0?'red':'blue';
  document.querySelector('#duelResult').classList.remove('hidden');duelState.players.forEach((_,i)=>renderDuelPlayer(i));
}
function animateDuel(time){
  if(!duelState.running)return;
  const dt=duelState.lastTime?Math.min(.04,(time-duelState.lastTime)/1000):0;duelState.lastTime=time;
  if(!document.hidden){
    // Small physics steps prevent crossing road edges or barriers between frames.
    const steps=Math.max(1,Math.ceil(dt/.012));
    for(let step=0;step<steps&&duelState.running;step++)duelState.players.forEach((_,i)=>updateDuelPlayer(i,dt/steps));
  }
  drawDuel();if(duelState.running)duelState.frame=requestAnimationFrame(animateDuel);
}
function drawDuel(){duelState.players.forEach((player,index)=>drawDuelCourse(player,index))}
function drawDuelCourse(player,index){
  const canvas=document.querySelectorAll('.duel-canvas')[index];if(!canvas)return;
  const {width,height}=canvas.getBoundingClientRect();if(!width||!height)return;
  const ratio=Math.min(window.devicePixelRatio||1,2);
  if(canvas.width!==Math.round(width*ratio)||canvas.height!==Math.round(height*ratio)){canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio)}
  const ctx=canvas.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);
  ctx.fillStyle=duelRoute.ground;ctx.fillRect(0,0,width,height);
  const zoom=Math.max(.5,Math.min(1.15,width/380));
  ctx.save();ctx.translate(width/2,height/2);ctx.scale(zoom,zoom);ctx.translate(-player.x-Math.cos(player.heading)*65,-player.y-Math.sin(player.heading)*65);
  const cameraX=player.x+Math.cos(player.heading)*65,cameraY=player.y+Math.sin(player.heading)*65;
  // Both tracks share the same scenery, kept clear of the drivable road.
  for(const item of DUEL_LANDSCAPE){
    if(Math.abs(item.x-cameraX)>width/zoom/2+50||Math.abs(item.y-cameraY)>height/zoom/2+50)continue;
    ctx.save();ctx.translate(item.x,item.y);
    if(duelRoute.id!=='meadow'&&duelRoute.id!=='forest'){
      drawDuelLandmark(ctx,item,duelRoute.id);
    }else if(item.type==='tree'){
      ctx.fillStyle='#44784a35';ctx.beginPath();ctx.ellipse(9,12,item.size+4,item.size*.7,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#8b6040';ctx.fillRect(-4,0,8,item.size+7);
      ctx.fillStyle=['#377d4c','#438b47','#598b41'][item.variant];ctx.beginPath();ctx.arc(0,-4,item.size,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#ffffff18';ctx.beginPath();ctx.arc(-7,-11,item.size*.55,0,Math.PI*2);ctx.fill();
    }else if(item.type==='flowers'){
      for(let flower=0;flower<4;flower++){
        const x=(flower%2)*14-7,y=Math.floor(flower/2)*14-7;
        ctx.fillStyle=['#fff7d0','#e8d3f5','#f4a7b1'][item.variant];
        for(let petal=0;petal<5;petal++){const angle=petal*Math.PI*2/5;ctx.beginPath();ctx.arc(x+Math.cos(angle)*4,y+Math.sin(angle)*4,3,0,Math.PI*2);ctx.fill()}
        ctx.fillStyle='#eebf43';ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();
      }
    }else{
      ctx.fillStyle='#5e785526';ctx.beginPath();ctx.ellipse(4,7,17,10,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#9ca8a0';ctx.beginPath();ctx.ellipse(0,0,14,10,-.3,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#c5cfc1';ctx.beginPath();ctx.ellipse(-3,-4,8,4,-.3,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }
  ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();DUEL_COURSE.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
  ctx.strokeStyle='#f7edce';ctx.lineWidth=DUEL_ROAD_WIDTH+10;ctx.stroke();ctx.strokeStyle=duelRoute.road;ctx.lineWidth=DUEL_ROAD_WIDTH;ctx.stroke();
  ctx.strokeStyle='#f5f0cf';ctx.lineWidth=3;ctx.setLineDash([17,19]);ctx.stroke();ctx.setLineDash([]);
  DUEL_COURSE.gates.forEach((distance,i)=>{
    const gate=duelCoursePoint(distance);ctx.save();ctx.translate(gate.x,gate.y);ctx.rotate(gate.angle);
    ctx.fillStyle='#fff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText(String(i+1),-9,-DUEL_ROAD_WIDTH/2-14);
    ctx.fillStyle='#333f4a';ctx.fillRect(-6,-DUEL_ROAD_WIDTH/2-8,12,12);
    if(i>=player.step){for(let y=-DUEL_ROAD_WIDTH/2;y<DUEL_ROAD_WIDTH/2;y+=10){ctx.fillStyle=Math.round((y+DUEL_ROAD_WIDTH/2)/10)%2?'#fff':'#ed625b';ctx.fillRect(-5,y,10,10)}}
    else{ctx.fillStyle='#62d292';ctx.fillRect(-5,-DUEL_ROAD_WIDTH/2-34,10,32)}
    ctx.restore();
  });
  const finish=duelCoursePoint(DUEL_COURSE.length-12);ctx.save();ctx.translate(finish.x,finish.y);ctx.rotate(finish.angle);
  for(let x=-9;x<10;x+=9)for(let y=-45;y<45;y+=9){ctx.fillStyle=((x+9)/9+(y+45)/9)%2?'#fff':'#27333c';ctx.fillRect(x,y,9,9)}ctx.restore();
  ctx.save();ctx.translate(player.x,player.y);ctx.rotate(player.heading);
  ctx.fillStyle='#223343';for(const x of [-13,8])for(const y of [-16,10])ctx.fillRect(x,y,10,6);
  const paint=equippedReward(CAR_PAINTS,'carPaint','classic');
  ctx.fillStyle=paint.id==='classic'?(index===0?'#ed6158':'#509cfa'):paint.color;ctx.beginPath();ctx.roundRect(-23,-12,46,24,7);ctx.fill();
  const pattern=equippedReward(CAR_PATTERNS,'carPattern','plain').id;
  if(pattern==='stripes'){ctx.fillStyle='#fff7df';ctx.fillRect(-21,-6,41,3);ctx.fillRect(-21,3,41,3)}
  if(pattern==='dots'){ctx.fillStyle='#fff7df';for(const [x,y] of [[-17,-6],[-14,6],[14,-5],[13,6]]){ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill()}}
  ctx.fillStyle='#d7f3ff';ctx.fillRect(0,-9,10,18);ctx.fillStyle='#293c51';ctx.fillRect(-12,-8,10,16);ctx.fillStyle='#fff6b7';ctx.fillRect(17,-10,4,5);ctx.fillRect(17,5,4,5);ctx.fillStyle='#fff';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText(String(index+1),-7,4);ctx.restore();ctx.restore();
  // A complete-course inset shows bends, remaining gates and the finish.
  const mapWidth=Math.min(72,width*.25),mapHeight=mapWidth*1.38,scale=mapWidth/900;
  ctx.save();ctx.translate(width-mapWidth-7,7);ctx.fillStyle='#f5faeddf';ctx.fillRect(0,0,mapWidth,mapHeight);
  ctx.scale(scale,scale);ctx.lineWidth=26;ctx.strokeStyle='#728272';ctx.beginPath();DUEL_COURSE.points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();
  ctx.fillStyle=index===0?'#c52b32':'#1761cf';ctx.beginPath();ctx.arc(player.x,player.y,30,0,Math.PI*2);ctx.fill();ctx.fillStyle='#223343';ctx.fillRect(680,60,60,35);ctx.restore();
}

// Canvas scenery keeps every world crisp at tablet resolution, without emoji fonts.
function drawDuelLandmark(ctx,item,world){
  const n=item.variant,r=item.size;
  const ellipse=(x,y,rx,ry,color)=>{ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill()};
  const line=(points,color,width)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke()};
  const mountain=(color,snow=false)=>{ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-r*1.4,r);ctx.lineTo(0,-r*1.5);ctx.lineTo(r*1.5,r);ctx.closePath();ctx.fill();if(snow){ctx.fillStyle='#f9fdff';ctx.beginPath();ctx.moveTo(-r*.5,-r*.6);ctx.lineTo(0,-r*1.5);ctx.lineTo(r*.55,-r*.6);ctx.lineTo(0,-r*.8);ctx.fill()}};
  ellipse(5,r*.65,r*1.2,r*.45,'#2334481a');
  if(world==='coast'){
    if(n===0){line([[3,21],[0,-14]],'#99734a',6);for(let i=0;i<6;i++){const a=i*Math.PI/3;line([[0,-14],[Math.cos(a)*r*.8,-18+Math.sin(a)*r*.6],[Math.cos(a)*r*1.2,-12+Math.sin(a)*r]],i%2?'#428a6b':'#5b9d66',7)}ellipse(2,-11,4,4,'#805a3a')}
    else if(n===1){ellipse(0,0,r,r*.7,'#f9e5c7');for(let i=-2;i<=2;i++)line([[0,8],[i*5,-8]],'#d7b49c',2)}
    else{ellipse(0,0,r*1.4,r*.8,'#75bfc9');line([[-r,0],[0,3],[r,-2]],'#d9f7f2',3)}
  }else if(world==='desert'){
    if(n===0){line([[0,20],[0,-20]],'#4d8c67',11);line([[0,1],[-14,1],[-14,-10]],'#4d8c67',8);line([[0,9],[13,9],[13,-2]],'#4d8c67',8);line([[-2,15],[-2,-16]],'#80ac7c',2)}
    else if(n===1){ellipse(0,0,r,r*.6,'#a8947c');ellipse(-4,-4,r*.55,r*.2,'#cbbda1')}
    else{ellipse(0,0,r*1.5,r*.65,'#e2bb76');ellipse(-4,-4,r*1.1,r*.4,'#f4d69b')}
  }else if(world==='snow'){
    if(n===0){line([[0,14],[0,-12]],'#876d63',7);for(let i=0;i<3;i++){ctx.fillStyle=i%2?'#e5f6f8':'#719a98';ctx.beginPath();ctx.moveTo(-r+i*4,14-i*11);ctx.lineTo(0,-r-i*3);ctx.lineTo(r-i*4,14-i*11);ctx.fill()}}
    else if(n===1)mountain('#a4b9cc',true);
    else{ellipse(0,8,14,15,'#fff');ellipse(0,-11,10,10,'#fff');ellipse(-3,-13,1.5,1.5,'#415164');ellipse(3,-13,1.5,1.5,'#415164');line([[-9,-2],[9,-2]],'#d8878b',4)}
  }else if(world==='volcano'){
    if(n===0){mountain('#4e4757');ellipse(0,-r,7,4,'#ef8753');line([[-2,-r],[5,0],[-3,r*.5]],'#e9804d',4)}
    else if(n===1){ellipse(0,0,r,r*.7,'#4b4955');ellipse(-4,-4,r*.5,r*.2,'#74707b')}
    else{ellipse(0,0,r,r*.7,'#a34f44');ellipse(0,0,r*.7,r*.4,'#f3a45a');ellipse(-3,-2,r*.3,r*.2,'#ffe1a0')}
  }else if(world==='moon'){
    if(n===0){ellipse(0,0,r*1.2,r*.8,'#777e9d');ellipse(2,3,r*.8,r*.5,'#5c6584');line([[-r,-2],[0,-r*.7],[r,-2]],'#b0b7ce',3)}
    else if(n===1){ctx.fillStyle='#d8deec';ctx.fillRect(-12,-12,24,24);ctx.fillStyle='#6a8db4';ctx.fillRect(-31,-8,16,16);ctx.fillRect(15,-8,16,16);line([[0,-12],[5,-25]],'#e1e7f3',3);ellipse(6,-26,4,4,'#e7a988')}
    else{ellipse(0,0,r,r*.6,'#bcc6da');ellipse(-4,-6,r*.55,r*.3,'#dbe2ed');line([[-7,7],[7,7]],'#7c8aa6',3)}
  }
}

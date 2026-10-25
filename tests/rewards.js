const assert=(value,message)=>{if(!value)throw Error(message)};
teacherPreview=false;
profiles=[{id:'rewards',name:'Test',emoji:'🌟',facts:{},areaStars:Object.fromEntries(AREAS.map(a=>[a,0]))}];activeProfileId='rewards';
const profile=getProfile();
for(let level=2;level<=100;level++)assert(getNewUnlocks(level-1,level).length===1,`Expected one reward at ${level}`);
for(const group of Object.values(REWARD_GROUPS))for(const item of group)assert(Number.isInteger(item.level),'Unscheduled reward');
for(const id of ['catch','pipe','race']){
 const boundary=gameRewardLevel(id);
 for(const level of [boundary-1,boundary]){
  profile.areaStars.mal=(level-1)*40;renderProfileHeader();
  assert(hasGameReward(id)===(level===boundary),`Wrong gate ${id}`);
  assert(elements[`games${id[0].toUpperCase()+id.slice(1)}Card`].disabled===(level<boundary),`Wrong card ${id}`);
 }
}
profile.areaStars.mal=0;profile.areaStars.plus=0;profile.theme='night';profile.tileStyle='gold';applyRewards();
assert(!document.body.classList.contains('theme-night')&&!document.body.classList.contains('tiles-gold'),'Locked appearance stayed active');
profile.areaStars.plus=1000;applyRewards();assert(document.body.classList.contains('theme-night'),'Earned theme missing');
profile.areaStars.plus=0;selectedDuelRoute='moon';beginDuel();cancelAnimationFrame(duelState.frame);assert(duelRoute.id==='meadow','Locked route started');stopDuel();
const signatures=new Set();
for(const route of RACE_ROUTES){
 profile.areaStars.mal=(route.level-1)*40;selectedDuelRoute=route.id;beginDuel();cancelAnimationFrame(duelState.frame);
 assert(duelRoute.id===route.id,'Unlocked route missing');assert(DUEL_COURSE.gates.length===10,'Missing gates');
 signatures.add(JSON.stringify(DUEL_COURSE.points));
 const p=duelState.players[0];let frames=0;
 while(duelState.running&&frames++<30000){
  if(p.phase==='question'){const t=p.tasks[p.step];for(const d of String(t.a*t.b))duelInput(0,d);duelInput(0,'Prüfen')}
  const target=duelCoursePoint(Math.min(DUEL_COURSE.length,p.progress+42));
  let turn=Math.atan2(target.y-p.y,target.x-p.x)-p.heading;turn=Math.atan2(Math.sin(turn),Math.cos(turn));
  setDuelControl(0,'up','test',true);setDuelControl(0,'left','test',turn<-.04);setDuelControl(0,'right','test',turn>.04);updateDuelPlayer(0,.01);
 }
 assert(p.step===10&&!duelState.running,'Route cannot be completed: '+route.id);
}
assert(signatures.size===3,'Routes share one layout');
selectedDuelRoute='meadow';showScreen('games');
return 'Passed: one reward on every level 2–100, gates, locked cosmetics, route locks and all seven races';

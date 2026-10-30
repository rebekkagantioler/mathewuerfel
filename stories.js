const storyUI = Object.fromEntries(['storyHome','storyTier','storyStart','storyQuestion','storyBadge','storyText','storyWork','storyFeedback','storyCheck','storyHint','storyNext','storySummary'].map(id=>[id,document.getElementById(id)]));
let storyState={question:0,task:null,failed:false,helped:false,locked:false,profileId:null,recent:[],seenThisRound:new Set()};
function parseStoryExpression(source){
  const normalized=source.replace(/\s/g,'').replace(/[xX×·]/g,'*').replace(/[÷:]/g,'/').replace(/−/g,'-').replace(/,/g,'.');
  if(!normalized||normalized.length>200||!/^[\d.+*/()\-]+$/.test(normalized))throw Error('Schreibe nur Zahlen, Rechenzeichen und Klammern.');
  const tokens=normalized.match(/\d+(?:\.\d+)?|[()+*/-]/g)||[];
  if(tokens.join('')!==normalized)throw Error('Diese Schreibweise kann ich noch nicht lesen.');
  let i=0;
  function join(op,left,right){
    if(op==='/'&&right.value===0)throw Error('Durch null kann man nicht teilen.');
    const value=op==='*'?left.value*right.value:op==='/'?left.value/right.value:op==='+'?left.value+right.value:left.value-right.value;
    return {value,numbers:[...left.numbers,...right.numbers],ops:[...left.ops,...right.ops,op],children:[left,right]};
  }
  function atom(){
    if(tokens[i]==='('){i++;const node=sum();if(tokens[i++]!==')')throw Error('Prüfe deine Klammern.');return node}
    if(tokens[i]==='-'){i++;const node=atom();return {...node,value:-node.value}}
    const token=tokens[i++];if(!/^\d/.test(token||''))throw Error('Hier fehlt eine Zahl.');
    return {value:Number(token),numbers:[Number(token)],ops:[],children:[]};
  }
  function product(){let node=atom();while(tokens[i]==='*'||tokens[i]==='/'){const op=tokens[i++];node=join(op,node,atom())}return node}
  function sum(){let node=product();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++];node=join(op,node,product())}return node}
  const node=sum();if(i!==tokens.length||!Number.isFinite(node.value))throw Error('Prüfe deinen Rechenweg.');
  return node;
}
function makeStoryTask(template,easy=false,previousText=''){
  for(let tries=0;tries<300;tries++){
    const s={a:pickRow(),b:randomInt(easy?3:6,easy?5:10),d:randomInt(2,5)};
    s.c=randomInt(1,s.b-1);
    const steps=template.steps(s),results=steps.map(step=>parseStoryExpression(step).value);
    if(results.some(value=>value<0||!Number.isInteger(value)))continue;
    const text=template.text(s);if(text===previousText)continue;
    return {id:template.id,tier:template.tier,text,steps,results,answer:results.at(-1),numbers:(text.match(/\d+/g)||[]).map(Number),areas:[...new Set(steps.flatMap(step=>parseStoryExpression(step).ops).map(op=>OP_TO_AREA[op]))]};
  }
  throw Error('Für diese Auswahl konnte keine passende Geschichte erstellt werden. Bitte starte noch einmal.');
}
function getStoryTier(profile){
  const solved=Object.values(profile?.storyPractice?.types||{}).reduce((n,s)=>n+(s.correct||0),0);
  return Math.min(3,Math.max(1,1+Math.floor((getRewardLevel(profile)-1)/3),1+Math.floor(solved/12)));
}
function chooseStoryTemplate(profile,tier,question,recent=[],seen=new Set()){
  const stats=profile?.storyPractice?.types||{};
  let pool=STORY_TEMPLATES.filter(t=>t.tier===tier&&!recent.includes(t.id));
  if(!pool.length)pool=STORY_TEMPLATES.filter(t=>t.tier===tier);
  const fresh=pool.filter(t=>!stats[t.id]&&!seen.has(t.id));
  const weak=pool.filter(t=>stats[t.id]?.wrong>0).sort((a,b)=>{
    const score=t=>(stats[t.id].wrong/(stats[t.id].attempts||1))*3+(stats[t.id].lastFailed?2:0);
    return score(b)-score(a);
  });
  // Alternate discovery and targeted review within the requested difficulty slot.
  if(question%4>=2&&weak.length)return weak[randomInt(0,Math.min(2,weak.length-1))];
  if(fresh.length)return fresh[randomInt(0,fresh.length-1)];
  const leastSeen=pool.filter(t=>!seen.has(t.id));if(leastSeen.length)pool=leastSeen;
  const weights=pool.map(t=>({t,w:1+(stats[t.id]?.lastFailed?5:0)+3*(stats[t.id]?.wrong||0)/Math.max(1,stats[t.id]?.attempts||0)}));
  let pick=Math.random()*weights.reduce((n,x)=>n+x.w,0);return weights.find(x=>(pick-=x.w)<0)?.t||pool[0];
}
function openStories(){
  if(!getProfile())return showProfileSelection();
  const max=teacherPreview?3:getStoryTier(getProfile());
  storyUI.storyTier.replaceChildren();
  [['auto','Passend für mich'],['1','Ein Rechenschritt'],['2','Zwei Rechenschritte'],['3','Drei Rechenschritte']].forEach(([value,label])=>{
    const option=document.createElement('option');option.value=value;option.textContent=label+(Number(value)>max?' · noch gesperrt':'');option.disabled=Number(value)>max;storyUI.storyTier.append(option);
  });
  storyUI.storySummary.textContent=`${STORY_TEMPLATES.length} Geschichtenideen mit neuen Zahlen. Zwei Schritte ab Bereichslevel 4 oder 12 sicher gelösten Geschichten; drei Schritte ab Bereichslevel 7 oder 24 sicher gelösten Geschichten.`;
  storyUI.storyQuestion.classList.add('hidden');storyUI.storyStart.classList.remove('hidden');showScreen('stories');
}
function startStories(){
  if(requestRows('stories',startStories))return;
  const profile=getProfile();if(!profile)return showProfileSelection();
  const max=teacherPreview?3:getStoryTier(profile);
  const chosen=storyUI.storyTier.value;
  storyState={question:0,task:null,failed:false,helped:false,locked:false,profileId:profile.id,recent:[...(profile.storyPractice?.recent||[])],seenThisRound:new Set(),ceiling:chosen==='auto'?max:Math.min(max,Number(chosen)||1)};
  storyUI.storyStart.classList.add('hidden');storyUI.storyQuestion.classList.remove('hidden');nextStory();
}
function getStorySlotTier(profile,ceiling,question){
  if(question%2===1)return ceiling;
  const easier=Math.max(1,ceiling-1);
  if(question%4===2){
    const stats=profile?.storyPractice?.types||{};
    const weak=STORY_TEMPLATES.filter(t=>t.tier<=easier&&stats[t.id]?.lastFailed);
    if(weak.length)return weak[randomInt(0,weak.length-1)].tier;
  }
  return easier;
}
function nextStory(){
  if(storyState.profileId!==getProfile()?.id)return openStories();
  if(storyState.question>=5){storyUI.storyQuestion.classList.add('hidden');storyUI.storyStart.classList.remove('hidden');let summary=document.getElementById('storyRoundSummary');if(!summary){summary=document.createElement('p');summary.id='storyRoundSummary';storyUI.storyStart.prepend(summary)}summary.textContent='Fünf Geschichten geschafft! ✨';return}
  const easy=storyState.question%2===0;
  const tier=getStorySlotTier(getProfile(),storyState.ceiling,storyState.question);
  const template=chooseStoryTemplate(getProfile(),tier,storyState.question,storyState.recent,storyState.seenThisRound);
  const previousText=getProfile()?.storyPractice?.types?.[template.id]?.lastText||'';
  storyState.task=makeStoryTask(template,easy,previousText);storyState.failed=false;storyState.helped=false;storyState.locked=false;
  storyState.recent.push(template.id);storyState.recent=storyState.recent.slice(-8);storyState.seenThisRound.add(template.id);
  storyUI.storyBadge.textContent=`Geschichte ${storyState.question+1} von 5 · ${easy?'Zum Warmwerden':'Zum Knobeln'} · ${tier} ${tier===1?'Schritt':'Schritte'}`;
  storyUI.storyText.textContent=storyState.task.text;storyUI.storyWork.value='';storyUI.storyWork.disabled=false;
  storyUI.storyFeedback.textContent='';storyUI.storyFeedback.className='feedback';storyUI.storyCheck.disabled=false;storyUI.storyHint.disabled=false;storyUI.storyNext.classList.add('hidden');
}
function validateStoryWork(task,source){
  const lines=source.split(/[\n;]+/).map(line=>line.trim()).filter(Boolean);
  if(!lines.length)throw Error('Schreibe zuerst deinen Rechenweg auf.');
  if(lines.length>12)throw Error('Nutze bitte höchstens zwölf Rechenzeilen.');
  const available=new Set(task.numbers);let last=NaN,arithmetic=false;
  for(const line of lines){
    const parts=line.split('=');if(parts.some(part=>!part.trim()))throw Error('Vervollständige deine Rechnung nach dem Gleichheitszeichen.');
    const left=parseStoryExpression(parts[0]);
    const grounded=node=>available.has(node.value)||(node.children.length>0&&node.children.every(grounded));
    if(!grounded(left))throw Error('Nutze die Zahlen aus der Geschichte oder deine bisherigen Zwischenergebnisse. Zeige Zerlegungen mit Klammern oder in einer eigenen Gleichung.');
    const values=parts.map(part=>parseStoryExpression(part).value);
    if(values.some(value=>Math.abs(value-left.value)>1e-8))throw Error('In einer Zeile müssen alle Seiten des Gleichheitszeichens gleich viel wert sein. Prüfe diese Rechnung oder beginne eine neue Zeile.');
    arithmetic ||= left.ops.length>0;available.add(left.value);
    // An equality may also establish a useful decomposition, e.g. 8 = 10 - 2.
    parts.slice(1).forEach(part=>parseStoryExpression(part).numbers.forEach(number=>available.add(number)));
    last=values.at(-1);
  }
  if(!arithmetic)throw Error('Zeige auch deine Rechnung, damit dein Rechenweg sichtbar wird.');
  if(Math.abs(last-task.answer)>1e-8)throw Error('Deine Rechnung führt noch nicht zur gesuchten Antwort. Lies die Frage noch einmal und prüfe, ob ein Schritt fehlt.');
  return true;
}
function recordStoryAttempt(success){
  const profile=getProfile();if(!profile||teacherPreview||profile.id!==storyState.profileId)return;
  profile.storyPractice||={types:{},recent:[]};profile.storyPractice.types||={};
  const task=storyState.task;const stats=profile.storyPractice.types[task.id]||={attempts:0,correct:0,wrong:0};
  if(!success&&!storyState.failed){stats.attempts++;stats.wrong++;stats.lastFailed=true}
  if(success){
    if(!storyState.failed){stats.attempts++;if(!storyState.helped)stats.correct++;else stats.wrong++}
    stats.lastFailed=storyState.failed||storyState.helped;
    task.areas.forEach(area=>addAreaStars(profile,area,1));incrementActivity('stories');
  }
  stats.lastText=task.text;profile.storyPractice.recent=[...storyState.recent];saveProfiles();
}
function checkStory(){
  if(storyState.locked||!storyState.task)return;
  if(!storyUI.storyWork.value.trim()){storyUI.storyFeedback.textContent='Schreibe zuerst deinen Rechenweg auf.';return}
  try{validateStoryWork(storyState.task,storyUI.storyWork.value)}catch(error){
    recordStoryAttempt(false);storyState.failed=true;storyUI.storyFeedback.textContent=error.message;storyUI.storyFeedback.className='feedback wrong';return;
  }
  recordStoryAttempt(true);storyState.locked=true;storyUI.storyWork.disabled=true;storyUI.storyCheck.disabled=true;storyUI.storyHint.disabled=true;
  storyUI.storyFeedback.textContent='Dein Rechenweg stimmt! Du hast die Geschichte gelöst. ✨';storyUI.storyFeedback.className='feedback correct';storyUI.storyNext.classList.remove('hidden');renderProfileHeader();maybeShowLevelUp();
}
function storyHint(){
  if(storyState.locked)return;storyState.helped=true;
  const task=storyState.task;
  storyUI.storyFeedback.textContent=task.tier===1?'Was ist gesucht? Überlege, was mit den Mengen passiert. Du kannst deine Rechnung mit +, −, × oder ÷ aufschreiben.':`Ein möglicher Anfang ist ${task.steps[0].replace(/\*/g,' × ').replace(/\//g,' ÷ ')} = ${task.results[0]}. Was musst du mit diesem Zwischenergebnis noch herausfinden?`;
}
document.getElementById('gamesStoriesCard').addEventListener('click',openStories);
storyUI.storyHome.addEventListener('click',()=>showScreen('games'));
document.getElementById('storyBegin').addEventListener('click',startStories);
storyUI.storyCheck.addEventListener('click',checkStory);storyUI.storyHint.addEventListener('click',storyHint);
storyUI.storyNext.addEventListener('click',()=>{storyState.question++;nextStory()});

function storyKeyInput(key){
  const field=storyUI.storyWork;
  if(storyState.locked||field.disabled)return;
  let start=field.selectionStart??field.value.length,end=field.selectionEnd??start;
  let insert=key;
  if(key==='⌫'){if(start===end)start=Math.max(0,start-1);insert=''}
  if(key==='Löschen'){start=0;end=field.value.length;insert=''}
  if(key==='Neue Zeile')insert='\n';
  if(field.value.length-(end-start)+insert.length>500)return;
  field.setRangeText(insert,start,end,'end');
  field.dispatchEvent(new Event('input',{bubbles:true}));
}
for(const key of ['7','8','9','+','−','4','5','6','×',':','1','2','3','=','⌫','0',',','(',')','Neue Zeile','Löschen']){
  const button=document.createElement('button');button.type='button';button.textContent=key;
  button.className=key==='Neue Zeile'||key==='Löschen'?'math-key-wide':'';
  button.setAttribute('aria-label',key==='⌫'?'Letzte Ziffer oder Auswahl löschen':key);
  button.addEventListener('pointerdown',event=>event.preventDefault());
  button.addEventListener('click',()=>storyKeyInput(key));document.querySelector('#storyKeypad').append(button);
}
storyUI.storyWork.addEventListener('keydown',event=>{
  if(/^[0-9+\-−*×:=(),./ ]$/.test(event.key)||event.key==='Enter'||event.key==='Backspace'||event.key==='Delete'){
    event.preventDefault();storyKeyInput(event.key==='Enter'?'Neue Zeile':event.key==='Backspace'?'⌫':event.key==='Delete'?'Löschen':event.key);
  }
});

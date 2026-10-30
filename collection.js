const PROFILE_FIGURES=[
  {id:'cat',name:'Katze',icon:'🐱',level:1,size:1024,box:'155 61 639 916'},
  {id:'rabbit',name:'Kaninchen',icon:'🐰',level:1,size:1024,box:'233 21 584 978'},
  {id:'dog',name:'Hund',icon:'🐶',level:1,size:1024,box:'219 216 559 736'},
  {id:'fox',name:'Fuchs',icon:'🦊',level:2,size:1024,box:'153 96 626 866'},
  {id:'fairy',name:'Fee',icon:'🧚',level:19,size:1024,box:'155 38 720 946'},
  {id:'mermaid',name:'Meerjungfrau',icon:'🧜‍♀️',level:15,size:1254,box:'174 56 1061 1132'},
];
const FIGURE_ACCESSORIES=[
  {id:'none',name:'Ohne Zubehör',icon:'—',level:1},
  {id:'crown',name:'Goldene Krone für die Katze',icon:'👑',level:4,figure:'cat'},
];
function figureAccessory(profile,figure){
  const accessory=FIGURE_ACCESSORIES.find(item=>item.id===profile?.figureAccessories?.[figure.id]);
  return accessory?.figure===figure.id&&collectionUnlocked(accessory)?accessory.id:'none';
}
function figureArt(figure,accessory='none'){
  const crowned=figure.id==='cat'&&accessory==='crown';
  const overlay=crowned?'<image class="figure-accessory" href="./assets/accessories/cat-crown.png" x="10" y="-35" width="1024" height="1024"/>':'';
  return `<svg class="profile-figure" viewBox="${crowned?'155 20 639 957':figure.box}" preserveAspectRatio="xMidYMax meet" role="img" aria-label="${figure.name}${crowned?' mit goldener Krone':''}"><image href="./assets/figures/${figure.id}.png" width="${figure.size}" height="${figure.size}"/>${overlay}</svg>`;
}
function profileFigure(profile){
  return PROFILE_FIGURES.find(item=>item.id===profile?.avatarId)||PROFILE_FIGURES.find(item=>item.icon===profile?.emoji);
}
function profileAvatarArt(profile){
  const figure=profileFigure(profile);
  return figure?figureArt(figure,figureAccessory(profile,figure)):escapeHtml(profile?.emoji||'🌟');
}
function chooseProfileFigure(profile,figure){profile.avatarId=figure.id;profile.emoji=figure.icon}
function renderFigureChoices(container,profile,onChoose){
  container.replaceChildren();
  PROFILE_FIGURES.forEach(item=>{
    const selected=profileFigure(profile)?.id===item.id,locked=!collectionUnlocked(item);
    const button=document.createElement('button');button.type='button';button.className=`reward-choice figure-choice${selected?' selected':''}${locked?' locked':''}`;button.disabled=locked;button.setAttribute('aria-pressed',String(selected));
    button.innerHTML=`${figureArt(item,figureAccessory(profile,item))}<strong>${item.name}</strong><small>${locked?`ab Level ${item.level}`:selected?'Ausgewählt':'Auswählen'}</small>`;
    button.addEventListener('click',()=>{chooseProfileFigure(profile,item);onChoose()});container.append(button);
  });
}
// Cosmetic rewards share the profile's level; learning remains available from level 1.
const COMPANIONS=[
  {id:'none',name:'Ohne Begleittier',icon:'—',level:1},
  {id:'cat',name:'Mila, die Katze',icon:'🐱',level:1,color:'#cba9e6'},
  {id:'rabbit',name:'Lumi, das Kaninchen',icon:'🐰',level:5,color:'#e9c6ae'},
  {id:'fox',name:'Fino, der Fuchs',icon:'🦊',level:10,color:'#eea064'},
];
const CAR_PAINTS=[
  {id:'classic',name:'Rennklassiker',icon:'🏎️',level:1,color:'#ed6158'},
  {id:'mint',name:'Minzflitzer',icon:'🏎️',level:3,color:'#57bdab'},
  {id:'violet',name:'Lavendelblitz',icon:'🏎️',level:7,color:'#a88cdd'},
  {id:'gold',name:'Sonnenauto',icon:'🏎️',level:12,color:'#efba47'},
];
const CAR_PATTERNS=[
  {id:'plain',name:'Ohne Muster',icon:'🚗',level:1},
  {id:'stripes',name:'Rennstreifen',icon:'🏁',level:6},
  {id:'dots',name:'Pünktchen',icon:'🫧',level:14},
];
function companionArt(id){
  const pet=COMPANIONS.find(p=>p.id===id);if(!pet?.color)return '<span aria-hidden="true">—</span>';
  const ears=id==='rabbit'?'<ellipse cx="39" cy="23" rx="9" ry="22"/><ellipse cx="65" cy="23" rx="9" ry="22"/>':'<path d="M24 49 22 12 48 33M58 33 83 12 80 49" stroke-linejoin="round" stroke-width="7" stroke="currentColor"/>';
  return `<svg class="companion-art" viewBox="0 0 110 120" aria-hidden="true" style="color:${pet.color}"><ellipse cx="55" cy="113" rx="33" ry="5" fill="#43345218"/><g class="pet-body" fill="currentColor"><path class="pet-tail" d="M77 100 Q111 81 90 71" fill="none" stroke="currentColor" stroke-width="15" stroke-linecap="round"/><ellipse cx="54" cy="88" rx="27" ry="26"/>${ears}<ellipse cx="53" cy="51" rx="33" ry="29"/><ellipse cx="53" cy="65" rx="23" ry="15" fill="#fff7ee"/><g fill="#3f334c"><ellipse class="pet-eye" cx="39" cy="49" rx="3.5" ry="5"/><ellipse class="pet-eye" cx="68" cy="49" rx="3.5" ry="5"/><path d="m49 61 5 5 5-5Z"/></g><path d="M45 70q9 8 18 0" fill="none" stroke="#6e5061" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="34" cy="61" rx="6" ry="3" fill="#efafaa"/><ellipse cx="74" cy="61" rx="6" ry="3" fill="#efafaa"/><ellipse cx="53" cy="91" rx="14" ry="16" fill="#fff7ee"/><ellipse cx="36" cy="108" rx="12" ry="7"/><ellipse cx="71" cy="108" rx="12" ry="7"/></g></svg>`;
}
function carArt(paint,pattern='plain'){
  return `<svg viewBox="0 0 130 70" aria-hidden="true"><ellipse cx="65" cy="58" rx="49" ry="5" fill="#43345218"/><g fill="#354456"><rect x="26" y="9" width="22" height="11" rx="4"/><rect x="26" y="50" width="22" height="11" rx="4"/><rect x="84" y="9" width="22" height="11" rx="4"/><rect x="84" y="50" width="22" height="11" rx="4"/></g><rect x="12" y="15" width="107" height="39" rx="14" fill="${paint.color}"/><path d="M72 19h18v31H72z" fill="#d8f3fb"/><path d="M42 21h23v27H42z" fill="#52647b"/>${pattern==='stripes'?'<path d="M15 29h100v4H15zm0 8h100v4H15z" fill="#fff9e6"/>':pattern==='dots'?'<g fill="#fff9e6"><circle cx="25" cy="25" r="4"/><circle cx="103" cy="28" r="4"/><circle cx="31" cy="44" r="4"/><circle cx="102" cy="44" r="4"/></g>':''}<path d="M110 21h5v8h-5zm0 21h5v8h-5z" fill="#fff2ab"/></svg>`;
}
function collectionUnlocked(item){return teacherPreview||item.level<=getRewardLevel(getProfile())}
function equippedReward(items,key,fallback){return items.find(item=>item.id===getProfile()?.[key]&&collectionUnlocked(item))||items.find(item=>item.id===fallback)}
function renderCompanion(){
  const host=document.getElementById('learningCompanion');
  const pet=equippedReward(COMPANIONS,'companion','none');
  host.classList.toggle('hidden',pet.id==='none'||!getProfile());
  host.innerHTML=companionArt(pet.id);host.title=pet.name;host.setAttribute('aria-label',`${pet.name} begleitet dich. Begleittier wechseln`);
}
function celebrateCompanion(){const host=document.getElementById('learningCompanion');host.classList.remove('pet-celebrate');void host.offsetWidth;host.classList.add('pet-celebrate')}
function setCollectionTab(id){
  document.querySelectorAll('[data-collection-tab]').forEach(button=>{const active=button.dataset.collectionTab===id;button.setAttribute('aria-pressed',String(active))});
  document.querySelectorAll('[data-collection-panel]').forEach(panel=>panel.classList.toggle('hidden',panel.dataset.collectionPanel!==id));
}
function renderCollectionExtras(){
  const profile=getProfile();if(!profile)return;
  const level=getRewardLevel(profile);
  const route=document.getElementById('levelRoadmap');route.replaceChildren();
  const end=Math.max(REWARD_ORDER.length+2,level+3);
  for(let n=1;n<=end;n++){
    const row=document.createElement('li');row.className=`roadmap-step ${n<level?'earned':n===level?'current':'future'}`;
    if(n===level)row.setAttribute('aria-current','step');
    const items=n===1?[{icon:'🎁',text:'Erste Figuren, Mila die Katze und dein Rennklassiker'}]:getNewUnlocks(n-1,n);
    row.innerHTML=`<span class="roadmap-number">${n<level?'✓':n}</span><div><strong>Level ${n}${n===level?' · Hier bist du':''}</strong>${items.map(item=>`<small>${item.icon} ${item.text}</small>`).join('')}</div><span class="roadmap-status">${n<=level?'offen':'🔒'}</span>`;
    route.append(row);
  }
  renderRewardGroup(document.getElementById('companionGrid'),COMPANIONS,profile.companion||'none',id=>{profile.companion=id});
  document.querySelectorAll('#companionGrid .reward-choice').forEach((button,i)=>button.querySelector('span').innerHTML=companionArt(COMPANIONS[i].id));
  renderRewardGroup(document.getElementById('carPaintGrid'),CAR_PAINTS,profile.carPaint||'classic',id=>{profile.carPaint=id});
  document.querySelectorAll('#carPaintGrid .reward-choice').forEach((button,i)=>button.querySelector('span').innerHTML=carArt(CAR_PAINTS[i],equippedReward(CAR_PATTERNS,'carPattern','plain').id));
  renderRewardGroup(document.getElementById('carPatternGrid'),CAR_PATTERNS,profile.carPattern||'plain',id=>{profile.carPattern=id});
  document.querySelectorAll('#carPatternGrid .reward-choice').forEach((button,i)=>button.querySelector('span').innerHTML=carArt(equippedReward(CAR_PAINTS,'carPaint','classic'),CAR_PATTERNS[i].id));
  renderRewardGroup(document.getElementById('routeGrid'),RACE_ROUTES,profile.raceRoute||'meadow',id=>{profile.raceRoute=id;selectedDuelRoute=id});
  renderAccessoryChoices(profile);
  renderFigureChoices(document.getElementById('collectionFigureGrid'),profile,()=>{saveProfiles();renderProfileHeader();renderProfileSelection();applyRewards();renderRewards()});
}
function renderAccessoryChoices(profile){
  const container=document.getElementById('figureAccessoryGrid');container.replaceChildren();
  const figure=profileFigure(profile),cat=PROFILE_FIGURES.find(item=>item.id==='cat');
  document.getElementById('figureAccessoryHint').textContent=figure?.id==='cat'?'Wähle den Schmuck für deine Katze.':'Die erste Krone passt zur Katze. Wähle oben die Katze aus, um sie anzuziehen.';
  FIGURE_ACCESSORIES.forEach(item=>{
    const locked=!collectionUnlocked(item),selected=figure?.id==='cat'&&figureAccessory(profile,cat)===item.id;
    const button=document.createElement('button');button.type='button';button.className=`reward-choice figure-choice${locked?' locked':''}${selected?' selected':''}`;button.disabled=locked||figure?.id!=='cat';button.setAttribute('aria-pressed',String(selected));
    button.innerHTML=`${figureArt(cat,item.id)}<strong>${item.name}</strong><small>${locked?`ab Level ${item.level}`:selected?'Ausgewählt':figure?.id==='cat'?'Auswählen':'Für die Katze'}</small>`;
    button.addEventListener('click',()=>{profile.figureAccessories||={};profile.figureAccessories.cat=item.id;saveProfiles();renderProfileHeader();renderProfileSelection();applyRewards();renderRewards()});container.append(button);
  });
}
document.querySelectorAll('[data-collection-tab]').forEach(button=>button.addEventListener('click',()=>setCollectionTab(button.dataset.collectionTab)));
document.getElementById('learningCompanion').addEventListener('click',()=>{openRewards();setCollectionTab('companions')});

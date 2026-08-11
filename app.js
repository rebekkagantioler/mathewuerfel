const FREE_QUESTIONS = 15;
const SHOP_QUESTIONS = 8;
const STORAGE_KEY = 'malMagieProfilesV1';
const EMOJIS = [
  { icon: '🌟', level: 1 }, { icon: '🐰', level: 1 }, { icon: '🐱', level: 1 },
  { icon: '🐶', level: 1 }, { icon: '🐸', level: 1 }, { icon: '🐨', level: 1 },
  { icon: '🦊', level: 2 }, { icon: '🐼', level: 3 }, { icon: '🦁', level: 4 },
  { icon: '🦋', level: 5 }, { icon: '🦄', level: 6 }, { icon: '🐲', level: 7 },
  { icon: '🧚', level: 8 }, { icon: '🐙', level: 9 }, { icon: '🚀', level: 10 },
  { icon: '🍭', level: 12 }, { icon: '💎', level: 14 }, { icon: '👑', level: 16 },
  { icon: '🏰', level: 18 }, { icon: '🌈', level: 20 }, { icon: '🔮', level: 25 },
];
const THEMES = [
  { id: 'classic', name: 'Zahlen-Abenteuer', icon: '✨', level: 1 }, { id: 'mint', name: 'Minzwiese', icon: '🌿', level: 3 },
  { id: 'sunset', name: 'Sonnenuntergang', icon: '🌅', level: 6 }, { id: 'night', name: 'Sternennacht', icon: '🌙', level: 10 },
  { id: 'candy', name: 'Zuckerwatte', icon: '🍬', level: 15 },
];
const TILE_STYLES = [
  { id: 'classic', name: 'Klassisch', icon: '🔢', level: 1 }, { id: 'rainbow', name: 'Regenbogen', icon: '🌈', level: 4 },
  { id: 'gold', name: 'Gold', icon: '🏆', level: 8 }, { id: 'space', name: 'Weltraum', icon: '🪐', level: 12 },
];
const GAME_REWARDS=[
  {name:'Einmaleins üben',icon:'✖️',level:1},{name:'Geteilt üben',icon:'➗',level:1},
  {name:'Königsaufgaben-Turm',icon:'👑',level:1},{name:'Nachbaraufgaben-Domino',icon:'🁣',level:1},{name:'Verdopplungskette',icon:'🔗',level:1},
  {name:'Umkehraufgaben-Memory',icon:'🧩',level:1},{name:'Ladenwelt',icon:'🛒',level:1},
  {name:'Zahl bauen',icon:'🏗️',level:1},{name:'Tausch-Challenge',icon:'🔄',level:1},{name:'Minus-Werkstatt',icon:'✂️',level:1},
  {name:'Zahlenstrahl',icon:'📏',level:1},
  {name:'Lösungen auffangen',icon:'🧺',level:5},{name:'Tempo-Rennen',icon:'⏱️',level:5},
  {name:'Größerer Laden',icon:'🏪',level:7},{name:'Schnelle Fangwellen',icon:'⚡',level:10},{name:'Großes Geschäft',icon:'🏬',level:12},
];

const screens = {
  profiles: document.querySelector('#profileScreen'),
  activities: document.querySelector('#activityScreen'),
  start: document.querySelector('#startScreen'),
  game: document.querySelector('#gameScreen'),
  finish: document.querySelector('#finishScreen'),
  shopWorld: document.querySelector('#shopWorldScreen'),
  shop: document.querySelector('#shopScreen'),
  shopFinish: document.querySelector('#shopFinishScreen'),
  catch: document.querySelector('#catchScreen'), catchFinish: document.querySelector('#catchFinishScreen'),
  divisionStart: document.querySelector('#divisionStartScreen'), division: document.querySelector('#divisionScreen'), divisionFinish: document.querySelector('#divisionFinishScreen'),
  teacher: document.querySelector('#teacherScreen'),
  games: document.querySelector('#gamesScreen'),
  conceptStart: document.querySelector('#conceptStartScreen'), concept: document.querySelector('#conceptScreen'), conceptFinish: document.querySelector('#conceptFinishScreen'),
  numberLine:document.querySelector('#numberLineScreen'),numberLineFinish:document.querySelector('#numberLineFinishScreen'),
  placeValueStart:document.querySelector('#placeValueStartScreen'),placeValue:document.querySelector('#placeValueScreen'),placeValueFinish:document.querySelector('#placeValueFinishScreen'),
  family:document.querySelector('#familyScreen'),familyFinish:document.querySelector('#familyFinishScreen'),
  race:document.querySelector('#raceScreen'),raceFinish:document.querySelector('#raceFinishScreen'),
  kingTower:document.querySelector('#kingTowerScreen'),kingTowerFinish:document.querySelector('#kingTowerFinishScreen'),
  neighbor:document.querySelector('#neighborScreen'),neighborFinish:document.querySelector('#neighborFinishScreen'),
  doubleChain:document.querySelector('#doubleChainScreen'),doubleChainFinish:document.querySelector('#doubleChainFinishScreen'),
};

const elements = {
  modeGrid: document.querySelector('#modeGrid'),
  mixedMode: document.querySelector('#mixedMode'),
  currentMode: document.querySelector('#currentMode'),
  factorOne: document.querySelector('#factorOne'),
  factorTwo: document.querySelector('#factorTwo'),
  answerZone: document.querySelector('#answerZone'),
  numberTray: document.querySelector('#numberTray'),
  checkButton: document.querySelector('#checkButton'),
  deleteButton: document.querySelector('#deleteButton'),
  homeButton: document.querySelector('#homeButton'),
  feedback: document.querySelector('#feedback'),
  score: document.querySelector('#score'),
  streakCount: document.querySelector('#streakCount'),
  progressBar: document.querySelector('#progressBar'),
  finalScore: document.querySelector('#finalScore'),
  finalTotal: document.querySelector('#finalTotal'),
  finishText: document.querySelector('#finishText'),
  againButton: document.querySelector('#againButton'),
  chooseButton: document.querySelector('#chooseButton'),
  profileButton: document.querySelector('#profileButton'), profileEmoji: document.querySelector('#profileEmoji'),
  profileName: document.querySelector('#profileName'), gameEmoji: document.querySelector('#gameEmoji'),
  activityProfileButton: document.querySelector('#activityProfileButton'), activityProfileEmoji: document.querySelector('#activityProfileEmoji'),
  activityProfileName: document.querySelector('#activityProfileName'),
  backToActivities: document.querySelector('#backToActivities'),
  profileModal: document.querySelector('#profileModal'), closeProfiles: document.querySelector('#closeProfiles'),
  profileSelectGrid: document.querySelector('#profileSelectGrid'), addProfileButton: document.querySelector('#addProfileButton'),
  profileForm: document.querySelector('#profileForm'), starterEmojiGrid: document.querySelector('#starterEmojiGrid'),
  newProfileName: document.querySelector('#newProfileName'), emojiPicker: document.querySelector('#emojiPicker'),
  emojiGrid: document.querySelector('#emojiGrid'), profileModalTitle: document.querySelector('#profileModalTitle'),
  profileLevelSummary: document.querySelector('#profileLevelSummary'), switchProfileButton: document.querySelector('#switchProfileButton'),
  editProfileName: document.querySelector('#editProfileName'), saveProfileName: document.querySelector('#saveProfileName'),
  activityRewardsButton: document.querySelector('#activityRewardsButton'), levelOverview:document.querySelector('#levelOverview'),
  rewardsModal: document.querySelector('#rewardsModal'), closeRewards: document.querySelector('#closeRewards'),
  rewardSummary: document.querySelector('#rewardSummary'), themeGrid: document.querySelector('#themeGrid'), tileGrid: document.querySelector('#tileGrid'), gameRewardGrid:document.querySelector('#gameRewardGrid'),
  shopHomeButton: document.querySelector('#shopHomeButton'), shopEmoji: document.querySelector('#shopEmoji'), shopScore: document.querySelector('#shopScore'),
  shopProgress: document.querySelector('#shopProgress'), shopScene: document.querySelector('#shopScene'), shopStory: document.querySelector('#shopStory'),
  operationChoices: document.querySelector('#operationChoices'), shopEquation: document.querySelector('#shopEquation'),
  shopA: document.querySelector('#shopA'), shopOperator: document.querySelector('#shopOperator'), shopB: document.querySelector('#shopB'),
  shopAnswerZone: document.querySelector('#shopAnswerZone'), shopFeedback: document.querySelector('#shopFeedback'),
  shopActions: document.querySelector('#shopActions'), shopDelete: document.querySelector('#shopDelete'), shopCheck: document.querySelector('#shopCheck'),
  shopNumberArea: document.querySelector('#shopNumberArea'), shopNumberTray: document.querySelector('#shopNumberTray'),
  shopFinalScore: document.querySelector('#shopFinalScore'), shopFinishText: document.querySelector('#shopFinishText'),
  shopAgain: document.querySelector('#shopAgain'), shopChoose: document.querySelector('#shopChoose'),
  leaveShopButton: document.querySelector('#leaveShopButton'), shopBuilding: document.querySelector('#shopBuilding'),
  shopLevelLabel: document.querySelector('#shopLevelLabel'), worldEmoji: document.querySelector('#worldEmoji'), worldLevel: document.querySelector('#worldLevel'),
  shopInstruction: document.querySelector('#shopInstruction'),
  shopWriteArea: document.querySelector('#shopWriteArea'), shopEquationInput: document.querySelector('#shopEquationInput'),
  shopWriteCheck: document.querySelector('#shopWriteCheck'),
  shopPreviewA: document.querySelector('#shopPreviewA'), shopPreviewB: document.querySelector('#shopPreviewB'),
  catchHome: document.querySelector('#catchHome'), catchQuestion: document.querySelector('#catchQuestion'), catchScore: document.querySelector('#catchScore'),
  catchProgress: document.querySelector('#catchProgress'), catchArena: document.querySelector('#catchArena'), fallingAnswer: document.querySelector('#fallingAnswer'),
  catchQuestionBoard: document.querySelector('#catchQuestionBoard'),
  catchBasket: document.querySelector('#catchBasket'), catchFeedback: document.querySelector('#catchFeedback'), catchFinalScore: document.querySelector('#catchFinalScore'),
  catchFinishText: document.querySelector('#catchFinishText'), catchAgain: document.querySelector('#catchAgain'), catchChoose: document.querySelector('#catchChoose'),
  divisionHome: document.querySelector('#divisionHome'), divisionKind: document.querySelector('#divisionKind'),
  divisionScore: document.querySelector('#divisionScore'), divisionProgress: document.querySelector('#divisionProgress'), divisionObjects: document.querySelector('#divisionObjects'),
  divisionStory: document.querySelector('#divisionStory'), divisionA: document.querySelector('#divisionA'), divisionB: document.querySelector('#divisionB'),
  divisionAnswerZone: document.querySelector('#divisionAnswerZone'), divisionFeedback: document.querySelector('#divisionFeedback'),
  divisionInverse: document.querySelector('#divisionInverse'), divisionInverseEquation: document.querySelector('#divisionInverseEquation'),
  divisionConceptControls: document.querySelector('#divisionConceptControls'), divisionConceptText: document.querySelector('#divisionConceptText'), divisionConceptButton: document.querySelector('#divisionConceptButton'),
  divisionDelete: document.querySelector('#divisionDelete'), divisionCheck: document.querySelector('#divisionCheck'), divisionNumberTray: document.querySelector('#divisionNumberTray'),
  divisionFinishText: document.querySelector('#divisionFinishText'), divisionFinalScore: document.querySelector('#divisionFinalScore'), divisionAgain: document.querySelector('#divisionAgain'), divisionChoose: document.querySelector('#divisionChoose'),
  divisionBack: document.querySelector('#divisionBack'), divisionModeGrid: document.querySelector('#divisionModeGrid'), divisionMixed: document.querySelector('#divisionMixed'),
  teacherAreaButton: document.querySelector('#teacherAreaButton'), teacherBack: document.querySelector('#teacherBack'), teacherEmpty: document.querySelector('#teacherEmpty'), teacherContent: document.querySelector('#teacherContent'),
  teacherProfileSelect: document.querySelector('#teacherProfileSelect'), teacherStats: document.querySelector('#teacherStats'), weakFacts: document.querySelector('#weakFacts'), operationStats: document.querySelector('#operationStats'),
  assignmentActivity: document.querySelector('#assignmentActivity'), assignmentTarget: document.querySelector('#assignmentTarget'), assignmentNote: document.querySelector('#assignmentNote'), saveAssignment: document.querySelector('#saveAssignment'), removeAssignment: document.querySelector('#removeAssignment'), teacherMessage: document.querySelector('#teacherMessage'),
  studentAssignment: document.querySelector('#studentAssignment'), assignmentTitle: document.querySelector('#assignmentTitle'), assignmentBar: document.querySelector('#assignmentBar'), assignmentStatus: document.querySelector('#assignmentStatus'),
  levelAvatar: document.querySelector('#levelAvatar'), levelNow: document.querySelector('#levelNow'), levelRewardText: document.querySelector('#levelRewardText'), levelProgressBar: document.querySelector('#levelProgressBar'), levelProgressText: document.querySelector('#levelProgressText'), teacherPreviewBanner: document.querySelector('#teacherPreviewBanner'), endPreview: document.querySelector('#endPreview'), teacherPreviewButton: document.querySelector('#teacherPreviewButton'),
  catchFlash: document.querySelector('#catchFlash'),
  leaveModal: document.querySelector('#leaveModal'), leaveLevelText: document.querySelector('#leaveLevelText'), leaveLevelBar: document.querySelector('#leaveLevelBar'), leaveRewardText: document.querySelector('#leaveRewardText'), stayButton: document.querySelector('#stayButton'), leaveButton: document.querySelector('#leaveButton'),
  levelUpModal: document.querySelector('#levelUpModal'), levelUpNumber: document.querySelector('#levelUpNumber'), levelUpUnlocks: document.querySelector('#levelUpUnlocks'), levelUpClose: document.querySelector('#levelUpClose'),
  understandActivity: document.querySelector('#understandActivity'), gamesActivity: document.querySelector('#gamesActivity'), gamesBack: document.querySelector('#gamesBack'), conceptBack: document.querySelector('#conceptBack'), conceptHome: document.querySelector('#conceptHome'),
  gamesTimesCard: document.querySelector('#gamesTimesCard'), gamesDivisionCard: document.querySelector('#gamesDivisionCard'), gamesFamilyCard: document.querySelector('#gamesFamilyCard'),
  gamesCatchCard: document.querySelector('#gamesCatchCard'), gamesCatchStatus: document.querySelector('#gamesCatchStatus'), gamesCatchLock: document.querySelector('#gamesCatchLock'),
  gamesRaceCard: document.querySelector('#gamesRaceCard'), gamesRaceStatus: document.querySelector('#gamesRaceStatus'), gamesRaceLock: document.querySelector('#gamesRaceLock'), gamesShopCard: document.querySelector('#gamesShopCard'), gamesPlaceValueCard: document.querySelector('#gamesPlaceValueCard'), gamesNumberLineCard: document.querySelector('#gamesNumberLineCard'),
  conceptTitle: document.querySelector('#conceptTitle'), conceptSymbol: document.querySelector('#conceptSymbol'), conceptScore: document.querySelector('#conceptScore'), conceptProgress: document.querySelector('#conceptProgress'), conceptStory: document.querySelector('#conceptStory'), conceptObjects: document.querySelector('#conceptObjects'), conceptLiveEquation: document.querySelector('#conceptLiveEquation'), conceptInstruction: document.querySelector('#conceptInstruction'), conceptAction: document.querySelector('#conceptAction'), conceptAnswerArea: document.querySelector('#conceptAnswerArea'), conceptAnswerZone: document.querySelector('#conceptAnswerZone'), conceptDelete: document.querySelector('#conceptDelete'), conceptCheck: document.querySelector('#conceptCheck'), conceptFeedback: document.querySelector('#conceptFeedback'), conceptNumberArea: document.querySelector('#conceptNumberArea'), conceptNumberTray: document.querySelector('#conceptNumberTray'), conceptFinishText: document.querySelector('#conceptFinishText'), conceptFinalScore: document.querySelector('#conceptFinalScore'), conceptAgain: document.querySelector('#conceptAgain'), conceptChoose: document.querySelector('#conceptChoose'),
  conceptDragArea: document.querySelector('#conceptDragArea'), conceptAppleToken: document.querySelector('#conceptAppleToken'), conceptDropZone: document.querySelector('#conceptDropZone'),
  numberLineHome:document.querySelector('#numberLineHome'),numberLineScore:document.querySelector('#numberLineScore'),numberLineProgress:document.querySelector('#numberLineProgress'),numberLineTask:document.querySelector('#numberLineTask'),numberLineHint:document.querySelector('#numberLineHint'),numberLineVisual:document.querySelector('#numberLineVisual'),numberLineFeedback:document.querySelector('#numberLineFeedback'),numberLineCheck:document.querySelector('#numberLineCheck'),numberLineFinalScore:document.querySelector('#numberLineFinalScore'),numberLineFinishText:document.querySelector('#numberLineFinishText'),numberLineAgain:document.querySelector('#numberLineAgain'),numberLineChoose:document.querySelector('#numberLineChoose'),
  placeValueBack:document.querySelector('#placeValueBack'),placeValueHome:document.querySelector('#placeValueHome'),placeValueModeTitle:document.querySelector('#placeValueModeTitle'),placeValueScore:document.querySelector('#placeValueScore'),placeValueProgress:document.querySelector('#placeValueProgress'),placeValueInstruction:document.querySelector('#placeValueInstruction'),placeValueTask:document.querySelector('#placeValueTask'),placeValueHouses:document.querySelector('#placeValueHouses'),placeValueTray:document.querySelector('#placeValueTray'),placeValueActions:document.querySelector('#placeValueActions'),placeValueReading:document.querySelector('#placeValueReading'),placeValueFeedback:document.querySelector('#placeValueFeedback'),placeValueReset:document.querySelector('#placeValueReset'),placeValueCheck:document.querySelector('#placeValueCheck'),placeValueFinalScore:document.querySelector('#placeValueFinalScore'),placeValueFinishText:document.querySelector('#placeValueFinishText'),placeValueAgain:document.querySelector('#placeValueAgain'),placeValueChoose:document.querySelector('#placeValueChoose'),
  familyHome:document.querySelector('#familyHome'),familyPairs:document.querySelector('#familyPairs'),familyGrid:document.querySelector('#familyGrid'),familyFeedback:document.querySelector('#familyFeedback'),familyAgain:document.querySelector('#familyAgain'),familyChoose:document.querySelector('#familyChoose'),
  raceHome:document.querySelector('#raceHome'),raceTimer:document.querySelector('#raceTimer'),raceProgress:document.querySelector('#raceProgress'),raceA:document.querySelector('#raceA'),raceOperator:document.querySelector('#raceOperator'),raceB:document.querySelector('#raceB'),raceAnswerZone:document.querySelector('#raceAnswerZone'),raceDelete:document.querySelector('#raceDelete'),raceCheck:document.querySelector('#raceCheck'),raceFeedback:document.querySelector('#raceFeedback'),raceNumberTray:document.querySelector('#raceNumberTray'),raceScore:document.querySelector('#raceScore'),raceFinalScore:document.querySelector('#raceFinalScore'),raceFinishText:document.querySelector('#raceFinishText'),raceAgain:document.querySelector('#raceAgain'),raceChoose:document.querySelector('#raceChoose'),
  gamesKingTowerCard:document.querySelector('#gamesKingTowerCard'),kingTowerHome:document.querySelector('#kingTowerHome'),kingTowerScore:document.querySelector('#kingTowerScore'),kingTowerProgress:document.querySelector('#kingTowerProgress'),kingTowerA:document.querySelector('#kingTowerA'),kingTowerB:document.querySelector('#kingTowerB'),kingTowerInstruction:document.querySelector('#kingTowerInstruction'),kingTowerTiles:document.querySelector('#kingTowerTiles'),kingTowerOps:document.querySelector('#kingTowerOps'),kingTowerSum:document.querySelector('#kingTowerSum'),kingTowerCheck:document.querySelector('#kingTowerCheck'),kingTowerFeedback:document.querySelector('#kingTowerFeedback'),kingTowerFinalScore:document.querySelector('#kingTowerFinalScore'),kingTowerFinishText:document.querySelector('#kingTowerFinishText'),kingTowerAgain:document.querySelector('#kingTowerAgain'),kingTowerChoose:document.querySelector('#kingTowerChoose'),
  gamesNeighborCard:document.querySelector('#gamesNeighborCard'),neighborHome:document.querySelector('#neighborHome'),neighborScore:document.querySelector('#neighborScore'),neighborProgress:document.querySelector('#neighborProgress'),neighborKnownEquation:document.querySelector('#neighborKnownEquation'),neighborOpChoice:document.querySelector('#neighborOpChoice'),neighborTargetEquation:document.querySelector('#neighborTargetEquation'),neighborAnswerZone:document.querySelector('#neighborAnswerZone'),neighborDelete:document.querySelector('#neighborDelete'),neighborCheck:document.querySelector('#neighborCheck'),neighborFeedback:document.querySelector('#neighborFeedback'),neighborNumberTray:document.querySelector('#neighborNumberTray'),neighborFinalScore:document.querySelector('#neighborFinalScore'),neighborFinishText:document.querySelector('#neighborFinishText'),neighborAgain:document.querySelector('#neighborAgain'),neighborChoose:document.querySelector('#neighborChoose'),
  gamesDoubleChainCard:document.querySelector('#gamesDoubleChainCard'),doubleChainHome:document.querySelector('#doubleChainHome'),doubleChainScore:document.querySelector('#doubleChainScore'),doubleChainProgress:document.querySelector('#doubleChainProgress'),doubleChainDirection:document.querySelector('#doubleChainDirection'),doubleChainLinks:document.querySelector('#doubleChainLinks'),doubleChainInstruction:document.querySelector('#doubleChainInstruction'),doubleChainAnswerZone:document.querySelector('#doubleChainAnswerZone'),doubleChainDelete:document.querySelector('#doubleChainDelete'),doubleChainCheck:document.querySelector('#doubleChainCheck'),doubleChainFeedback:document.querySelector('#doubleChainFeedback'),doubleChainNumberTray:document.querySelector('#doubleChainNumberTray'),doubleChainFinalScore:document.querySelector('#doubleChainFinalScore'),doubleChainFinishText:document.querySelector('#doubleChainFinishText'),doubleChainAgain:document.querySelector('#doubleChainAgain'),doubleChainChoose:document.querySelector('#doubleChainChoose'),
};

let state = { mode: 2, question: 0, score: 0, streak: 0, a: 2, b: 1, answer: '', locked: false, retryCount: 0, total: FREE_QUESTIONS, roundFacts:{} };
let profiles = loadProfiles();
let activeProfileId = localStorage.getItem(`${STORAGE_KEY}:active`) || null;
let lastFact = '';
let confidenceBoost = false;
let starterEmoji = '🌟';
let shopState = { question: 0, score: 0, task: null, operationChosen: false, answer: '', retryCount: 0, locked: false, hadHelp: false, operations: [], station: 'fruit', difficulty: 1 };
let catchState = { question: 0, score: 0, a: 2, b: 2, queue: [], y: -75, x: 0, basketX: 0, lastTime: 0, frame: 0, running: false, mistake: false, bubbles: [] };
let divisionState = { question:0, score:0, total:12, divisor:3, result:4, type:'share', answer:'', retry:0, locked:false, mode:'understand', conceptStep:0 };
let conceptState={operation:'+',question:0,score:0,a:3,b:2,result:5,step:0,answer:'',locked:false,retry:0};
let numberLineState={question:0,score:0,start:0,jump:0,result:0,step:10,locked:false};
let placeValueState={mode:'build',question:0,score:0,target:0,counts:[0,0,0,0],initial:[],tradeIndex:3,locked:false};
let familyState={cards:[],open:[],pairs:0,locked:false};
let raceState={score:0,timeLeft:60,a:2,b:2,operation:'*',result:4,answer:'',locked:false,timer:null,running:false};
let kingTowerState={question:0,score:0,a:6,b:7,target:42,rule:null,tiles:[],selected:[],op:null,locked:false};
let neighborState={question:0,score:0,a:4,b:8,target:32,helperB:7,helperResult:28,op:'+',answer:'',opChosen:null,locked:false};
let doubleChainState={question:0,score:0,n:2,direction:'up',step:0,values:[0,0,0],answer:'',locked:false};
let teacherPreview=false;
let teacherPreviewSnapshot=null;
let pendingLeaveAction=null;

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => screen.classList.toggle('hidden', key !== name));
}

function confirmLeaveGame(destination, stopAction = null) {
  const profile=getProfile();const level=getLevel(profile);const progress=(profile?.xp||0)%20;const missing=20-progress;
  const round=screens.catch&&!screens.catch.classList.contains('hidden')?catchState.score:screens.placeValue&&!screens.placeValue.classList.contains('hidden')?placeValueState.score:screens.numberLine&&!screens.numberLine.classList.contains('hidden')?numberLineState.score:screens.race&&!screens.race.classList.contains('hidden')?raceState.score:screens.kingTower&&!screens.kingTower.classList.contains('hidden')?kingTowerState.score:screens.neighbor&&!screens.neighbor.classList.contains('hidden')?neighborState.score:screens.doubleChain&&!screens.doubleChain.classList.contains('hidden')?doubleChainState.score:screens.game&&!screens.game.classList.contains('hidden')?state.score:0;
  elements.leaveLevelText.textContent=teacherPreview?'Lehrpersonen-Testmodus':`Noch ${missing} ${missing===1?'Stern':'Sterne'} bis Level ${level+1}`;elements.leaveLevelBar.style.width=`${progress/20*100}%`;elements.leaveRewardText.textContent=teacherPreview?`${round} in dieser Testrunde gesammelt – der Profilstand wird dabei nicht verändert.`:`${round} in dieser Runde · ${progress} von 20 Sternen im aktuellen Level.`;elements.leaveModal.classList.remove('hidden');pendingLeaveAction=()=>{stopAction?.();showScreen(destination)};
}

function closeLeaveModal(){elements.leaveModal.classList.add('hidden');pendingLeaveAction=null}

function flashCatchError(){
  elements.catchFlash.classList.remove('show');
  elements.catchArena.classList.remove('wrong-catch');
  void elements.catchFlash.offsetWidth;
  elements.catchFlash.classList.add('show');
  elements.catchArena.classList.add('wrong-catch');
  window.setTimeout(()=>{elements.catchFlash.classList.remove('show');elements.catchArena.classList.remove('wrong-catch')},1250);
}

function startConceptGame(operation){conceptState={operation,question:0,score:0,a:3,b:2,result:5,step:0,answer:'',locked:false,retry:0};elements.conceptScore.textContent='0';showScreen('concept');nextConceptQuestion()}
function nextConceptQuestion(){if(conceptState.question>=6)return finishConceptGame();const op=conceptState.operation;conceptState.a=randomInt(op==='-'?6:2,op==='-'?12:5);conceptState.b=randomInt(2,5);if(op==='-'&&conceptState.b>=conceptState.a)conceptState.b=conceptState.a-1;conceptState.result=op==='+'?conceptState.a+conceptState.b:op==='-'?conceptState.a-conceptState.b:op==='*'?conceptState.a*conceptState.b:conceptState.b;conceptState.total=op==='/'?conceptState.a*conceptState.b:null;conceptState.step=0;conceptState.answer='';conceptState.locked=false;conceptState.retry=0;const names={'+':'Plus','-':'Minus','*':'Mal','/':'Geteilt'};elements.conceptTitle.textContent=names[op];elements.conceptSymbol.textContent={'+':'＋','-':'−','*':'×','/':'÷'}[op];elements.conceptProgress.style.width=`${conceptState.question/6*100}%`;elements.conceptFeedback.textContent='';elements.conceptFeedback.className='feedback';renderConcept()}
function drawConceptQuantity(filled,capacity,splitAt=null,showRemoved=false){const patterns=[[],[2],[0,4],[0,2,4],[0,1,3,4],[0,1,2,3,4]];const panels=Math.ceil(capacity/5);const board=document.createElement('div');board.className='dice-board';for(let panel=0;panel<panels;panel+=1){const five=document.createElement('span');five.className='dice-five';const filledHere=Math.max(0,Math.min(5,filled-panel*5));const capacityHere=Math.max(0,Math.min(5,capacity-panel*5));const active=patterns[filledHere],possible=patterns[capacityHere];for(let spot=0;spot<5;spot+=1){const dot=document.createElement('i');dot.className='dice-spot';const rank=active.indexOf(spot);if(rank>=0){const itemIndex=panel*5+rank;dot.textContent='🍎';dot.classList.add('filled');if(splitAt!==null&&itemIndex>=splitAt)dot.classList.add('added');if(conceptState.operation==='-'&&conceptState.step<conceptState.b)enablePoolDrag(dot)}else{dot.textContent='•';if(showRemoved&&possible.includes(spot))dot.classList.add('removed')}five.append(dot)}board.append(five)}elements.conceptObjects.append(board)}
function enablePoolDrag(dot){dot.draggable=true;dot.classList.add('removable');dot.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain','pool-item'));let ghost=null;dot.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;dot.setPointerCapture(event.pointerId);ghost=document.createElement('div');ghost.className='concept-apple-ghost';ghost.textContent='🍎';document.body.append(ghost);move(event)});dot.addEventListener('pointermove',event=>{if(!ghost)return;move(event);const target=document.elementFromPoint(event.clientX,event.clientY);elements.conceptDropZone.classList.toggle('drag-over',elements.conceptDropZone.contains(target))});dot.addEventListener('pointerup',event=>{if(!ghost)return;const target=document.elementFromPoint(event.clientX,event.clientY);if(elements.conceptDropZone.contains(target))advanceConcept();ghost.remove();ghost=null;elements.conceptDropZone.classList.remove('drag-over')});function move(event){ghost.style.left=`${event.clientX}px`;ghost.style.top=`${event.clientY}px`}}
function drawConceptGroups(groups,each,placed){for(let g=0;g<groups;g+=1){const count=Math.max(0,Math.min(each,placed-g*each));elements.conceptObjects.append(makeMiniDice(count,`Gruppe ${g+1} · ${count}/${each}`,{kind:'group'}))}}
function drawConceptDivision(children,distributed,total,active){const remaining=total-distributed;const pool=document.createElement('span');pool.className='concept-pool dice-pool';if(remaining===0)pool.innerHTML='<small>Noch übrig</small><b>–</b>';else for(let panel=0;panel<Math.ceil(remaining/5);panel+=1)pool.append(makeMiniDice(Math.min(5,remaining-panel*5),panel===0?`Noch ${remaining} im Vorrat:`:'',{kind:'pool',draggable:active}));elements.conceptObjects.append(pool);for(let c=0;c<children;c+=1){const count=Math.floor(distributed/children)+(c<distributed%children?1:0);elements.conceptObjects.append(makeMiniDice(count,`Kind ${c+1} · ${count}`,{kind:'child'}))}}
function makeMiniDice(count,label,{draggable=false,kind='group',icon='🍎'}={}){const patterns=[[],[2],[0,4],[0,2,4],[0,1,3,4],[0,1,2,3,4]];const box=document.createElement('span');box.className=`concept-group mini-dice-group kind-${kind}`;const title=document.createElement('small');title.textContent=label;box.append(title);const dice=document.createElement('b');dice.className='mini-dice';for(let spot=0;spot<5;spot+=1){const dot=document.createElement('i');const filled=patterns[count].includes(spot);dot.textContent=filled?icon:'•';dot.className=filled?'mini-filled':'';if(filled&&draggable)enablePoolDrag(dot);dice.append(dot)}box.append(dice);return box}
function appendDiceGroup(container,count,icon='🍓'){if(count<=0){const empty=document.createElement('span');empty.className='dice-group-empty';empty.textContent='–';container.append(empty);return}for(let panel=0;panel<Math.ceil(count/5);panel+=1)container.append(makeMiniDice(Math.min(5,count-panel*5),'',{icon}))}
function renderConcept(){
  const s=conceptState,o=s.operation;elements.conceptObjects.replaceChildren();let equation,instruction,action,done=false;
  if(o==='+'){done=s.step>=s.b;equation=`${s.a} + ${s.b} = ?`;instruction=done?'Beide Mengen liegen jetzt zusammen.':'Lege genau einen weiteren Apfel dazu.';action='Einen Apfel dazulegen';elements.conceptStory.textContent=`Zu ${s.a} Äpfeln kommen ${s.b} weitere dazu.`;drawConceptQuantity(s.a+s.step,s.a+s.b,s.a)}
  else if(o==='-'){done=s.step>=s.b;equation=`${s.a} − ${s.b} = ?`;instruction=done?'Die Äpfel im Korb wurden wirklich weggenommen.':'Nimm genau einen Apfel aus dem Würfelbild.';action='Einen Apfel wegnehmen';elements.conceptStory.textContent=`Von ${s.a} Äpfeln werden ${s.b} weggenommen.`;drawConceptQuantity(s.a-s.step,s.a,null,true)}
  else if(o==='*'){done=s.step>=s.a*s.b;equation=`${s.a} × ${s.b} = ?`;const group=Math.min(s.a,Math.floor(s.step/s.b)+1);instruction=done?`${s.a} gleich große Gruppen mit je ${s.b} Äpfeln sind entstanden – nichts wurde verteilt, alles kam neu dazu.`:`Du hast unendlich viele Äpfel zur Verfügung. Lege genau einen weiteren Apfel in Gruppe ${group}.`;action='Einen Apfel in die nächste Gruppe legen';elements.conceptStory.textContent=`Baue ${s.a} gleich große Gruppen mit jeweils ${s.b} Äpfeln. Äpfel gibt es unbegrenzt.`;drawConceptGroups(s.a,s.b,s.step)}
  else{done=s.step>=s.total;equation=`${s.total} ÷ ${s.a} = ?`;const child=s.step%s.a+1;instruction=done?`Alle ${s.total} Äpfel aus dem Vorrat sind verteilt. Jedes Kind hat gleich viele.`:`Zieh genau einen Apfel aus dem Vorrat zu Kind ${child}. Danach kommt das nächste Kind.`;action=`Einen Apfel aus dem Vorrat an Kind ${child} geben`;elements.conceptStory.textContent=`Du hast genau ${s.total} Äpfel im Vorrat – nicht mehr. Verteile sie gerecht auf ${s.a} Kinder.`;drawConceptDivision(s.a,s.step,s.total,!done)}
  elements.conceptLiveEquation.textContent=equation;elements.conceptInstruction.textContent=instruction;elements.conceptDropZone.textContent=o==='+'?'Dazulegen':o==='-'?'Wegnehm-Korb':o==='*'?'Nächste Gruppe':'Nächstes Kind';elements.conceptDragArea.classList.toggle('hidden',done);elements.conceptAction.textContent=done?'Handlung abgeschlossen ✓':`${action} (ohne Ziehen)`;elements.conceptAction.disabled=done;renderConceptAnswer();
}
function advanceConcept(){const o=conceptState.operation;const limit=o==='*'?conceptState.a*conceptState.b:o==='/'?conceptState.total:conceptState.b;if(conceptState.step<limit){conceptState.step+=1;renderConcept()}}
function addConceptDigit(d){if(conceptState.locked||conceptState.answer.length>=2)return;conceptState.answer+=d;renderConceptAnswer()}
function removeConceptDigit(){if(conceptState.locked)return;conceptState.answer=conceptState.answer.slice(0,-1);renderConceptAnswer()}
function renderConceptAnswer(){const s=conceptState,o=s.operation;const takeFromPicture=o==='-'||o==='/';const ready=s.step>=(o==='*'?s.a*s.b:o==='/'?s.total:s.b);elements.conceptAnswerArea.classList.remove('hidden');elements.conceptNumberArea.classList.remove('hidden');elements.conceptAppleToken.classList.toggle('hidden',takeFromPicture);elements.conceptDragArea.querySelector('span').textContent=takeFromPicture?'vom Bild hierhin ziehen':'direkt ins Bild ziehen';elements.conceptDropZone.classList.toggle('basket-with-dice',takeFromPicture);elements.conceptDropZone.classList.toggle('direct-picture-drop',!takeFromPicture);if(takeFromPicture){elements.conceptDragArea.append(elements.conceptDropZone);elements.conceptDropZone.replaceChildren(o==='-'?makeMiniDice(s.step,'Weggenommen'):makeMiniDice(Math.floor(s.step/s.a),`Kind ${s.step%s.a+1}`))}else{elements.conceptObjects.append(elements.conceptDropZone)}elements.conceptAnswerZone.textContent=s.answer||'?';elements.conceptCheck.disabled=!s.answer||s.locked||!ready}
function checkConceptAnswer(){if(!conceptState.answer||conceptState.locked)return;if(Number(conceptState.answer)!==conceptState.result){conceptState.retry+=1;conceptState.answer='';elements.conceptFeedback.textContent='Schau noch einmal auf die Handlung und das Würfelbild.';elements.conceptFeedback.className='feedback wrong';renderConceptAnswer();return}conceptState.locked=true;conceptState.question+=1;if(conceptState.retry===0)conceptState.score+=1;const profile=getProfile();if(profile){addXp(profile,1);profile.concepts||={};profile.concepts[conceptState.operation]=(profile.concepts[conceptState.operation]||0)+1;saveProfiles();renderProfileHeader()}const s=conceptState,o=s.operation;elements.conceptLiveEquation.textContent=o==='+'?`${s.a} + ${s.b} = ${s.result}`:o==='-'?`${s.a} − ${s.b} = ${s.result}`:o==='*'?`${s.a} × ${s.b} = ${s.result}`:`${s.a} × ${s.b} = ${s.total}  ↔  ${s.total} ÷ ${s.a} = ${s.result}`;elements.conceptScore.textContent=conceptState.score;elements.conceptFeedback.textContent='Du hast die Handlung richtig verstanden! ✨';elements.conceptFeedback.className='feedback correct';window.setTimeout(nextConceptQuestion,850)}
function finishConceptGame(){elements.conceptFinalScore.textContent=conceptState.score;elements.conceptFinishText.textContent=`${conceptState.score} von 6 Aufgaben hast du ohne Hilfe gelöst.`;showScreen('conceptFinish');maybeShowLevelUp()}

function formatNumber(value){return new Intl.NumberFormat('de-DE').format(value)}
const NUMBER_LINE_RANGE=6;
function startNumberLineGame(){numberLineState={question:0,score:0,start:0,jump:0,result:0,step:10,jumps:0,retry:0,locked:false};elements.numberLineScore.textContent='0';showScreen('numberLine');nextNumberLineQuestion()}
function nextNumberLineQuestion(){if(numberLineState.question>=8)return finishNumberLineGame();const levels=[10,100,1000];const step=levels[randomInt(0,Math.min(2,Math.floor(numberLineState.question/2)+1))];const direction=Math.random()<.5?-1:1;const jump=step*randomInt(1,4)*direction;let start=step*randomInt(5,Math.floor(9000/step));if(start+jump<0||start+jump>10000)start=step*randomInt(10,Math.floor(7000/step));numberLineState={question:numberLineState.question,score:numberLineState.score,start,jump,result:start+jump,step,jumps:0,retry:0,locked:false};elements.numberLineTask.textContent=`${formatNumber(start)} ${jump<0?'−':'＋'} ${formatNumber(Math.abs(jump))} = ?`;elements.numberLineHint.textContent=`Ein Strich bedeutet ${formatNumber(step)}. Zieh den Pfeil vom Start so weit ${jump<0?'nach links':'nach rechts'}, wie du springen musst.`;elements.numberLineFeedback.textContent='';elements.numberLineFeedback.className='feedback';elements.numberLineProgress.style.width=`${numberLineState.question/8*100}%`;renderNumberLine()}
function renderNumberLine(){
  const s=numberLineState,range=NUMBER_LINE_RANGE;
  elements.numberLineVisual.replaceChildren();
  const rail=document.createElement('div');rail.className='draw-line-rail';
  const track=document.createElement('div');track.className='draw-line-track';rail.append(track);
  for(let i=-range;i<=range;i+=1){const tick=document.createElement('i');tick.className='draw-line-tick';tick.style.left=`${(i+range)/(range*2)*100}%`;rail.append(tick)}
  const startMarker=document.createElement('div');startMarker.className='draw-line-start';startMarker.style.left=`${range/(range*2)*100}%`;startMarker.innerHTML=`<span>Start</span><b>${formatNumber(s.start)}</b>`;rail.append(startMarker);
  const arrow=document.createElement('div');arrow.id='numberLineArrow';arrow.className='draw-line-arrow';rail.append(arrow);
  const badge=document.createElement('div');badge.id='numberLineJumpBadge';badge.className='draw-line-jump-badge';rail.append(badge);
  const handle=document.createElement('button');handle.type='button';handle.id='numberLineHandle';handle.className='draw-line-handle';handle.textContent='📍';rail.append(handle);
  elements.numberLineVisual.append(rail);
  positionNumberLineHandle();
  enableNumberLineDrag(handle,rail);
}
function positionNumberLineHandle(){
  const s=numberLineState,range=NUMBER_LINE_RANGE;
  const handle=document.querySelector('#numberLineHandle'),arrow=document.querySelector('#numberLineArrow'),badge=document.querySelector('#numberLineJumpBadge');
  if(!handle)return;
  const percent=(s.jumps+range)/(range*2)*100,startPercent=range/(range*2)*100;
  handle.style.left=`${Math.max(0,Math.min(100,percent))}%`;
  const left=Math.min(startPercent,percent),width=Math.abs(percent-startPercent);
  arrow.style.left=`${left}%`;arrow.style.width=`${width}%`;
  badge.style.left=`${Math.max(0,Math.min(100,percent))}%`;
  badge.textContent=s.jumps===0?'am Start':`${Math.abs(s.jumps)} Sprünge ${s.jumps<0?'nach links':'nach rechts'}`;
}
function enableNumberLineDrag(handle,rail){
  const range=NUMBER_LINE_RANGE;let dragging=false;
  function valueFromEvent(event){const bounds=rail.getBoundingClientRect();const percent=Math.max(0,Math.min(1,(event.clientX-bounds.left)/bounds.width));return Math.round(percent*(range*2)-range)}
  function move(event){if(!dragging||numberLineState.locked)return;numberLineState.jumps=Math.max(-range,Math.min(range,valueFromEvent(event)));positionNumberLineHandle()}
  function start(event){if(numberLineState.locked)return;dragging=true;handle.setPointerCapture(event.pointerId);move(event)}
  function end(){dragging=false}
  handle.addEventListener('pointerdown',start);
  handle.addEventListener('pointermove',move);
  handle.addEventListener('pointerup',end);
  handle.addEventListener('pointercancel',end);
  rail.addEventListener('pointerdown',event=>{if(event.target!==handle)start(event)});
}
function checkNumberLine(){
  const s=numberLineState;if(s.locked)return;
  const guessed=s.start+s.jumps*s.step;
  if(guessed!==s.result){
    s.retry+=1;const neededJumps=s.jump/s.step;
    elements.numberLineFeedback.textContent=s.retry>=2?`Tipp: Du musst genau ${Math.abs(neededJumps)} Striche ${neededJumps<0?'nach links':'nach rechts'} springen.`:`Noch nicht ganz. Du bist bei ${Math.abs(s.jumps)} Sprüngen ${s.jumps<0?'nach links':'nach rechts'} – vergleiche das mit der Aufgabe.`;
    elements.numberLineFeedback.className='feedback wrong';
    return;
  }
  s.locked=true;s.question+=1;if(s.retry===0)s.score+=1;
  elements.numberLineScore.textContent=s.score;
  elements.numberLineFeedback.textContent=`Genau dort landest du: ${formatNumber(s.result)}! ✨`;elements.numberLineFeedback.className='feedback correct';
  const badge=document.querySelector('#numberLineJumpBadge');if(badge)badge.textContent=formatNumber(s.result);
  const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,1);incrementActivity('numberLine');saveProfiles();renderProfileHeader()}
  window.setTimeout(nextNumberLineQuestion,900);
}
function finishNumberLineGame(){elements.numberLineFinalScore.textContent=numberLineState.score;elements.numberLineFinishText.textContent=`${numberLineState.score} von 8 großen Zahlensprüngen richtig eingezeichnet.`;showScreen('numberLineFinish');maybeShowLevelUp()}

const PLACE_VALUES=[1000,100,10,1],PLACE_NAMES=['Tausender','Hunderter','Zehner','Einer'],PLACE_SHORT=['T','H','Z','E'];
function openPlaceValueWorkshop(){showScreen('placeValueStart')}
function startPlaceValueGame(mode){placeValueState={mode,question:0,score:0,target:0,counts:[0,0,0,0],initial:[],tradeIndex:3,subtrahend:0,startValue:0,locked:false};elements.placeValueScore.textContent='0';elements.placeValueModeTitle.textContent=mode==='build'?'Zahl bauen':mode==='trade'?'Tausch-Challenge':'Minus-Werkstatt';showScreen('placeValue');nextPlaceValueQuestion()}
function nextPlaceValueQuestion(){
  if(placeValueState.question>=6)return finishPlaceValueGame();
  const s=placeValueState;s.locked=false;
  if(s.mode==='build'){
    s.target=randomInt(12,9999);s.counts=[0,0,0,0];s.initial=[0,0,0,0];
    elements.placeValueInstruction.textContent='Zieh die passenden Punkte in die richtigen Häuser.';elements.placeValueTask.textContent=`Baue ${formatNumber(s.target)}`;
  }else if(s.mode==='trade'){
    s.tradeIndex=randomInt(1,3);s.counts=[0,0,0,0];s.counts[s.tradeIndex]=randomInt(10,18);if(s.tradeIndex<3)s.counts[s.tradeIndex+1]=randomInt(0,5);s.target=placeValueNumber(s.counts);s.initial=[...s.counts];
    elements.placeValueInstruction.textContent='Tausche, bis in keinem Haus zehn Punkte liegen.';elements.placeValueTask.textContent=`Stelle ${formatNumber(s.target)} geschickt dar`;
  }else{
    const startZ=randomInt(2,9),startE=randomInt(0,9);s.startValue=startZ*10+startE;s.subtrahend=randomInt(1,s.startValue-1);s.target=s.startValue-s.subtrahend;
    s.counts=[0,0,startZ,startE];s.initial=[...s.counts];
    elements.placeValueInstruction.textContent='Nimm genau so viele Punkte weg. Reicht ein Haus nicht, entbündle zuerst einen Zehner.';elements.placeValueTask.textContent=`${formatNumber(s.startValue)} − ${formatNumber(s.subtrahend)} = ?`;
  }
  resyncFilledSlots();
  elements.placeValueProgress.style.width=`${s.question/6*100}%`;elements.placeValueFeedback.textContent='';elements.placeValueFeedback.className='feedback';renderPlaceValue();
}
function placeValueNumber(counts){return counts.reduce((sum,count,index)=>sum+count*PLACE_VALUES[index],0)}
const PLACE_HOUSE_COLORS=['#7258d8','#df755f','#df9c37','#4ca57f'];
function makePlaceToken(index){
  if(index===3){const leaf=document.createElement('span');leaf.className='place-token-visual place-token-leaf';leaf.style.setProperty('--token-color',PLACE_HOUSE_COLORS[index]);return leaf}
  const oval=document.createElement('span');oval.className='place-token-visual place-token-oval';oval.style.setProperty('--token-color',PLACE_HOUSE_COLORS[index]);oval.style.setProperty('--dot-color',PLACE_HOUSE_COLORS[index+1]);
  for(let i=0;i<10;i+=1){const dot=document.createElement('i');dot.className='place-token-dot';oval.append(dot)}
  return oval;
}
function resyncFilledSlots(){placeValueState.filledSlots=placeValueState.counts.map(count=>Array.from({length:19},(_,i)=>i<count))}
function makePlaceSlot(index,slotIndex){
  const s=placeValueState;const filled=s.filledSlots[index][slotIndex];
  const slotEl=document.createElement('button');slotEl.type='button';slotEl.className='place-slot';slotEl.dataset.slotIndex=slotIndex;
  if(filled){slotEl.classList.add('filled');slotEl.append(makePlaceToken(index));if(s.mode==='build'||s.mode==='minus')slotEl.title='Zum Entfernen tippen'}
  return slotEl;
}
function removePlaceSlotAt(index,slotIndex){
  const s=placeValueState;if(s.locked||!s.filledSlots[index][slotIndex])return;
  s.filledSlots[index][slotIndex]=false;s.counts[index]=Math.max(0,s.counts[index]-1);
  renderPlaceValue();
}
function addPlaceSlot(index){
  const s=placeValueState;if(s.locked)return;
  const maximum=s.mode==='build'?9:19;
  if(s.counts[index]>=maximum){elements.placeValueFeedback.textContent='Dieses Haus hat schon 9 Punkte – mehr passt an dieser Stelle nicht hin.';elements.placeValueFeedback.className='feedback wrong';return}
  const firstEmpty=s.filledSlots[index].findIndex((filled,i)=>!filled&&i<maximum);
  if(firstEmpty===-1)return;
  s.filledSlots[index][firstEmpty]=true;s.counts[index]+=1;
  renderPlaceValue();
}
function renderPlaceValue(){
  const s=placeValueState;if(!s.filledSlots)resyncFilledSlots();elements.placeValueHouses.replaceChildren();
  s.counts.forEach((count,index)=>{
    const house=document.createElement('section');house.className=`place-house place-${index}`;
    const roof=document.createElement('header');roof.innerHTML=`<b>${PLACE_SHORT[index]}</b><small>${PLACE_NAMES[index]} · Wert ${formatNumber(PLACE_VALUES[index])}</small>`;
    const field=document.createElement('div');field.className='place-field';
    for(let panel=0;panel<2;panel+=1){
      const five=document.createElement('div');five.className='place-five';
      for(let slot=0;slot<5;slot+=1)five.append(makePlaceSlot(index,panel*5+slot));
      field.append(five);
    }
    if(count>10){
      const overflowRow=document.createElement('div');overflowRow.className='place-overflow-row';
      for(let slotIndex=10;slotIndex<19;slotIndex+=1){if(s.filledSlots[index][slotIndex])overflowRow.append(makePlaceSlot(index,slotIndex))}
      field.append(overflowRow);
    }
    house.append(roof,field);
    if(s.mode==='build'||s.mode==='minus'){
      house.addEventListener('click',event=>{
        const slotEl=event.target.closest('.place-slot.filled');
        if(!slotEl)return;
        removePlaceSlotAt(index,Number(slotEl.dataset.slotIndex));
      });
    }
    if(s.mode==='build')enableHouseDrop(house,index);
    elements.placeValueHouses.append(house);
  });
  elements.placeValueActions.replaceChildren();
  if(s.mode==='trade'){for(let from=3;from>=1;from-=1){const button=document.createElement('button');button.type='button';button.className='trade-button';button.disabled=s.counts[from]<10;button.textContent=`10 ${PLACE_SHORT[from]} → 1 ${PLACE_SHORT[from-1]}`;button.addEventListener('click',()=>tradePlace(from));elements.placeValueActions.append(button)}}
  else if(s.mode==='minus'){for(let from=0;from<=2;from+=1){const button=document.createElement('button');button.type='button';button.className='trade-button untrade-button';button.disabled=s.counts[from]<1;button.textContent=`1 ${PLACE_SHORT[from]} → 10 ${PLACE_SHORT[from+1]}`;button.addEventListener('click',()=>untradePlace(from));elements.placeValueActions.append(button)}}
  const current=placeValueNumber(s.counts);
  elements.placeValueReading.innerHTML=`Deine Darstellung: <strong>${formatNumber(current)}</strong><small>${s.counts.map((count,index)=>`${count} ${PLACE_SHORT[index]}`).join(' · ')}</small>`;
  renderPlaceValueTray();
}
function renderPlaceValueTray(){
  elements.placeValueTray.replaceChildren();
  elements.placeValueTray.classList.toggle('hidden',placeValueState.mode!=='build');
  if(placeValueState.mode!=='build')return;
  PLACE_SHORT.forEach((short,index)=>{
    const row=document.createElement('div');row.className='place-tray-row';
    const label=document.createElement('small');label.textContent=PLACE_NAMES[index];row.append(label);
    const strip=document.createElement('div');strip.className='place-tray-strip';
    for(let i=0;i<6;i+=1){
      const token=document.createElement('button');token.type='button';token.className='place-tray-token';
      token.append(makePlaceToken(index));
      token.addEventListener('click',()=>addPlaceSlot(index));
      enablePlaceTokenDrag(token,index);
      strip.append(token);
    }
    row.append(strip);
    elements.placeValueTray.append(row);
  });
}
function enableHouseDrop(house,index){
  house.addEventListener('dragover',event=>{event.preventDefault();house.classList.add('drag-over')});
  house.addEventListener('dragleave',()=>house.classList.remove('drag-over'));
  house.addEventListener('drop',event=>{event.preventDefault();house.classList.remove('drag-over');const dragged=Number(event.dataTransfer.getData('text/plain'));if(dragged===index)addPlaceSlot(index);else flashPlaceMismatch(house,index)});
}
function flashPlaceMismatch(house,index){elements.placeValueFeedback.textContent=`Das gehört nicht hierher – das ist ein ${PLACE_NAMES[index]}-Punkt.`;elements.placeValueFeedback.className='feedback wrong';house.classList.add('shake');window.setTimeout(()=>house.classList.remove('shake'),400)}
function enablePlaceTokenDrag(token,index){
  token.draggable=true;
  token.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain',String(index)));
  let ghost=null;
  token.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;token.setPointerCapture(event.pointerId);ghost=document.createElement('div');ghost.className='place-token-ghost';ghost.append(makePlaceToken(index));document.body.append(ghost);move(event)});
  token.addEventListener('pointermove',event=>move(event));
  token.addEventListener('pointerup',event=>{if(!ghost)return;const target=document.elementFromPoint(event.clientX,event.clientY);const house=target?.closest('.place-house');if(house){const houseIndex=[...elements.placeValueHouses.children].indexOf(house);if(houseIndex===index)addPlaceSlot(index);else flashPlaceMismatch(house,houseIndex)}ghost.remove();ghost=null});
  function move(event){if(!ghost)return;ghost.style.left=`${event.clientX}px`;ghost.style.top=`${event.clientY}px`}
}

function tradePlace(from){const s=placeValueState;if(s.locked||s.counts[from]<10)return;s.counts[from]-=10;s.counts[from-1]+=1;resyncFilledSlots();elements.placeValueFeedback.textContent=`Genau: 10 ${PLACE_NAMES[from]} haben denselben Wert wie 1 ${PLACE_NAMES[from-1].slice(0,-2)}.`;elements.placeValueFeedback.className='feedback correct';renderPlaceValue()}
function untradePlace(from){const s=placeValueState;if(s.locked||s.counts[from]<1)return;s.counts[from]-=1;s.counts[from+1]+=10;resyncFilledSlots();elements.placeValueFeedback.textContent=`Genau: 1 ${PLACE_NAMES[from].slice(0,-2)} ist so viel wert wie 10 ${PLACE_NAMES[from+1]}.`;elements.placeValueFeedback.className='feedback correct';renderPlaceValue()}
function checkPlaceValue(){
  const s=placeValueState;if(s.locked)return;
  const rightValue=placeValueNumber(s.counts)===s.target;const normalized=s.counts.every(count=>count<10);
  const needsNormalized=s.mode!=='build';
  if(!rightValue||(needsNormalized&&!normalized)){
    elements.placeValueFeedback.textContent=!rightValue?(s.mode==='minus'?'Noch nicht. Vergleiche, wie viel du schon weggenommen hast, mit der Aufgabe.':'Der Wert stimmt noch nicht. Achte darauf, in welchem Haus ein Punkt liegt.'):'Der Wert stimmt, aber du kannst noch zehn gleiche Punkte gegen einen größeren tauschen.';
    elements.placeValueFeedback.className='feedback wrong';return;
  }
  s.locked=true;s.score+=1;s.question+=1;elements.placeValueScore.textContent=s.score;
  elements.placeValueFeedback.textContent=s.mode==='minus'?`Richtig: ${formatNumber(s.startValue)} − ${formatNumber(s.subtrahend)} = ${formatNumber(s.target)}! ✨`:'Richtig gebaut – jede Stelle hat ihren Wert! ✨';
  elements.placeValueFeedback.className='feedback correct';
  const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,1);incrementActivity('placeValue');saveProfiles();renderProfileHeader()}
  window.setTimeout(nextPlaceValueQuestion,850);
}
function resetPlaceValue(){placeValueState.counts=[...placeValueState.initial];resyncFilledSlots();elements.placeValueFeedback.textContent='Noch einmal von vorne.';elements.placeValueFeedback.className='feedback';renderPlaceValue()}
function finishPlaceValueGame(){elements.placeValueFinalScore.textContent=placeValueState.score;elements.placeValueFinishText.textContent=`${placeValueState.score} von 6 Stellenwert-Aufgaben geschafft.`;showScreen('placeValueFinish');maybeShowLevelUp()}
function startFamilyGame(){const used=new Set(),cards=[];while(used.size<6){const a=randomInt(2,10),b=randomInt(2,10),key=`${a}x${b}`;if(used.has(key)||used.has(`${b}x${a}`))continue;used.add(key);const result=a*b;cards.push({pair:key,text:`${a} × ${b} = ${result}`},{pair:key,text:Math.random()<.5?`${result} ÷ ${a} = ${b}`:`${result} ÷ ${b} = ${a}`})}familyState={cards:shuffled(cards),open:[],pairs:0,locked:false};elements.familyPairs.textContent='0/6';elements.familyFeedback.textContent='';showScreen('family');renderFamilyCards()}
function renderFamilyCards(){elements.familyGrid.replaceChildren();familyState.cards.forEach((card,index)=>{const button=document.createElement('button');button.type='button';button.className=`family-card-tile${card.matched?' matched':''}${card.open?' open':''}`;button.disabled=card.matched;button.innerHTML=`<span>?</span><strong>${card.text}</strong>`;button.addEventListener('click',()=>openFamilyCard(index));elements.familyGrid.append(button)})}
function openFamilyCard(index){const s=familyState,card=s.cards[index];if(s.locked||card.open||card.matched)return;card.open=true;s.open.push(index);renderFamilyCards();if(s.open.length<2)return;const [first,second]=s.open;if(s.cards[first].pair===s.cards[second].pair){s.cards[first].matched=s.cards[second].matched=true;s.open=[];s.pairs+=1;elements.familyPairs.textContent=`${s.pairs}/6`;elements.familyFeedback.textContent='Passt! Die Geteilt-Aufgabe macht die Mal-Aufgabe rückgängig. ✨';elements.familyFeedback.className='feedback correct';if(s.pairs===6){const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,6);incrementActivity('family');saveProfiles();renderProfileHeader()}return window.setTimeout(()=>{showScreen('familyFinish');maybeShowLevelUp()},700)}renderFamilyCards()}else{s.locked=true;elements.familyFeedback.textContent='Diese Ergebnisse gehören nicht zur gleichen Rechenfamilie.';elements.familyFeedback.className='feedback wrong';window.setTimeout(()=>{s.cards[first].open=s.cards[second].open=false;s.open=[];s.locked=false;renderFamilyCards()},1050)}}

function startRaceGame(){
  if(!getProfile())return showProfileSelection();
  if(getLevel(getProfile())<5&&!teacherPreview)return;
  clearInterval(raceState.timer);
  raceState={score:0,timeLeft:60,a:2,b:2,operation:'*',result:4,answer:'',locked:false,timer:null,running:true};
  elements.raceScore.textContent='0';elements.raceTimer.textContent='60';elements.raceProgress.style.width='100%';elements.raceFeedback.textContent='';elements.raceFeedback.className='feedback';
  showScreen('race');
  nextRaceQuestion();
  raceState.timer=window.setInterval(tickRaceTimer,1000);
}
function tickRaceTimer(){
  if(!raceState.running)return;
  raceState.timeLeft-=1;elements.raceTimer.textContent=String(Math.max(0,raceState.timeLeft));elements.raceProgress.style.width=`${Math.max(0,raceState.timeLeft)/60*100}%`;
  if(raceState.timeLeft<=0)finishRaceGame();
}
function nextRaceQuestion(){
  const operation=Math.random()<.5?'*':'/';
  if(operation==='*'){raceState.a=randomInt(1,10);raceState.b=randomInt(1,10);raceState.result=raceState.a*raceState.b}
  else{const divisor=randomInt(1,10),quotient=randomInt(1,10);raceState.a=divisor*quotient;raceState.b=divisor;raceState.result=quotient}
  raceState.operation=operation;raceState.answer='';raceState.locked=false;
  elements.raceA.textContent=raceState.a;elements.raceB.textContent=raceState.b;elements.raceOperator.textContent=operation==='*'?'×':'÷';
  renderRaceAnswer();
}
function addRaceDigit(digit){if(raceState.locked||raceState.answer.length>=3||!raceState.running)return;raceState.answer+=digit;renderRaceAnswer()}
function removeRaceDigit(){if(raceState.locked)return;raceState.answer=raceState.answer.slice(0,-1);renderRaceAnswer()}
function renderRaceAnswer(){elements.raceAnswerZone.textContent=raceState.answer||'?';elements.raceAnswerZone.style.color=raceState.answer?'#6c4fe0':'#c1b5dd';elements.raceCheck.disabled=!raceState.answer||raceState.locked||!raceState.running}
function checkRaceAnswer(){
  if(!raceState.answer||raceState.locked||!raceState.running)return;
  raceState.locked=true;
  const correct=Number(raceState.answer)===raceState.result;
  if(correct){raceState.score+=1;elements.raceScore.textContent=raceState.score;elements.raceFeedback.textContent='Richtig! ✨';elements.raceFeedback.className='feedback correct'}
  else{elements.raceFeedback.textContent=`Das waren ${raceState.result}.`;elements.raceFeedback.className='feedback wrong'}
  window.setTimeout(()=>{if(raceState.running)nextRaceQuestion()},correct?300:650);
}
function finishRaceGame(){
  raceState.running=false;clearInterval(raceState.timer);
  const profile=getProfile();if(profile&&!teacherPreview&&raceState.score>0){addXp(profile,Math.ceil(raceState.score/3));incrementActivity('race');saveProfiles();renderProfileHeader()}
  elements.raceFinalScore.textContent=raceState.score;elements.raceFinishText.textContent=`Du hast in 60 Sekunden ${raceState.score} Aufgaben richtig gelöst.`;
  showScreen('raceFinish');
  maybeShowLevelUp();
}

const KING_BASE=[1,2,5,10];
const KING_DERIVE={3:{op:'add',x:2,y:1},4:{op:'double',x:2},6:{op:'add',x:5,y:1},7:{op:'add',x:5,y:2},8:{op:'sub',x:10,y:2},9:{op:'sub',x:10,y:1}};
function startKingTowerGame(){kingTowerState={question:0,score:0,a:6,b:7,target:42,rule:null,tiles:[],selected:[],op:null,locked:false};elements.kingTowerScore.textContent='0';showScreen('kingTower');nextKingTowerQuestion()}
function nextKingTowerQuestion(){
  if(kingTowerState.question>=8)return finishKingTowerGame();
  const s=kingTowerState;s.locked=false;s.selected=[];s.op=null;
  const multipliers=Object.keys(KING_DERIVE).map(Number);
  s.a=multipliers[randomInt(0,multipliers.length-1)];s.b=randomInt(2,10);s.target=s.a*s.b;s.rule=KING_DERIVE[s.a];
  const correctMultipliers=s.rule.op==='double'?[s.rule.x]:[s.rule.x,s.rule.y];
  const distractorPool=shuffled(KING_BASE.filter(m=>!correctMultipliers.includes(m)));
  const tileMultipliers=shuffled([...new Set([...correctMultipliers,...distractorPool])]).slice(0,Math.max(4,correctMultipliers.length+2));
  s.tiles=tileMultipliers.map(m=>({mult:m,value:m*s.b}));
  elements.kingTowerA.textContent=s.a;elements.kingTowerB.textContent=s.b;
  elements.kingTowerInstruction.textContent=s.rule.op==='double'?`${s.a} ist doppelt so viel wie ${s.rule.x}. Wähle den Baustein, den du verdoppeln musst.`:`Welche zwei Bausteine ergeben zusammen ${s.a} × ${s.b}?`;
  elements.kingTowerProgress.style.width=`${s.question/8*100}%`;elements.kingTowerFeedback.textContent='';elements.kingTowerFeedback.className='feedback';
  renderKingTower();
}
function renderKingTower(){
  const s=kingTowerState;
  elements.kingTowerTiles.replaceChildren();
  s.tiles.forEach((tile,index)=>{
    const button=document.createElement('button');button.type='button';button.className=`king-tile${s.selected.includes(index)?' selected':''}`;
    button.innerHTML=`<strong>${tile.mult} × ${s.b}</strong><small>${tile.value}</small>`;
    button.addEventListener('click',()=>toggleKingTile(index));
    elements.kingTowerTiles.append(button);
  });
  elements.kingTowerOps.replaceChildren();
  const opDefs=s.rule.op==='double'?[{key:'double',label:'verdoppeln (×2)'}]:[{key:'add',label:'+'},{key:'sub',label:'−'}];
  opDefs.forEach(def=>{const button=document.createElement('button');button.type='button';button.className=`king-op${s.op===def.key?' selected':''}`;button.textContent=def.label;button.addEventListener('click',()=>{if(s.locked)return;s.op=def.key;renderKingTower()});elements.kingTowerOps.append(button)});
  const needed=s.rule.op==='double'?1:2;
  const ready=s.selected.length===needed&&s.op;
  if(ready){
    const chosen=s.selected.map(index=>s.tiles[index]);
    const sum=s.op==='double'?chosen[0].value*2:s.op==='add'?chosen[0].value+chosen[1].value:Math.abs(chosen[0].value-chosen[1].value);
    elements.kingTowerSum.textContent=s.op==='double'?`${chosen[0].mult} × ${s.b} verdoppelt = ${sum}`:`${chosen[0].mult} × ${s.b} ${s.op==='add'?'+':'−'} ${chosen[1].mult} × ${s.b} = ${sum}`;
  }else elements.kingTowerSum.textContent='';
  elements.kingTowerCheck.disabled=!ready||s.locked;
}
function toggleKingTile(index){
  const s=kingTowerState;if(s.locked)return;
  const needed=s.rule.op==='double'?1:2;
  if(s.selected.includes(index)){s.selected=s.selected.filter(i=>i!==index)}
  else{if(s.selected.length>=needed)s.selected.shift();s.selected.push(index)}
  renderKingTower();
}
function checkKingTower(){
  const s=kingTowerState;if(s.locked)return;
  const needed=s.rule.op==='double'?1:2;
  if(s.selected.length!==needed||!s.op)return;
  const chosen=s.selected.map(index=>s.tiles[index]);
  const sum=s.op==='double'?chosen[0].value*2:s.op==='add'?chosen[0].value+chosen[1].value:Math.abs(chosen[0].value-chosen[1].value);
  if(sum!==s.target){elements.kingTowerFeedback.textContent=`Noch nicht. ${s.a} × ${s.b} ist ${s.target} – probiere andere Bausteine oder ein anderes Rechenzeichen.`;elements.kingTowerFeedback.className='feedback wrong';return}
  s.locked=true;s.score+=1;s.question+=1;elements.kingTowerScore.textContent=s.score;
  elements.kingTowerFeedback.textContent=`Genau: ${s.a} × ${s.b} = ${s.target}! ✨`;elements.kingTowerFeedback.className='feedback correct';
  const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,1);incrementActivity('kingTower');saveProfiles();renderProfileHeader()}
  window.setTimeout(nextKingTowerQuestion,1000);
}
function finishKingTowerGame(){elements.kingTowerFinalScore.textContent=kingTowerState.score;elements.kingTowerFinishText.textContent=`${kingTowerState.score} von 8 Türmen richtig gebaut.`;showScreen('kingTowerFinish');maybeShowLevelUp()}

function startNeighborGame(){neighborState={question:0,score:0,a:4,b:8,target:32,helperB:7,helperResult:28,op:'+',answer:'',opChosen:null,locked:false};elements.neighborScore.textContent='0';showScreen('neighbor');nextNeighborQuestion()}
function nextNeighborQuestion(){
  if(neighborState.question>=8)return finishNeighborGame();
  const s=neighborState;s.locked=false;s.answer='';s.opChosen=null;
  s.a=randomInt(2,10);s.b=randomInt(2,10);s.target=s.a*s.b;
  if(s.b>2){s.helperB=s.b-1;s.op='+'}else{s.helperB=s.b+1;s.op='-'}
  s.helperResult=s.a*s.helperB;
  elements.neighborKnownEquation.textContent=`${s.a} × ${s.helperB} = ${s.helperResult}`;
  elements.neighborTargetEquation.textContent=`${s.a} × ${s.b} = ?`;
  elements.neighborProgress.style.width=`${s.question/8*100}%`;elements.neighborFeedback.textContent='';elements.neighborFeedback.className='feedback';
  renderNeighbor();
}
function renderNeighbor(){
  const s=neighborState;
  elements.neighborOpChoice.replaceChildren();
  [{key:'+',label:`+ ${s.a}`},{key:'-',label:`− ${s.a}`}].forEach(def=>{
    const button=document.createElement('button');button.type='button';button.className=`neighbor-op${s.opChosen===def.key?' selected':''}`;button.textContent=def.label;
    button.addEventListener('click',()=>{if(s.locked)return;s.opChosen=def.key;renderNeighbor()});
    elements.neighborOpChoice.append(button);
  });
  elements.neighborAnswerZone.textContent=s.answer||'?';elements.neighborAnswerZone.style.color=s.answer?'#6c4fe0':'#c1b5dd';
  elements.neighborCheck.disabled=!s.opChosen||!s.answer||s.locked;
}
function addNeighborDigit(digit){if(neighborState.locked||!neighborState.opChosen||neighborState.answer.length>=3)return;neighborState.answer+=digit;renderNeighbor()}
function removeNeighborDigit(){if(neighborState.locked)return;neighborState.answer=neighborState.answer.slice(0,-1);renderNeighbor()}
function checkNeighbor(){
  const s=neighborState;if(s.locked||!s.opChosen||!s.answer)return;
  const opRight=s.opChosen===s.op;
  const numberRight=Number(s.answer)===s.target;
  if(!opRight||!numberRight){
    elements.neighborFeedback.textContent=!opRight?`Schau genau hin: wird ${s.a} × ${s.b} größer oder kleiner als ${s.a} × ${s.helperB}?`:`Rechne noch einmal: ${s.helperResult} ${s.op} ${s.a}.`;
    elements.neighborFeedback.className='feedback wrong';return;
  }
  s.locked=true;s.score+=1;s.question+=1;elements.neighborScore.textContent=s.score;
  elements.neighborFeedback.textContent=`Genau: ${s.helperResult} ${s.op} ${s.a} = ${s.target}! ✨`;elements.neighborFeedback.className='feedback correct';
  const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,1);incrementActivity('neighbor');saveProfiles();renderProfileHeader()}
  window.setTimeout(nextNeighborQuestion,1000);
}
function finishNeighborGame(){elements.neighborFinalScore.textContent=neighborState.score;elements.neighborFinishText.textContent=`${neighborState.score} von 8 Nachbaraufgaben richtig genutzt.`;showScreen('neighborFinish');maybeShowLevelUp()}

function startDoubleChainGame(){doubleChainState={question:0,score:0,n:2,direction:'up',step:0,values:[0,0,0],answer:'',locked:false};elements.doubleChainScore.textContent='0';showScreen('doubleChain');nextDoubleChainQuestion()}
function nextDoubleChainQuestion(){
  if(doubleChainState.question>=6)return finishDoubleChainGame();
  const s=doubleChainState;s.locked=false;s.answer='';s.step=0;
  s.n=randomInt(2,9);s.direction=Math.random()<.5?'up':'down';
  elements.doubleChainDirection.textContent=s.direction==='up'?'Verdopple weiter':'Halbiere weiter';
  elements.doubleChainProgress.style.width=`${s.question/6*100}%`;elements.doubleChainFeedback.textContent='';elements.doubleChainFeedback.className='feedback';
  renderDoubleChain();
}
function renderDoubleChain(){
  const s=doubleChainState;
  const mults=s.direction==='up'?[2,4,8]:[8,4,2];
  elements.doubleChainLinks.replaceChildren();
  mults.forEach((mult,index)=>{
    const link=document.createElement('div');
    const known=index<=s.step;
    link.className=`double-chain-link${known?' known':''}${index===s.step+1?' next':''}`;
    link.innerHTML=`<small>${mult} × ${s.n}</small><strong>${known?mult*s.n:'?'}</strong>`;
    elements.doubleChainLinks.append(link);
  });
  const currentMult=mults[s.step],nextMult=mults[s.step+1];
  const knownValue=currentMult*s.n;
  elements.doubleChainInstruction.textContent=s.direction==='up'?`Du weißt ${currentMult} × ${s.n} = ${knownValue}. Verdopple das Ergebnis für ${nextMult} × ${s.n}.`:`Du weißt ${currentMult} × ${s.n} = ${knownValue}. Halbiere das Ergebnis für ${nextMult} × ${s.n}.`;
  elements.doubleChainAnswerZone.textContent=s.answer||'?';elements.doubleChainAnswerZone.style.color=s.answer?'#6c4fe0':'#c1b5dd';
  elements.doubleChainCheck.disabled=!s.answer||s.locked;
}
function addDoubleChainDigit(digit){if(doubleChainState.locked||doubleChainState.answer.length>=3)return;doubleChainState.answer+=digit;renderDoubleChain()}
function removeDoubleChainDigit(){if(doubleChainState.locked)return;doubleChainState.answer=doubleChainState.answer.slice(0,-1);renderDoubleChain()}
function checkDoubleChain(){
  const s=doubleChainState;if(s.locked||!s.answer)return;
  const mults=s.direction==='up'?[2,4,8]:[8,4,2];
  const nextMult=mults[s.step+1];const expected=nextMult*s.n;
  if(Number(s.answer)!==expected){
    elements.doubleChainFeedback.textContent=s.direction==='up'?`Noch nicht. Verdopple ${mults[s.step]*s.n} noch einmal.`:`Noch nicht. Halbiere ${mults[s.step]*s.n} noch einmal.`;
    elements.doubleChainFeedback.className='feedback wrong';return;
  }
  s.step+=1;s.answer='';
  if(s.step>=mults.length-1){
    s.locked=true;s.score+=1;s.question+=1;elements.doubleChainScore.textContent=s.score;
    elements.doubleChainFeedback.textContent='Ganze Kette richtig verkettet! ✨';elements.doubleChainFeedback.className='feedback correct';
    const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,1);incrementActivity('doubleChain');saveProfiles();renderProfileHeader()}
    renderDoubleChain();
    window.setTimeout(nextDoubleChainQuestion,1100);
    return;
  }
  elements.doubleChainFeedback.textContent='Genau! Weiter geht’s.';elements.doubleChainFeedback.className='feedback correct';
  renderDoubleChain();
}
function finishDoubleChainGame(){elements.doubleChainFinalScore.textContent=doubleChainState.score;elements.doubleChainFinishText.textContent=`${doubleChainState.score} von 6 Ketten geschafft.`;showScreen('doubleChainFinish');maybeShowLevelUp()}

for (let row = 1; row <= 10; row += 1) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mode-button';
  button.innerHTML = `${row}<small>er-Reihe</small>`;
  button.setAttribute('aria-label', `${row}er-Reihe üben`);
  button.addEventListener('click', () => startGame(row, false));
  elements.modeGrid.append(button);
}

for(let divisor=1;divisor<=10;divisor+=1){const button=document.createElement('button');button.type='button';button.className='mode-button';button.innerHTML=`÷ ${divisor}<small>durch ${divisor}</small>`;button.addEventListener('click',()=>startDivisionGame(divisor));elements.divisionModeGrid.append(button)}

for (let digit = 0; digit <= 9; digit += 1) {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'number-tile';
  tile.textContent = digit;
  tile.dataset.digit = digit;
  tile.setAttribute('aria-label', `Ziffer ${digit} einsetzen`);
  tile.draggable = true;
  tile.addEventListener('click', () => addDigit(String(digit)));
  tile.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', String(digit)));
  addPointerDrag(tile);
  elements.numberTray.append(tile);
}

for (let digit = 0; digit <= 9; digit += 1) {
  const tile = document.createElement('button');
  tile.type = 'button'; tile.className = 'number-tile'; tile.textContent = digit; tile.dataset.digit = digit; tile.draggable = true;
  tile.addEventListener('click', () => addShopDigit(String(digit)));
  tile.addEventListener('dragstart', (event) => event.dataTransfer.setData('text/plain', String(digit)));
  addPointerDrag(tile, elements.shopAnswerZone, addShopDigit);
  elements.shopNumberTray.append(tile);
}

for (let digit = 0; digit <= 9; digit += 1) {
  const tile = document.createElement('button'); tile.type='button'; tile.className='number-tile'; tile.textContent=digit; tile.dataset.digit=digit; tile.draggable=true;
  tile.addEventListener('click',()=>addDivisionDigit(String(digit))); tile.addEventListener('dragstart',(event)=>event.dataTransfer.setData('text/plain',String(digit)));
  addPointerDrag(tile,elements.divisionAnswerZone,addDivisionDigit); elements.divisionNumberTray.append(tile);
}
for(let digit=0;digit<=9;digit+=1){const tile=document.createElement('button');tile.type='button';tile.className='number-tile';tile.textContent=digit;tile.dataset.digit=digit;tile.draggable=true;tile.addEventListener('click',()=>addConceptDigit(String(digit)));tile.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain',String(digit)));addPointerDrag(tile,elements.conceptAnswerZone,addConceptDigit);elements.conceptNumberTray.append(tile)}
for(let digit=0;digit<=9;digit+=1){const tile=document.createElement('button');tile.type='button';tile.className='number-tile';tile.textContent=digit;tile.dataset.digit=digit;tile.draggable=true;tile.addEventListener('click',()=>addRaceDigit(String(digit)));tile.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain',String(digit)));addPointerDrag(tile,elements.raceAnswerZone,addRaceDigit);elements.raceNumberTray.append(tile)}
for(let digit=0;digit<=9;digit+=1){const tile=document.createElement('button');tile.type='button';tile.className='number-tile';tile.textContent=digit;tile.dataset.digit=digit;tile.draggable=true;tile.addEventListener('click',()=>addNeighborDigit(String(digit)));tile.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain',String(digit)));addPointerDrag(tile,elements.neighborAnswerZone,addNeighborDigit);elements.neighborNumberTray.append(tile)}
for(let digit=0;digit<=9;digit+=1){const tile=document.createElement('button');tile.type='button';tile.className='number-tile';tile.textContent=digit;tile.dataset.digit=digit;tile.draggable=true;tile.addEventListener('click',()=>addDoubleChainDigit(String(digit)));tile.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain',String(digit)));addPointerDrag(tile,elements.doubleChainAnswerZone,addDoubleChainDigit);elements.doubleChainNumberTray.append(tile)}

function openShopWorld() {
  const profile = getProfile();
  if (!profile) return showProfileSelection();
  const level = getLevel(profile);
  elements.worldEmoji.textContent = profile.emoji; elements.worldLevel.textContent = level; elements.shopLevelLabel.textContent = `Dein Laden · Level ${level}`;
  const size = level >= 10 ? 4 : level >= 6 ? 3 : level >= 3 ? 2 : 1;
  elements.shopBuilding.className = `shop-building size-${size}`;
  const nextArea = level < 3 ? 'Die Bäckerei öffnet auf Level 3.' : level < 6 ? 'Die Kasse öffnet auf Level 6.' : level < 10 ? 'Das Lager öffnet auf Level 10.' : 'Der ganze Laden ist geöffnet!';
  elements.shopInstruction.textContent = `Wo möchtest du heute helfen? ${nextArea}`;
  document.querySelectorAll('.store-station').forEach((station) => {
    const unlocked = level >= Number(station.dataset.level) || teacherPreview;
    station.disabled = !unlocked; station.classList.toggle('locked', !unlocked);
    station.querySelector('small').textContent = unlocked ? 'offen' : `ab Level ${station.dataset.level}`;
  });
  showScreen('shopWorld');
}

function startShopGame(station = shopState.station || 'fruit') {
  if (!getProfile()) return showProfileSelection();
  const level = getLevel(getProfile());
  shopState = { question: 0, score: 0, task: null, operationChosen: false, answer: '', retryCount: 0, locked: false, hadHelp: false, operations: makeOperationRound(), station, difficulty: level >= 8 ? 3 : level >= 4 ? 2 : 1 };
  elements.shopScore.textContent = '0';
  showScreen('shop');
  nextShopQuestion();
}

function makeOperationRound() {
  const profile = getProfile();
  const operations = ['+','-','*','/'];
  const ranked = [...operations].sort((left, right) => {
    const difficulty = (operation) => {
      const stats = profile?.operations?.[operation];
      return stats?.attempts ? stats.wrong / stats.attempts : .5;
    };
    return difficulty(right) - difficulty(left);
  });
  return shuffled([...operations, ...operations]);
}

function nextShopQuestion() {
  if (shopState.question >= SHOP_QUESTIONS) return finishShopGame();
  shopState.task = makeShopTask(shopState.operations[shopState.question], shopState.station);
  shopState.operationChosen = false; shopState.answer = ''; shopState.retryCount = 0; shopState.locked = false; shopState.hadHelp = false;
  elements.shopStory.textContent = shopState.task.story;
  elements.shopPreviewA.textContent = shopState.task.a; elements.shopPreviewB.textContent = shopState.task.b;
  elements.shopScene.textContent = shopState.task.scene;
  elements.shopProgress.style.width = `${(shopState.question / SHOP_QUESTIONS) * 100}%`;
  elements.shopFeedback.textContent = ''; elements.shopFeedback.className = 'feedback';
  elements.shopEquation.classList.add('hidden'); elements.shopActions.classList.add('hidden'); elements.shopNumberArea.classList.add('hidden'); elements.shopWriteArea.classList.add('hidden');
  elements.shopEquationInput.value = '';
  const choices = [...elements.operationChoices.querySelectorAll('button')];
  choices.forEach((button) => { button.disabled = false; button.classList.remove('chosen','wrong','hidden'); });
  if (shopState.difficulty === 1) {
    const correct = shopState.task.operation;
    const distractor = shuffled(['+','-','*','/'].filter((item) => item !== correct))[0];
    choices.forEach((button) => button.classList.toggle('hidden', ![correct,distractor].includes(button.dataset.operation)));
  }
  elements.operationChoices.classList.toggle('hidden', shopState.difficulty === 3);
  if (shopState.difficulty === 3) elements.shopWriteArea.classList.remove('hidden');
  renderShopAnswer();
}

const STATION_STORIES = {
  fruit: {
    '+': (a,b) => `In deinem Korb liegen ${a} Äpfel. Du legst noch ${b} Äpfel dazu. Wie viele sind jetzt im Korb?`,
    '-': (a,b) => `Im Regal stehen ${a} Birnen. ${b} werden verkauft. Wie viele stehen noch dort?`,
    '*': (a,b) => `Du packst ${a} Tüten. In jede Tüte kommen ${b} Äpfel. Wie viele Äpfel sind das zusammen?`,
    '/': (a,b) => `Du verteilst ${a} Erdbeeren gleichmäßig auf ${b} Schalen. Wie viele kommen in jede Schale?`,
  },
  bakery: {
    '+': (a,b) => `Im Korb liegen ${a} Brötchen. Du legst noch ${b} dazu. Wie viele sind es jetzt?`,
    '-': (a,b) => `Im Regal liegen ${a} Brezeln. ${b} werden verkauft. Wie viele bleiben übrig?`,
    '*': (a,b) => `Du kaufst ${a} Tüten. In jeder Tüte sind ${b} Brezeln. Wie viele Brezeln sind es zusammen?`,
    '/': (a,b) => `${a} Croissants werden gerecht auf ${b} Backbleche verteilt. Wie viele kommen auf jedes Blech?`,
  },
  checkout: {
    '+': (a,b) => `Du hast ${a} Euro und bekommst noch ${b} Euro dazu. Wie viel Geld hast du jetzt?`,
    '-': (a,b) => `Du hast ${a} Euro. Beim Einkaufen gibst du ${b} Euro aus. Wie viel bleibt übrig?`,
    '*': (a,b) => `Eine Packung kostet ${b} Euro. Du kaufst ${a} Packungen. Wie viel musst du bezahlen?`,
    '/': (a,b) => `${a} Euro werden gerecht auf ${b} Kinder verteilt. Wie viel bekommt jedes Kind?`,
  },
  stock: {
    '+': (a,b) => `Im Lager stehen ${a} Kartons. Es kommen noch ${b} dazu. Wie viele stehen jetzt dort?`,
    '-': (a,b) => `Im Lager stehen ${a} Dosen. ${b} werden ausgeliefert. Wie viele bleiben übrig?`,
    '*': (a,b) => `Du stapelst ${a} Kisten. In jede Kiste passen ${b} Dosen. Wie viele Dosen sind das zusammen?`,
    '/': (a,b) => `${a} Dosen werden gleichmäßig auf ${b} Regale verteilt. Wie viele kommen in jedes Regal?`,
  },
};
function makeShopTask(operation, station = 'fruit') {
  let a; let b; let result;
  if (operation === '+') { a = randomInt(3, 20); b = randomInt(2, 15); result = a + b; }
  else if (operation === '-') { a = randomInt(10, 30); b = randomInt(2, a - 2); result = a - b; }
  else if (operation === '*') { a = randomInt(2, 10); b = randomInt(2, 10); result = a * b; }
  else { b = randomInt(2, 10); result = randomInt(2, 10); a = b * result; }
  const stationScenes = { fruit: '🍎 🍐 🍓', bakery: '🥨 🥖 🥐', checkout: '🛒 🧾 🪙', stock: '📦 🥫 🪜' };
  const stationNames = { fruit: 'Am Obststand', bakery: 'In der Bäckerei', checkout: 'An der Kasse', stock: 'Im Lager' };
  const story = STATION_STORIES[station][operation](a, b);
  return { operation, a, b, result, story: `${stationNames[station]}: ${story}`, scene: stationScenes[station] };
}

function chooseShopOperation(operation, button) {
  if (shopState.operationChosen || shopState.locked) return;
  if (operation !== shopState.task.operation) {
    shopState.hadHelp = true;
    button.classList.add('wrong');
    elements.shopFeedback.textContent = operationHint(shopState.task.operation);
    elements.shopFeedback.className = 'feedback wrong';
    rememberOperation(false);
    return;
  }
  shopState.operationChosen = true; button.classList.add('chosen'); rememberOperation(true);
  elements.operationChoices.querySelectorAll('button').forEach((item) => { item.disabled = true; });
  elements.shopA.textContent = shopState.task.a; elements.shopB.textContent = shopState.task.b;
  elements.shopOperator.textContent = { '+': '+', '-': '−', '*': '×', '/': '÷' }[operation];
  elements.shopEquation.classList.remove('hidden'); elements.shopActions.classList.remove('hidden'); elements.shopNumberArea.classList.remove('hidden');
  elements.shopFeedback.textContent = 'Richtige Rechenart! Jetzt berechne das Ergebnis.'; elements.shopFeedback.className = 'feedback correct';
}

function operationHint(operation) {
  return { '+': 'Achte auf „dazu“ oder „jetzt zusammen“: Die Menge wird größer.', '-': 'Achte auf „ausgeben“, „verkauft“ oder „übrig“: Die Menge wird kleiner.', '*': 'Es gibt mehrere gleich große Packungen oder Gruppen.', '/': 'Eine Menge wird gleichmäßig oder gerecht verteilt.' }[operation];
}

function addShopDigit(digit) { if (!shopState.operationChosen || shopState.locked || shopState.answer.length >= 3) return; shopState.answer += digit; renderShopAnswer(); }
function removeShopDigit() { if (shopState.locked) return; shopState.answer = shopState.answer.slice(0,-1); renderShopAnswer(); }
function renderShopAnswer() {
  elements.shopAnswerZone.textContent = shopState.answer || '?';
  elements.shopAnswerZone.style.color = shopState.answer ? '#6c4fe0' : '#c1b5dd';
  elements.shopCheck.disabled = !shopState.answer || shopState.locked;
}

function checkShopAnswer() {
  if (!shopState.answer || shopState.locked) return;
  if (Number(shopState.answer) !== shopState.task.result) {
    shopState.retryCount += 1; shopState.hadHelp = true; shopState.answer = '';
    elements.shopFeedback.textContent = shopState.retryCount === 1 ? 'Noch nicht ganz. Lies die Geschichte und rechne Schritt für Schritt.' : `Tipp: Das Ergebnis liegt zwischen ${Math.max(0,shopState.task.result-2)} und ${shopState.task.result+2}.`;
    elements.shopFeedback.className = 'feedback wrong'; renderShopAnswer(); return;
  }
  completeShopTask();
}

function checkWrittenEquation() {
  if (shopState.locked || !elements.shopEquationInput.value.trim()) return;
  const normalized = elements.shopEquationInput.value.replace(/\s/g,'').replace(/[xX×·]/g,'*').replace(/[÷:]/g,'/').replace(/−/g,'-');
  const expected = `${shopState.task.a}${shopState.task.operation}${shopState.task.b}=${shopState.task.result}`;
  if (normalized !== expected) {
    shopState.hadHelp = true; shopState.retryCount += 1; rememberOperation(false);
    elements.shopFeedback.textContent = shopState.retryCount === 1 ? `Schau noch einmal: ${operationHint(shopState.task.operation)}` : `Der Rechenweg beginnt mit ${shopState.task.a} und verwendet die beiden Zahlen aus der Geschichte.`;
    elements.shopFeedback.className = 'feedback wrong'; return;
  }
  rememberOperation(true);
  completeShopTask();
}

function completeShopTask() {
  shopState.locked = true; shopState.question += 1;
  if (!shopState.hadHelp) shopState.score += 1;
  const profile = getProfile(); if (profile) { addXp(profile,1); saveProfiles(); renderProfileHeader(); }
  incrementActivity('shop'); saveProfiles();
  elements.shopScore.textContent = shopState.score; elements.shopProgress.style.width = `${(shopState.question / SHOP_QUESTIONS) * 100}%`;
  elements.shopFeedback.textContent = shopState.hadHelp ? 'Geschafft – gut nachgedacht! 💪' : 'Geschichte richtig verstanden! ✨'; elements.shopFeedback.className = 'feedback correct';
  window.setTimeout(nextShopQuestion, 750);
}

function rememberOperation(correct) {
  const profile = getProfile(); if (!profile) return;
  profile.operations ||= {}; const key = shopState.task.operation;
  profile.operations[key] ||= { attempts: 0, correct: 0, wrong: 0 };
  profile.operations[key].attempts += 1; profile.operations[key][correct ? 'correct' : 'wrong'] += 1; saveProfiles();
}

function finishShopGame() {
  elements.shopFinalScore.textContent = shopState.score;
  elements.shopFinishText.textContent = shopState.score === SHOP_QUESTIONS ? 'Du hast jede Geschichte sofort richtig verstanden!' : `${shopState.score} von ${SHOP_QUESTIONS} Geschichten hast du ganz ohne Hilfe gelöst.`;
  showScreen('shopFinish');
  maybeShowLevelUp();
}

function startCatchGame() {
  if (getLevel(getProfile()) < 5 && !teacherPreview) return;
  clearCatchBubbles();cancelAnimationFrame(catchState.frame);
  catchState = { question: 0, score: 0, a: 2, b: 2, queue: [], y: -75, x: 0, basketX: 0, lastTime: 0, frame: 0, running: true, mistake: false, bubbles: [] };
  elements.catchScore.textContent = '0'; elements.catchProgress.style.width = '0%';
  showScreen('catch');
  requestAnimationFrame(() => {
    catchState.basketX = Math.max(0, (elements.catchArena.clientWidth - 76) / 2);
    moveBasket(catchState.basketX); elements.fallingAnswer.style.display='none'; nextCatchWaveQuestion();
  });
}

function nextCatchWaveQuestion(){
  if(!catchState.running)return;if(catchState.question>=10)return finishCatchGame();clearCatchBubbles();const previous=state.mode;state.mode='mixed';[catchState.a,catchState.b]=chooseAdaptiveFact();state.mode=previous;catchState.mistake=false;elements.catchQuestion.textContent=`${catchState.a} × ${catchState.b}`;elements.catchQuestionBoard.textContent=`${catchState.a} × ${catchState.b} = ?`;elements.catchFeedback.textContent='Fange nur die richtige Lösung!';spawnCatchWave();
}
function spawnCatchWave(){clearCatchBubbles();const correct=catchState.a*catchState.b;const values=new Set([correct]);while(values.size<4)values.add(Math.max(1,correct+randomInt(-12,12)));const width=elements.catchArena.clientWidth;const laneWidth=width/4;shuffled([...values]).forEach((value,index)=>{const node=document.createElement('div');node.className='falling-answer multi-answer';node.textContent=value;elements.catchArena.append(node);const bubble={node,value,correct:value===correct,x:index*laneWidth+(laneWidth-62)/2,y:-80-randomInt(0,125),speed:.15+randomInt(0,4)/100+catchState.question*.005};node.style.left=`${bubble.x}px`;node.style.top=`${bubble.y}px`;catchState.bubbles.push(bubble)});catchState.lastTime=performance.now();cancelAnimationFrame(catchState.frame);catchState.frame=requestAnimationFrame(animateCatchWave)}
function animateCatchWave(time){if(!catchState.running||screens.catch.classList.contains('hidden'))return;const delta=Math.min(40,time-catchState.lastTime);catchState.lastTime=time;const line=elements.catchArena.clientHeight-95;for(const bubble of [...catchState.bubbles]){bubble.y+=delta*bubble.speed;bubble.node.style.top=`${bubble.y}px`;if(bubble.y+60>=line&&bubble.y<=line+48&&Math.abs((bubble.x+31)-(catchState.basketX+38))<50){if(bubble.correct)return catchCorrectWave();catchState.mistake=true;flashCatchError();elements.catchFeedback.textContent=`${bubble.value} passt nicht – weiter auf die Aufgabe schauen!`;removeCatchBubble(bubble)}else if(bubble.y>elements.catchArena.clientHeight)removeCatchBubble(bubble)}if(!catchState.bubbles.length){elements.catchFeedback.textContent='Die richtige Lösung ist vorbeigefallen – neue Welle!';return window.setTimeout(spawnCatchWave,350)}catchState.frame=requestAnimationFrame(animateCatchWave)}
function catchCorrectWave(){catchState.question+=1;catchState.score+=1;const profile=getProfile();if(profile&&!teacherPreview){addXp(profile,1);saveProfiles();renderProfileHeader()}incrementActivity('catch');rememberCatchFact();elements.catchScore.textContent=catchState.score;elements.catchProgress.style.width=`${catchState.question*10}%`;elements.catchFeedback.textContent='Richtig aufgefangen! ✨';clearCatchBubbles();window.setTimeout(nextCatchWaveQuestion,400)}
function removeCatchBubble(bubble){bubble.node.remove();catchState.bubbles=catchState.bubbles.filter(item=>item!==bubble)}
function clearCatchBubbles(){catchState.bubbles.forEach(bubble=>bubble.node.remove());catchState.bubbles=[];cancelAnimationFrame(catchState.frame)}

function nextCatchQuestion() {
  if (!catchState.running) return;
  if (catchState.question >= 10) return finishCatchGame();
  const previousMode = state.mode; state.mode = 'mixed';
  [catchState.a, catchState.b] = chooseAdaptiveFact(); state.mode = previousMode;
  const correct = catchState.a * catchState.b;
  const answers = new Set([correct]);
  while (answers.size < 4) answers.add(Math.max(1, correct + randomInt(-9, 9)));
  catchState.queue = shuffled([...answers]); catchState.mistake = false;
  elements.catchQuestion.textContent = `${catchState.a} × ${catchState.b}`;
  elements.catchFeedback.textContent = 'Fange nur die richtige Lösung!';
  launchCatchAnswer();
}

function launchCatchAnswer() {
  if (!catchState.queue.length) {
    const correct = catchState.a * catchState.b;
    catchState.queue = shuffled([correct, Math.max(1,correct-2), correct+3]);
  }
  const value = catchState.queue.shift();
  elements.fallingAnswer.textContent = value; elements.fallingAnswer.dataset.correct = String(value === catchState.a * catchState.b);
  catchState.y = -75; catchState.x = randomInt(8, Math.max(8, elements.catchArena.clientWidth - 76));
  elements.fallingAnswer.style.left = `${catchState.x}px`; elements.fallingAnswer.style.top = `${catchState.y}px`;
  catchState.lastTime = performance.now(); cancelAnimationFrame(catchState.frame); catchState.frame = requestAnimationFrame(animateCatch);
}

function animateCatch(time) {
  if (!catchState.running || screens.catch.classList.contains('hidden')) return;
  const delta = Math.min(40, time - catchState.lastTime); catchState.lastTime = time;
  catchState.y += delta * (0.105 + Math.min(getLevel(getProfile()), 15) * .003);
  elements.fallingAnswer.style.top = `${catchState.y}px`;
  const catchLine = elements.catchArena.clientHeight - 95;
  if (catchState.y + 62 >= catchLine && catchState.y <= catchLine + 48 && Math.abs((catchState.x + 34) - (catchState.basketX + 38)) < 60) return catchBubble();
  if (catchState.y > elements.catchArena.clientHeight) return missBubble();
  catchState.frame = requestAnimationFrame(animateCatch);
}

function catchBubble() {
  const correct = elements.fallingAnswer.dataset.correct === 'true';
  if (!correct) { catchState.mistake = true; elements.catchFeedback.textContent = 'Diese Lösung gehört nicht zur Aufgabe – weiter aufpassen!'; return window.setTimeout(launchCatchAnswer, 350); }
  catchState.question += 1; catchState.score += 1;
  const profile = getProfile(); if (profile) { profile.xp += 1; saveProfiles(); renderProfileHeader(); }
  incrementActivity('catch'); saveProfiles();
  rememberCatchFact(); elements.catchScore.textContent = catchState.score; elements.catchProgress.style.width = `${catchState.question * 10}%`;
  elements.catchFeedback.textContent = 'Richtig aufgefangen! ✨'; window.setTimeout(nextCatchQuestion, 450);
}

function missBubble() {
  if (elements.fallingAnswer.dataset.correct === 'true') { catchState.mistake = true; elements.catchFeedback.textContent = 'Die richtige Lösung ist vorbeigefallen – sie kommt gleich wieder.'; catchState.queue.push(catchState.a * catchState.b); }
  launchCatchAnswer();
}

function rememberCatchFact() {
  if(teacherPreview)return;
  const profile = getProfile(); if (!profile) return;
  const key = factKey(catchState.a, catchState.b); profile.facts[key] ||= { attempts:0, correct:0, wrong:0 };
  profile.facts[key].attempts += 1; profile.facts[key].correct += 1; saveProfiles();
}

function moveBasket(x) {
  catchState.basketX = Math.max(0, Math.min(elements.catchArena.clientWidth - 76, x));
  elements.catchBasket.style.left = `${catchState.basketX}px`;
}

function finishCatchGame() {
  catchState.running = false; clearCatchBubbles(); cancelAnimationFrame(catchState.frame);
  elements.catchFinalScore.textContent = catchState.score; elements.catchFinishText.textContent = 'Du hast zehn richtige Lösungen sicher in den Korb gebracht.';
  showScreen('catchFinish');
  maybeShowLevelUp();
}

function startDivisionGame(mode='understand'){ divisionState={question:0,score:0,total:12,divisor:3,result:4,type:'share',answer:'',retry:0,locked:false,mode,conceptStep:0}; elements.divisionScore.textContent='0'; showScreen('division'); nextDivisionQuestion(); }
function nextDivisionQuestion(){
  if(divisionState.question>=10)return finishDivisionGame();
  divisionState.divisor=divisionState.mode==='understand'?randomInt(2,6):divisionState.mode==='mixed'?randomInt(1,10):divisionState.mode;divisionState.result=divisionState.mode==='understand'?randomInt(2,6):randomInt(1,10);divisionState.total=divisionState.divisor*divisionState.result;divisionState.type=divisionState.mode==='understand'?(divisionState.question%2===0?'share':'groups'):'fact';divisionState.answer='';divisionState.retry=0;divisionState.locked=false;divisionState.conceptStep=0;
  elements.divisionA.textContent=divisionState.total;elements.divisionB.textContent=divisionState.divisor;elements.divisionKind.textContent=divisionState.type==='share'?'Gerecht verteilen':'Gruppen bilden';
  elements.divisionKind.textContent=divisionState.type==='share'?'Gerecht verteilen':divisionState.type==='groups'?'Gruppen bilden':divisionState.mode==='mixed'?'Alles gemischt':`Geteilt durch ${divisionState.divisor}`;
  elements.divisionStory.textContent=divisionState.type==='share'?`${divisionState.total} Erdbeeren werden gerecht auf ${divisionState.divisor} Kinder verteilt. Wie viele bekommt jedes Kind?`:divisionState.type==='groups'?`Du hast ${divisionState.total} Erdbeeren. Jedes Kind bekommt ${divisionState.divisor}. Für wie viele Kinder reicht es?`:`Wie viel ist ${divisionState.total} geteilt durch ${divisionState.divisor}?`;
  elements.divisionObjects.replaceChildren();appendDiceGroup(elements.divisionObjects,divisionState.total,'🍓');
  const understanding=divisionState.mode==='understand';elements.divisionInverse.classList.toggle('hidden',!understanding);elements.divisionConceptControls.classList.toggle('hidden',!understanding);
  if(understanding)renderDivisionConcept();
  elements.divisionFeedback.textContent='';elements.divisionFeedback.className='feedback';elements.divisionProgress.style.width=`${divisionState.question*10}%`;renderDivisionAnswer();
}
function addDivisionDigit(digit){if(divisionState.locked||divisionState.answer.length>=2||(divisionState.mode==='understand'&&divisionState.conceptStep<divisionState.result))return;divisionState.answer+=digit;renderDivisionAnswer()}
function removeDivisionDigit(){if(divisionState.locked)return;divisionState.answer=divisionState.answer.slice(0,-1);renderDivisionAnswer()}
function renderDivisionAnswer(){elements.divisionAnswerZone.textContent=divisionState.answer||'?';elements.divisionAnswerZone.style.color=divisionState.answer?'#6c4fe0':'#c1b5dd';const conceptReady=divisionState.mode!=='understand'||divisionState.conceptStep>=divisionState.result;elements.divisionCheck.disabled=!divisionState.answer||divisionState.locked||!conceptReady}
function checkDivisionAnswer(){
  if(!divisionState.answer||divisionState.locked)return;
  if(Number(divisionState.answer)!==divisionState.result){divisionState.retry+=1;divisionState.answer='';elements.divisionFeedback.textContent=getDivisionHint();elements.divisionFeedback.className='feedback wrong';if(divisionState.type!=='fact')renderDivisionHelpGroups();renderDivisionAnswer();return}
  divisionState.locked=true;divisionState.question+=1;if(divisionState.retry===0)divisionState.score+=1;const profile=getProfile();if(profile){addXp(profile,1);incrementActivity('division');saveProfiles();renderProfileHeader()}elements.divisionScore.textContent=divisionState.score;elements.divisionProgress.style.width=`${divisionState.question*10}%`;elements.divisionFeedback.textContent='Richtig geteilt! ✨';elements.divisionFeedback.className='feedback correct';window.setTimeout(nextDivisionQuestion,650)
}
function finishDivisionGame(){elements.divisionFinalScore.textContent=divisionState.score;elements.divisionFinishText.textContent=`${divisionState.score} von 10 Aufgaben hast du ohne Hilfe gelöst.`;showScreen('divisionFinish');maybeShowLevelUp()}
function getDivisionHint(){if(divisionState.retry>=2)return`${divisionState.total} ÷ ${divisionState.divisor} = ${divisionState.result}. Die Umkehraufgabe ist ${divisionState.divisor} × ${divisionState.result} = ${divisionState.total}. Gib das Ergebnis nun selbst ein.`;if(divisionState.type==='share')return`Gib jedem der ${divisionState.divisor} Kinder immer eine Erdbeere. Alle bekommen gleich viel. Denke auch rückwärts: ${divisionState.divisor} × ? = ${divisionState.total}.`;if(divisionState.type==='groups')return`Bilde aus den ${divisionState.total} Erdbeeren Päckchen mit jeweils ${divisionState.divisor}. Die Anzahl der Päckchen ist gesucht – Malnehmen setzt sie wieder zur Gesamtmenge zusammen.`;return`Denk rückwärts an das Einmaleins: ${divisionState.divisor} × ? = ${divisionState.total}.`}
function renderDivisionConcept(){
  const used=divisionState.conceptStep*divisionState.divisor;const remaining=divisionState.total-used;elements.divisionObjects.replaceChildren();
  const pool=document.createElement('div');pool.className='division-pool';const poolLabel=document.createElement('small');poolLabel.textContent='Noch zu verteilen';pool.append(poolLabel);const poolDice=document.createElement('div');poolDice.className='division-pool-dice';appendDiceGroup(poolDice,remaining,'🍓');pool.append(poolDice);elements.divisionObjects.append(pool);
  if(divisionState.type==='share')for(let child=0;child<divisionState.divisor;child+=1){const box=document.createElement('span');box.className='division-help-group';const label=document.createElement('small');label.textContent=`Kind ${child+1}`;box.append(label);const dice=document.createElement('div');dice.className='division-pool-dice';appendDiceGroup(dice,divisionState.conceptStep,'🍓');box.append(dice);elements.divisionObjects.append(box)}
  else for(let group=0;group<divisionState.conceptStep;group+=1){const box=document.createElement('span');box.className='division-help-group';const label=document.createElement('small');label.textContent=`Päckchen ${group+1}`;box.append(label);const dice=document.createElement('div');dice.className='division-pool-dice';appendDiceGroup(dice,divisionState.divisor,'🍓');box.append(dice);elements.divisionObjects.append(box)}
  const done=divisionState.conceptStep>=divisionState.result;elements.divisionInverseEquation.textContent=divisionState.type==='share'?`${divisionState.divisor} × ${divisionState.conceptStep} = ${used}`:`${divisionState.conceptStep} × ${divisionState.divisor} = ${used}`;
  elements.divisionConceptText.textContent=done?`Alle ${divisionState.total} Erdbeeren sind verteilt. Genau deshalb ist die Geteilt-Aufgabe die Umkehrung dieser Mal-Aufgabe.`:divisionState.type==='share'?`Gib jetzt jedem Kind genau eine Erdbeere. Danach haben alle weiterhin gleich viel.`:`Nimm jetzt ${divisionState.divisor} Erdbeeren und bilde daraus ein gleich großes Päckchen.`;
  elements.divisionConceptButton.textContent=done?'Fertig verteilt ✓':divisionState.type==='share'?'Je eine Erdbeere verteilen':`Ein ${divisionState.divisor}er-Päckchen bilden`;elements.divisionConceptButton.disabled=done;renderDivisionAnswer();
}
function advanceDivisionConcept(){if(divisionState.mode!=='understand'||divisionState.conceptStep>=divisionState.result)return;divisionState.conceptStep+=1;renderDivisionConcept()}
function renderDivisionHelpGroups(){elements.divisionObjects.replaceChildren();const groups=divisionState.type==='share'?divisionState.divisor:divisionState.result;const perGroup=divisionState.type==='share'?divisionState.result:divisionState.divisor;for(let group=0;group<groups;group+=1){const box=document.createElement('span');box.className='division-help-group';const label=document.createElement('small');label.textContent=divisionState.type==='share'?`Kind ${group+1}`:`Päckchen ${group+1}`;box.append(label);const dice=document.createElement('div');dice.className='division-pool-dice';appendDiceGroup(dice,perGroup,'🍓');box.append(dice);elements.divisionObjects.append(box)}const explanation=document.createElement('p');explanation.className='division-group-caption';explanation.textContent=divisionState.type==='share'?`${divisionState.total} Erdbeeren werden auf ${divisionState.divisor} gleich große Kinder-Gruppen aufgeteilt.`:`Aus ${divisionState.total} Erdbeeren werden Päckchen mit jeweils ${divisionState.divisor} Erdbeeren gebildet.`;elements.divisionObjects.append(explanation)}

function startGame(mode) {
  if (!getProfile()) return showProfileSelection();
  state = { mode, question: 0, score: 0, streak: 0, a: 2, b: 1, answer: '', locked: false, retryCount: 0, total: FREE_QUESTIONS, roundFacts:{} };
  elements.currentMode.textContent = mode === 'mixed' ? 'Alles gemischt' : `${mode}er-Reihe`;
  elements.score.textContent = '0';
  elements.streakCount.textContent = '0';
  showScreen('game');
  nextQuestion();
}

function nextQuestion() {
  if (state.question >= state.total) return finishGame();
  state.answer = '';
  state.locked = false;
  state.retryCount = 0;
  [state.a, state.b] = chooseAdaptiveFact();
  elements.factorOne.textContent = state.a;
  elements.factorTwo.textContent = state.b;
  elements.feedback.textContent = '';
  elements.feedback.className = 'feedback';
  elements.progressBar.style.width = `${(state.question / state.total) * 100}%`;
  renderAnswer();
}

function addDigit(digit) {
  if (state.locked || state.answer.length >= 3) return;
  state.answer += digit;
  renderAnswer();
}

function removeDigit() {
  if (state.locked) return;
  state.answer = state.answer.slice(0, -1);
  renderAnswer();
}

function renderAnswer() {
  elements.answerZone.replaceChildren();
  if (!state.answer) {
    const placeholder = document.createElement('span');
    placeholder.textContent = '?';
    placeholder.style.color = '#c1b5dd';
    elements.answerZone.append(placeholder);
  } else {
    [...state.answer].forEach((digit) => {
      const span = document.createElement('span');
      span.className = 'answer-digit';
      span.textContent = digit;
      elements.answerZone.append(span);
    });
  }
  elements.checkButton.disabled = !state.answer || state.locked;
}

function checkAnswer() {
  if (!state.answer || state.locked) return;
  const correctAnswer = state.a * state.b;
  const wasCorrect = Number(state.answer) === correctAnswer;
  state.locked = true;

  if (wasCorrect) {
    const completedKey=factKey(state.a,state.b);state.roundFacts[completedKey]=(state.roundFacts[completedKey]||0)+1;
    state.question += 1;
    if (state.retryCount === 0) state.score += 1;
    state.streak += 1;
    elements.feedback.textContent = state.retryCount
      ? 'Jetzt stimmt es – gut drangeblieben! 💪'
      : ['Super gemacht! ✨', 'Genau richtig! ⭐', 'Toll gerechnet! 🎉'][randomInt(0, 2)];
    elements.feedback.classList.add('correct');
    rememberAnswer(true);

    elements.score.textContent = state.score;
    elements.streakCount.textContent = state.streak;
    elements.checkButton.disabled = true;
    elements.progressBar.style.width = `${(state.question / state.total) * 100}%`;
    window.setTimeout(nextQuestion, 650);
  } else {
    state.streak = 0;
    state.retryCount += 1;
    confidenceBoost = true;
    elements.feedback.textContent = getRetryHint();
    elements.feedback.classList.add('wrong');
    rememberAnswer(false);
    elements.streakCount.textContent = '0';
    elements.checkButton.disabled = true;
    window.setTimeout(prepareRetry, 900);
  }
}

function getRetryHint() {
  if (state.retryCount === 1) {
    if (state.a === 1 || state.b === 1) return 'Tipp: Wenn du mit 1 malnimmst, bleibt die andere Zahl gleich.';
    const sequence = Array.from({ length: state.a }, (_, index) => state.b * (index + 1));
    sequence[sequence.length - 1] = '?';
    return `Versuch es noch einmal. Tipp: Zähle in ${state.b}er-Schritten: ${sequence.join(', ')}`;
  }
  const answer = String(state.a * state.b);
  if (state.retryCount === 2) {
    if (answer.length === 1) return `Noch ein Tipp: Die Lösung liegt zwischen ${Math.max(0, Number(answer) - 2)} und ${Number(answer) + 2}.`;
    return `Noch ein Tipp: Die Lösung beginnt mit ${answer[0]} und hat ${answer.length} Stellen.`;
  }
  return `Präge dir den Malsatz kurz ein: ${state.a} × ${state.b} = ${answer}. Gib die Lösung nun selbst ein.`;
}

function prepareRetry() {
  state.answer = '';
  state.locked = false;
  renderAnswer();
}

function finishGame() {
  elements.finalScore.textContent = state.score;
  elements.finalTotal.textContent = `von ${state.total}`;
  elements.finishText.textContent = state.score === state.total ? 'Alle Aufgaben richtig – du bist ein Einmaleins-Profi!' : `Du hast ${state.score} von ${state.total} Aufgaben gleich beim ersten Versuch gelöst.`;
  showScreen('finish');
  maybeShowLevelUp();
}

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffled(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = randomInt(0, index);
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function chooseAdaptiveFact() {
  const candidates = [];
  if (state.mode === 'mixed') {
    for (let a = 1; a <= 10; a += 1) for (let b = 1; b <= 10; b += 1) candidates.push([a, b]);
  } else {
    for (let b = 1; b <= 10; b += 1) candidates.push([state.mode, b]);
  }
  const profile = getProfile();
  if (confidenceBoost && profile && Math.random() < .65) {
    const safeFacts = candidates.filter(([a, b]) => {
      const stats = profile.facts?.[factKey(a, b)];
      const shown=state.roundFacts?.[factKey(a,b)]||0;
      return stats && stats.attempts >= 2 && stats.correct / stats.attempts >= .75 && factKey(a, b) !== lastFact && shown<2 && !(state.mode==='mixed'&&shown>=1);
    });
    if (safeFacts.length) {
      const choice = safeFacts[randomInt(0, safeFacts.length - 1)];
      confidenceBoost = false;
      lastFact = factKey(...choice);
      return choice;
    }
  }
  confidenceBoost = false;
  const weighted = [];
  candidates.forEach(([a, b]) => {
    const stats = profile?.facts?.[factKey(a, b)] || { attempts: 0, correct: 0, wrong: 0 };
    const accuracy = stats.attempts ? stats.correct / stats.attempts : .55;
    // Unsichere Aufgaben häufiger, sichere Aufgaben weiterhin als Erfolgsmomente.
    let weight = stats.attempts === 0 ? 5 : 2 + Math.round((1 - accuracy) * 10) + Math.min(stats.wrong, 5);
    if (accuracy >= .8) weight += 2;
    if (factKey(a, b) === lastFact) weight = 0;
    const shown=state.roundFacts?.[factKey(a,b)]||0;if(shown>=2||(state.mode==='mixed'&&shown>=1))weight=0;
    for (let i = 0; i < weight; i += 1) weighted.push([a, b]);
  });
  const available=candidates.filter(([a,b])=>(state.roundFacts?.[factKey(a,b)]||0)<2);const choice = weighted[randomInt(0, weighted.length - 1)] || available[randomInt(0, available.length - 1)] || candidates[randomInt(0, candidates.length - 1)];
  lastFact = factKey(...choice);
  return choice;
}

function factKey(a, b) { return `${a}x${b}`; }

function rememberAnswer(correct) {
  if(teacherPreview)return;
  const profile = getProfile();
  if (!profile) return;
  const key = factKey(state.a, state.b);
  profile.facts[key] ||= { attempts: 0, correct: 0, wrong: 0 };
  profile.facts[key].attempts += 1;
  profile.facts[key][correct ? 'correct' : 'wrong'] += 1;
  if (correct) addXp(profile, 1);
  if (correct) incrementActivity('multiplication');
  saveProfiles();
  renderProfileHeader();
}

function incrementActivity(activity) {
  if(teacherPreview)return;
  const profile = getProfile(); if (!profile) return;
  profile.activityCounts ||= {}; profile.activityCounts[activity] = (profile.activityCounts[activity] || 0) + 1;
  renderStudentAssignment();
}

function renderStudentAssignment() {
  const profile = getProfile(); const assignment = profile?.assignment;
  elements.studentAssignment.classList.toggle('hidden', !assignment);
  if (!assignment) return;
  const names = { multiplication:'Einmaleins gemischt', division:'Geteilt rechnen', shop:'Einkaufsgeschichten', catch:'Lösungen auffangen', family:'Umkehraufgaben-Memory', placeValue:'Stellenwert-Werkstatt bis 10.000', numberLine:'Zahlenstrahl-Sprünge', race:'Tempo-Rennen', kingTower:'Königsaufgaben-Turm', neighbor:'Nachbaraufgaben-Domino', doubleChain:'Verdopplungskette' };
  const current = profile.activityCounts?.[assignment.activity] || 0;
  const done = Math.min(assignment.target, Math.max(0, current - assignment.baseline));
  elements.assignmentTitle.textContent = assignment.note || names[assignment.activity];
  elements.assignmentStatus.textContent = done >= assignment.target ? 'Geschafft! 🎉' : `${done} von ${assignment.target} Aufgaben erledigt`;
  elements.assignmentBar.style.width = `${(done / assignment.target) * 100}%`;
}

function openTeacherArea() {
  elements.teacherProfileSelect.replaceChildren();
  profiles.forEach((profile) => { const option=document.createElement('option');option.value=profile.id;option.textContent=profile.name;elements.teacherProfileSelect.append(option); });
  elements.teacherEmpty.classList.toggle('hidden', profiles.length > 0); elements.teacherContent.classList.toggle('hidden', !profiles.length);
  if (profiles.length) { elements.teacherProfileSelect.value = activeProfileId && profiles.some(p=>p.id===activeProfileId) ? activeProfileId : profiles[0].id; renderTeacherDashboard(); }
  showScreen('teacher');
}

function getTeacherProfile(){return profiles.find(profile=>profile.id===elements.teacherProfileSelect.value)}
function renderTeacherDashboard(){
  const profile=getTeacherProfile();if(!profile)return;const facts=Object.entries(profile.facts||{});const attempts=facts.reduce((sum,[,s])=>sum+s.attempts,0);const correct=facts.reduce((sum,[,s])=>sum+s.correct,0);const accuracy=attempts?Math.round(correct/attempts*100):0;
  elements.teacherStats.innerHTML=`<div><strong>Level ${getLevel(profile)}</strong><small>${profile.xp||0} Erfahrungspunkte</small></div><div><strong>${accuracy}%</strong><small>Einmaleins richtig</small></div><div><strong>${attempts}</strong><small>Einmaleins-Versuche</small></div>`;
  const weak=[...facts].filter(([,s])=>s.wrong>0).sort((a,b)=>(b[1].wrong/b[1].attempts)-(a[1].wrong/a[1].attempts)).slice(0,8);
  elements.weakFacts.innerHTML=weak.length?weak.map(([key,s])=>`<span>${key.replace('x',' × ')} <small>${s.wrong} Fehler</small></span>`).join(''):'<em>Noch keine schwierigen Aufgaben gespeichert.</em>';
  const labels={'+':'Plus','-':'Minus','*':'Mal','/':'Geteilt'};elements.operationStats.innerHTML=Object.entries(labels).map(([key,label])=>{const s=profile.operations?.[key];const value=s?.attempts?Math.round(s.correct/s.attempts*100):0;return`<div><span>${label}</span><i><b style="width:${value}%"></b></i><strong>${s?.attempts?`${value}%`:'–'}</strong></div>`}).join('');
  const assignment=profile.assignment;elements.assignmentActivity.value=assignment?.activity||'multiplication';elements.assignmentTarget.value=assignment?.target||10;elements.assignmentNote.value=assignment?.note||'';elements.teacherMessage.textContent='';
}

function saveTeacherAssignment(){const profile=getTeacherProfile();if(!profile)return;const activity=elements.assignmentActivity.value;profile.activityCounts||={};profile.assignment={activity,target:Math.max(1,Number(elements.assignmentTarget.value)||10),note:elements.assignmentNote.value.trim(),baseline:profile.activityCounts[activity]||0};saveProfiles();elements.teacherMessage.textContent='Auftrag gespeichert.';elements.teacherMessage.className='feedback correct';if(profile.id===activeProfileId)renderStudentAssignment()}
function removeTeacherAssignment(){const profile=getTeacherProfile();if(!profile)return;delete profile.assignment;saveProfiles();elements.teacherMessage.textContent='Auftrag entfernt.';if(profile.id===activeProfileId)renderStudentAssignment()}

function loadProfiles() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}

function saveProfiles() { if(!teacherPreview)localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles)); }
function startTeacherPreview(){teacherPreviewSnapshot=JSON.stringify(profiles);teacherPreview=true;selectProfile(elements.teacherProfileSelect.value);renderProfileHeader();showScreen('activities')}
function endTeacherPreview(){if(teacherPreviewSnapshot)profiles=JSON.parse(teacherPreviewSnapshot);teacherPreview=false;teacherPreviewSnapshot=null;renderProfileHeader();renderProfileSelection();saveProfiles();showScreen('activities')}
function getProfile() { return profiles.find((profile) => profile.id === activeProfileId); }
function getLevel(profile) { return Math.floor((profile?.xp || 0) / 20) + 1; }

let pendingLevelUp=null;
function addXp(profile,amount){
  if(!profile||teacherPreview)return;
  const before=getLevel(profile);
  profile.xp+=amount;
  const after=getLevel(profile);
  if(after>before)queueLevelUpNotice(before,after);
}
function getNewUnlocks(fromLevel,toLevel){
  const items=[];
  for(let level=fromLevel+1;level<=toLevel;level+=1){
    EMOJIS.filter(item=>item.level===level).forEach(item=>items.push({icon:item.icon,text:`Figur ${item.icon}`}));
    THEMES.filter(item=>item.level===level).forEach(item=>items.push({icon:item.icon,text:`Farbwelt „${item.name}“`}));
    TILE_STYLES.filter(item=>item.level===level).forEach(item=>items.push({icon:item.icon,text:`Zahlenkarten „${item.name}“`}));
    GAME_REWARDS.filter(item=>item.level===level).forEach(item=>items.push({icon:item.icon,text:item.name}));
  }
  return items;
}
function queueLevelUpNotice(before,after){pendingLevelUp={level:after,unlocks:getNewUnlocks(before,after)}}
function maybeShowLevelUp(){
  if(!pendingLevelUp||teacherPreview)return;
  const{level,unlocks}=pendingLevelUp;pendingLevelUp=null;
  elements.levelUpNumber.textContent=level;
  elements.levelUpUnlocks.innerHTML=unlocks.length?unlocks.map(item=>`<div class="level-up-item"><span>${item.icon}</span><small>${item.text}</small></div>`).join(''):'<p class="level-up-none">Weiter so – die nächste Belohnung wartet bald!</p>';
  elements.levelUpModal.classList.remove('hidden');
}

function createProfile(name, emoji) {
  const profile = { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, name: name.trim(), emoji, xp: 0, facts: {}, masteredRows: [], theme: 'classic', tileStyle: 'classic' };
  profiles.push(profile);
  selectProfile(profile.id);
  saveProfiles();
  elements.profileModal.classList.add('hidden');
  showScreen('activities');
}

function selectProfile(id) {
  activeProfileId = id;
  localStorage.setItem(`${STORAGE_KEY}:active`, id);
  renderProfileHeader();
  renderProfileSelection();
  applyRewards();
  renderStudentAssignment();
}

function renderProfileHeader() {
  const profile = getProfile();
  const level = getLevel(profile);
  elements.profileName.textContent = profile?.name || 'Profil anlegen';
  elements.profileEmoji.textContent = profile?.emoji || '🌟';
  elements.gameEmoji.textContent = profile?.emoji || '🌟';
  elements.activityProfileEmoji.textContent = profile?.emoji || '🌟';
  elements.activityProfileName.textContent = profile?.name || 'Profil';
  elements.shopEmoji.textContent = profile?.emoji || '🌟';
  const catchUnlocked = level >= 5 || teacherPreview;
  elements.gamesCatchCard.disabled=!catchUnlocked;elements.gamesCatchCard.classList.toggle('locked',!catchUnlocked);elements.gamesCatchStatus.textContent=catchUnlocked?'Jetzt spielen':'ab Level 5';elements.gamesCatchLock.textContent=catchUnlocked?'→':'🔒';
  const raceUnlocked=level>=5||teacherPreview;
  elements.gamesRaceCard.disabled=!raceUnlocked;elements.gamesRaceCard.classList.toggle('locked',!raceUnlocked);elements.gamesRaceStatus.textContent=raceUnlocked?'Gegen die Uhr':'ab Level 5';elements.gamesRaceLock.textContent=raceUnlocked?'→':'🔒';
  const xp=profile?.xp||0;const progress=xp%20;const nextRewards=[...EMOJIS.map(item=>({level:item.level,text:`Figur ${item.icon}`})),...THEMES.map(item=>({level:item.level,text:`Farbwelt „${item.name}“`})),...TILE_STYLES.map(item=>({level:item.level,text:`Zahlenkarten „${item.name}“`})),...GAME_REWARDS.map(item=>({level:item.level,text:`Spiel „${item.name}“`}))].filter(item=>item.level>level).sort((a,b)=>a.level-b.level);const next=nextRewards[0];
  elements.levelAvatar.textContent=profile?.emoji||'🌟';elements.levelNow.textContent=`Level ${level}`;elements.levelRewardText.textContent=next?`Auf Level ${next.level}: ${next.text}`:'Alle bisherigen Belohnungen freigeschaltet';elements.levelProgressBar.style.width=`${progress/20*100}%`;elements.levelProgressText.textContent=`${progress} von 20 Sternen · noch ${20-progress} bis Level ${level+1}`;elements.teacherPreviewBanner.classList.toggle('hidden',!teacherPreview);
}

function openRewards() {
  renderRewards();
  elements.rewardsModal.classList.remove('hidden');
}

function renderRewards() {
  const profile = getProfile();
  if (!profile) return;
  const level = getLevel(profile);
  elements.rewardSummary.innerHTML = `<strong>${profile.emoji} Level ${level}</strong><small>${profile.xp % 20} von 20 Sternen bis zum nächsten Level</small>`;
  renderRewardGroup(elements.themeGrid, THEMES, profile.theme || 'classic', (id) => { profile.theme = id; });
  renderRewardGroup(elements.tileGrid, TILE_STYLES, profile.tileStyle || 'classic', (id) => { profile.tileStyle = id; });
  elements.gameRewardGrid.innerHTML=GAME_REWARDS.map(game=>{const locked=level<game.level&&!teacherPreview;return `<div class="reward-choice game-reward${locked?' locked':''}"><span>${game.icon}</span><strong>${game.name}</strong><small>${locked?`ab Level ${game.level}`:'freigeschaltet'}</small></div>`}).join('');
}

function renderRewardGroup(container, rewards, selected, choose) {
  const profile = getProfile();
  const level = getLevel(profile);
  container.replaceChildren();
  rewards.forEach((reward) => {
    const locked = level < reward.level && !teacherPreview;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `reward-choice${selected === reward.id ? ' selected' : ''}${locked ? ' locked' : ''}`;
    button.disabled = locked;
    button.innerHTML = `<span>${reward.icon}</span><strong>${reward.name}</strong><small>${locked ? `ab Level ${reward.level}` : 'freigeschaltet'}</small>`;
    button.addEventListener('click', () => { choose(reward.id); saveProfiles(); applyRewards(); renderRewards(); });
    container.append(button);
  });
}

function applyRewards() {
  const profile = getProfile();
  document.body.classList.remove('theme-mint', 'theme-sunset', 'theme-night', 'theme-candy', 'tiles-rainbow', 'tiles-gold', 'tiles-space');
  if (!profile) return;
  if (profile.theme && profile.theme !== 'classic') document.body.classList.add(`theme-${profile.theme}`);
  if (profile.tileStyle && profile.tileStyle !== 'classic') document.body.classList.add(`tiles-${profile.tileStyle}`);
}

function openProfileSettings() {
  const profile = getProfile();
  if (!profile) return showProfileSelection();
  elements.profileModalTitle.textContent = profile.name;
  elements.editProfileName.value = profile.name;
  elements.profileForm.classList.add('hidden');
  elements.emojiPicker.classList.remove('hidden');
  renderEmojis();
  elements.profileModal.classList.remove('hidden');
}

function openNewProfile() {
  starterEmoji = '🌟';
  elements.profileModalTitle.textContent = 'Neuer Benutzer';
  elements.profileForm.classList.remove('hidden');
  elements.emojiPicker.classList.add('hidden');
  elements.newProfileName.value = '';
  renderStarterEmojis();
  elements.profileModal.classList.remove('hidden');
  elements.newProfileName.focus();
}

function showProfileSelection() {
  elements.profileModal.classList.add('hidden');
  renderProfileSelection();
  showScreen('profiles');
}

function renderProfileSelection() {
  elements.profileSelectGrid.replaceChildren();
  profiles.forEach((profile) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'profile-select';
    button.innerHTML = `<span class="avatar-circle">${profile.emoji}</span><strong>${escapeHtml(profile.name)}</strong><small>Level ${getLevel(profile)}</small>`;
    button.addEventListener('click', () => { selectProfile(profile.id); showScreen('activities'); });
    elements.profileSelectGrid.append(button);
  });
}

function renderStarterEmojis() {
  elements.starterEmojiGrid.replaceChildren();
  EMOJIS.filter(({ level }) => level === 1).forEach(({ icon }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `emoji-choice${starterEmoji === icon ? ' selected' : ''}`;
    button.textContent = icon;
    button.addEventListener('click', () => { starterEmoji = icon; renderStarterEmojis(); });
    elements.starterEmojiGrid.append(button);
  });
}

function renderEmojis() {
  const profile = getProfile();
  elements.emojiPicker.classList.toggle('hidden', !profile);
  elements.emojiGrid.replaceChildren();
  if (!profile) return;
  const level = getLevel(profile);
  const currentLevelXp = profile.xp % 20;
  elements.profileLevelSummary.innerHTML = `<strong>${profile.emoji} Level ${level}</strong><small>${currentLevelXp} von 20 Sternen bis zum nächsten Level</small>`;
  EMOJIS.forEach(({ icon, level: needed }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `emoji-choice${profile.emoji === icon ? ' selected' : ''}${level < needed && !teacherPreview ? ' locked' : ''}`;
    button.innerHTML = `${icon}${level < needed ? `<small>Level ${needed}</small>` : ''}`;
    button.disabled = level < needed && !teacherPreview;
    button.setAttribute('aria-label', level < needed ? `${icon} ab Level ${needed}` : `${icon} auswählen`);
    button.addEventListener('click', () => { profile.emoji = icon; saveProfiles(); renderEmojis(); renderProfileHeader(); renderProfileSelection(); });
    elements.emojiGrid.append(button);
  });
}

function escapeHtml(value) {
  const node = document.createElement('span'); node.textContent = value; return node.innerHTML;
}

elements.answerZone.addEventListener('dragover', (event) => { event.preventDefault(); elements.answerZone.classList.add('drag-over'); });
elements.answerZone.addEventListener('dragleave', () => elements.answerZone.classList.remove('drag-over'));
elements.answerZone.addEventListener('drop', (event) => {
  event.preventDefault();
  elements.answerZone.classList.remove('drag-over');
  addDigit(event.dataTransfer.getData('text/plain'));
});
elements.shopAnswerZone.addEventListener('dragover', (event) => { event.preventDefault(); elements.shopAnswerZone.classList.add('drag-over'); });
elements.shopAnswerZone.addEventListener('dragleave', () => elements.shopAnswerZone.classList.remove('drag-over'));
elements.shopAnswerZone.addEventListener('drop', (event) => { event.preventDefault(); elements.shopAnswerZone.classList.remove('drag-over'); addShopDigit(event.dataTransfer.getData('text/plain')); });
elements.divisionAnswerZone.addEventListener('dragover',(event)=>{event.preventDefault();elements.divisionAnswerZone.classList.add('drag-over')});
elements.divisionAnswerZone.addEventListener('dragleave',()=>elements.divisionAnswerZone.classList.remove('drag-over'));
elements.divisionAnswerZone.addEventListener('drop',(event)=>{event.preventDefault();elements.divisionAnswerZone.classList.remove('drag-over');addDivisionDigit(event.dataTransfer.getData('text/plain'))});
elements.conceptAnswerZone.addEventListener('dragover',event=>{event.preventDefault();elements.conceptAnswerZone.classList.add('drag-over')});elements.conceptAnswerZone.addEventListener('dragleave',()=>elements.conceptAnswerZone.classList.remove('drag-over'));elements.conceptAnswerZone.addEventListener('drop',event=>{event.preventDefault();elements.conceptAnswerZone.classList.remove('drag-over');addConceptDigit(event.dataTransfer.getData('text/plain'))});
elements.conceptAppleToken.addEventListener('dragstart',event=>event.dataTransfer.setData('text/plain','apple'));elements.conceptDropZone.addEventListener('dragover',event=>{event.preventDefault();elements.conceptDropZone.classList.add('drag-over')});elements.conceptDropZone.addEventListener('dragleave',()=>elements.conceptDropZone.classList.remove('drag-over'));elements.conceptDropZone.addEventListener('drop',event=>{event.preventDefault();elements.conceptDropZone.classList.remove('drag-over');advanceConcept()});
let conceptGhost=null;elements.conceptAppleToken.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;elements.conceptAppleToken.setPointerCapture(event.pointerId);conceptGhost=document.createElement('div');conceptGhost.className='concept-apple-ghost';conceptGhost.textContent='🍎';document.body.append(conceptGhost);moveConceptGhost(event)});elements.conceptAppleToken.addEventListener('pointermove',event=>{if(!conceptGhost)return;moveConceptGhost(event);const target=document.elementFromPoint(event.clientX,event.clientY);elements.conceptDropZone.classList.toggle('drag-over',elements.conceptDropZone.contains(target))});elements.conceptAppleToken.addEventListener('pointerup',event=>{if(!conceptGhost)return;const target=document.elementFromPoint(event.clientX,event.clientY);if(elements.conceptDropZone.contains(target))advanceConcept();conceptGhost.remove();conceptGhost=null;elements.conceptDropZone.classList.remove('drag-over')});function moveConceptGhost(event){if(!conceptGhost)return;conceptGhost.style.left=`${event.clientX}px`;conceptGhost.style.top=`${event.clientY}px`}
elements.raceAnswerZone.addEventListener('dragover',event=>{event.preventDefault();elements.raceAnswerZone.classList.add('drag-over')});elements.raceAnswerZone.addEventListener('dragleave',()=>elements.raceAnswerZone.classList.remove('drag-over'));elements.raceAnswerZone.addEventListener('drop',event=>{event.preventDefault();elements.raceAnswerZone.classList.remove('drag-over');addRaceDigit(event.dataTransfer.getData('text/plain'))});
elements.neighborAnswerZone.addEventListener('dragover',event=>{event.preventDefault();elements.neighborAnswerZone.classList.add('drag-over')});elements.neighborAnswerZone.addEventListener('dragleave',()=>elements.neighborAnswerZone.classList.remove('drag-over'));elements.neighborAnswerZone.addEventListener('drop',event=>{event.preventDefault();elements.neighborAnswerZone.classList.remove('drag-over');addNeighborDigit(event.dataTransfer.getData('text/plain'))});
elements.doubleChainAnswerZone.addEventListener('dragover',event=>{event.preventDefault();elements.doubleChainAnswerZone.classList.add('drag-over')});elements.doubleChainAnswerZone.addEventListener('dragleave',()=>elements.doubleChainAnswerZone.classList.remove('drag-over'));elements.doubleChainAnswerZone.addEventListener('drop',event=>{event.preventDefault();elements.doubleChainAnswerZone.classList.remove('drag-over');addDoubleChainDigit(event.dataTransfer.getData('text/plain'))});

function addPointerDrag(tile, targetZone = elements.answerZone, dropAction = addDigit) {
  let ghost = null;
  let dragging = false;

  tile.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    dragging = true;
    tile.setPointerCapture(event.pointerId);
    ghost = document.createElement('div');
    ghost.className = 'drag-ghost';
    ghost.textContent = tile.dataset.digit;
    document.body.append(ghost);
    moveGhost(event);
  });

  tile.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    moveGhost(event);
    const target = document.elementFromPoint(event.clientX, event.clientY);
    targetZone.classList.toggle('drag-over', targetZone.contains(target));
  });

  tile.addEventListener('pointerup', (event) => {
    if (!dragging) return;
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (targetZone.contains(target)) dropAction(tile.dataset.digit);
    dragging = false;
    targetZone.classList.remove('drag-over');
    ghost?.remove();
    ghost = null;
  });

  function moveGhost(event) {
    if (!ghost) return;
    ghost.style.left = `${event.clientX}px`;
    ghost.style.top = `${event.clientY}px`;
  }
}

elements.checkButton.addEventListener('click', checkAnswer);
elements.deleteButton.addEventListener('click', removeDigit);
elements.mixedMode.addEventListener('click', () => startGame('mixed'));
elements.homeButton.addEventListener('click', () => confirmLeaveGame('start'));
elements.againButton.addEventListener('click', () => startGame(state.mode));
elements.chooseButton.addEventListener('click', () => showScreen('start'));
elements.profileButton.addEventListener('click', openProfileSettings);
elements.activityProfileButton.addEventListener('click', openProfileSettings);
elements.understandActivity.addEventListener('click',()=>showScreen('conceptStart'));elements.conceptBack.addEventListener('click',()=>showScreen('activities'));elements.conceptHome.addEventListener('click',()=>confirmLeaveGame('conceptStart'));document.querySelectorAll('[data-concept]').forEach(button=>button.addEventListener('click',()=>startConceptGame(button.dataset.concept)));elements.conceptAction.addEventListener('click',advanceConcept);elements.conceptDelete.addEventListener('click',removeConceptDigit);elements.conceptCheck.addEventListener('click',checkConceptAnswer);elements.conceptAgain.addEventListener('click',()=>startConceptGame(conceptState.operation));elements.conceptChoose.addEventListener('click',()=>showScreen('conceptStart'));
elements.gamesActivity.addEventListener('click',()=>showScreen('games'));elements.gamesBack.addEventListener('click',()=>showScreen('activities'));
elements.gamesTimesCard.addEventListener('click', () => showScreen('start'));
elements.gamesDivisionCard.addEventListener('click',()=>showScreen('divisionStart'));
elements.gamesFamilyCard.addEventListener('click',startFamilyGame);
elements.gamesCatchCard.addEventListener('click',startCatchGame);
elements.gamesRaceCard.addEventListener('click',startRaceGame);
elements.gamesShopCard.addEventListener('click', openShopWorld);
elements.gamesPlaceValueCard.addEventListener('click', openPlaceValueWorkshop);
elements.gamesNumberLineCard.addEventListener('click', startNumberLineGame);
elements.numberLineHome.addEventListener('click',()=>confirmLeaveGame('games'));elements.numberLineCheck.addEventListener('click',checkNumberLine);elements.numberLineAgain.addEventListener('click',startNumberLineGame);elements.numberLineChoose.addEventListener('click',()=>showScreen('games'));
elements.placeValueBack.addEventListener('click',()=>showScreen('games'));elements.placeValueHome.addEventListener('click',()=>confirmLeaveGame('placeValueStart'));document.querySelectorAll('[data-place-mode]').forEach(button=>button.addEventListener('click',()=>startPlaceValueGame(button.dataset.placeMode)));elements.placeValueReset.addEventListener('click',resetPlaceValue);elements.placeValueCheck.addEventListener('click',checkPlaceValue);elements.placeValueAgain.addEventListener('click',()=>startPlaceValueGame(placeValueState.mode));elements.placeValueChoose.addEventListener('click',openPlaceValueWorkshop);
elements.familyHome.addEventListener('click',()=>confirmLeaveGame('games'));elements.familyAgain.addEventListener('click',startFamilyGame);elements.familyChoose.addEventListener('click',()=>showScreen('games'));
elements.backToActivities.addEventListener('click', () => showScreen('games'));
elements.leaveShopButton.addEventListener('click', () => showScreen('games'));
elements.shopHomeButton.addEventListener('click',()=>confirmLeaveGame('shopWorld',openShopWorld));
document.querySelectorAll('.store-station').forEach((station) => station.addEventListener('click', () => startShopGame(station.dataset.station)));
elements.operationChoices.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => chooseShopOperation(button.dataset.operation, button)));
elements.shopDelete.addEventListener('click', removeShopDigit);
elements.shopCheck.addEventListener('click', checkShopAnswer);
elements.shopWriteCheck.addEventListener('click', checkWrittenEquation);
elements.shopAgain.addEventListener('click', startShopGame);
elements.shopChoose.addEventListener('click', () => showScreen('games'));
elements.catchHome.addEventListener('click', () => confirmLeaveGame('games',()=>{catchState.running=false;clearCatchBubbles();cancelAnimationFrame(catchState.frame)}));
elements.catchAgain.addEventListener('click', startCatchGame);
elements.catchChoose.addEventListener('click', () => showScreen('games'));
elements.raceHome.addEventListener('click', () => confirmLeaveGame('games',()=>{raceState.running=false;clearInterval(raceState.timer)}));
elements.raceDelete.addEventListener('click', removeRaceDigit);
elements.raceCheck.addEventListener('click', checkRaceAnswer);
elements.raceAgain.addEventListener('click', startRaceGame);
elements.raceChoose.addEventListener('click', () => showScreen('games'));
elements.gamesKingTowerCard.addEventListener('click', startKingTowerGame);
elements.kingTowerHome.addEventListener('click', () => confirmLeaveGame('games'));
elements.kingTowerCheck.addEventListener('click', checkKingTower);
elements.kingTowerAgain.addEventListener('click', startKingTowerGame);
elements.kingTowerChoose.addEventListener('click', () => showScreen('games'));
elements.gamesNeighborCard.addEventListener('click', startNeighborGame);
elements.neighborHome.addEventListener('click', () => confirmLeaveGame('games'));
elements.neighborDelete.addEventListener('click', removeNeighborDigit);
elements.neighborCheck.addEventListener('click', checkNeighbor);
elements.neighborAgain.addEventListener('click', startNeighborGame);
elements.neighborChoose.addEventListener('click', () => showScreen('games'));
elements.gamesDoubleChainCard.addEventListener('click', startDoubleChainGame);
elements.doubleChainHome.addEventListener('click', () => confirmLeaveGame('games'));
elements.doubleChainDelete.addEventListener('click', removeDoubleChainDigit);
elements.doubleChainCheck.addEventListener('click', checkDoubleChain);
elements.doubleChainAgain.addEventListener('click', startDoubleChainGame);
elements.doubleChainChoose.addEventListener('click', () => showScreen('games'));
elements.divisionBack.addEventListener('click',()=>showScreen('games'));elements.divisionMixed.addEventListener('click',()=>startDivisionGame('mixed'));elements.divisionHome.addEventListener('click',()=>confirmLeaveGame('divisionStart'));elements.divisionDelete.addEventListener('click',removeDivisionDigit);elements.divisionCheck.addEventListener('click',checkDivisionAnswer);elements.divisionAgain.addEventListener('click',()=>startDivisionGame(divisionState.mode));elements.divisionChoose.addEventListener('click',()=>showScreen('games'));
elements.divisionConceptButton.addEventListener('click',advanceDivisionConcept);
elements.catchArena.addEventListener('pointerdown', (event) => {
  elements.catchArena.setPointerCapture(event.pointerId);
  const bounds = elements.catchArena.getBoundingClientRect(); moveBasket(event.clientX - bounds.left - 38);
});
elements.catchArena.addEventListener('pointermove', (event) => {
  if (!elements.catchArena.hasPointerCapture(event.pointerId)) return;
  const bounds = elements.catchArena.getBoundingClientRect(); moveBasket(event.clientX - bounds.left - 38);
});
elements.addProfileButton.addEventListener('click', openNewProfile);
elements.teacherAreaButton.addEventListener('click',()=>{const code=window.prompt('Lehrpersonen-Code:');if(code==='2468')openTeacherArea();else if(code!==null)window.alert('Der Code ist nicht richtig.')});elements.teacherBack.addEventListener('click',()=>showScreen('profiles'));elements.teacherProfileSelect.addEventListener('change',renderTeacherDashboard);elements.saveAssignment.addEventListener('click',saveTeacherAssignment);elements.removeAssignment.addEventListener('click',removeTeacherAssignment);
elements.teacherPreviewButton.addEventListener('click',startTeacherPreview);elements.endPreview.addEventListener('click',endTeacherPreview);
elements.stayButton.addEventListener('click',closeLeaveModal);
elements.levelUpClose.addEventListener('click',()=>elements.levelUpModal.classList.add('hidden'));
elements.levelUpModal.addEventListener('click',event=>{if(event.target===elements.levelUpModal)elements.levelUpModal.classList.add('hidden')});
elements.leaveButton.addEventListener('click',()=>{const action=pendingLeaveAction;elements.leaveModal.classList.add('hidden');pendingLeaveAction=null;action?.()});
elements.leaveModal.addEventListener('click',event=>{if(event.target===elements.leaveModal)closeLeaveModal()});
elements.switchProfileButton.addEventListener('click', showProfileSelection);
elements.activityRewardsButton.addEventListener('click', openRewards);
elements.levelOverview.addEventListener('click',openRewards);
elements.closeRewards.addEventListener('click', () => elements.rewardsModal.classList.add('hidden'));
elements.saveProfileName.addEventListener('click', () => {
  const profile = getProfile();
  const name = elements.editProfileName.value.trim();
  if (!profile || !name) return;
  profile.name = name;
  saveProfiles();
  elements.profileModalTitle.textContent = name;
  renderProfileHeader();
  renderProfileSelection();
});
elements.closeProfiles.addEventListener('click', () => elements.profileModal.classList.add('hidden'));
elements.profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!elements.newProfileName.value.trim()) return;
  createProfile(elements.newProfileName.value, starterEmoji);
  elements.newProfileName.value = '';
});
renderProfileHeader();
renderProfileSelection();
applyRewards();
showScreen('profiles');
document.addEventListener('keydown', (event) => {
  if (!screens.game.classList.contains('hidden')) {
    if (/^[0-9]$/.test(event.key)) addDigit(event.key);
    if (event.key === 'Backspace') removeDigit();
    if (event.key === 'Enter') checkAnswer();
  } else if (!screens.shop.classList.contains('hidden')) {
    if (shopState.difficulty < 3) {
      if (/^[0-9]$/.test(event.key)) addShopDigit(event.key);
      if (event.key === 'Backspace') removeShopDigit();
      if (event.key === 'Enter') checkShopAnswer();
    } else if (event.key === 'Enter') checkWrittenEquation();
  } else if (!screens.catch.classList.contains('hidden')) {
    if (event.key === 'ArrowLeft') moveBasket(catchState.basketX - 38);
    if (event.key === 'ArrowRight') moveBasket(catchState.basketX + 38);
  } else if (!screens.division.classList.contains('hidden')) {
    if(/^[0-9]$/.test(event.key))addDivisionDigit(event.key);if(event.key==='Backspace')removeDivisionDigit();if(event.key==='Enter')checkDivisionAnswer();
  } else if (!screens.concept.classList.contains('hidden')) {
    if(/^[0-9]$/.test(event.key))addConceptDigit(event.key);if(event.key==='Backspace')removeConceptDigit();if(event.key==='Enter')checkConceptAnswer();
  } else if (!screens.race.classList.contains('hidden')) {
    if(/^[0-9]$/.test(event.key))addRaceDigit(event.key);if(event.key==='Backspace')removeRaceDigit();if(event.key==='Enter')checkRaceAnswer();
  } else if (!screens.neighbor.classList.contains('hidden')) {
    if(/^[0-9]$/.test(event.key))addNeighborDigit(event.key);if(event.key==='Backspace')removeNeighborDigit();if(event.key==='Enter')checkNeighbor();
  } else if (!screens.doubleChain.classList.contains('hidden')) {
    if(/^[0-9]$/.test(event.key))addDoubleChainDigit(event.key);if(event.key==='Backspace')removeDoubleChainDigit();if(event.key==='Enter')checkDoubleChain();
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

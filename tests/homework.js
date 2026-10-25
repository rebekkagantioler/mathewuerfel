const assert=(ok,message)=>{if(!ok)throw Error(message)};
const timeout=window.setTimeout;window.setTimeout=()=>0;
try{
 teacherPreview=false;
 const makeProfile=id=>({id,name:id,emoji:'🌟',facts:{},areaStars:Object.fromEntries(AREAS.map(a=>[a,0])),areaRecent:Object.fromEntries(AREAS.map(a=>[a,[]])),activityCounts:{multiplication:12,shop:5}});
 const student=makeProfile('student'),other=makeProfile('other');profiles=[student,other];activeProfileId=student.id;
 for(const rows of [[1],[6],[3,7],[10]]){
  activeRows=rows;
  for(const station of ['fruit','bakery','checkout','stock'])for(let n=0;n<100;n++){
   const mal=makeShopTask('*',station),division=makeShopTask('/',station);
   assert(rows.includes(mal.a)&&mal.result===mal.a*mal.b,'Shop multiplication ignores rows');
   assert(rows.includes(division.b)&&division.a===division.b*division.result,'Shop division ignores rows');
  }
 }
 openTeacherArea();elements.teacherProfileSelect.value=student.id;
 elements.assignmentActivity.value='multiplication';elements.assignmentTarget.value=3;elements.assignmentNote.value='Übe die 6er-Reihe';saveTeacherAssignment();
 assert(student.assignment.baseline===12&&student.assignment.target===3,'Wrong assignment baseline');
 assert(elements.assignmentTitle.textContent==='Übe die 6er-Reihe'&&elements.assignmentStatus.textContent==='0 von 3 Aufgaben erledigt','Initial progress wrong');
 assert(!elements.studentAssignment.classList.contains('hidden'),'Assignment hidden');
 state.a=6;state.b=3;rememberAnswer(false);assert(elements.assignmentStatus.textContent.startsWith('0 von 3'),'Wrong answer counted');
 incrementActivity('division');assert(elements.assignmentStatus.textContent.startsWith('0 von 3'),'Other activity counted');
 rememberAnswer(true);assert(elements.assignmentStatus.textContent.startsWith('1 von 3'),'Correct multiplication not counted');
 const unchanged=JSON.stringify(other);
 activeProfileId=other.id;renderStudentAssignment();assert(elements.studentAssignment.classList.contains('hidden'),'Another student sees assignment');
 activeProfileId=student.id;renderStudentAssignment();
 teacherPreview=true;rememberAnswer(true);incrementActivity('multiplication');teacherPreview=false;
 assert(student.activityCounts.multiplication===13,'Preview counted homework');
 rememberAnswer(true);rememberAnswer(true);assert(elements.assignmentStatus.textContent==='Geschafft! 🎉'&&elements.assignmentBar.style.width==='100%','Assignment cannot complete');
 const persisted=JSON.parse(localStorage.getItem(STORAGE_KEY)).find(p=>p.id===student.id);
 assert(persisted.assignment.target===3&&persisted.activityCounts.multiplication===15,'Homework not persisted');
 saveTeacherAssignment();assert(student.assignment.baseline===15&&elements.assignmentStatus.textContent.startsWith('0 von 3'),'New assignment includes old answers');
 for(const option of elements.assignmentActivity.options){
  elements.assignmentActivity.value=option.value;elements.assignmentTarget.value=2;elements.assignmentNote.value='';saveTeacherAssignment();
  incrementActivity(option.value);assert(elements.assignmentStatus.textContent==='1 von 2 Aufgaben erledigt','No progress for '+option.value);
 }
 assert(JSON.stringify(other)===unchanged,'Other profile modified');
 removeTeacherAssignment();assert(!student.assignment&&elements.studentAssignment.classList.contains('hidden'),'Assignment not removed');
 assert(!JSON.parse(localStorage.getItem(STORAGE_KEY)).find(p=>p.id===student.id).assignment,'Removed assignment still persisted');
 showScreen('games');return 'Passed: 3,200 shop tasks respect selected rows, assignment save/baseline/correct answers/activity isolation/profile isolation/preview/completion/persistence/reset/all available activities/removal';
}finally{window.setTimeout=timeout;teacherPreview=false}

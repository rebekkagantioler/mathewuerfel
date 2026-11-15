const assert=(ok,message)=>{if(!ok)throw Error(message)};
profiles=[{id:'a',name:'Marilena',emoji:'🐰',avatarId:'rabbit'},{id:'b',name:'Rebekka',emoji:'🐱',avatarId:'cat'},{id:'c',name:'Alexandra',emoji:'🐶',avatarId:'dog'}];activeProfileId=null;
showProfileSelection();
assert(screens.profiles.classList.contains('has-profiles'),'Profiles not visible');
for(const button of elements.profileSelectGrid.querySelectorAll('button')){
 const rect=button.getBoundingClientRect();assert(rect.width>=44&&rect.left>=0&&rect.right<=innerWidth,'Profile touch target/overflow');
}
for(const id of ['openCloudProfileButton','addProfileButton','teacherAreaButton']){
 const rect=document.getElementById(id).getBoundingClientRect();assert(rect.width>0&&rect.left>=0&&rect.right<=innerWidth,'Sign-in action overflow: '+id);
}
assert(document.documentElement.scrollWidth<=innerWidth+1,'Sign-in horizontal overflow');
assert(!document.querySelector('.signin-settings').open,'Technical details expanded');
profiles=[];renderProfileSelection();assert(!screens.profiles.classList.contains('has-profiles'),'Empty state missing');
assert(getComputedStyle(document.querySelector('.signin-local')).display==='none','Empty profile section visible');
assert(getComputedStyle(document.querySelector('.signin-empty')).display!=='none','No-profile hint missing');
return 'Passed: sign-in actions and touch targets, profile and empty states, no horizontal overflow, collapsed technical details';

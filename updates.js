// Apply new versions only from a deliberate click, preserving installed-app identity and profiles.
const APP_VERSION = '2026.10.23.9';
let updateRegistration=null;
let updateRequested=false;
let updateReloading=false;
function updateStatus(message,ready=false){
  document.querySelectorAll('[data-update-status]').forEach(el=>el.textContent=message);
  document.querySelectorAll('[data-update-check]').forEach(button=>button.textContent=ready?'↻ Neue Version laden':'↻ App aktualisieren');
}
function observeAppUpdates(registration){
  updateRegistration=registration;
  const inspect=worker=>{
    if(!worker)return;
    const changed=()=>{
      if(worker.state==='installed'&&navigator.serviceWorker.controller)updateStatus('Eine neue Version ist bereit. Tippe zum Laden. Deine Profile bleiben erhalten.',true);
      if(worker.state==='redundant')updateStatus('Das Update konnte nicht geladen werden. Bitte versuche es erneut.');
    };
    worker.addEventListener('statechange',changed);changed();
  };
  if(registration.waiting)updateStatus('Eine neue Version ist bereit. Tippe zum Laden. Deine Profile bleiben erhalten.',true);
  inspect(registration.installing);
  registration.addEventListener('updatefound',()=>inspect(registration.installing));
  return registration;
}
function waitForAppInstall(worker){
  if(!worker||worker.state==='installed'||worker.state==='activated')return Promise.resolve();
  return new Promise((resolve,reject)=>{
    const cleanup=()=>{clearTimeout(timeout);worker.removeEventListener('statechange',changed)};
    const changed=()=>{
      if(worker.state==='installed'||worker.state==='activated'){cleanup();resolve()}
      else if(worker.state==='redundant'){cleanup();reject(Error('Installation fehlgeschlagen'))}
    };
    const timeout=setTimeout(()=>{cleanup();reject(Error('Installation dauert zu lange'))},25000);
    worker.addEventListener('statechange',changed);changed();
  });
}
async function checkAppUpdate(){
  const buttons=[...document.querySelectorAll('[data-update-check]')];
  buttons.forEach(button=>button.disabled=true);
  try{
    if(!('serviceWorker' in navigator)||!window.isSecureContext){updateStatus('Öffne die Online-App, um Updates direkt hier zu laden.');return}
    if(!navigator.onLine){updateStatus('Du bist gerade offline. Deine App funktioniert weiter; prüfe das Update mit Internet erneut.');return}
    updateStatus('Neue Version wird gesucht …');
    const registration=updateRegistration||await navigator.serviceWorker.getRegistration()||observeAppUpdates(await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}));
    if(!registration.waiting){await registration.update();await waitForAppInstall(registration.installing)}
    if(registration.waiting){
      updateRequested=true;updateStatus('Neue Version wird geladen. Deine Profile bleiben erhalten …');
      registration.waiting.postMessage({type:'SKIP_WAITING'});
    }else updateStatus(`Deine App ist aktuell (Version ${APP_VERSION}). Dein Homebildschirm-Symbol bleibt unverändert.`);
  }catch(error){updateRequested=false;updateStatus('Das Update konnte gerade nicht geladen werden. Bitte prüfe deine Verbindung und versuche es erneut.')}
  finally{buttons.forEach(button=>button.disabled=false)}
}
document.querySelectorAll('[data-update-check]').forEach(button=>button.addEventListener('click',checkAppUpdate));
if('serviceWorker' in navigator&&window.isSecureContext){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(updateRequested&&!updateReloading){updateReloading=true;window.location.reload()}
  });
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(observeAppUpdates).catch(()=>updateStatus('Updates sind gerade nicht erreichbar. Du kannst später erneut prüfen.'));
  });
}

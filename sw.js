const CACHE_NAME = 'zahlen-abenteuer-v13';
const CORE_ASSETS = [
  './', './index.html', './app.js', './duel.js', './story-pool.js', './stories.js', './updates.js',
  './supabase-config.js', './styles.css', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './apple-touch-icon.png',
];
function supportsManualUpdates(worker){
  if(!worker)return Promise.resolve(true);
  return new Promise(resolve=>{
    const channel=new MessageChannel();
    const finish=value=>{clearTimeout(timer);channel.port1.close();resolve(value)};
    const timer=setTimeout(()=>finish(false),1200);
    channel.port1.onmessage=event=>finish(event.data?.manualUpdates===true);
    worker.postMessage({type:'SUPPORTS_MANUAL_UPDATES'},[channel.port2]);
  });
}
self.addEventListener('install',event=>{
  // A complete new cache is installed before the update is offered.
  // Existing windows keep their running version until the user chooses to update.
  event.waitUntil((async()=>{
    const manual=await supportsManualUpdates(self.registration.active);
    const cache=await caches.open(CACHE_NAME);
    await cache.addAll(CORE_ASSETS.map(url=>new Request(url,{cache:'reload'})));
    // Bootstrap older installations that do not yet have an update button.
    // Their current page stays open; the new interface is loaded on the next launch.
    if(!manual)await self.skipWaiting();
  })());
});
self.addEventListener('message',event=>{
  if(event.data?.type==='SUPPORTS_MANUAL_UPDATES')event.ports[0]?.postMessage({manualUpdates:true});
  if(event.data?.type==='SKIP_WAITING')event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('zahlen-abenteuer-')&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  event.respondWith(caches.open(CACHE_NAME).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    return fetch(event.request);
  }));
});

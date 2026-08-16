const CACHE='provenza-2026-v2';
const ASSETS=['./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
const fixHtml=t=>t
.replaceAll('https://collectionvoituresmc.com/','https://palaisprinciermonaco.tickeasy.com/fr-FR/accueil')
.replaceAll('🎟️ Web / entradas','🎟️ Comprar · oficial')
.replaceAll('https://billetterie.pontdugard.fr/en-GB/products','https://pontdugard.fr/es/information-billetterie')
.replaceAll('🎟️ Entradas</a></div><div class="booking"><b>Château Comtal','ℹ️ Entradas / información</a><div class="small">Acceso exterior al puente libre · parking 9 € por vehículo · la taquilla online oficial puede estar temporalmente indisponible.</div></div><div class="booking"><b>Château Comtal');
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(async r=>{const t=fixHtml(await r.text());return new Response(t,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})}).catch(()=>caches.match('./index.html')));return;
 }
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});

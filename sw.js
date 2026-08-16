const CACHE='provenza-2026-v3';
const ASSETS=['./manifest.webmanifest','./apple-touch-icon.png?v=3'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
const fixHtml=t=>{
 let out=t
 .replaceAll('https://collectionvoituresmc.com/','https://palaisprinciermonaco.tickeasy.com/fr-FR/accueil')
 .replaceAll('🎟️ Web / entradas','🎟️ Comprar · oficial')
 .replaceAll('https://billetterie.pontdugard.fr/en-GB/products','https://pontdugard.fr/es/information-billetterie')
 .replaceAll('🎟️ Entradas</a></div><div class="booking"><b>Château Comtal','ℹ️ Entradas / información</a><div class="small">Acceso exterior al puente libre · parking 9 € por vehículo · la taquilla online oficial puede estar temporalmente indisponible.</div></div><div class="booking"><b>Château Comtal');
 if(!out.includes('rel="apple-touch-icon"')){
   out=out.replace('</head>','<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3"><link rel="icon" type="image/png" href="/apple-touch-icon.png?v=3"></head>');
 }
 return out;
};
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>{const t=fixHtml(await r.text());return new Response(t,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})}).catch(()=>caches.match('./index.html')));return;
 }
 e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request)));
});

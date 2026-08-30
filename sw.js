const CACHE='provenza-2026-v4';
const ASSETS=['./manifest.webmanifest','./apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
const fixHtml=t=>t
.replace('<meta name="apple-mobile-web-app-capable" content="yes">','<meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="Provenza 2026"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4">')
.replaceAll('https://collectionvoituresmc.com/','https://palaisprinciermonaco.tickeasy.com/fr-FR/accueil')
.replaceAll('🎟️ Web / entradas','🎟️ Comprar · oficial')
.replaceAll('https://billetterie.pontdugard.fr/en-GB/products','https://pontdugard.fr/es/information-billetterie')
.replaceAll('7–9 SEP · Les Gîtes de Laure · L\'Or Vert','7–9 SEP · Gîte Carcasso')
.replaceAll('66 Rue Barbacane, Carcassonne · parking privado · check-in 16–22 h','2 Place Saint-Gimer, 11000 Carcassonne · check-in 15–23 h · check-out 7–10 h · parking disponible/incluido')
.replaceAll('66+Rue+Barbacane+Carcassonne','2+Place+Saint-Gimer+Carcassonne')
.replaceAll('destination=66+Rue+Barbacane+Carcassonne','destination=2+Place+Saint-Gimer+Carcassonne')
.replaceAll("['17:30','🏨 L’Or Vert','Parking privado del alojamiento como primera opción.','66 Rue Barbacane Carcassonne']","['17:30','🏨 Gîte Carcasso','Check-in · 2 Place Saint-Gimer. Alojamiento a los pies de la Cité.','Gite Carcasso 2 Place Saint-Gimer Carcassonne']")
.replaceAll("['Parking privado L’Or Vert','⭐','Alojamiento','Primera opción: no movería el coche al llegar.','66 Rue Barbacane Carcassonne']","['Parking del Gîte Carcasso','⭐','Alojamiento · Saint-Gimer','Primera opción. El alojamiento figura con parking disponible/incluido; confirmar instrucciones exactas de acceso con el anfitrión.','Gite Carcasso 2 Place Saint-Gimer Carcassonne']")
.replaceAll('Parking privado L’Or Vert','Parking / alojamiento Gîte Carcasso')
.replaceAll('L’Or Vert','Gîte Carcasso')
.replaceAll('66 Rue Barbacane Carcassonne','2 Place Saint-Gimer Carcassonne')
.replaceAll('66 Rue Barbacane, Carcassonne','2 Place Saint-Gimer, Carcassonne');
self.addEventListener('fetch',e=>{
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(async r=>{const t=fixHtml(await r.text());return new Response(t,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}})}).catch(()=>caches.match('./index.html')));return;
 }
 e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});

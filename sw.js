const VERSION = "version1";

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

if(workbox){
    console.log('Que bien, cargo Workbox');
    workbox.precaching.precacheAndRoute([]);
} else {
    console.log('sigue sin andar');
}
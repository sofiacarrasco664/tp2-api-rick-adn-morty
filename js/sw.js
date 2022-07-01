const VERSION = "version1";

importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
);

if(workbox){
    console.log('que bien, cargo Workbox');

    self.addEventListener("message", (event)=>{
        if(event.data && event.data.type === "SKIP_WAITING"){
            self.skipWaiting();
        }
    })
}

if(workbox){
    workbox.routing.registerRoute(
        new RegExp('/*'),
        new workbox-strategies.StaleWhileRevalidate({
            cachName: VERSION
        })
    )
} else {
    console.log('sigue sin andar');
}
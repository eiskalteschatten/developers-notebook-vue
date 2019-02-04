let router;
let route;

function goOnline() {
    router.replace({ name: route.name });
}

function goOffline() {
    router.replace({ name: 'errorNoConnection' });
}

export default function checkOnlineStatus(injectedRouter, injectedRoute) {
    router = injectedRouter;
    route = injectedRoute;

    window.addEventListener('online',  goOnline);
    window.addEventListener('offline', goOffline);
}

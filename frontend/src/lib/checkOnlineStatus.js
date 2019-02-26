import http from '../http';

let router;
let route;
let interval;
let numberOfAttempts = 0;
let wasOffline = false;
let lastRouteName;
let lastRouteParams;
let lastRouteQuery;

function goOnline() {
    clearInterval(interval);
    numberOfAttempts = 0;
    interval = setInterval(pingServer, 1000);

    if (wasOffline) {
        wasOffline = false;
        router.replace({
            name: lastRouteName,
            params: lastRouteParams,
            query: lastRouteQuery
        });
    }
}

function goOffline() {
    clearInterval(interval);

    wasOffline = true;
    lastRouteName = route.name;
    lastRouteParams = route.params;
    lastRouteQuery = route.query;

    if (numberOfAttempts < 10) {
        interval = setInterval(() => {
            pingServer();
            numberOfAttempts++;
            clearInterval(interval);
        }, 30000);
    }

    router.replace({ name: 'errorNoConnection' });
}

export async function pingServer() {
    try {
        await http.get('status');
        goOnline();
    }
    catch(error) {
        goOffline();
    }
}

export default function checkOnlineStatus(injectedRouter, injectedRoute) {
    router = injectedRouter;
    route = injectedRoute;

    window.addEventListener('online',  goOnline);
    window.addEventListener('offline', goOffline);
    pingServer();
}

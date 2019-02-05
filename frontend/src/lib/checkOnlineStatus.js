import http from '../http';

let router;
let route;
let interval;
let numberOfAttempts = 0;

function goOnline() {
    clearInterval(interval);
    numberOfAttempts = 0;
    interval = setInterval(pingServer, 60000);

    const newRoute = route.name === 'errorNoConnection' ? 'home' : route.name;
    router.replace({ name: newRoute });
}

function goOffline() {
    clearInterval(interval);

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

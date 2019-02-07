import VueRouter from 'vue-router';
import cookies from 'browser-cookies';

import MainLayout from './components/MainLayout.vue';
import LoggedOutLayout from './components/LoggedOutLayout.vue';

import Home from './components/pages/Home.vue';
import AccountSettings from './components/pages/AccountSettings.vue';

import Login from './components/pages/Login.vue';
import ServerConfig from './components/pages/electron/ServerConfig.vue';

import NoConnection from './components/pages/errors/NoConnection.vue';
import NotFound from './components/pages/errors/404.vue';

const preferedLanguage = cookies.get('preferedLanguage') || 'en';

export const routeTitles = {
    primaryTitle: 'Developer\'s Notebook',
    en: {
        home: 'Dashboard',
        login: 'Login',
        accountSettings: 'Account Settings',
        errorNoConnection: 'No Connection',
        '404': 'Page not found'
    },
    de: {
        home: 'Dashboard',
        login: 'Login',
        accountSettings: 'Kontoeinstellungen',
        errorNoConnection: 'Keine Verbindung',
        '404': 'Seite nicht gefunden'
    }
};

export default new VueRouter({
    routes: [{
        path: '/',
        redirect: { name: 'home', params: { lang: preferedLanguage } }
    },
    {
        path: '/:lang',
        component: MainLayout,
        children: [{
            path: '',
            name: 'home',
            component: Home
        },
        {
            path: 'account-settings',
            name: 'accountSettings',
            component: AccountSettings
        }]
    },
    {   // Login should not be a child of MainLayout
        path: '/:lang/login',
        component: LoggedOutLayout,
        children: [{
            path: '',
            name: 'login',
            component: Login
        }]
    },
    {   // The no-connection page should not be a child of MainLayout
        path: '/:lang/error/no-connection',
        component: LoggedOutLayout,
        children: [{
            path: '',
            name: 'errorNoConnection',
            component: NoConnection
        }]
    },
    {   // Server config should not be a child of MainLayout
        path: '/:lang/electron/server-config',
        component: LoggedOutLayout,
        children: [{
            path: '',
            name: 'electronServerConfig',
            component: ServerConfig
        }]
    },
    {
        path: '*',
        component: MainLayout,
        children: [{
            path: '',
            name: '404',
            component: NotFound
        }]
    }]
});

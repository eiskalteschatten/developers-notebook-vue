import VueRouter from 'vue-router';
import cookies from 'browser-cookies';

import MainLayout from './components/MainLayout.vue';
import Login from './components/pages/Login.vue';

import Home from './components/pages/Home.vue';

import ServerConfig from './components/pages/electron/ServerConfig.vue';

import NotFound from './components/pages/404.vue';

const preferedLanguage = cookies.get('preferedLanguage') || 'en';

export const routeTitles = {
    primaryTitle: 'Developer\'s Notebook',
    en: {
        home: 'Dashboard',
        login: 'Login',
        '404': 'Page not found'
    },
    de: {
        home: 'Dashboard',
        login: 'Anmeldung',
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
        }]
    },
    {   // Login should be a child of MainLayout
        path: '/:lang/login',
        name: 'login',
        component: Login
    },
    {   // Server config should be a child of PageWrapper
        path: '/:lang/electron/server-config',
        name: 'electronServerConfig',
        component: ServerConfig
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }]
});

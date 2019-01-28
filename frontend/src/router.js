import VueRouter from 'vue-router';
import cookies from 'browser-cookies';

import PageWrapper from './components/PageWrapper.vue';
import Home from './components/pages/Home.vue';

import NotFound from './components/pages/404.vue';

const preferedLanguage = cookies.get('preferedLanguage') || 'en';

export const routeTitles = {
    primaryTitle: 'Developer\'s Notebook',
    en: {
        home: 'Dashboard',
        '404': 'Page not found'
    },
    de: {
        home: 'Dashboard',
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
        component: PageWrapper,
        children: [{
            path: '',
            name: 'home',
            component: Home
        }]
    },
    {
        path: '*',
        name: '404',
        component: NotFound
    }]
});

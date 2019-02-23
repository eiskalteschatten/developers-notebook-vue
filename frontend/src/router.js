import VueRouter from 'vue-router';
import cookies from 'browser-cookies';

import PageWrapper from './components/PageWrapper.vue';
import MainLayout from './components/MainLayout.vue';
import LoggedOutLayout from './components/LoggedOutLayout.vue';

import Home from './components/pages/Home.vue';
import AccountSettings from './components/pages/AccountSettings.vue';
import Settings from './components/pages/Settings.vue';

import Categories from './components/pages/categories/Index.vue';
import Category from './components/pages/categories/Category.vue';

import Clients from './components/pages/clients/Index.vue';
import Client from './components/pages/clients/Client.vue';

import Projects from './components/pages/projects/Index.vue';
import Project from './components/pages/projects/Project.vue';

import Login from './components/pages/Login.vue';
import ServerConfig from './components/pages/electron/ServerConfig.vue';

import NoConnection from './components/pages/errors/NoConnection.vue';
import NotFound from './components/pages/errors/404.vue';

const preferedLanguage = cookies.get('preferedLanguage') || 'en';

export const routeTitles = {
    primaryTitle: 'Developer\'s Notebook',
    en: {
        home: 'Dashboard',
        categories: 'Categories',
        clients: 'Clients',
        projects: 'Projects',
        login: 'Login',
        accountSettings: 'Account Settings',
        settings: 'Settings',
        errorNoConnection: 'No Connection',
        '404': 'Page not found'
    },
    de: {
        home: 'Dashboard',
        categories: 'Kategorien',
        clients: 'Kunden',
        projects: 'Projekte',
        login: 'Login',
        accountSettings: 'Kontoeinstellungen',
        settings: 'Einstellungen',
        errorNoConnection: 'Keine Verbindung',
        '404': 'Seite nicht gefunden'
    }
};

const router = new VueRouter({
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
        },
        {
            path: 'settings',
            name: 'settings',
            component: Settings
        },
        {
            path: 'categories',
            component: PageWrapper,
            children: [{
                path: '',
                name: 'categories',
                component: Categories
            },
            {
                path: ':id',
                name: 'category',
                component: Category,
                props: true
            }]
        },
        {
            path: 'clients',
            component: PageWrapper,
            children: [{
                path: '',
                name: 'clients',
                component: Clients
            },
            {
                path: ':id',
                name: 'client',
                component: Client,
                props: true
            }]
        },
        {
            path: 'projects',
            component: PageWrapper,
            children: [{
                path: '',
                name: 'projects',
                component: Projects
            },
            {
                path: ':id',
                name: 'project',
                component: Project,
                props: true
            }]
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

export function setDocumentTitle(title) {
    document.title = `${title} - ${routeTitles.primaryTitle}`;
}

export default router;

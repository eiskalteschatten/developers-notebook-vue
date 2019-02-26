import Vue from 'vue';
import Vuex from 'vuex';

import http from '../http';
import eventBus from '../eventBus';

import nav from './nav';
import user from './user';
import settings from './settings';
import categories from './categories';
import clients from './clients';
import projects from './projects';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        nav,
        user,
        settings,
        categories,
        clients,
        projects
    }
});

export async function fillStore() {
    await store.dispatch('settings/setSettings', {}, { root: true });

    eventBus.$emit('show-loader');

    try {
        const commit = store.commit;
        const res = await http.get('api/all');

        if (res.body && res.status < 300) {
            const body = res.body;
            if (body.categories) commit('categories/setCategories', body.categories);
            if (body.clients) commit('clients/setClients', body.clients);
            if (body.projects) commit('projects/setProjects', body.projects);
        }
        else {
            throw new Error(res.bodyText);
        }

        eventBus.$emit('close-loader');
    }
    catch(error) {
        eventBus.$emit('close-loader');
        console.error(error);
    }
}

export default store;

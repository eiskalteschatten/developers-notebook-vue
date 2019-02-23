import Vue from 'vue';
import Vuex from 'vuex';

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
    const dispatch = store.dispatch;
    await dispatch('settings/setSettings', {}, { root: true });
}

export default store;

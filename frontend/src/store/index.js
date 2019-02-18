import Vue from 'vue';
import Vuex from 'vuex';

import nav from './nav';
import user from './user';
import settings from './settings';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        nav,
        user,
        settings
    }
});

import http from '../http';

export default {
    namespaced: true,
    state: {
        categories: [],
    },

    getters: {
        categories: state => state.categories
    },

    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        }
    },

    actions: {
        async setTheme({ commit }, theme) {
            commit('setTheme', theme);

            try {
                const res = await http.put('api/settings', { theme });
                return {
                    code: res.status,
                    message: res.bodyText
                };
            }
            catch(error) {
                console.error(error);
                return {
                    code: 500,
                    message: error
                };
            }
        },
        async setSettings({ commit }) {
            try {
                const res = await http.get('api/settings');

                if (res.body && res.status < 300) {
                    commit('setTheme', res.body.theme);
                    commit('setSettingsFromAccount', true);

                    return {
                        code: res.status,
                        message: res.bodyText
                    };
                }
                else {
                    throw new Error(res.bodyText);
                }
            }
            catch(error) {
                console.error(error);
                return {
                    code: 500,
                    message: error
                };
            }
        }
    }
};

import http from '../http';

export default {
    namespaced: true,
    state: {
        theme: 'light',
        languages: [{
            title: 'English',
            code: 'en'
        },
        {
            title: 'Deutsch',
            code: 'de'
        }]
    },

    getters: {
        theme: state => state.theme,
        languages: state => state.languages
    },

    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        },
        setLanguages(state, languages) {
            state.languages = languages;
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
        }
    }
};

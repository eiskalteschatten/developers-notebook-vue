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
        }
    }
};

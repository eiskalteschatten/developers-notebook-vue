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
        // async fetchTheme ({ commit }, { username, password }) {
        //     const res = await fetch(`http://localhost/vuejs-jwt-example/auth?u=${username}&p=${password}`);
        //     commit('setJWT', await res.text());
        // }
    }
};

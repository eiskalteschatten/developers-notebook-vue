export default {
    namespaced: true,
    state: {
        theme: 'light',
        isElectron: false,
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
        languages: state => state.languages,
        isElectron: state => state.isElectron
    },

    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        },
        setLanguages(state, languages) {
            state.languages = languages;
        },
        setIsElectron(state, isElectron) {
            state.isElectron = isElectron;
        }
    },

    actions: {
    }
};

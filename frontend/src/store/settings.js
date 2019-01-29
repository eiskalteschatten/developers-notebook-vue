export default {
    namespaced: true,
    state: {
        theme: 'light'
    },

    getters: {
        theme: state => state.theme
    },

    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
        }
    },

    actions: {
        // async fetchTheme ({ commit }, { username, password }) {
        //     const res = await fetch(`http://localhost/vuejs-jwt-example/auth?u=${username}&p=${password}`);
        //     commit('setJWT', await res.text());
        // }
    }
};

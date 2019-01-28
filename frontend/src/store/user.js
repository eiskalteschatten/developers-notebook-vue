export default {
    state: {
        currentJwt: ''
    },

    getters: {
        jwt: state => state.currentJwt,
        jwtData: (state, getters) => state.currentJwt ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
        jwtSubject: (state, getters) => getters.jwtData ? getters.jwtData.sub : null,
        jwtIssuer: (state, getters) => getters.jwtData ? getters.jwtData.iss : null
    },

    mutations: {
        setJWT(state, jwt) {
            state.currentJwt = jwt;
        }
    },

    actions: {
        async fetchJWT ({ commit }, { username, password }) {
            const res = await fetch(`http://localhost/vuejs-jwt-example/auth?u=${username}&p=${password}`);
            commit('setJWT', await res.text());
        },
    }
};

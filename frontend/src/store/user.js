import { http } from '../app';

export default {
    namespaced: true,
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
        setJwt(state, jwt) {
            state.currentJwt = jwt;
        }
    },

    actions: {
        async fetchJwt({ commit }, { username, password }) {
            try {
                const res = await http.post('/auth/login', { username, password });

                if (res.body.user) {
                    commit('setJwt', res.body.token);
                    return true;
                }

                return false;
            }
            catch(error) {
                console.error(error);
                return false;
            }
        }
    }
};

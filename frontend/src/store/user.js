import { http } from '../app';

export default {
    namespaced: true,
    state: {
        user: {},
        currentJwt: ''
    },

    getters: {
        user: state => state.user,
        jwt: state => state.currentJwt,
        jwtData: (state, getters) => state.currentJwt ? JSON.parse(atob(getters.jwt.split('.')[1])) : null,
        jwtSubject: (state, getters) => getters.jwtData ? getters.jwtData.sub : null,
        jwtIssuer: (state, getters) => getters.jwtData ? getters.jwtData.iss : null
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setJwt(state, jwt) {
            state.currentJwt = jwt;
        }
    },

    actions: {
        async fetchJwt({ commit, dispatch }, body) {
            try {
                let jwt = localStorage.getItem('jwt');
                let jwtIsValid = false;
                let user = {};

                if (jwt) {
                    // If the response status isn't 200, it throws an error and is caught below
                    const res = await http.post('/auth/validate', {}, {
                        headers: {
                            Authorization: `Bearer ${jwt}`
                        }
                    });

                    jwtIsValid = true;
                    user = res.body.user || {};
                }
                else {
                    const res = await http.post('/auth/login', body);
                    const hasUserData = res.body.user && res.body.token;
                    jwt = hasUserData ? res.body.token : null;
                    user = hasUserData ? res.body.user : {};
                    jwtIsValid = jwt ? true : false;
                }

                if (jwt && jwtIsValid) {
                    commit('setUser', user);
                    commit('setJwt', jwt);
                    localStorage.setItem('jwt', jwt);
                    return true;
                }

                await dispatch('removeJwt');
                return false;
            }
            catch(error) {
                console.error(error);
                await dispatch('removeJwt');
                return false;
            }
        },
        async removeJwt({ commit }) {
            try {
                await http.post('/auth/logout');
                commit('setJwt', '');
                localStorage.removeItem('jwt');
                return true;
            }
            catch(error) {
                return false;
            }
        }
    }
};

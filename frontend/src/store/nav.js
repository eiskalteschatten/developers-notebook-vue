export default {
    namespaced: true,
    state: {
        backUrls: [],
        forwardUrls: []
    },

    getters: {
        backUrls: state => state.backUrls,
        forwardUrls: state => state.forwardUrls
    },

    mutations: {
        setBackUrls(state, backUrls) {
            state.backUrls = backUrls;
        },
        pushToBackUrls(state, url) {
            state.backUrls.push(url);
        },
        setForwardUrls(state, forwardUrls) {
            state.forwardUrls = forwardUrls;
        },
        pushToForwardUrls(state, url) {
            state.forwardUrls.push(url);
        }
    },

    actions: {
    }
};

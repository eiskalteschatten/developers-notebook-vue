export default {
    namespaced: true,
    state: {
        historyIndex: history.length
    },

    getters: {
        historyIndex: state => state.historyIndex
    },

    mutations: {
        setHistoryIndex(state, historyIndex) {
            state.historyIndex = historyIndex;
        }
    },

    actions: {
    }
};

export default {
    namespaced: true,
    state: {
        history: [],
        historyPosition: 0
    },

    getters: {
        history: state => state.history,
        historyPosition: state => state.historyPosition
    },

    mutations: {
        setHistory(state, history) {
            state.history = history;
        },
        pushToHistory(state, history) {
            state.history.push(history);
        },
        setHistoryPosition(state, historyPosition) {
            state.historyPosition = historyPosition;
        }
    },

    actions: {
    }
};

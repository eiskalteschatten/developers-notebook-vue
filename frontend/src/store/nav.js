export default {
    namespaced: true,
    state: {
        historyIndex: history.length,
        previousRouteName: '',
        routeNamesBackDisabled: [ 'login', 'errorNoConnection', 'electronServerConfig' ]
    },

    getters: {
        historyIndex: state => state.historyIndex,
        previousRouteName: state => state.previousRouteName,
        routeNamesBackDisabled: state => state.routeNamesBackDisabled,
    },

    mutations: {
        setHistoryIndex(state, historyIndex) {
            state.historyIndex = historyIndex;
        },
        setPreviousRouteName(state, previousRouteName) {
            state.previousRouteName = previousRouteName;
        },
        setRouteNamesBackDisabled(state, routeNamesBackDisabled) {
            state.routeNamesBackDisabled = routeNamesBackDisabled;
        }
    },

    actions: {
    }
};

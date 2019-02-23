import http from '../http';
import eventBus from '../eventBus';

export default {
    namespaced: true,
    state: {
        clients: [],
    },

    getters: {
        clients: state => state.clients,
        getClient: state => id => {
            id = parseInt(id);
            for (const stateClient of state.clients) {
                if (stateClient.id && stateClient.id === id) {
                    return stateClient;
                }
            }
            return '';
        },
        getComboBoxClients: state => {
            const notArchivedClients = state.clients.filter(client => {
                if (!client.archived) return client;
            });

            return notArchivedClients.map(client => {
                return {
                    value: client.id,
                    text: client.name
                };
            });
        }
    },

    mutations: {
        setClients(state, clients) {
            state.clients = clients;
        },
        setClient(state, { id, client }) {
            for (const i in state.clients) {
                const stateClient = state.clients[i];

                if (stateClient.id && stateClient.id === id) {
                    state.clients[i] = client;
                    break;
                }
            }
        }
    },

    actions: {
        async saveClient({ dispatch }, client) {
            eventBus.$emit('show-loader');

            try {
                const res = client.id
                    ? await http.put('api/client', client)
                    : await http.post('api/client', client);

                if (res.body && res.status < 300) {
                    dispatch('getClients');
                    eventBus.$emit('close-loader');

                    return {
                        code: res.status,
                        message: res.bodyText
                    };
                }
                else {
                    throw new Error(res.bodyText);
                }
            }
            catch(error) {
                eventBus.$emit('close-loader');
                console.error(error);
                return {
                    code: 500,
                    message: error
                };
            }
        },
        async getClients({ commit }) {
            eventBus.$emit('show-loader');
            try {
                const res = await http.get('api/client');

                if (res.body && res.status < 300) {
                    commit('setClients', res.body);
                    eventBus.$emit('close-loader');

                    return {
                        code: res.status,
                        message: res.bodyText
                    };
                }
                else {
                    throw new Error(res.bodyText);
                }
            }
            catch(error) {
                eventBus.$emit('close-loader');
                console.error(error);
                return {
                    code: 500,
                    message: error
                };
            }
        }
    }
};

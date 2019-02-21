import http from '../http';
import eventBus from '../eventBus';

export default {
    namespaced: true,
    state: {
        categories: [],
    },

    getters: {
        categories: state => state.categories,
        getCategory: state => id => {
            for (const stateCat of state.categories) {
                if (stateCat.id && stateCat.id === id) {
                    return stateCat;
                }
            }
            return '';
        }
    },

    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCategory(state, { id, category }) {
            for (const i in state.categories) {
                const stateCat = state.categories[i];

                if (stateCat.id && stateCat.id === id) {
                    state.categories[i] = category;
                    break;
                }
            }
        }
    },

    actions: {
        async saveCategory({ dispatch }, category) {
            eventBus.$emit('show-loader');

            try {
                const res = category.id
                    ? await http.put('api/category', category)
                    : await http.post('api/category', category);

                if (res.body && res.status < 300) {
                    dispatch('getCategories');
                    eventBus.$emit('show-loader');
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
        async getCategories({ commit }) {
            eventBus.$emit('show-loader');
            try {
                const res = await http.get('api/category/all');

                if (res.body && res.status < 300) {
                    commit('setCategories', res.body);
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

import http from '../http';
import eventBus from '../eventBus';

export default {
    namespaced: true,
    state: {
        categories: [],
        related: {}
    },

    getters: {
        categories: state => state.categories,
        getCategory: state => id => {
            id = parseInt(id);
            for (const stateCat of state.categories) {
                if (stateCat.id && stateCat.id === id) {
                    return stateCat;
                }
            }
            return '';
        },
        related: state => state.related,
        getComboBoxCategories: state => {
            const notArchivedCategories = state.categories.filter(category => {
                if (!category.archived) return category;
            });

            return notArchivedCategories.map(category => {
                return {
                    value: category.id,
                    text: category.name
                };
            });
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
        },
        setRelated(state, related) {
            state.related = related;
        }
    },

    actions: {
        async saveCategory({ dispatch }, category) {
            eventBus.$emit('show-loader');

            try {
                const res = category.id
                    ? await http.put('api/category', category)
                    : await http.post('api/category', category);

                if (res.status < 300) {
                    dispatch('getCategories');
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
        async getCategories({ commit }) {
            eventBus.$emit('show-loader');

            try {
                const res = await http.get('api/category');

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
        },
        async getRelated({ commit }, categoryId) {
            eventBus.$emit('show-loader');

            try {
                const res = await http.get(`api/category/related/${categoryId}`);

                if (res.body && res.status < 300) {
                    commit('setRelated', res.body.related);
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

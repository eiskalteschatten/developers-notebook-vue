import http from '../http';

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
        setCategory(state, id, category) {
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
        async saveCategory({ commit }, category) {
            try {
                const res = category.id
                    ? await http.put('api/category', category)
                    : await http.post('api/category', category);

                if (res.body && res.status < 300) {
                    commit('setCategory', res.body.id, res.body);
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
                console.error(error);
                return {
                    code: 500,
                    message: error
                };
            }
        },
        async getCategories({ commit }) {
            try {
                const res = await http.get('api/category/all');

                if (res.body && res.status < 300) {
                    commit('setCategories', res.body);

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
                console.error(error);
                return {
                    code: 500,
                    message: error
                };
            }
        }
    }
};

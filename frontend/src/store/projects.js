import http from '../http';
import eventBus from '../eventBus';

export default {
    namespaced: true,
    state: {
        projects: [],
        related: {}
    },

    getters: {
        projects: state => state.projects,
        getProject: state => id => {
            id = parseInt(id);
            for (const stateProject of state.projects) {
                if (stateProject.id && stateProject.id === id) {
                    return stateProject;
                }
            }
            return '';
        },
        related: state => state.related
    },

    mutations: {
        setProjects(state, projects) {
            state.projects = projects;
        },
        setProject(state, { id, category }) {
            for (const i in state.projects) {
                const stateProject = state.projects[i];

                if (stateProject.id && stateProject.id === id) {
                    state.projects[i] = category;
                    break;
                }
            }
        },
        setRelated(state, related) {
            state.related = related;
        }
    },

    actions: {
        async saveProject({ dispatch }, project) {
            eventBus.$emit('show-loader');

            try {
                const res = project.id
                    ? await http.put('api/project', project)
                    : await http.post('api/project', project);

                if (res.status < 300) {
                    dispatch('getProjects');
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
        async getProjects({ commit }) {
            eventBus.$emit('show-loader');
            try {
                const res = await http.get('api/project');

                if (res.body && res.status < 300) {
                    commit('setProjects', res.body);
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
        async getRelated({ commit }, projectId) {
            eventBus.$emit('show-loader');
            try {
                const res = await http.get(`api/project/related/${projectId}`);

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

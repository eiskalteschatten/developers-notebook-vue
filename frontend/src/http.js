import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.interceptors.push(request => {
    request.headers.set('Authorization', localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}` : '');
});

const isElectron = localStorage.getItem('isElectron');

Vue.http.options.root = isElectron ? localStorage.getItem('serverConfigHost') : '/';

export function setRoot(root) {
    Vue.http.options.root = root;
}

export default Vue.http;

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.interceptors.push(request => {
    request.headers.set('Authorization', localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}` : '');
});

const isElectron = localStorage.getItem('isElectron');

if (isElectron) {
    Vue.http.options.root = localStorage.getItem('serverConfigHost');
}

export default Vue.http;

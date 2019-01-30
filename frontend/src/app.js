import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify';
import VueResource from 'vue-resource';
import { mapState, mapActions } from 'vuex';

import cookies from 'browser-cookies';

import theme from './theme';
import store from './store';
import router, {routeTitles} from './router';
import App from './components/App.vue';

import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(Vuetify, {
    theme,
    iconfont: 'md'
});

const i18n = new VueI18n({
    locale: cookies.get('preferedLanguage') || 'en',
    fallbackLocale: 'en'
});

Vue.http.interceptors.push(request => {
    request.headers.set('Authorization', localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}` : '');
});

export const http = Vue.http;
export const eventBus = new Vue();

new Vue({
    store,
    router,
    i18n,
    http,
    computed: {
        ...mapState('user', [
            'currentJwt'
        ])
    },
    watch: {
        '$route'(to) {
            const lang = to.params.lang;
            this.$i18n.locale = lang;
            document.title = this.buildDocumentTitle(routeTitles[lang][to.name]);
            cookies.set('preferedLanguage', lang);
        }
    },
    async created() {
        const jwt = localStorage.getItem('jwt');

        if (!jwt && !this.currentJwt && this.$route.name !== 'login') {
            this.$router.push({ name: 'login' });
        }
        else if (jwt && !this.currentJwt) {
            const isLoggedIn = await this.fetchJwt();
            if (!isLoggedIn) {
                this.$router.push({ name: 'login' });
            }
        }
    },
    mounted() {
        const title = routeTitles[this.$i18n.locale][this.$route.name];
        document.title = this.buildDocumentTitle(title);
    },
    methods: {
        ...mapActions('user', [
            'fetchJwt'
        ]),
        buildDocumentTitle(title) {
            return `${title} - ${routeTitles.primaryTitle}`;
        }
    },
    render: createElement => createElement(App)
}).$mount('#vueAnchor');

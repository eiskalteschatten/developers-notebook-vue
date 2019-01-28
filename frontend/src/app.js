import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import { mapState } from 'vuex';

import cookies from 'browser-cookies';

import store from './store';
import router, {routeTitles} from './router';
import App from './components/App.vue';

Vue.use(VueRouter);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: cookies.get('preferedLanguage') || 'en',
    fallbackLocale: 'en'
});

export const eventBus = new Vue();

new Vue({
    store,
    router,
    i18n,
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
    created() {
        if (!this.currentJWT && this.$route.name !== 'login') {
            this.$router.push({ name: 'login' });
        }
    },
    mounted() {
        const title = routeTitles[this.$i18n.locale][this.$route.name];
        document.title = this.buildDocumentTitle(title);
    },
    methods: {
        buildDocumentTitle(title) {
            return `${title} - ${routeTitles.primaryTitle}`;
        }
    },
    render: createElement => createElement(App)
}).$mount('#vueAnchor');

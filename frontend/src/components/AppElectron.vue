<template>
    <v-app :dark="theme === 'dark'">
        <div class="main-structure">
            <router-view />
            <about />
            <alert />
            <loader />
        </div>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';
    import { remote } from 'electron';

    import Alert from './elements/Alert.vue';
    import Loader from './elements/Loader.vue';
    import About from './elements/About.vue';

    export default Vue.extend({
        components: {
            Alert,
            Loader,
            About
        },
        data() {
            return {
                showTitlebar: false
            };
        },
        computed: {
            ...mapState('settings', [
                'theme',
                'settingsFromAccount'
            ])
        },
        mounted() {
            if (process.platform === 'darwin') {
                this.showTitlebar = true;
            }

            this.setVueTheme();

            if (process.platform === 'darwin') {
                remote.systemPreferences.subscribeNotification(
                    'AppleInterfaceThemeChangedNotification',
                    this.setVueTheme
                );
            }
        },
        methods: {
            ...mapMutations('settings', [
                'setTheme'
            ]),
            maximizeWindow() {
                remote.getCurrentWindow().maximize();
            },
            setVueTheme() {
                if (!this.settingsFromAccount) {
                    const theme = remote.systemPreferences.isDarkMode() ? 'dark' : 'light';
                    this.setTheme(theme);
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

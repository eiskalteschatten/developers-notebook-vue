<template>
    <v-app :dark="theme === 'dark'">
        <div class="main-structure">
            <router-view />
        </div>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';
    import { remote } from 'electron';

    export default Vue.extend({
        data() {
            return {
                showTitlebar: false
            };
        },
        computed: {
            ...mapState('settings', [
                'theme'
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
                const theme = remote.systemPreferences.isDarkMode() ? 'dark' : 'light';
                this.setTheme(theme);
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

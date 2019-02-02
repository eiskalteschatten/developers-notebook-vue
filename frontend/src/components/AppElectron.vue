<template>
    <v-app :dark="theme === 'dark'">
        <div class="title-bar" v-if="showTitlebar" @dblclick="maximizeWindow" />
        <div class="main-structure">
            <router-view />
        </div>
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';
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
        },
        methods: {
            maximizeWindow() {
                remote.getCurrentWindow().maximize();
            }
        }
    });
</script>

<style lang="scss" scoped>
    $titleBarHeight: 10px;

    .darwin {
        .title-bar {
            background: #000000;
            display: block;
            height: $titleBarHeight;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            -webkit-app-region: drag;
            -webkit-user-select: none;
            z-index: 1000;
        }

        .main-structure {
            padding-top: $titleBarHeight;
        }
    }
</style>

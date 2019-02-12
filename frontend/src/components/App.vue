<template>
    <v-app :dark="theme === 'dark'">
        <router-view />
        <about />
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    import About from './elements/About.vue';

    export default Vue.extend({
        components: {
            About
        },
        computed: {
            ...mapState('settings', [
                'theme'
            ])
        }
    });
</script>

<style lang="scss">

</style>

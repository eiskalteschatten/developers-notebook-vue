<template>
    <v-app :dark="theme === 'dark'">
        <router-view />
        <about />
        <alert />
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    import Alert from './elements/Alert.vue';
    import About from './elements/About.vue';

    export default Vue.extend({
        components: {
            Alert,
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

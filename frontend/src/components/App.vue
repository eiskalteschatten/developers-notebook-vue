<template>
    <v-app :dark="theme === 'dark'">
        <router-view />
    </v-app>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    export default Vue.extend({
        computed: {
            ...mapState('settings', [
                'theme'
            ])
        }
    });
</script>

<style lang="scss">

</style>

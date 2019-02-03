<template>
    <div>
        <side-nav />
        <toolbar />
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
            <main-footer />
        </v-content>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Toolbar from './elements/toolbars/Main.vue';
    import SideNav from './elements/SideNav.vue';
    import MainFooter from './elements/footers/Main.vue';

    export default Vue.extend({
        components: {
            Toolbar,
            SideNav,
            MainFooter
        }
    });
</script>

<style lang="scss">

</style>

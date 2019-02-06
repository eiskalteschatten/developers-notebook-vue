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
        <bottom-nav />
    </div>
</template>

<script>
    import Vue from 'vue';

    import Toolbar from './elements/toolbars/Main.vue';
    import SideNav from './elements/SideNav.vue';
    import MainFooter from './elements/footers/Main.vue';
    import BottomNav from './elements/BottomNav.vue';

    export default Vue.extend({
        components: {
            Toolbar,
            SideNav,
            MainFooter,
            BottomNav
        }
    });
</script>

<style lang="scss">

</style>

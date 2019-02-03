<template>
    <div>
        <side-nav />
        <toolbar />
        <v-content>
            <router-view />
            <logout />
        </v-content>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Toolbar from './elements/toolbars/Main.vue';
    import SideNav from './elements/SideNav.vue';
    import Logout from './elements/Logout.vue';

    export default Vue.extend({
        components: {
            Toolbar,
            SideNav,
            Logout
        }
    });
</script>

<style lang="scss">

</style>

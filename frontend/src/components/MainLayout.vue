<template>
    <div>
        <side-nav />
        <toolbar />
        <v-content>
            <router-view />
        </v-content>
    </div>
</template>

<script>
    import Vue from 'vue';

    import Toolbar from './elements/toolbars/Main.vue';
    import SideNav from './elements/SideNav.vue';

    export default Vue.extend({
        components: {
            Toolbar,
            SideNav
        }
    });
</script>

<style lang="scss">

</style>

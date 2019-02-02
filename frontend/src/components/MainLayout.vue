<template>
    <div>
        <toolbar />
        <router-view />
        <logout />
    </div>
</template>

<script>
    import Vue from 'vue';

    import Toolbar from './elements/toolbars/Main.vue';
    import Logout from './elements/Logout.vue';

    export default Vue.extend({
        components: {
            Toolbar,
            Logout
        }
    });
</script>

<style lang="scss">

</style>

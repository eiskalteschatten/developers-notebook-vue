<template>
    <div>
        <router-view />
        <logout />
    </div>
</template>

<script>
    import Vue from 'vue';

    import Logout from './elements/Logout.vue';

    export default Vue.extend({
        components: {
            Logout
        }
    });
</script>

<style lang="scss">

</style>

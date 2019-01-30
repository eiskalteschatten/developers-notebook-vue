<template>
    <div>
        <server-config />
    </div>
</template>

<script>
    import Vue from 'vue';

    import ServerConfig from '../../elements/electron/ServerConfig.vue';

    export default Vue.extend({
        components: {
            ServerConfig
        }
    });
</script>

<style lang="scss">

</style>

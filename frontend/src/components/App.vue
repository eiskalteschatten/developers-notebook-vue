<template>
    <router-view />
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    export default Vue.extend({
        computed: {
            ...mapState('users')
        },
        created() {
            if (!this.users.jwt && this.$router.name !== 'login') {
                this.$router.push({ to: 'login' });
            }
        }
    });
</script>

<style lang="scss">

</style>

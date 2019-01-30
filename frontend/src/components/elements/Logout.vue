<i18n>
{
    "en": {
        "logout": "Logout"
    },
    "de": {
        "logout": "Abmeldung"
    }
}
</i18n>

<template>
    <div>
        <v-btn @click="logout">{{ $t('logout') }}</v-btn>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions } from 'vuex';

    export default Vue.extend({
        methods: {
            ...mapActions('user', [
                'removeJwt'
            ]),
            async logout() {
                await this.removeJwt();
                this.$router.push({ name: 'login' });
            }
        }
    });
</script>

<style lang="scss">

</style>

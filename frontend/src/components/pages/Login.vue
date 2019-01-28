<i18n>
{
    "en": {
        "login": "Login"
    },
    "de": {
        "login": "Anmeldung"
    }
}
</i18n>

<template>
    <div>
        {{ $t('login') }}
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    export default Vue.extend({
        computed: {
            ...mapState('user', [
                'currentJwt'
            ])
        },
        created() {
            if (this.currentJWT) {
                this.$router.push({ name: 'home' });
            }
        }
    });
</script>

<style lang="scss">

</style>

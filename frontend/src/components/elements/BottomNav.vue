<i18n>
{
    "en": {
        "dashboard": "Dashboard",
        "clients": "Clients"
    },
    "de": {
        "dashboard": "Dashboard",
        "clients": "Kunden"
    }
}
</i18n>

<template>
    <v-bottom-nav
        :active.sync="bottomNav"
        :value="$vuetify.breakpoint.smAndDown"
        absolute
        color="transparent"
    >
        <v-btn color="primary" flat value="home">
            <span>{{ $t('dashboard') }}</span>
            <v-icon>dashboard</v-icon>
        </v-btn>

        <v-btn color="primary" flat value="clients">
            <span>{{ $t('clients') }}</span>
            <v-icon>people</v-icon>
        </v-btn>
    </v-bottom-nav>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        computed: {
            bottomNav() {
                return this.$route.name;
            }
        }
    });
</script>

<style lang="scss">

</style>

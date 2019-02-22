<i18n>
{
    "en": {
        "clients": "Clients"
    },
    "de": {
        "clients": "Kunden"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ client.name }}</h1>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions } from 'vuex';

    import { setDocumentTitle } from '../../../router';

    export default Vue.extend({
        props: {
            id: [String, Number]
        },
        computed: {
            client() {
                return this.$store.getters['clients/getClient'](this.id);
            }
        },
        async mounted() {
            await this.getClients();
            setDocumentTitle(`${this.client.name} - ${this.$t('clients')}`);
        },
        methods: {
            ...mapActions('clients', [
                'getClients'
            ])
        }
    });
</script>

<style lang="scss" scoped>

</style>

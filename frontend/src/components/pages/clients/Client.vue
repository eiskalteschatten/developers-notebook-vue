<i18n>
{
    "en": {
        "clients": "Clients",
        "archived": "Archived",
        "notes": "Notes",
        "contactInfo": "Contact Information",
        "website": "Website",
        "email": "Email",
        "telephone": "Phone Number",
        "fax": "Fax Number",
        "address": "Address"
    },
    "de": {
        "clients": "Kunden",
        "archived": "Archiviert",
        "notes": "Notizen",
        "contactInfo": "Kontaktdaten",
        "website": "Webseite",
        "email": "Email",
        "telephone": "Telefonnummer",
        "fax": "Faxnummer",
        "address": "Adresse"
    }
}
</i18n>

<template>
    <div>
        <v-card :style="{ borderLeft: `2px solid ${client.color}` }" class="mb-5">
            <v-card-title>
                <div class="avatar-container mr-3">
                    <v-avatar :color="client.color" size="48px" class="mr-5">
                        <v-icon :dark="!!client.color">person</v-icon>
                    </v-avatar>
                </div>
                <div>
                    <h1>{{ client.name }}</h1>
                    <div>
                        {{ client.companyName }}
                    </div>
                </div>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex xs12 sm6 :class="{ 'mb-5': $vuetify.breakpoint.xs }">
                        <div class="mb-3" v-if="client.archived">
                            <i>{{ $t('archived') }}</i>
                        </div>
                        <div class="mb-3" v-if="client.description">
                            {{ client.description }}
                        </div>
                        <div v-if="client.notes">
                            <h3 class="mb-1">{{ $t('notes') }}</h3>
                            {{ client.notes }}
                        </div>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <h3 class="mb-3">{{ $t('contactInfo') }}</h3>
                        <div class="mb-2" v-if="client.email">
                            <div class="contact-info-email">{{ $t('email') }}:</div>
                            <external-link :href="`mailto:${client.email}`" :link-content="client.email" />
                        </div>
                        <div class="mb-2" v-if="client.website">
                            <div class="contact-info-email">{{ $t('website') }}:</div>
                            <external-link :href="client.website" :link-content="client.website" />
                        </div>
                        <div class="mb-2" v-if="client.telephone">
                            <div class="contact-info-email">{{ $t('telephone') }}:</div>
                            {{ client.telephone }}
                        </div>
                        <div class="mb-2" v-if="client.fax">
                            <div class="contact-info-email">{{ $t('fax') }}:</div>
                            {{ client.fax }}
                        </div>
                        <div v-if="client.address">
                            <div class="contact-info-email">{{ $t('address') }}:</div>
                            {{ client.address }}
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions } from 'vuex';

    import { setDocumentTitle } from '../../../router';

    import ExternalLink from '../../elements/ExternalLink.vue';

    export default Vue.extend({
        components: {
            ExternalLink
        },
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
    .avatar-container {
        float: left;
        width: 50px;
    }

    .contact-info-email {
        display: inline-block;
        font-weight: bold;
        width: 125px;
    }
</style>

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
        "address": "Address",
        "projects": "Projects",
        "views": "Views"
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
        "address": "Adresse",
        "projects": "Projekte",
        "views": "Bereiche"
    }
}
</i18n>

<template>
    <div>
        <v-card :style="{ borderLeft: `2px solid ${client.color}` }" class="mb-4">
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
                            <v-icon small class="mr-2">archive</v-icon>{{ $t('archived') }}
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
                            <div class="contact-info-label">
                                <v-icon small class="mr-2">email</v-icon>{{ $t('email') }}:
                            </div>
                            <external-link :href="`mailto:${client.email}`" :link-content="client.email" />
                        </div>
                        <div class="mb-2" v-if="client.website">
                            <div class="contact-info-label">
                                <v-icon small class="mr-2">web</v-icon>{{ $t('website') }}:
                            </div>
                            <external-link :href="client.website" :link-content="client.website" />
                        </div>
                        <div class="mb-2" v-if="client.telephone">
                            <div class="contact-info-label">
                                <v-icon small class="mr-2">phone</v-icon>{{ $t('telephone') }}:
                            </div>
                            {{ client.telephone }}
                        </div>
                        <div class="mb-2" v-if="client.fax">
                            <div class="contact-info-label">
                                <v-icon small class="mr-2">print</v-icon>{{ $t('fax') }}:
                            </div>
                            {{ client.fax }}
                        </div>
                        <div v-if="client.address">
                            <div class="contact-info-label">
                                <v-icon small class="mr-2">markunread_mailbox</v-icon>{{ $t('address') }}:
                            </div>
                            {{ client.address }}
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <sub-side-nav :items="sidenavItems" @clicked="changeTab" :mobile-title="$t('views')" />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="projects">
                        <project-list :projects="related.projects" />
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    import { setDocumentTitle } from '../../../router';

    import ExternalLink from '../../elements/ExternalLink.vue';
    import SubSideNav from '../../elements/SubSideNav.vue';
    import ProjectList from '../../elements/overview-pages/ProjectList.vue';

    export default Vue.extend({
        components: {
            ExternalLink,
            SubSideNav,
            ProjectList
        },
        props: {
            id: [String, Number]
        },
        data() {
            return {
                tab: null
            };
        },
        computed: {
            ...mapState('clients', [
                'related'
            ]),
            client() {
                return this.$store.getters['clients/getClient'](this.id);
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('projects'),
                        icon: 'description',
                        class: { active: this.tab === 'projects' },
                        click: () => 'projects'
                    }
                ];
            }
        },
        watch: {
            async id() {
                await this.load();
            }
        },
        async mounted() {
            await this.load();
        },
        methods: {
            ...mapActions('clients', [
                'getClients',
                'getRelated'
            ]),
            changeTab(getTab) {
                this.tab = getTab();
            },
            async load() {
                await this.getClients();
                setDocumentTitle(`${this.client.name} - ${this.$t('clients')}`);
                await this.getRelated(this.id);
            }
        }
    });
</script>

<style lang="scss" scoped>
    .avatar-container {
        float: left;
        width: 50px;
    }

    .contact-info-label {
        display: inline-block;
        font-weight: bold;
        width: 150px;
    }
</style>

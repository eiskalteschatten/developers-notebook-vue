<i18n>
{
    "en": {
        "clients": "Clients",
        "newClient": "New Client",
        "clientCreated": "The client was successfully created.",
        "create": "Create",
        "cancel": "Cancel",
        "activeClients": "Active Clients",
        "archive": "Archive",
        "filters": "Filters"
    },
    "de": {
        "clients": "Kunden",
        "newClient": "Neuer Kunde",
        "clientCreated": "Der Kunde wurde erfolgreich erstellt.",
        "create": "Erstellen",
        "cancel": "Abbrechen",
        "activeClients": "Aktive Kunden",
        "archive": "Archiv",
        "filters": "Filter"
    }
}
</i18n>

<template>
    <div>
        <page-title :title="$t('clients')" icon="people" />

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn @click="newClient.dialog = true" class="mb-4">
                    <v-icon left>create</v-icon>
                    {{ $t('newClient') }}
                </v-btn>
                <sub-side-nav
                    class="mt-1"
                    :items="sidenavItems"
                    @clicked="changeTab"
                    show-categories
                    @categoryClicked="changeCategory"
                    :selected-tab="subSideNavTab"
                    :mobile-title="$t('filters')"
                />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="subSideNavTab">
                    <v-tab-item value="notArchived">
                        <client-list :clients="notArchivedClients" />
                    </v-tab-item>
                    <v-tab-item value="archived">
                        <client-list :clients="archivedClients" />
                    </v-tab-item>
                    <v-tab-item
                        v-for="category in categories"
                        :key="category.id"
                        :value="`category${category.id}`"
                    >
                        <client-list :clients="clientsInCategory(category.id)" />
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>

        <v-dialog v-model="newClient.dialog" max-width="1200">
            <v-toolbar dark color="black">
                <v-toolbar-title>{{ $t('newClient') }}</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                    <v-btn icon dark @click="newClient.dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card>
                <v-form lazy-validation @submit="createNewClient">
                    <v-card-text>
                        <edit-form
                            :errors="newClient.errors"
                            :error-message="newClient.error"
                            :edit-client="newClient.values"
                            @input="values => { newClient.values = values }"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn flat @click="newClient.dialog = false">
                            {{ $t('cancel') }}
                        </v-btn>

                        <v-btn
                            primary
                            color="primary"
                            type="submit"
                            :loading="newClient.loading"
                            :disabled="newClient.loading"
                        >
                            <v-icon left>save</v-icon>
                            {{ $t('create') }}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapState } from 'vuex';
    import eventBus from '../../../eventBus';

    import PageTitle from '../../elements/PageTitle.vue';
    import SubSideNav from '../../elements/SubSideNav.vue';
    import ClientList from '../../elements/clients/List.vue';
    import EditForm from '../../elements/clients/EditForm.vue';

    export default Vue.extend({
        components: {
            PageTitle,
            SubSideNav,
            ClientList,
            EditForm
        },
        data() {
            return {
                subSideNavTab: null,
                newClient: {
                    dialog: this.$route.query.new || false,
                    loading: false,
                    errors: {},
                    error: false,
                    values: {
                        archived: false
                    }
                }
            };
        },
        computed: {
            ...mapState('clients', [
                'clients'
            ]),
            ...mapState('categories', [
                'categories'
            ]),
            notArchivedClients() {
                return this.clients.filter(client => {
                    if (!client.archived) return client;
                });
            },
            archivedClients() {
                return this.clients.filter(client => {
                    if (client.archived) return client;
                });
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('activeClients'),
                        icon: 'people',
                        class: { active: this.subSideNavTab === 'notArchived' },
                        click: () => 'notArchived'
                    },
                    {
                        title: this.$t('archive'),
                        icon: 'archive',
                        class: { active: this.subSideNavTab === 'archived' },
                        click: () => 'archived'
                    }
                ];
            }
        },
        watch: {
            '$route.query.new'(value) {
                this.newClient.dialog = value;
            }
        },
        async mounted() {
            await this.getClients();
        },
        methods: {
            ...mapActions('clients', [
                'saveClient',
                'getClients'
            ]),
            clientsInCategory(categoryId) {
                return this.clients.filter(client => {
                    if (client.categoryIds.includes(categoryId) && !client.archived) {
                        return client;
                    }
                });
            },
            changeTab(getTab) {
                this.subSideNavTab = getTab();
            },
            changeCategory(id) {
                this.subSideNavTab = `category${id}`;
            },
            async createNewClient(event) {
                event.preventDefault();
                this.newClient.loading = true;
                const values = this.newClient.values;

                if (!values.name) {
                    this.newClient.errors.name = true;
                    this.newClient.error = true;
                }
                else {
                    if (values.website && !values.website.includes('://')) {
                        values.website = `http://${values.website}`;
                    }

                    const newClient = await this.saveClient(values);

                    if (newClient.code === 500) {
                        this.newClient.error = true;
                    }
                    else {
                        this.newClient.dialog = false;
                        eventBus.$emit('show-alert', this.$t('clientCreated'));
                    }
                }

                this.newClient.loading = false;
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

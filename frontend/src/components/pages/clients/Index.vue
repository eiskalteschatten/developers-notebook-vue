<i18n>
{
    "en": {
        "clients": "Clients",
        "newClient": "New Client",
        "clientCreated": "The client was successfully created.",
        "create": "Create",
        "cancel": "Cancel",
        "activeClients": "Active Clients",
        "archive": "Archive"
    },
    "de": {
        "clients": "Kunden",
        "newClient": "Neuer Kunde",
        "clientCreated": "Der Kunde wurde erfolgreich erstellt.",
        "create": "Erstellen",
        "cancel": "Abbrechen",
        "activeClients": "Aktive Kunden",
        "archive": "Archiv"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ $t('clients') }}</h1>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn @click="newClient.dialog = true" class="mb-4">
                    <v-icon left>create</v-icon>
                    {{ $t('newClient') }}
                </v-btn>
                <sub-side-nav class="mt-1" :items="sidenavItems" @clicked="changeTab" />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="archiveTab">
                    <v-tab-item value="notArchived">
                        <category-list :categories="notArchivedCategories" />
                    </v-tab-item>
                    <v-tab-item value="archived">
                        <category-list :categories="archivedCategories" />
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>

        <v-dialog v-model="newClient.dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">
                    {{ $t('newClient') }}

                    <v-spacer />

                    <v-btn flat @click="newClient.dialog = false" small icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form lazy-validation @submit="createNewClient">
                    <v-card-text>
                        <edit-category-form
                            :errors="newClient.errors"
                            :error-message="newClient.error"
                            :edit-category="newClient.values"
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

    import SubSideNav from '../../elements/SubSideNav.vue';
    import CategoryList from '../../elements/categories/CategoryList.vue';
    import EditCategoryForm from '../../elements/categories/EditCategoryForm.vue';

    export default Vue.extend({
        components: {
            SubSideNav,
            CategoryList,
            EditCategoryForm
        },
        data() {
            return {
                archiveTab: null,
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
            ...mapState('categories', [
                'categories'
            ]),
            notArchivedCategories() {
                return this.categories.filter(category => {
                    if (!category.archived) return category;
                });
            },
            archivedCategories() {
                return this.categories.filter(category => {
                    if (category.archived) return category;
                });
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('activeClients'),
                        icon: 'category',
                        class: { active: this.archiveTab === 'notArchived' },
                        click: () => 'notArchived'
                    },
                    {
                        title: this.$t('archive'),
                        icon: 'archive',
                        class: { active: this.archiveTab === 'archived' },
                        click: () => 'archived'
                    }
                ];
            }
        },
        async mounted() {
            await this.getCategories();
        },
        methods: {
            ...mapActions('categories', [
                'saveCategory',
                'getCategories'
            ]),
            changeTab(getTab) {
                this.archiveTab = getTab();
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
                    const newClient = await this.saveCategory(values);

                    if (newClient.code === 500) {
                        this.newClient.error = true;
                    }
                    else {
                        this.newClient.dialog = false;
                    }
                }

                this.newClient.loading = false;
                eventBus.$emit('show-alert', this.$t('clientCreated'));
            }
        },
        watch: {
            '$route.query.new'(value) {
                this.newClient.dialog = value;
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

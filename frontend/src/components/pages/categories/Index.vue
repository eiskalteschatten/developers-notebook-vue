<i18n>
{
    "en": {
        "categories": "Categories",
        "newCategory": "New Category",
        "categoryCreated": "The category was successfully created.",
        "create": "Create",
        "cancel": "Cancel",
        "activeCategories": "Active Categories",
        "archive": "Archive"
    },
    "de": {
        "categories": "Kategorien",
        "newCategory": "Neue Kategorie",
        "categoryCreated": "Die Kategorie wurde erfolgreich erstellt.",
        "create": "Erstellen",
        "cancel": "Abbrechen",
        "activeCategories": "Aktive Kategorien",
        "archive": "Archiv"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ $t('categories') }}</h1>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn @click="newCategory.dialog = true" class="mb-4">
                    <v-icon left>create</v-icon>
                    {{ $t('newCategory') }}
                </v-btn>
                <v-list class="mt-1" dense>
                    <v-list-tile @click="archiveTab = 'notArchived'" :class="{ active: archiveTab === 'notArchived' }">
                        <v-list-tile-action>
                            <v-icon>category</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ $t('activeCategories') }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile @click="archiveTab = 'archived'" :class="{ active: archiveTab === 'archived' }">
                        <v-list-tile-action>
                            <v-icon>archive</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ $t('archive') }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
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

        <v-dialog v-model="newCategory.dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">
                    {{ $t('newCategory') }}

                    <v-spacer />

                    <v-btn flat @click="newCategory.dialog = false" small icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form lazy-validation @submit="createNewCategory">
                    <v-card-text>
                        <edit-category-form
                            :errors="newCategory.errors"
                            :error-message="newCategory.error"
                            :edit-category="newCategory.values"
                            @input="values => { newCategory.values = values }"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn flat @click="newCategory.dialog = false">
                            {{ $t('cancel') }}
                        </v-btn>

                        <v-btn
                            primary
                            color="primary"
                            type="submit"
                            :loading="newCategory.loading"
                            :disabled="newCategory.loading"
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

    import CategoryList from '../../elements/categories/CategoryList.vue';
    import EditCategoryForm from '../../elements/categories/EditCategoryForm.vue';

    export default Vue.extend({
        components: {
            CategoryList,
            EditCategoryForm
        },
        data() {
            return {
                archiveTab: null,
                newCategory: {
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
            async createNewCategory(event) {
                event.preventDefault();
                this.newCategory.loading = true;
                const values = this.newCategory.values;

                if (!values.name) {
                    this.newCategory.errors.name = true;
                    this.newCategory.error = true;
                }
                else {
                    const newCategory = await this.saveCategory(values);

                    if (newCategory.code === 500) {
                        this.newCategory.error = true;
                    }
                    else {
                        this.newCategory.dialog = false;
                    }
                }

                this.newCategory.loading = false;
                eventBus.$emit('show-alert', this.$t('categoryCreated'));
            }
        },
        watch: {
            '$route.query.new'(value) {
                this.newCategory.dialog = value;
            }
        }
    });
</script>

<style lang="scss" scoped>
    .theme--dark {
        .active {
            background-color: var(--v-selected-darken2);
        }
    }

    .theme--light {
        .active {
            background-color: var(--v-selected-lighten2);
        }
    }
</style>

<i18n>
{
    "en": {
        "categories": "Categories",
        "newCategory": "New Category",
        "archive": "Archive",
        "save": "Save",
        "cancel": "Cancel",
        "ok": "OK",
        "name": "Name",
        "description": "Description",
        "search": "Search",
        "confirmDelete": "Are you sure you want to delete this category? This cannot be undone.",
        "categoryDeleted": "The category was successfully deleted.",
        "anErrorOccurred": "An error occurred. Please try again.",
        "archivedSuccessfully": "The category was successfully archived."
    },
    "de": {
        "categories": "Kategorien",
        "newCategory": "Neue Kategorie",
        "archive": "Archivieren",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "ok": "OK",
        "name": "Name",
        "description": "Beschreibung",
        "search": "Suche",
        "confirmDelete": "Sind Sie sicher, dass Sie diese Kategorie löschen wollen? Dieser Vorgang kann nicht rückgängig gemacht werden.",
        "categoryDeleted": "Die Kategorie wurde erfolgreich gelöscht.",
        "anErrorOccurred": "Ein Fehler ist aufgetreten. Bitte versuchen Sie noch einmal.",
        "archivedSuccessfully": "Die Kategorie wurde erfolgreich archiviert."
    }
}
</i18n>

<template>
    <div>
        <v-layout>
            <v-spacer />
            <v-flex xs12 md4 mb-4>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    :label="$t('search')"
                    single-line
                    hide-details
                    class="searchField"
                />
            </v-flex>
        </v-layout>

        <v-data-table
            :headers="headers"
            :items="categories"
            :search="search"
            expand
            item-key="id"
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td :style="{ backgroundColor: props.item.color, padding: 0 }" />
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.description }}</td>
                    <td class="text-xs-right">
                        <v-icon small class="mr-2" @click="props.expanded = true">
                            edit
                        </v-icon>
                        <v-icon
                            small
                            class="mr-2"
                            @click="deleteCategory(props.item.id)"
                            v-if="$vuetify.breakpoint.smAndUp"
                        >
                            delete
                        </v-icon>
                        <v-icon
                            small
                            @click="archiveCategory(props.item.id)"
                            v-if="$vuetify.breakpoint.smAndUp"
                        >
                            archive
                        </v-icon>
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat dark color="secondary">
                    <v-form lazy-validation @submit="submitEditCategory($event, props)">
                        <v-card-text>
                            <edit-category-form
                                :errors="editCategory.errors"
                                :error-message="editCategory.error"
                                :edit-category="{ ...props.item }"
                                @input="values => { editCategory.values[props.item.id] = values }"
                            />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn flat @click="deleteCategory(props.item.id)" color="red" small icon>
                                <v-icon>delete</v-icon>
                            </v-btn>

                            <v-btn flat @click="archiveCategory(props.item.id)" small>
                                <v-icon class="mr-2">archive</v-icon>
                                <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('archive') }}</span>
                            </v-btn>

                            <v-spacer />

                            <v-btn flat @click="props.expanded = false" small>
                                {{ $t('cancel') }}
                            </v-btn>

                            <v-btn
                                primary
                                flat
                                small
                                color="primary"
                                type="submit"
                                :loading="editCategory.loading"
                                :disabled="editCategory.loading"
                            >
                                <v-icon left v-if="$vuetify.breakpoint.smAndUp">save</v-icon>
                                {{ $t('save') }}
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </template>
        </v-data-table>

        <v-dialog v-model="confirmDialog" persistent max-width="350">
            <v-card>
                <v-card-text>{{ $t(confirmQuestion) }}</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn flat @click="confirmDialog = false">{{ $t('cancel') }}</v-btn>
                    <v-btn color="primary" @click="confirmDeleteCategory">{{ $t('ok') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions } from 'vuex';
    import eventBus from '../../../eventBus';

    import EditCategoryForm from './EditCategoryForm.vue';

    export default Vue.extend({
        components: {
            EditCategoryForm
        },
        props: {
            categories: Array
        },
        data() {
            return {
                search: '',
                editCategory: {
                    loading: false,
                    errors: {},
                    error: false,
                    values: {}
                },
                confirmDialog: false,
                confirmQuestion: '',
                deleteCategoryId: -1
            };
        },
        computed: {
            headers() {
                return [
                    { value: 'color', sortable: false, class: 'category-color-stripe' },
                    { text: this.$t('name'), value: 'name' },
                    { text: this.$t('description'), value: 'description' },
                    { value: 'id', sortable: false }
                ];
            }
        },
        methods: {
            ...mapActions('categories', [
                'saveCategory',
                'getCategories'
            ]),
            async submitEditCategory(event, props) {
                event.preventDefault();
                const values = this.editCategory.values[props.item.id];

                if (Object.keys(values).length <= 0) {
                    return;
                }

                this.editCategory.loading = true;

                if (!values.name) {
                    this.editCategory.errors.name = true;
                    this.editCategory.error = true;
                }
                else {
                    const editCategory = await this.saveCategory(values);

                    if (editCategory.code === 500) {
                        this.editCategory.error = true;
                    }
                    else {
                        props.expanded = false;
                    }
                }

                this.editCategory.loading = false;
            },
            deleteCategory(id) {
                this.confirmQuestion = 'confirmDelete';
                this.confirmDialog = true;
                this.deleteCategoryId = id;
            },
            async confirmDeleteCategory() {
                this.confirmDialog = false;
                eventBus.$emit('show-loader');

                const res = await this.$http.delete(`api/category/${this.deleteCategoryId}`);

                if (res.status === 201) {
                    await this.getCategories();
                    eventBus.$emit('show-alert', this.$t('categoryDeleted'));
                }
                else {
                    eventBus.$emit('show-alert', this.$t('anErrorOccurred'), true);
                }

                eventBus.$emit('close-loader');
            },
            async archiveCategory(id) {
                const category = { ...this.$store.getters['categories/getCategory'](id) };
                category.archived = true;

                const editedCategory = await this.saveCategory(category);
                if (editedCategory.code === 500) {
                    eventBus.$emit('show-alert', this.$t('anErrorOccurred'), true);
                }
                else {
                    eventBus.$emit('show-alert', this.$t('archivedSuccessfully'));
                }
            }
        }
    });
</script>

<style lang="scss">
    .category-color-stripe {
        padding: 0 !important;
        width: 5px;
    }
</style>

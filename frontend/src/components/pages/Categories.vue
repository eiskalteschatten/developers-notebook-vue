<i18n>
{
    "en": {
        "categories": "Categories",
        "newCategory": "New Category",
        "create": "Create",
        "archive": "Archive",
        "save": "Save",
        "cancel": "Cancel",
        "name": "Name",
        "description": "Description",
        "search": "Search"
    },
    "de": {
        "categories": "Kategorien",
        "newCategory": "Neue Kategorie",
        "create": "Erstellen",
        "archive": "Archivieren",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "name": "Name",
        "description": "Beschreibung",
        "search": "Suche"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ $t('categories') }}</h1>

        <v-layout wrap>
            <v-flex xs12 md2>
                <v-btn @click="newCategory.dialog = true">
                    {{ $t('newCategory') }}
                </v-btn>
            </v-flex>
            <v-flex xs12 md10>
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
                                        {{ $t('save') }}
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <v-dialog v-model="newCategory.dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">
                    {{ $t('newCategory') }}
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

    import EditCategoryForm from '../elements/categories/EditCategoryForm.vue';

    export default Vue.extend({
        components: {
            EditCategoryForm
        },
        data() {
            return {
                search: '',
                newCategory: {
                    dialog: false,
                    loading: false,
                    errors: {},
                    error: false,
                    values: {
                        archived: false
                    }
                },
                editCategory: {
                    loading: false,
                    errors: {},
                    error: false,
                    values: {}
                }
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            headers() {
                return [
                    { value: 'color', sortable: false, class: 'category-color-stripe' },
                    { text: this.$t('name'), value: 'name' },
                    { text: this.$t('description'), value: 'description' },
                    { value: 'id', sortable: false }
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
            },
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
            async deleteCategory(id) {
                console.log('delete category', id);
            },
            async archiveCategory(id) {
                console.log('archive category', id);
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

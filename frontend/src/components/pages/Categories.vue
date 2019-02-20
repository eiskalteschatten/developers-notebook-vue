<i18n>
{
    "en": {
        "categories": "Categories",
        "newCategory": "New Category",
        "create": "Create",
        "cancel": "Cancel",
        "name": "Name",
        "description": "Description"
    },
    "de": {
        "categories": "Kategorien",
        "newCategory": "Neue Kategorie",
        "create": "Erstellen",
        "cancel": "Abbrechen",
        "name": "Name",
        "description": "Beschreibung"
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
                <v-data-table
                    :headers="headers"
                    :items="categories"
                    expand
                    item-key="id"
                >
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.description }}</td>
                        </tr>
                    </template>
                    <template slot="expand" slot-scope="props">
                        <v-card flat dark>
                            <v-card-text>{{ props.item.name }}</v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>

        <v-dialog v-model="newCategory.dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">{{ $t('newCategory') }}</v-card-title>

                <v-form ref="form" lazy-validation @submit="createNewCategory">
                    <v-card-text>
                        <edit-category-form
                            :errors="newCategory.errors"
                            :error-message="newCategory.error"
                            :edit-category="newCategory.values"
                            @input="(values) => {newCategory.values = values}"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn flat="flat" @click="newCategory.dialog = false">
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
                newCategory: {
                    dialog: false,
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
            headers() {
                return [
                    { text: this.$t('name'), value: 'name' },
                    { text: this.$t('description'), value: 'description' }
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
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

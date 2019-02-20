<i18n>
{
    "en": {
        "categories": "Categories",
        "newCategory": "New Category",
        "create": "Create",
        "cancel": "Cancel"
    },
    "de": {
        "categories": "Kategorien",
        "newCategory": "Neue Kategorie",
        "create": "Erstellen",
        "cancel": "Abbrechen"
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
                test
            </v-flex>
        </v-layout>

        <v-dialog v-model="newCategory.dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">{{ $t('newCategory') }}</v-card-title>

                <v-form ref="form" lazy-validation @submit="createNewCategory">
                    <v-card-text>
                        <edit-category-form :errors="newCategory.errors" :errorMessage="newCategory.error" />
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
    import { mapActions } from 'vuex';

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
                    error: false
                }
            };
        },
        methods: {
            ...mapActions('categories', [
                'saveCategory'
            ]),
            createNewCategory() {
                this.newCategory.loading = true;



                this.newCategory.loading = false;
                this.newCategory.dialog = false;
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

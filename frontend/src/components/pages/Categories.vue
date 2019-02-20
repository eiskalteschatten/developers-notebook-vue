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
                <v-btn @click="newCategoryDialog = true">
                    {{ $t('newCategory') }}
                </v-btn>
            </v-flex>
            <v-flex xs12 md10>
                test
            </v-flex>
        </v-layout>

        <v-dialog v-model="newCategoryDialog" max-width="600">
            <v-card>
                <v-card-title class="headline">{{ $t('newCategory') }}</v-card-title>

                <v-form ref="form" lazy-validation @submit="createNewCategory">
                    <v-card-text>
                        <edit-category-form :errors="newCategoryErrors" />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn flat="flat" @click="newCategoryDialog = false">
                            {{ $t('cancel') }}
                        </v-btn>

                        <v-btn
                            primary
                            color="primary"
                            type="submit"
                            :loading="newCategoryLoading"
                            :disabled="newCategoryLoading"
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

    import EditCategoryForm from '../elements/categories/EditCategoryForm.vue';

    export default Vue.extend({
        components: {
            EditCategoryForm
        },
        data() {
            return {
                newCategoryDialog: false,
                newCategoryLoading: false,
                newCategoryErrors: {}
            };
        },
        methods: {
            createNewCategory() {
                this.newCategoryDialog = false;
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

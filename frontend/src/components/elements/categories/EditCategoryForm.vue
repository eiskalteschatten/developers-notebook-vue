<i18n>
{
    "en": {
        "newCategory": "New Category",
        "name": "Name",
        "description": "Description",
        "color": "Color",
        "parentCategory": "Parent Category",
        "required": "Required",
        "anErrorOccurred": "An error occurred while trying to save the category. Please try again"
    },
    "de": {
        "newCategory": "Neue Kategorie",
        "name": "Name",
        "description": "Beschreibung",
        "color": "Farbe",
        "parentCategory": "Oberkategorie",
        "required": "Erforderlich",
        "anErrorOccurred": "Ein Fehler ist beim Speichern der Kategorie aufgetreten. Bitte versuchen Sie noch einmal."
    }
}
</i18n>

<template>
    <v-container grid-list-md>
        <v-alert
            :value="errorMessage"
            type="error"
            class="mb-4"
        >
            {{ $t('anErrorOccurred') }}
        </v-alert>

        <input type="hidden" v-model="editCategory.id">

        <v-text-field
            v-model="editCategory.name"
            :label="$t('name')"
            :rules="rules"
            :error="errors.name"
        />

        <v-textarea v-model="editCategory.description" :label="$t('description')" />

        <v-combobox
            v-model="editCategory.parentId"
            :items="parentCategories"
            :label="$t('parentCategory')"
            single-line
            :return-object="false"
        />

        <v-subheader>{{ $t('color') }}</v-subheader>

        <swatches
            v-model="editCategory.color"
            inline
            colors="material-basic"
        />
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    import Swatches from 'vue-swatches';
    import 'vue-swatches/dist/vue-swatches.min.css';

    export default Vue.extend({
        components: {
            Swatches
        },
        props: {
            errors: Object,
            errorMessage: Boolean,
            editCategory: Object
        },
        data() {
            return {
                rules: [
                    value => !!value || this.$t('required')
                ]
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            parentCategories() {
                return this.categories.map(category => {
                    return {
                        value: category.id,
                        text: category.name
                    };
                });
            }
        },
        watch: {
            editCategory() {
                this.$emit('input', this.editCategory);
            }
        }
    });
</script>

<style lang="scss">
    .vue-swatches__container {
        background-color: transparent !important;
    }
</style>

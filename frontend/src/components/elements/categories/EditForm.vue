<i18n>
{
    "en": {
        "name": "Name",
        "description": "Description",
        "color": "Color",
        "parentCategory": "Parent Category",
        "required": "Required",
        "anErrorOccurred": "An error occurred while trying to save the category. Please try again."
    },
    "de": {
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

        <input type="hidden" v-model="category.id">

        <v-text-field
            v-model="category.name"
            :label="$t('name')"
            :rules="rules"
            :error="errors.name"
            prepend-icon="category"
        />

        <v-textarea v-model="category.description" :label="$t('description')" prepend-icon="description" />

        <v-combobox
            v-model="selectedParentCategory"
            :items="getComboBoxCategories()"
            :label="$t('parentCategory')"
            single-line
            class="mb-3"
            prepend-icon="category"
        />

        <h4>{{ $t('color') }}</h4>
        <swatches
            v-model="category.color"
            inline
            colors="material-basic"
        />
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapGetters } from 'vuex';

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
                ],
                category: this.editCategory || {}
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            selectedParentCategory: {
                get() {
                    const parentId = this.category.parentId;

                    if (!parentId) {
                        return '';
                    }

                    const category = this.$store.getters['categories/getCategory'](parentId);

                    return category
                        ? {
                            value: parentId,
                            text: category.name
                        }
                        : '';
                },
                set(parentCategoryObj) {
                    this.category.parentId = parentCategoryObj ? parentCategoryObj.value : '';
                }
            }
        },
        watch: {
            category: {
                handler() {
                    this.$emit('input', this.category);
                },
                deep: true
            }
        },
        methods: {
            ...mapGetters('categories', [
                'getComboBoxCategories'
            ])
        }
    });
</script>

<style lang="scss">
    .vue-swatches__container {
        background-color: transparent !important;
    }
</style>

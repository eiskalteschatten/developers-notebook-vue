<i18n>
{
    "en": {
        "newCategory": "New Category",
        "name": "Name",
        "slug": "Slug",
        "automaticallyGenerated": "automatically generated if left empty",
        "description": "Description",
        "color": "Color",
        "parentCategory": "Parent Category"
    },
    "de": {
        "newCategory": "Neue Kategorie",
        "name": "Name",
        "slug": "Slug",
        "automaticallyGenerated": "wird automatisch generiert, wenn leer gelassen",
        "description": "Beschreibung",
        "color": "Farbe",
        "parentCategory": "Oberkategorie"
    }
}
</i18n>

<template>
    <v-container grid-list-md>
        <v-text-field
            v-model="editCategory.name"
            :label="$t('name')"
            :rules="rules"
            :error="errors.name"
        />

        <v-text-field v-model="editCategory.slug" :label="$t('slug')" />

        <v-textarea v-model="editCategory.description" :label="$t('description')" />

        <v-text-field v-model="editCategory.parentCategory" :label="$t('parentCategory')" />

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

    import Swatches from 'vue-swatches';
    import 'vue-swatches/dist/vue-swatches.min.css';

    export default Vue.extend({
        components: {
            Swatches
        },
        props: {
            errors: Object
        },
        data() {
            return {
                rules: [
                    value => !!value || this.$t('required')
                ],
                editCategory: {}
            };
        }
    });
</script>

<style lang="scss">
    .vue-swatches__container {
        background-color: transparent !important;
    }
</style>

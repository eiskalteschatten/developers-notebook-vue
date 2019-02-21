<i18n>
{
    "en": {
        "category": "Category"
    },
    "de": {
        "category": "Kategorie"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ category.name }}</h1>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    import { routeTitles } from '../../../router';

    export default Vue.extend({
        props: {
            id: [String, Number]
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            category() {
                return this.$store.getters['categories/getCategory'](this.id);
            }
        },
        mounted() {
            document.title = `${this.category.name} - ${this.$t('category')} - ${routeTitles.primaryTitle}`;
        }
    });
</script>

<style lang="scss" scoped>

</style>

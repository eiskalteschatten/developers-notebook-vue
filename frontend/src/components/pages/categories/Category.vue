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
    import { mapActions } from 'vuex';
    import eventBus from '../../../eventBus';

    import { setDocumentTitle } from '../../../router';

    export default Vue.extend({
        props: {
            id: [String, Number]
        },
        data() {
            return {
                related: {}
            };
        },
        computed: {
            category() {
                return this.$store.getters['categories/getCategory'](this.id);
            }
        },
        async mounted() {
            await this.getCategories();
            setDocumentTitle(`${this.category.name} - ${this.$t('category')}`);
            await this.getCategoryRelated();
        },
        methods: {
            ...mapActions('categories', [
                'getCategories'
            ]),
            async getCategoryRelated() {
                eventBus.$emit('show-loader');

                this.related = await this.$http.get(`api/category/related/${this.id}`);

                eventBus.$emit('close-loader');
            }
        }
    });
</script>

<style lang="scss" scoped>

</style>

<i18n>
{
    "en": {
        "categories": "Categories"
    },
    "de": {
        "categories": "Kategorien"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ $t('categories') }}</h1>

        test
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                drawer: !this.$vuetify.breakpoint.smAndDown
            };
        }
    });
</script>

<style lang="scss" scoped>
    .drawer {
        float: right;
    }
</style>

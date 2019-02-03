<i18n>
{
    "en": {
        "alexseifertWebsite": "https://www.alexseifert.com"
    },
    "de": {
        "alexseifertWebsite": "https://www.alexseifert.de"
    }
}
</i18n>

<template>
    <div>
        &copy; {{ copyrightYear }} <a :href="$t('alexseifertWebsite')" target="_blank">Alex Seifert</a>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        computed: {
            copyrightYear() {
                const year = new Date().getFullYear();
                return year === 2019 ? year : `2019 - ${year}`;
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

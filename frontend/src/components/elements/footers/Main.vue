<i18n>
{
    "en": {
        "chooseLanguage": "Choose Language",
        "alexseifertWebsite": "https://www.alexseifert.com"
    },
    "de": {
        "chooseLanguage": "Sprache auswählen",
        "alexseifertWebsite": "https://www.alexseifert.de"
    }
}
</i18n>

<template>
    <v-footer class="mt-5" height="auto">
        <v-layout>
            <v-flex xs12 sm6>
                <language-switcher />
            </v-flex>

            <v-flex py-3 pr-3 text-xs-right xs12 sm6>
                &copy; {{ copyrightYear }} <a :href="$t('alexseifertWebsite')" target="_blank">Alex Seifert</a>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    import Vue from 'vue';

    import LanguageSwitcher from '../LanguageSwitcher.vue';

    export default Vue.extend({
        components: {
            LanguageSwitcher
        },
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

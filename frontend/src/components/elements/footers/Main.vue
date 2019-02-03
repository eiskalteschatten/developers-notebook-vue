<i18n>
{
    "en": {
        "chooseLanguage": "Sprache auswählen"
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
                <copyright />
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    import Vue from 'vue';

    import LanguageSwitcher from '../LanguageSwitcher.vue';
    import Copyright from './elements/Copyright.vue';

    export default Vue.extend({
        components: {
            LanguageSwitcher,
            Copyright
        }
    });
</script>

<style lang="scss" scoped>
</style>

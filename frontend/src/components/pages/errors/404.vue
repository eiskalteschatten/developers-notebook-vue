<i18n>
{
    "en": {
        "pageNotFound": "Page not found",
        "pageNotFoundSentence": "This page could not be found. Please check the URL or try again from the homepage."
    },
    "de": {
        "pageNotFound": "Seite nicht gefunden",
        "pageNotFoundSentence": "Diese Seite konnte nicht gefunden werden. Bitte prüfen Sie die URL oder versuchen Sie noch einmal von der Startseite."
    }
}
</i18n>

<template>
    <div>
        <h1 class="page-title">{{ $t('pageNotFound') }}</h1>
        <p>{{ $t('pageNotFoundSentence') }}</p>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss">

</style>

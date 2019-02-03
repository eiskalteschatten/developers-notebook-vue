<template>
    <footer class="mt-4 text-xs-center">
        <language-switcher />
    </footer>
</template>

<script>
    import Vue from 'vue';

    import LanguageSwitcher from '../LanguageSwitcher.vue';

    export default Vue.extend({
        components: {
            LanguageSwitcher
        }
    });
</script>

<style lang="scss" scoped>
</style>

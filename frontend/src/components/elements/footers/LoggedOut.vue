<template>
    <footer class="mt-4 text-xs-center">
        <language-switcher />
        <div class="py-3">
            <copyright />
        </div>
    </footer>
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

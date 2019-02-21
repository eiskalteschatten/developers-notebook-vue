<i18n>
{
    "en": {
        "loading": "Loading"
    },
    "de": {
        "loading": "Wird geladen"
    }
}
</i18n>

<template>
    <v-snackbar v-model="snackbar" bottom left>
        <v-layout>
            <v-flex xs2>
                <v-progress-circular indeterminate size="16" width="2" />
            </v-flex>
            <v-flex xs10>
                {{ $t('loading') }}...
            </v-flex>
        </v-layout>
    </v-snackbar>
</template>

<script>
    import Vue from 'vue';
    import eventBus from '../../eventBus';

    export default Vue.extend({
        data() {
            return {
                snackbar: false
            };
        },
        created() {
            eventBus.$on('show-loader', this.showLoader);
            eventBus.$on('close-loader', this.closeLoader);
        },
        methods: {
            showLoader(message, isError = false) {
                this.snackbar = true;
                this.isError = isError;
            },
            closeLoader() {
                this.snackbar = false;
            }
        }
    });
</script>

<style lang="scss">

</style>

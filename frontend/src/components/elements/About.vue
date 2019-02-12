<i18n>
{
    "en": {
        "about": "About Developer's Notebook"
    },
    "de": {
        "about": "Über Developer's Notebook"
    }
}
</i18n>

<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-text>
                {{ $t('about') }}
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import Vue from 'vue';
    import eventBus from '../../eventBus';

    export default Vue.extend({
        data() {
            return {
                dialog: false
            };
        },
        created() {
            eventBus.$on('open-modal', () => {
                this.dialog = true;
            });
        },
        destroyed() {
            eventBus.$off('open-modal');
        }
    });
</script>

<style lang="scss">

</style>

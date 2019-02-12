<i18n>
{
    "en": {
        "settings": "Settings"
    },
    "de": {
        "settings": "Einstellungen"
    }
}
</i18n>

<template>
    <centered-column>
        <v-card class="pa-2 mb-5">
            <v-card-title primary-title>
                <h1>{{ $t('settings') }}</h1>
            </v-card-title>
        </v-card>
    </centered-column>
</template>

<script>
    import Vue from 'vue';

    import CenteredColumn from '../elements/layout/CenteredColumn.vue';

    export default Vue.extend({
        components: {
            CenteredColumn
        },
    });
</script>

<style lang="scss" scoped>

</style>

<i18n>
{
    "en": {
        "accountSettings": "Account Settings"
    },
    "de": {
        "accountSettings": "Kontoeinstellungen"
    }
}
</i18n>

<template>
    <v-layout>
        <centered-column>
            <v-card class="pa-3">
                <h1>{{ $t('accountSettings') }}</h1>
            </v-card>
        </centered-column>
    </v-layout>
</template>

<script>
    import Vue from 'vue';

    import CenteredColumn from '../elements/layout/CenteredColumn.vue';

    export default Vue.extend({
        components: {
            CenteredColumn
        }
    });
</script>

<style lang="scss">

</style>

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
        <centered-colunn>
            <v-card class="pa-3">
                <h1>{{ $t('accountSettings') }}</h1>
            </v-card>
        </centered-colunn>
    </v-layout>
</template>

<script>
    import Vue from 'vue';

    import CenteredColunn from '../elements/layout/CenteredColumn.vue';

    export default Vue.extend({
        components: {
            CenteredColunn
        }
    });
</script>

<style lang="scss">

</style>

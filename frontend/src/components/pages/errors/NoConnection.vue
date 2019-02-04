<i18n>
{
    "en": {
        "tryAgain": "Try Again",
        "noConnection": "No Connection to the Server",
        "noConnectionText": "Developer's Notebook cannot connect to the server."
    },
    "de": {
        "tryAgain": "Noch einmal versuchen",
        "noConnection": "Keine Verbindung zum Server",
        "noConnectionText": "Developer's Notebook kann nicht mit dem Server verbinden."
    }
}
</i18n>

<template>
    <v-layout>
        <v-flex xs12 md6 offset-md3>
            <v-card class="mt-5">
                <v-card-title primary-title>
                    <div class="headline">{{ $t('noConnection') }}</div>
                </v-card-title>
                <v-card-text>
                    <v-alert
                        :value="true"
                        type="error"
                        class="mb-4"
                    >
                        {{ $t('noConnectionText') }}
                    </v-alert>
                </v-card-text>
                <v-card-actions class="pl-3 pr-3 pb-3">
                    <v-flex xs12 class="text-xs-right">
                        <v-btn
                            primary
                            color="primary"
                            @click="refresh"
                            :loading="loading"
                            :disabled="loading"
                        >
                            {{ $t('tryAgain') }}
                        </v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                loading: false
            };
        },
        created() {
            if (this.currentJwt) {
                this.$router.push({ name: 'home' });
            }
        },
        methods: {
            async refresh() {
                this.loading = true;

                if (loggedIn) {
                    this.$router.replace({ name: 'home' });
                }

                this.loading = false;
            }
        }
    });
</script>

<style lang="scss">

</style>

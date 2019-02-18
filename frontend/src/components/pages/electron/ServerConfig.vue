<i18n>
{
    "en": {
        "host": "Host",
        "save": "Save",
        "required": "Required",
        "configureServer": "Configure Server",
        "description": "Enter the host of the server application. Both the protocol as well as the port (if applicable) must be included.",
        "couldNotConnectToServer": "There was an error connecting to the server."
    },
    "de": {
        "host": "Host",
        "save": "Speichern",
        "required": "Erforderlich",
        "configureServer": "Server konfigurieren",
        "description": "Geben Sie den Host des Anwendungsservers ein. Sowohl das Protokoll als auch der Port (falls nötig) müssen mit eingegeben werden.",
        "couldNotConnectToServer": "Die Serververbindung ist fehlgeschlagen."
    }
}
</i18n>

<template>
    <v-layout>
        <v-flex xs12 md6 offset-md3>
            <v-card class="mt-5">
                <v-card-title primary-title>
                    <div class="headline">{{ $t('configureServer') }}</div>
                </v-card-title>
                <v-card-text>
                    {{ $t('description') }}
                </v-card-text>
                <v-form ref="form" lazy-validation @submit="submit">
                    <v-card-text>
                        <v-alert
                            :value="error"
                            type="error"
                            class="mb-4"
                        >
                            {{ $t(errorMessage) }}
                        </v-alert>

                        <v-text-field
                            :label="$t('host')"
                            data-vv-name="host"
                            :rules="rules"
                            v-model="host"
                            placeholder="https://www.your-server.com:3021"
                            :error="hostError"
                        />
                    </v-card-text>
                    <v-card-actions class="pl-3 pr-3 pb-3">
                        <v-flex xs12 class="text-xs-right">
                            <v-btn
                                primary
                                color="primary"
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                            >
                                {{ $t('save') }}
                            </v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import { setRoot } from '../../../http';

    export default Vue.extend({
        data() {
            return {
                host: '',
                hostError: false,
                rules: [
                    value => !!value || this.$t('required')
                ],
                loading: false,
                error: false,
                errorMessage: ''
            };
        },
        methods: {
            async submit(event) {
                event.preventDefault();

                if (!this.host) {
                    this.hostError = true;
                    return;
                }

                this.loading = true;
                let canConnectToServer = false;

                try {
                    const res = await this.$http.get(`${this.host}/status/is-dev-notebook`);
                    canConnectToServer = res.body === 'true';
                }
                catch(error) {
                    canConnectToServer = false;
                }

                if (canConnectToServer) {
                    localStorage.setItem('serverConfigHost', this.host);
                    setRoot(this.host);
                    this.$router.replace({ name: 'login' });
                }
                else {
                    this.error = true;
                    this.errorMessage = 'couldNotConnectToServer';
                }

                this.loading = false;
            }
        }
    });
</script>

<style lang="scss">

</style>

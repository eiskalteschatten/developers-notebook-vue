<i18n>
{
    "en": {
        "host": "Host",
        "save": "Save",
        "required": "Required",
        "configureServer": "Configure Server",
        "couldNotConnectToServer": "There was an error connecting to the server."
    },
    "de": {
        "host": "Host",
        "save": "Speichern",
        "required": "Erforderlich",
        "configureServer": "Server konfigurieren",
        "couldNotConnectToServer": "Die Serververbindung ist fehlgeschlagen."
    }
}
</i18n>

<template>
    <div>
        <toolbar />
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card class="mt-4">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ $t('configureServer') }}</div>
                        </div>
                    </v-card-title>
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
    </div>
</template>

<script>
    import Vue from 'vue';
    import { setRoot } from '../../../http';

    import Toolbar from '../../elements/toolbars/LoggedOut.vue';

    export default Vue.extend({
        components: {
            Toolbar
        },
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

                this.loading = false;

                if (canConnectToServer) {
                    localStorage.setItem('serverConfigHost', this.host);
                    setRoot(this.host);
                    this.$router.replace({ name: 'login' });
                }
                else {
                    this.error = true;
                    this.errorMessage = 'couldNotConnectToServer';
                }
            }
        }
    });
</script>

<style lang="scss">

</style>

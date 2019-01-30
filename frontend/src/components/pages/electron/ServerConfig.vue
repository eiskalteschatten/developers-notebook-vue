<i18n>
{
    "en": {
        "host": "Host",
        "login": "Login",
        "username": "Username",
        "password": "Password",
        "save": "Save",
        "required": "Required",
        "configureServer": "Configure Server",
        "couldNotConnectToServer": "There was an error connecting to the server."
    },
    "de": {
        "host": "Host",
        "login": "Anmeldung",
        "username": "Benutzername",
        "password": "Passwort",
        "save": "Speichern",
        "required": "Erforderlich",
        "configureServer": "Server konfigurieren",
        "couldNotConnectToServer": "Die Serververbindung ist fehlgeschlagen."
    }
}
</i18n>

<template>
    <div>
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
                                :error="hostError"
                            />
                            <v-text-field
                                :label="$t('username')"
                                data-vv-name="username"
                                :rules="rules"
                                v-model="username"
                                :error="usernameError"
                            />
                            <v-text-field
                                :label="$t('password')"
                                type="password"
                                data-vv-name="password"
                                :rules="rules"
                                v-model="password"
                                :error="passwordError"
                            />
                        </v-card-text>
                        <v-card-actions class="pl-3 pr-3 pb-3">
                            <v-space />
                            <v-btn
                                primary
                                color="primary"
                                type="submit"
                                :loading="loading"
                                :disabled="loading"
                            >
                                {{ $t('save') }}
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                host: '',
                username: '',
                password: '',
                hostError: false,
                usernameError: false,
                passwordError: false,
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

                if (!this.username) {
                    this.usernameError = true;
                    return;
                }

                if (!this.password) {
                    this.passwordError = true;
                    return;
                }

                this.loading = true;
                // Check server connection here before saving to localStorage
                const canConnectToServer = true;
                this.loading = false;

                if (canConnectToServer) {
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

<i18n>
{
    "en": {
        "login": "Login",
        "username": "Username",
        "password": "Password",
        "loginVerb": "Log In",
        "required": "Required",
        "chooseLanguage": "Choose Language",
        "incorrectUsernameOrPassword": "Incorrect username or password."
    },
    "de": {
        "login": "Anmeldung",
        "username": "Benutzername",
        "password": "Passwort",
        "loginVerb": "Anmelden",
        "required": "Erforderlich",
        "chooseLanguage": "Sprache auswählen",
        "incorrectUsernameOrPassword": "Falscher Benutzername oder falsches Passwort."
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
                            <div class="headline">Developer's Notebook &mdash; {{ $t('login') }}</div>
                        </div>
                    </v-card-title>
                    <v-form ref="form" lazy-validation>
                        <v-card-text>
                            <v-alert
                                :value="errorLoggingIn"
                                type="error"
                                class="mb-4"
                            >
                                {{ $t('incorrectUsernameOrPassword') }}
                            </v-alert>

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
                            <v-flex xs6>
                                <v-menu offset-y>
                                    <v-btn slot="activator">
                                        {{ $t('chooseLanguage') }}
                                        <v-icon dark>arrow_drop_down</v-icon>
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile
                                            v-for="(language, index) in languages"
                                            :key="index"
                                            @click="switchLanguages(language.code)"
                                        >
                                            <v-list-tile-title>{{ language.title }}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </v-flex>
                            <v-flex xs6 class="text-xs-right">
                                <v-btn
                                    primary
                                    color="primary"
                                    @click="submit"
                                    :loading="loading"
                                    :disabled="loading"
                                >
                                    {{ $t('loginVerb') }}
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
    import { mapState, mapActions } from 'vuex';

    export default Vue.extend({
        data() {
            return {
                username: '',
                password: '',
                usernameError: false,
                passwordError: false,
                rules: [
                    value => !!value || this.$t('required')
                ],
                loading: false,
                errorLoggingIn: false
            };
        },
        computed: {
            ...mapState('user', [
                'currentJwt'
            ]),
            ...mapState('settings', [
                'languages'
            ])
        },
        created() {
            if (this.currentJwt) {
                this.$router.push({ name: 'home' });
            }
        },
        methods: {
            ...mapActions('user', [
                'fetchJwt'
            ]),
            async submit() {
                if (!this.username) {
                    this.usernameError = true;
                    return;
                }

                if (!this.password) {
                    this.passwordError = true;
                    return;
                }

                this.loading = true;
                const loggedIn = await this.fetchJwt({
                    username: this.username,
                    password: this.password
                });
                this.loading = false;

                if (loggedIn) {
                    this.$router.replace({ name: 'home' });
                }
                else {
                    this.errorLoggingIn = true;
                }
            },
            switchLanguages(lang) {
                this.$router.push({ params: { lang } });
            }
        }
    });
</script>

<style lang="scss">

</style>

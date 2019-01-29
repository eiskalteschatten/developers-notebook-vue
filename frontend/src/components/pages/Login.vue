<i18n>
{
    "en": {
        "login": "Login",
        "username": "Username",
        "password": "Password",
        "loginVerb": "Log In",
        "required": "Required",
        "chooseLanguage": "Choose Language"
    },
    "de": {
        "login": "Anmeldung",
        "username": "Benutzername",
        "password": "Passwort",
        "loginVerb": "Anmelden",
        "required": "Erforderlich",
        "chooseLanguage": "Sprache auswählen"
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
                            <v-text-field
                                :label="$t('username')"
                                data-vv-name="username"
                                :rules="rules"
                                v-model="username"
                            />
                            <v-text-field
                                :label="$t('password')"
                                type="password"
                                data-vv-name="password"
                                :rules="rules"
                                v-model="password"
                            />
                        </v-card-text>
                        <v-card-actions class="pl-3 pr-3 pb-3">
                            <v-flex xs6>
                                <v-menu offset-y>
                                    <v-btn slot="activator">
                                        {{ $t('chooseLanguage') }}
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
                                <v-btn primary color="primary" @click="submit">{{ $t('loginVerb') }}</v-btn>
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
                rules: [
                    value => !!value || this.$t('required')
                ]
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
            submit() {
                if (this.username && this.password) {
                    this.fetchJwt(this.username, this.password);
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

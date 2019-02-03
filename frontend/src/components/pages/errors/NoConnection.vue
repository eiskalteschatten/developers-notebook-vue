<i18n>
{
    "en": {
        "login": "Login",
        "username": "Username",
        "password": "Password",
        "loginVerb": "Log In",
        "required": "Required",
        "incorrectUsernameOrPassword": "Incorrect username or password."
    },
    "de": {
        "login": "Anmeldung",
        "username": "Benutzername",
        "password": "Passwort",
        "loginVerb": "Anmelden",
        "required": "Erforderlich",
        "incorrectUsernameOrPassword": "Falscher Benutzername oder falsches Passwort."
    }
}
</i18n>

<template>
    <v-layout>
        <v-flex xs12 md6 offset-md3>
            <v-card class="mt-5">
                <v-card-title primary-title>
                    <div class="headline">{{ $t('login') }}</div>
                </v-card-title>
                <v-card-text>
                    <v-alert
                        :value="true"
                        type="error"
                        class="mb-4"
                    >
                        {{ $t('incorrectUsernameOrPassword') }}
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
                            {{ $t('loginVerb') }}
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

<i18n>
{
    "en": {
        "login": "Login",
        "username": "Username",
        "password": "Password",
        "loginVerb": "Log In"
    },
    "de": {
        "login": "Anmeldung",
        "username": "Benutzername",
        "password": "Passwort",
        "loginVerb": "Anmelden"
    }
}
</i18n>

<template>
    <div>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">{{ $t('login') }}</div>
                        </div>
                    </v-card-title>
                    <v-form ref="form" lazy-validation>
                        <v-card-text>
                            <v-text-field
                                :label="$t('username')"
                                data-vv-name="username"
                                :rules="[required]"
                                v-model="username"
                            />
                            <v-text-field
                                :label="$t('password')"
                                type="password"
                                data-vv-name="password"
                                :rules="[required]"
                                v-model="password"
                            />
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="submit">{{ $t('loginVerb') }}</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    export default Vue.extend({
        data() {
            return {
                username: '',
                password: ''
            };
        },
        computed: {
            ...mapState('user', [
                'currentJwt'
            ])
        },
        created() {
            if (this.currentJwt) {
                this.$router.push({ name: 'home' });
            }
        },
        methods: {
            submit() {
                console.log(this.username, this.password);
            },
            required(value) {
                return value ? true : false;
            }
        }
    });
</script>

<style lang="scss">

</style>

<i18n>
{
    "en": {
        "accountSettings": "Account Settings",
        "username": "Username",
        "firstName": "First Name",
        "lastName": "Last Name",
        "emailAddress": "Email Address",
        "password": "Password",
        "required": "Required",
        "incorrectUsernameOrPassword": "Incorrect username or password.",
        "save": "Save"
    },
    "de": {
        "accountSettings": "Kontoeinstellungen",
        "username": "Benutzername",
        "firstName": "Vorname",
        "lastName": "Nachname",
        "emailAddress": "Emailadresse",
        "password": "Passwort",
        "required": "Erforderlich",
        "incorrectUsernameOrPassword": "Falscher Benutzername oder falsches Passwort.",
        "save": "Speichern"
    }
}
</i18n>

<template>
    <v-layout>
        <centered-column>
            <v-card class="pa-3">
                <v-card-title primary-title>
                    <h1>{{ $t('accountSettings') }}</h1>
                </v-card-title>
                <v-form ref="form" lazy-validation @submit="submit">
                    <v-card-text>
                        <v-alert
                            :value="alertMessage"
                            :type="alertType"
                            class="mb-4"
                        >
                            {{ $t('incorrectUsernameOrPassword') }}
                        </v-alert>

                        <v-text-field
                            :label="$t('username')"
                            data-vv-name="username"
                            disabled
                            v-model="values.username"
                        />
                        <v-text-field
                            :label="$t('firstName')"
                            data-vv-name="firstName"
                            :rules="rules"
                            v-model="values.firstName"
                            :error="errors.firstNameError"
                        />
                        <v-text-field
                            :label="$t('lastName')"
                            data-vv-name="lastName"
                            :rules="rules"
                            v-model="values.lastName"
                            :error="errors.lastNameError"
                        />
                        <v-text-field
                            :label="$t('emailAddress')"
                            type="email"
                            data-vv-name="email"
                            :rules="rules"
                            v-model="values.emailAddress"
                            :error="errors.emailError"
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
        </centered-column>
    </v-layout>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    import CenteredColumn from '../elements/layout/CenteredColumn.vue';

    export default Vue.extend({
        components: {
            CenteredColumn
        },
        data() {
            return {
                errors: {},
                rules: [
                    value => !!value || this.$t('required')
                ],
                values: {},
                loading: false,
                alertMessage: '',
                alertType: 'success'
            };
        },
        computed: {
            ...mapState('user', {
                userInfo: 'info'
            })
        },
        watch: {
            userInfo(userInfo) {
                this.values = userInfo;
            }
        },
        methods: {
            ...mapActions('user', [
                'saveUserInfo'
            ]),
            async submit(event) {
                event.preventDefault();

                // if (!this.username) {
                //     this.usernameError = true;
                //     return;
                // }

                // if (!this.password) {
                //     this.passwordError = true;
                //     return;
                // }

                // this.loading = true;
                // const loggedIn = await this.fetchJwt({
                //     username: this.username,
                //     password: this.password
                // });
                // this.loading = false;

                // if (loggedIn) {
                //     this.$router.replace({ name: 'home' });
                // }
                // else {
                //     this.errorLoggingIn = true;
                // }
            }
        }
    });
</script>

<style lang="scss">

</style>

<i18n>
{
    "en": {
        "accountSettings": "Account Settings",
        "username": "Username",
        "firstName": "First Name",
        "lastName": "Last Name",
        "emailAddress": "Email Address",
        "changePassword": "Change Password",
        "currentPassword": "Current Password",
        "password": "Password",
        "confirmPassword": "Confirm New Password",
        "required": "Required",
        "allFieldsRequired": "Please fill out all fields!",
        "changesSaved": "Your changes were successfully saved.",
        "anErrorOccurred": "An error occurred while trying to save your changes. Please try again.",
        "save": "Save"
    },
    "de": {
        "accountSettings": "Kontoeinstellungen",
        "username": "Benutzername",
        "firstName": "Vorname",
        "lastName": "Nachname",
        "emailAddress": "Emailadresse",
        "changePassword": "Passwort ändern",
        "currentPassword": "Aktuelles Passwort",
        "password": "Passwort",
        "confirmPassword": "Neues Passwort bestätigen",
        "required": "Erforderlich",
        "allFieldsRequired": "Bitte alle Felder ausfüllen!",
        "changesSaved": "Ihre Änderungen wurden erfolgreich gespeichert.",
        "anErrorOccurred": "Ein Fehler ist beim Speichern Ihrer Änderungen aufgetreten. Bitte versuchen Sie noch einmal.",
        "save": "Speichern"
    }
}
</i18n>

<template>
    <v-layout>
        <centered-column>
            <v-card class="pa-3 mb-5">
                <v-card-title primary-title>
                    <h1>{{ $t('accountSettings') }}</h1>
                </v-card-title>
                <v-form ref="form" lazy-validation @submit="submit">
                    <v-card-text>
                        <v-alert
                            :value="alert"
                            :type="alertType"
                            class="mb-4"
                        >
                            {{ $t(alertMessage) }}
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
                            :error="errors.firstName"
                        />
                        <v-text-field
                            :label="$t('lastName')"
                            data-vv-name="lastName"
                            :rules="rules"
                            v-model="values.lastName"
                            :error="errors.lastName"
                        />
                        <v-text-field
                            :label="$t('emailAddress')"
                            type="email"
                            data-vv-name="email"
                            :rules="rules"
                            v-model="values.emailAddress"
                            :error="errors.email"
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

            <v-card class="pa-3">
                <v-card-title primary-title>
                    <h1>{{ $t('changePassword') }}</h1>
                </v-card-title>
                <v-form ref="passwordForm" lazy-validation @submit="submitPassword">
                    <v-card-text>
                        <v-alert
                            :value="passwordAlert"
                            :type="passwordAlertType"
                            class="mb-4"
                        >
                            {{ $t(passwordAlertMessage) }}
                        </v-alert>

                        <v-text-field
                            :label="$t('currentPassword')"
                            type="password"
                            data-vv-name="currentPassword"
                            :rules="rules"
                            v-model="passwords.currentPassword"
                            :error="errors.currentPassword"
                        />
                        <v-text-field
                            :label="$t('password')"
                            type="password"
                            data-vv-name="password"
                            :rules="rules"
                            v-model="passwords.password"
                            :error="errors.password"
                        />
                        <v-text-field
                            :label="$t('confirmPassword')"
                            type="password"
                            data-vv-name="confirmPassword"
                            :rules="rules"
                            v-model="passwords.confirmPassword"
                            :error="errors.confirmPassword"
                        />
                    </v-card-text>
                    <v-card-actions class="pl-3 pr-3 pb-3">
                        <v-flex xs12 class="text-xs-right">
                            <v-btn
                                primary
                                color="primary"
                                type="submit"
                                :loading="loadingPassword"
                                :disabled="loadingPassword"
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
                passwords: {
                    currentPassword: '',
                    password: '',
                    confirmPassword: ''
                },
                loading: false,
                loadingPassword: false,
                alert: false,
                alertMessage: '',
                alertType: 'success',
                passwordAlert: false,
                passwordAlertMessage: '',
                passwordAlertType: 'success'
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
        mounted() {
            this.values = this.userInfo;
        },
        methods: {
            ...mapActions('user', [
                'saveUserInfo'
            ]),
            async submit(event) {
                event.preventDefault();

                if (!this.allFieldsValid(this.values)) {
                    this.alertType = 'error';
                    this.alertMessage = 'allFieldsRequired';
                    this.alert = true;
                    return;
                }

                this.loading = true;

                const code = await this.saveUserInfo(this.values);

                this.loading = false;

                if (code >= 300) {
                    this.alertType = 'error';
                    this.alertMessage = 'anErrorOccurred';
                }
                else {
                    this.alertType = 'success';
                    this.alertMessage = 'changesSaved';
                }

                this.alert = true;
            },
            async submitPassword(event) {
                event.preventDefault();

                if (!this.allFieldsValid(this.passwords)) {
                    this.passwordAlertType = 'error';
                    this.passwordAlertMessage = 'allFieldsRequired';
                    this.passwordAlert = true;
                    return;
                }

                this.loading = true;

                // Save passwords here
                const code = 200;

                this.loading = false;

                if (code >= 300) {
                    this.passwordAlertType = 'error';
                    this.passwordAlertMessage = 'anErrorOccurred';
                }
                else {
                    this.passwordAlertType = 'success';
                    this.passwordAlertMessage = 'changesSaved';
                }

                this.passwordAlert = true;
            },
            allFieldsValid(fields) {
                if (!fields || Object.keys(fields).length < 1) {
                    return false;
                }

                let allFieldsValid = true;

                for (const field in fields) {
                    if (!fields[field]) {
                        this.errors[field] = true;
                        allFieldsValid = false;
                    }
                }

                return allFieldsValid;
            }
        }
    });
</script>

<style lang="scss">

</style>

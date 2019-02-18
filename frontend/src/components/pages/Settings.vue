<i18n>
{
    "en": {
        "settings": "Settings",
        "theme": "Theme",
        "light": "Light",
        "dark": "Dark",
        "serverSettings": "Server Settings",
        "host": "Host",
        "save": "Save",
        "required": "Required",
        "allFieldsRequired": "Please fill out all fields!",
        "couldNotConnectToServer": "There was an error connecting to the server.",
        "changesSaved": "Your changes were successfully saved."
    },
    "de": {
        "settings": "Einstellungen",
        "theme": "Erscheinungsbild",
        "light": "Hell",
        "dark": "Dunkel",
        "serverSettings": "Servereinstellungen",
        "host": "Host",
        "save": "Speichern",
        "required": "Erforderlich",
        "allFieldsRequired": "Bitte alle Felder ausfüllen!",
        "couldNotConnectToServer": "Die Serververbindung ist fehlgeschlagen.",
        "changesSaved": "Ihre Änderungen wurden erfolgreich gespeichert."
    }
}
</i18n>

<template>
    <centered-column>
        <v-card class="pa-2 mb-5">
            <v-card-title primary-title>
                <h1>{{ $t('settings') }}</h1>
            </v-card-title>
            <v-card-text>
                <div class="mb-5">
                    <h3>{{ $t('theme') }}</h3>

                    <div class="preferences-theme mt-3 mr-5" @click="setTheme('light')">
                        <div class="theme-image light" :class="{ 'selected': theme === 'light' }">
                            <div class="gradient"></div>
                        </div>
                        {{ $t('light') }}
                    </div>
                    <div class="preferences-theme" @click="setTheme('dark')">
                        <div class="theme-image dark" :class="{ 'selected': theme === 'dark' }">
                            <div class="gradient"></div>
                        </div>
                        {{ $t('dark') }}
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <v-card class="pa-2 mb-5" v-if="isElectron">
            <v-card-title primary-title>
                <h3>{{ $t('serverSettings') }}</h3>
            </v-card-title>
            <v-form ref="form" lazy-validation @submit="submitServer">
                <v-card-text>
                    <v-alert
                        :value="serverAlert"
                        :type="serverAlertType"
                        class="mb-4"
                    >
                        {{ $t(serverAlertMessage) }}
                    </v-alert>
                    <v-text-field
                        :label="$t('host')"
                        data-vv-name="serverHost"
                        :rules="rules"
                        v-model="serverHost"
                        placeholder="https://www.your-server.com:3021"
                        :error="errors.serverHost"
                    />
                </v-card-text>
                <v-card-actions class="pl-3 pr-3 pb-3">
                    <v-flex xs12 class="text-xs-right">
                        <v-btn
                            primary
                            color="primary"
                            type="submit"
                            :loading="serverLoading"
                            :disabled="serverLoading"
                        >
                            {{ $t('save') }}
                        </v-btn>
                    </v-flex>
                </v-card-actions>
            </v-form>
        </v-card>
    </centered-column>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';
    import { setRoot } from '../../http';

    import CenteredColumn from '../elements/layout/CenteredColumn.vue';

    export default Vue.extend({
        components: {
            CenteredColumn
        },
        data() {
            return {
                isElectron: localStorage.getItem('isElectron'),
                errors: {},
                rules: [
                    value => !!value || this.$t('required')
                ],
                serverHost: localStorage.getItem('serverConfigHost'),
                serverLoading: false,
                serverAlert: false,
                serverAlertMessage: '',
                serverAlertType: 'success'
            };
        },
        computed: {
            ...mapState('settings', [
                'theme'
            ])
        },
        methods: {
            ...mapActions('settings', [
                'setTheme'
            ]),
            async submitServer(event) {
                event.preventDefault();

                if (!this.serverHost) {
                    this.serverAlertType = 'error';
                    this.serverAlertMessage = 'allFieldsRequired';
                    this.serverAlert = true;
                    this.errors.serverHost = true;
                    return;
                }
                else {
                    this.errors.serverHost = false;
                }

                this.loading = true;
                let canConnectToServer = false;

                try {
                    const res = await this.$http.get(`${this.serverHost}/status/is-dev-notebook`);
                    canConnectToServer = res.body === 'true';
                }
                catch(error) {
                    canConnectToServer = false;
                }

                if (canConnectToServer) {
                    localStorage.setItem('serverConfigHost', this.serverHost);
                    setRoot(this.serverHost);
                    this.serverAlertType = 'success';
                    this.serverAlertMessage = 'changesSaved';
                }
                else {
                    this.serverAlertType = 'error';
                    this.serverAlertMessage = 'couldNotConnectToServer';
                }

                this.serverAlert = true;
                this.loading = false;
                this.serverAlert = true;
            }
        }
    });
</script>

<style lang="scss" scoped>
    .preferences-theme {
        cursor: pointer;
        display: inline-block;
        text-align: center;

        .theme-image {
            $borderSize: 2px;
            height: 75px;
            margin-bottom: 10px;
            width: 100%;

            &.light {
                .gradient {
                    background-image: linear-gradient(to right, #000000 10%, #f3f3f3 10%, #f3f3f3 90%);
                }
            }

            &.dark {
                .gradient {
                    background-image: linear-gradient(to right, #000000 10%, #252525 10%, #252525 90%);
                }
            }

            &.selected {
                .gradient {
                    border: $borderSize solid #2261a1;
                }
            }

            .gradient {
                border: $borderSize solid rgba(0, 0, 0, 0.3);
                border-radius: 3px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                height: 100%;
                width: 120px;
            }
        }
    }
</style>
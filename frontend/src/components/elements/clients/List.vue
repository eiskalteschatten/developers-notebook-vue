<i18n>
{
    "en": {
        "archive": "Archive",
        "unarchive": "Restore",
        "save": "Save",
        "cancel": "Cancel",
        "no": "No",
        "yes": "Yes",
        "name": "Name",
        "companyName": "Company Name",
        "website": "Website",
        "email": "Email",
        "telephone": "Phone Number",
        "search": "Search",
        "confirmDelete": "Are you sure you want to delete this client? This cannot be undone.",
        "clientDeleted": "The client was successfully deleted.",
        "anErrorOccurred": "An error occurred. Please try again.",
        "archivedSuccessfully": "The customer was successfully archived.",
        "unarchivedSuccessfully": "The customer was successfully restored."
    },
    "de": {
        "archive": "Archivieren",
        "unarchive": "Wiederherstellen",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "no": "Nein",
        "yes": "Ja",
        "name": "Name",
        "companyName": "Firmenname",
        "website": "Webseite",
        "email": "Email",
        "telephone": "Telefonnummer",
        "search": "Suche",
        "confirmDelete": "Sind Sie sicher, dass Sie diesen Kunden löschen wollen? Dieser Vorgang kann nicht rückgängig gemacht werden.",
        "clientDeleted": "Der Kunde wurde erfolgreich gelöscht.",
        "anErrorOccurred": "Ein Fehler ist aufgetreten. Bitte versuchen Sie noch einmal.",
        "archivedSuccessfully": "Der Kunde wurde erfolgreich archiviert.",
        "unarchivedSuccessfully": "Der Kunde wurde erfolgreich wiederhergestellt."
    }
}
</i18n>

<template>
    <div>
        <v-layout>
            <v-spacer />
            <v-flex xs12 md4 mb-4>
                <v-text-field
                    v-model="search"
                    append-icon="search"
                    :label="$t('search')"
                    single-line
                    hide-details
                    class="searchField"
                />
            </v-flex>
        </v-layout>

        <v-data-table
            :headers="headers"
            :items="categories"
            :search="search"
            expand
            item-key="id"
        >
            <template slot="items" slot-scope="props">
                <tr class="client-row">
                    <td
                        :style="{ backgroundColor: props.item.color, padding: 0 }"
                        v-if="$vuetify.breakpoint.smAndUp"
                    />
                    <td>
                        <v-avatar :color="props.item.color" :size="avatarSize">
                            <v-icon dark>person</v-icon>
                        </v-avatar>
                    </td>
                    <td
                        @click="$router.push({ name: 'client', params: { id: props.item.id } })"
                        class="pointer"
                    >
                        {{ props.item.name }}
                    </td>
                    <td
                        @click="$router.push({ name: 'client', params: { id: props.item.id } })"
                        class="pointer"
                        v-if="$vuetify.breakpoint.smAndUp"
                    >
                        {{ props.item.companyName }}
                    </td>
                    <td v-if="$vuetify.breakpoint.smAndUp">
                        <external-link :href="props.item.website" :link-content="props.item.website" />
                    </td>
                    <td v-if="$vuetify.breakpoint.smAndUp">
                        <external-link :href="`mailto:${props.item.email}`" :link-content="props.item.email" />
                    </td>
                    <td v-if="$vuetify.breakpoint.smAndUp">
                        {{ props.item.telephone }}
                    </td>
                    <td class="text-xs-right">
                        <v-icon small class="mr-2" @click="props.expanded = true">
                            edit
                        </v-icon>
                        <v-icon
                            small
                            class="mr-2"
                            @click="deleteClient(props.item.id)"
                            v-if="$vuetify.breakpoint.smAndUp"
                        >
                            delete
                        </v-icon>
                        <v-icon
                            small
                            @click="archive(props.item.id, true)"
                            v-if="$vuetify.breakpoint.smAndUp && !props.item.archived"
                        >
                            archive
                        </v-icon>
                        <v-icon
                            small
                            @click="archive(props.item.id, false)"
                            v-else-if="$vuetify.breakpoint.smAndUp"
                        >
                            unarchive
                        </v-icon>
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat dark color="secondary">
                    <v-form lazy-validation @submit="submitEditClient($event, props)">
                        <v-card-text>
                            <edit-form
                                :errors="editClient.errors"
                                :error-message="editClient.error"
                                :edit-client="{ ...props.item }"
                                @input="values => { editClient.values[props.item.id] = values }"
                            />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn flat @click="deleteClient(props.item.id)" color="red" small icon>
                                <v-icon>delete</v-icon>
                            </v-btn>

                            <v-btn v-if="!props.item.archived" flat @click="archive(props.item.id, true)" small>
                                <v-icon class="mr-2">archive</v-icon>
                                <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('archive') }}</span>
                            </v-btn>
                            <v-btn v-else flat @click="archive(props.item.id, false)" small>
                                <v-icon class="mr-2">unarchive</v-icon>
                                <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('unarchive') }}</span>
                            </v-btn>

                            <v-spacer />

                            <v-btn flat @click="props.expanded = false" small>
                                {{ $t('cancel') }}
                            </v-btn>

                            <v-btn
                                primary
                                flat
                                small
                                color="primary"
                                type="submit"
                                :loading="editClient.loading"
                                :disabled="editClient.loading"
                            >
                                <v-icon left v-if="$vuetify.breakpoint.smAndUp">save</v-icon>
                                {{ $t('save') }}
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </template>
        </v-data-table>

        <v-dialog v-model="confirmDialog" persistent max-width="350">
            <v-card>
                <v-card-text>{{ $t(confirmQuestion) }}</v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn flat @click="confirmDialog = false">{{ $t('no') }}</v-btn>
                    <v-btn color="primary" @click="confirmDeleteClient">{{ $t('yes') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions } from 'vuex';
    import eventBus from '../../../eventBus';

    import EditForm from './EditForm.vue';
    import ExternalLink from '../ExternalLink.vue';

    export default Vue.extend({
        components: {
            EditForm,
            ExternalLink
        },
        props: {
            categories: Array
        },
        data() {
            return {
                search: '',
                editClient: {
                    loading: false,
                    errors: {},
                    error: false,
                    values: {}
                },
                confirmDialog: false,
                confirmQuestion: '',
                deleteClientId: -1
            };
        },
        computed: {
            headers() {
                if (this.$vuetify.breakpoint.smAndUp) {
                    return [
                        { value: 'color', sortable: false, class: 'client-color-stripe' },
                        { value: 'avatar', sortable: false, width: '48px' },
                        { text: this.$t('name'), value: 'name' },
                        { text: this.$t('companyName'), value: 'companyName' },
                        { text: this.$t('website'), value: 'website' },
                        { text: this.$t('email'), value: 'email' },
                        { text: this.$t('telephone'), value: 'telephone' },
                        { value: 'id', sortable: false }
                    ];
                }

                return [
                    { value: 'avatar', sortable: false, width: '32px' },
                    { text: this.$t('name'), value: 'name' },
                    { value: 'id', sortable: false }
                ];
            },
            avatarSize() {
                return this.$vuetify.breakpoint.smAndUp ? '48px' : '32px';
            }
        },
        methods: {
            ...mapActions('clients', [
                'saveClient',
                'getClients'
            ]),
            async submitEditClient(event, props) {
                event.preventDefault();
                const values = this.editClient.values[props.item.id];

                if (Object.keys(values).length <= 0) {
                    return;
                }

                this.editClient.loading = true;

                if (!values.name) {
                    this.editClient.errors.name = true;
                    this.editClient.error = true;
                }
                else {
                    const editClient = await this.saveClient(values);

                    if (editClient.code === 500) {
                        this.editClient.error = true;
                    }
                    else {
                        props.expanded = false;
                    }
                }

                this.editClient.loading = false;
            },
            deleteClient(id) {
                this.confirmQuestion = 'confirmDelete';
                this.confirmDialog = true;
                this.deleteClientId = id;
            },
            async confirmDeleteClient() {
                this.confirmDialog = false;
                eventBus.$emit('show-loader');

                const res = await this.$http.delete(`api/client/${this.deleteClientId}`);

                if (res.status === 201) {
                    await this.getClients();
                    eventBus.$emit('show-alert', this.$t('clientDeleted'));
                }
                else {
                    eventBus.$emit('show-alert', this.$t('anErrorOccurred'), true);
                }

                eventBus.$emit('close-loader');
            },
            async archive(id, archived) {
                const client = { ...this.$store.getters['clients/getClient'](id) };
                client.archived = archived;

                const editedClient = await this.saveClient(client);
                if (editedClient.code === 500) {
                    eventBus.$emit('show-alert', this.$t('anErrorOccurred'), true);
                }
                else {
                    const message = archived ? this.$t('archivedSuccessfully') : this.$t('unarchivedSuccessfully');
                    eventBus.$emit('show-alert', message);
                }
            }
        }
    });
</script>

<style lang="scss">
    .client-color-stripe {
        padding: 0 !important;
        width: 5px;
    }

    .client-row {
        height: 65px;
    }

    .pointer {
        cursor: pointer;
    }
</style>

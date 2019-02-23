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
        "description": "Description",
        "search": "Search",
        "confirmDelete": "Are you sure you want to delete this project? This cannot be undone.",
        "projectDeleted": "The project was successfully deleted.",
        "anErrorOccurred": "An error occurred. Please try again.",
        "archivedSuccessfully": "The project was successfully archived.",
        "unarchivedSuccessfully": "The project was successfully restored."
    },
    "de": {
        "archive": "Archivieren",
        "unarchive": "Wiederherstellen",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "no": "Nein",
        "yes": "Ja",
        "name": "Name",
        "description": "Beschreibung",
        "search": "Suche",
        "confirmDelete": "Sind Sie sicher, dass Sie dieses Projekt löschen wollen? Dieser Vorgang kann nicht rückgängig gemacht werden.",
        "projectDeleted": "Das Projekt wurde erfolgreich gelöscht.",
        "anErrorOccurred": "Ein Fehler ist aufgetreten. Bitte versuchen Sie noch einmal.",
        "archivedSuccessfully": "Das Projekt wurde erfolgreich archiviert.",
        "unarchivedSuccessfully": "Das Projekt wurde erfolgreich wiederhergestellt."
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
            :items="projects"
            :search="search"
            expand
            item-key="id"
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td :style="{ backgroundColor: props.item.color, padding: 0 }" />
                    <td
                        @click="$router.push({ name: 'project', params: { id: props.item.id } })"
                        class="pointer"
                    >
                        {{ props.item.name }}
                    </td>
                    <td
                        @click="$router.push({ name: 'project', params: { id: props.item.id } })"
                        class="pointer"
                    >
                        {{ props.item.description }}
                    </td>
                    <td class="text-xs-right text-no-wrap">
                        <v-icon small class="mr-2" @click="props.expanded = true">
                            edit
                        </v-icon>
                        <v-icon
                            small
                            class="mr-2"
                            @click="deleteProject(props.item.id)"
                            v-if="$vuetify.breakpoint.smAndUp"
                        >
                            delete
                        </v-icon>
                        <v-icon
                            small
                            @click="archiveProject(props.item.id, true)"
                            v-if="$vuetify.breakpoint.smAndUp && !props.item.archived"
                        >
                            archive
                        </v-icon>
                        <v-icon
                            small
                            @click="archiveProject(props.item.id, false)"
                            v-else-if="$vuetify.breakpoint.smAndUp"
                        >
                            unarchive
                        </v-icon>
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat dark color="secondary">
                    <v-form lazy-validation @submit="submitEditProject($event, props)">
                        <v-card-text>
                            <edit-form
                                :errors="editProject.errors"
                                :error-message="editProject.error"
                                :edit-project="{ ...props.item }"
                                @input="values => { editProject.values[props.item.id] = values }"
                            />
                        </v-card-text>

                        <v-card-actions>
                            <v-btn flat @click="deleteProject(props.item.id)" color="red" small icon>
                                <v-icon>delete</v-icon>
                            </v-btn>

                            <v-btn v-if="!props.item.archived" flat @click="archiveProject(props.item.id, true)" small>
                                <v-icon class="mr-2">archive</v-icon>
                                <span v-if="$vuetify.breakpoint.smAndUp">{{ $t('archive') }}</span>
                            </v-btn>
                            <v-btn v-else flat @click="archiveProject(props.item.id, false)" small>
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
                                :loading="editProject.loading"
                                :disabled="editProject.loading"
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
                    <v-btn color="primary" @click="confirmDeleteProject">{{ $t('yes') }}</v-btn>
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

    export default Vue.extend({
        components: {
            EditForm
        },
        props: {
            projects: Array
        },
        data() {
            return {
                search: '',
                editProject: {
                    loading: false,
                    errors: {},
                    error: false,
                    values: {}
                },
                confirmDialog: false,
                confirmQuestion: '',
                deleteProjectId: -1
            };
        },
        computed: {
            headers() {
                return [
                    { value: 'color', sortable: false, class: 'project-color-stripe' },
                    { text: this.$t('name'), value: 'name' },
                    { text: this.$t('description'), value: 'description' },
                    { value: 'id', sortable: false }
                ];
            }
        },
        methods: {
            ...mapActions('projects', [
                'saveProject',
                'getProjects'
            ]),
            async submitEditProject(event, props) {
                event.preventDefault();
                const values = this.editProject.values[props.item.id];

                if (Object.keys(values).length <= 0) {
                    return;
                }

                this.editProject.loading = true;

                if (!values.name) {
                    this.editProject.errors.name = true;
                    this.editProject.error = true;
                }
                else {
                    const editProject = await this.saveProject(values);

                    if (editProject.code === 500) {
                        this.editProject.error = true;
                    }
                    else {
                        props.expanded = false;
                    }
                }

                this.editProject.loading = false;
            },
            deleteProject(id) {
                this.confirmQuestion = 'confirmDelete';
                this.confirmDialog = true;
                this.deleteProjectId = id;
            },
            async confirmDeleteProject() {
                this.confirmDialog = false;
                eventBus.$emit('show-loader');

                const res = await this.$http.delete(`api/project/${this.deleteProjectId}`);

                if (res.status === 201) {
                    await this.getProjects();
                    eventBus.$emit('show-alert', this.$t('projectDeleted'));
                }
                else {
                    eventBus.$emit('show-alert', this.$t('anErrorOccurred'), true);
                }

                eventBus.$emit('close-loader');
            },
            async archiveProject(id, archived) {
                const project = { ...this.$store.getters['projects/getProject'](id) };
                project.archived = archived;

                const editedProject = await this.saveProject(project);
                if (editedProject.code === 500) {
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
    .project-color-stripe {
        padding: 0 !important;
        width: 5px;
    }

    .pointer {
        cursor: pointer;
    }
</style>

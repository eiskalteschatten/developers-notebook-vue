<i18n>
{
    "en": {
        "name": "Name",
        "startDate": "Start Date",
        "endDate": "End Date",
        "description": "Description",
        "notes": "Notes",
        "website": "Website",
        "client": "Client",
        "categories": "Categories",
        "tags": "Tags",
        "tagsResultsEnter": "enter",
        "tagResults": "Press {enter} to create the tag \"{result}\".",
        "color": "Color",
        "required": "Required",
        "anErrorOccurred": "An error occurred while trying to save the project. Please try again."
    },
    "de": {
        "name": "Name",
        "startDate": "Startdatum",
        "endDate": "Endedatum",
        "description": "Beschreibung",
        "notes": "Notizen",
        "website": "Webseite",
        "client": "Kunden",
        "categories": "Kategorien",
        "tags": "Tags",
        "tagsResultsEnter": "Eingabetaste",
        "tagResults": "Drücken Sie die {enter}, um den Tag \"{result}\" zu erstellen.",
        "color": "Farbe",
        "required": "Erforderlich",
        "anErrorOccurred": "Ein Fehler ist beim Speichern des Projektes aufgetreten. Bitte versuchen Sie noch einmal."
    }
}
</i18n>

<template>
    <v-container grid-list-md>
        <v-alert
            :value="errorMessage"
            type="error"
            class="mb-4"
        >
            {{ $t('anErrorOccurred') }}
        </v-alert>

        <input type="hidden" v-model="project.id">

        <v-layout wrap>
            <v-flex xs12 sm6 :class="{ 'pr-5': $vuetify.breakpoint.smAndUp }">
                <v-text-field
                    v-model="project.name"
                    :label="$t('name')"
                    :rules="rules"
                    :error="errors.name"
                />

                <v-menu
                    v-model="startDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        v-model="startDateDisplay"
                        :label="$t('startDate')"
                        prepend-icon="event"
                        readonly
                    />
                    <v-date-picker
                        v-model="startDate"
                        @input="startDateMenu = false"
                        landscape
                        color="primary"
                        :locale="$i18n.locale"
                    />
                </v-menu>

                <v-menu
                    v-model="endDateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        v-model="endDateDisplay"
                        :label="$t('endDate')"
                        prepend-icon="event"
                        readonly
                    />
                    <v-date-picker
                        v-model="endDate"
                        @input="endDateMenu = false"
                        landscape
                        color="primary"
                        :locale="$i18n.locale"
                    />
                </v-menu>

                <v-textarea v-model="project.description" :label="$t('description')" />
                <v-textarea v-model="project.notes" :label="$t('notes')" />
            </v-flex>
            <v-flex xs12 sm6>
                <v-combobox
                    v-model="selectedClient"
                    :items="getComboBoxClients()"
                    :label="$t('client')"
                    single-line
                    class="mb-3"
                />

                <v-combobox
                    v-model="selectedCategory"
                    :items="getComboBoxCategories()"
                    :label="$t('categories')"
                    multiple
                    chips
                    class="mb-3"
                />

                <v-combobox
                    v-model="project.tags"
                    :items="initialTags"
                    :search-input.sync="tagSearch"
                    hide-selected
                    :label="$t('tags')"
                    multiple
                    small-chips
                >
                    <template slot="no-data">
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <i18n path="tagResults">
                                        <kbd place="enter">{{ $t('tagsResultsEnter') }}</kbd>
                                        <span place="result">{{ tagSearch }}</span>
                                    </i18n>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-combobox>

                <v-text-field v-model="project.website" :label="$t('website')" />

                <h4>{{ $t('color') }}</h4>
                <swatches
                    v-model="project.color"
                    inline
                    colors="material-basic"
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions, mapGetters } from 'vuex';

    import Swatches from 'vue-swatches';
    import 'vue-swatches/dist/vue-swatches.min.css';

    export default Vue.extend({
        components: {
            Swatches
        },
        props: {
            errors: Object,
            errorMessage: Boolean,
            editProject: Object
        },
        data() {
            return {
                rules: [
                    value => !!value || this.$t('required')
                ],
                project: this.editProject || {},
                tagSearch: null,
                initialTags: this.editProject ? this.editProject.tags : [],
                startDateMenu: false,
                startDateData:  this.editProject.startDate ? new Date(this.editProject.startDate) : '',
                startDateDisplay: this.editProject.startDate ? this.$d(new Date(this.editProject.startDate)) : '',
                endDateMenu: false,
                endDateData:  this.editProject.startDate ? new Date(this.editProject.startDate) : '',
                endDateDisplay: this.editProject.endDate ? this.$d(new Date(this.editProject.endDate)) : ''
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            ...mapState('clients', [
                'clients'
            ]),
            selectedClient: {
                get() {
                    const clientId = this.project.clientId;

                    if (!clientId) {
                        return '';
                    }

                    const client = this.$store.getters['clients/getClient'](clientId);

                    return client
                        ? {
                            value: clientId,
                            text: client.name
                        }
                        : '';
                },
                set(selectClient) {
                    this.project.clientId = selectClient ? selectClient.value : '';
                }
            },
            selectedCategory: {
                get() {
                    const categoryIds = this.project.categoryIds;

                    if (!categoryIds || categoryIds.length <= 0) {
                        return '';
                    }

                    return categoryIds.map(id => {
                        const category = this.$store.getters['categories/getCategory'](id);
                        return {
                            value: id,
                            text: category.name
                        };
                    });
                },
                set(selectCategories) {
                    this.project.categoryIds = selectCategories.map(category => {
                        return category.value;
                    });
                }
            },
            startDate: {
                get() {
                    return this.startDateData instanceof Date
                        ? this.startDateData.toISOString().substr(0,10)
                        : this.startDateData;
                },
                set(newDate) {
                    const date = new Date(newDate);
                    this.startDateDisplay = this.$d(date);
                    this.startDateData = date;
                    this.project.startDate = date;
                }
            },
            endDate: {
                get() {
                    return this.endDateData instanceof Date
                        ? this.endDateData.toISOString().substr(0,10)
                        : this.endDateData;
                },
                set(newDate) {
                    const date = new Date(newDate);
                    this.endDateDisplay = this.$d(date);
                    this.endDateData = date;
                    this.project.endDate = date;
                }
            }
        },
        watch: {
            project: {
                handler() {
                    this.$emit('input', this.project);
                },
                deep: true
            }
        },
        async mounted() {
            await this.getCategories();
            await this.getClients();
        },
        methods: {
            ...mapActions('categories', [
                'getCategories'
            ]),
            ...mapGetters('categories', [
                'getComboBoxCategories'
            ]),
            ...mapActions('clients', [
                'getClients'
            ]),
            ...mapGetters('clients', [
                'getComboBoxClients'
            ])
        }
    });
</script>

<style lang="scss">
    .vue-swatches__container {
        background-color: transparent !important;
    }
</style>

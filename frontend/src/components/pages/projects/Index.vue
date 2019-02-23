<i18n>
{
    "en": {
        "projects": "Projects",
        "newProject": "New Project",
        "projectCreated": "The project was successfully created.",
        "create": "Create",
        "cancel": "Cancel",
        "activeProjects": "Active Projects",
        "archive": "Archive"
    },
    "de": {
        "projects": "Projekte",
        "newProject": "Neues Projekt",
        "projectCreated": "Das Projekt wurde erfolgreich erstellt.",
        "create": "Erstellen",
        "cancel": "Abbrechen",
        "activeProjects": "Aktive Projekte",
        "archive": "Archiv"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ $t('projects') }}</h1>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn @click="newProject.dialog = true" class="mb-4">
                    <v-icon left>create</v-icon>
                    {{ $t('newProject') }}
                </v-btn>
                <sub-side-nav class="mt-1" :items="sidenavItems" @clicked="changeTab" />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="archiveTab">
                    <v-tab-item value="notArchived">
                        <category-list :categories="notArchivedCategories" />
                    </v-tab-item>
                    <v-tab-item value="archived">
                        <category-list :categories="archivedCategories" />
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>

        <v-dialog v-model="newProject.dialog" max-width="600">
            <v-card>
                <v-card-title class="headline">
                    {{ $t('newProject') }}

                    <v-spacer />

                    <v-btn flat @click="newProject.dialog = false" small icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-form lazy-validation @submit="createNewProject">
                    <v-card-text>
                        <edit-form
                            :errors="newProject.errors"
                            :error-message="newProject.error"
                            :edit-category="newProject.values"
                            @input="values => { newProject.values = values }"
                        />
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn flat @click="newProject.dialog = false">
                            {{ $t('cancel') }}
                        </v-btn>

                        <v-btn
                            primary
                            color="primary"
                            type="submit"
                            :loading="newProject.loading"
                            :disabled="newProject.loading"
                        >
                            <v-icon left>save</v-icon>
                            {{ $t('create') }}
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapState } from 'vuex';
    import eventBus from '../../../eventBus';

    import SubSideNav from '../../elements/SubSideNav.vue';
    import CategoryList from '../../elements/projects/List.vue';
    import EditForm from '../../elements/projects/EditForm.vue';

    export default Vue.extend({
        components: {
            SubSideNav,
            CategoryList,
            EditForm
        },
        data() {
            return {
                archiveTab: null,
                newProject: {
                    dialog: this.$route.query.new || false,
                    loading: false,
                    errors: {},
                    error: false,
                    values: {
                        archived: false
                    }
                }
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            notArchivedCategories() {
                return this.categories.filter(category => {
                    if (!category.archived) return category;
                });
            },
            archivedCategories() {
                return this.categories.filter(category => {
                    if (category.archived) return category;
                });
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('activeProjects'),
                        icon: 'category',
                        class: { active: this.archiveTab === 'notArchived' },
                        click: () => 'notArchived'
                    },
                    {
                        title: this.$t('archive'),
                        icon: 'archive',
                        class: { active: this.archiveTab === 'archived' },
                        click: () => 'archived'
                    }
                ];
            }
        },
        watch: {
            '$route.query.new'(value) {
                this.newProject.dialog = value;
            }
        },
        async mounted() {
            await this.getCategories();
        },
        methods: {
            ...mapActions('categories', [
                'saveCategory',
                'getCategories'
            ]),
            changeTab(getTab) {
                this.archiveTab = getTab();
            },
            async createNewProject(event) {
                event.preventDefault();
                this.newProject.loading = true;
                const values = this.newProject.values;

                if (!values.name) {
                    this.newProject.errors.name = true;
                    this.newProject.error = true;
                }
                else {
                    const newProject = await this.saveCategory(values);

                    if (newProject.code === 500) {
                        this.newProject.error = true;
                    }
                    else {
                        this.newProject.dialog = false;
                        eventBus.$emit('show-alert', this.$t('projectCreated'));
                    }
                }

                this.newProject.loading = false;
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

<i18n>
{
    "en": {
        "projects": "Projects",
        "newProject": "New Project",
        "projectCreated": "The project was successfully created.",
        "create": "Create",
        "cancel": "Cancel",
        "activeProjects": "Active Projects",
        "finishedProjects": "Finished Projects",
        "archive": "Archive",
        "filters": "Filters"
    },
    "de": {
        "projects": "Projekte",
        "newProject": "Neues Projekt",
        "projectCreated": "Das Projekt wurde erfolgreich erstellt.",
        "create": "Erstellen",
        "cancel": "Abbrechen",
        "activeProjects": "Aktive Projekte",
        "finishedProjects": "Abgeschlossene Projekte",
        "archive": "Archiv",
        "filters": "Filter"
    }
}
</i18n>

<template>
    <div>
        <page-title :title="$t('projects')" icon="library_books" />

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <v-btn @click="newProject.dialog = true" class="mb-4">
                    <v-icon left>create</v-icon>
                    {{ $t('newProject') }}
                </v-btn>
                <sub-side-nav
                    class="mt-1"
                    :items="sidenavItems"
                    @clicked="changeTab"
                    show-categories
                    @categoryClicked="changeCategory"
                    :selected-tab="subSideNavTab"
                    :mobileTitle="$t('filters')"
                />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="subSideNavTab">
                    <v-tab-item value="notArchived">
                        <project-list :projects="notArchivedProjects" />
                    </v-tab-item>
                    <v-tab-item value="finished">
                        <project-list :projects="finishedProjects" />
                    </v-tab-item>
                    <v-tab-item value="archived">
                        <project-list :projects="archivedProjects" />
                    </v-tab-item>
                    <v-tab-item
                        v-for="category in categories"
                        :key="category.id"
                        :value="`category${category.id}`"
                    >
                        <project-list :projects="projectsInCategory(category.id)" />
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>

        <v-dialog v-model="newProject.dialog" max-width="1200">
            <v-toolbar dark color="black">
                <v-toolbar-title>{{ $t('newProject') }}</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                    <v-btn icon dark @click="newProject.dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card>
                <v-form lazy-validation @submit="createNewProject">
                    <v-card-text>
                        <edit-form
                            :errors="newProject.errors"
                            :error-message="newProject.error"
                            :edit-project="newProject.values"
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

    import PageTitle from '../../elements/PageTitle.vue';
    import SubSideNav from '../../elements/SubSideNav.vue';
    import ProjectList from '../../elements/projects/List.vue';
    import EditForm from '../../elements/projects/EditForm.vue';

    export default Vue.extend({
        components: {
            PageTitle,
            SubSideNav,
            ProjectList,
            EditForm
        },
        data() {
            return {
                subSideNavTab: null,
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
            ...mapState('projects', [
                'projects'
            ]),
            ...mapState('categories', [
                'categories'
            ]),
            notArchivedProjects() {
                return this.projects.filter(project => {
                    if (!project.finished && !project.archived) return project;
                });
            },
            finishedProjects() {
                return this.projects.filter(project => {
                    if (project.finished && !project.archived) return project;
                });
            },
            archivedProjects() {
                return this.projects.filter(project => {
                    if (project.archived) return project;
                });
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('activeProjects'),
                        icon: 'library_books',
                        class: { active: this.subSideNavTab === 'notArchived' },
                        click: () => 'notArchived'
                    },
                    {
                        title: this.$t('finishedProjects'),
                        icon: 'done',
                        class: { active: this.subSideNavTab === 'finished' },
                        click: () => 'finished'
                    },
                    {
                        title: this.$t('archive'),
                        icon: 'archive',
                        class: { active: this.subSideNavTab === 'archived' },
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
            await this.getProjects();
        },
        methods: {
            ...mapActions('projects', [
                'saveProject',
                'getProjects'
            ]),
            projectsInCategory(categoryId) {
                return this.projects.filter(project => {
                    if (project.categoryIds.includes(categoryId) && !project.archived) {
                        return project;
                    }
                });
            },
            changeTab(getTab) {
                this.subSideNavTab = getTab();
            },
            changeCategory(id) {
                this.subSideNavTab = `category${id}`;
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
                    const newProject = await this.saveProject(values);

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

<i18n>
{
    "en": {
        "project": "Project",
        "finished": "Finished",
        "archived": "Archived",
        "notes": "Notes",
        "startDate": "Start Date",
        "endDate": "End Date",
        "client": "Client",
        "website": "Website"
    },
    "de": {
        "project": "Projekt",

        "finished": "Abgeschlossen",
        "archived": "Archiviert",
        "notes": "Notizen",
        "startDate": "Startdatum",
        "endDate": "Endedatum",
        "client": "Kunde",
        "website": "Webseite"
    }
}
</i18n>

<template>
    <div>
        <v-card :style="{ borderLeft: `2px solid ${project.color}` }" class="mb-5">
            <v-card-title>
                <div class="avatar-container mr-3">
                    <v-avatar :color="project.color" :size="avatarSize" class="mr-4">
                        <v-icon :dark="!!project.color">library_books</v-icon>
                    </v-avatar>
                </div>
                <div>
                    <h1>{{ project.name }}</h1>
                </div>
            </v-card-title>
            <v-card-text>
                <v-layout wrap>
                    <v-flex xs12 sm6 :class="{ 'mb-5': $vuetify.breakpoint.xs }">
                        <div class="mb-3" v-if="project.finished">
                            <v-icon small class="mr-2">done</v-icon>{{ $t('finished') }}
                        </div>
                        <div class="mb-3" v-if="project.archived">
                            <v-icon small class="mr-2">archive</v-icon>{{ $t('archived') }}
                        </div>
                        <div class="mb-3" v-if="project.description">
                            {{ project.description }}
                        </div>
                        <div v-if="project.notes">
                            <h3 class="mb-1">{{ $t('notes') }}</h3>
                            {{ project.notes }}
                        </div>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <div class="mb-3" v-if="project.startDate">
                            <div class="row-label">
                                <v-icon small class="mr-2">event</v-icon>{{ $t('startDate') }}:
                            </div>
                            {{ formatDate(project.startDate) }}
                        </div>
                        <div class="mb-3" v-if="project.endDate">
                            <div class="row-label">
                                <v-icon small class="mr-2">event</v-icon>{{ $t('endDate') }}:
                            </div>
                            {{ formatDate(project.endDate) }}
                        </div>
                        <div class="mb-3" v-if="project.clientId">
                            <div class="row-label">
                                <v-icon small class="mr-2">people</v-icon>{{ $t('client') }}:
                            </div>
                            <router-link :to="{ name: 'client', params: { id: project.clientId } }">{{ clientName }}</router-link>
                        </div>
                        <div class="mb-3" v-if="project.website">
                            <div class="row-label">{{ $t('website') }}:</div>
                            <external-link :href="project.website" :link-content="project.website" />
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    import { setDocumentTitle } from '../../../router';

    import ExternalLink from '../../elements/ExternalLink.vue';

    export default Vue.extend({
        components: {
            ExternalLink
        },
        props: {
            id: [String, Number]
        },
        data() {
            return {
                tab: null
            };
        },
        computed: {
            ...mapState('projects', [
                'related'
            ]),
            project() {
                return this.$store.getters['projects/getProject'](this.id);
            },
            avatarSize() {
                return this.$vuetify.breakpoint.smAndUp ? '48px' : '32px';
            },
            clientName() {
                const client = this.$store.getters['clients/getClient'](this.project.clientId);
                return client.name;
            }
        },
        async mounted() {
            await this.getProjects();
            setDocumentTitle(`${this.project.name} - ${this.$t('project')}`);
        },
        methods: {
            ...mapActions('projects', [
                'getProjects'
            ]),
            formatDate(date) {
                return date ? this.$d(new Date(date)) : '';
            }
        }
    });
</script>

<style lang="scss" scoped>
    .avatar-container {
        float: left;
        width: 50px;
    }

    .row-label {
        display: inline-block;
        font-weight: bold;
        width: 100px;
    }
</style>

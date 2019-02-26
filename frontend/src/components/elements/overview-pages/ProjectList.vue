<i18n>
{
    "en": {
        "noItems": "No {0} were found.",
        "projects": "Projects",
        "projectsInSentence": "projects",
        "goToProject": "Go to the Project",
        "finished": "Finished",
        "startDate": "Start Date",
        "endDate": "End Date"
    },
    "de": {
        "noItems": "Keine {0} wurden gefunden.",
        "projects": "Projekte",
        "projectsInSentence": "Projekte",
        "goToProject": "Zum Projekt",
        "finished": "Abgeschlossen",
        "startDate": "Startdatum",
        "endDate": "Endedatum"
    }
}
</i18n>

<template>
    <div>
        <v-layout wrap v-if="projects && projects.length > 0">
            <v-flex
                v-for="project in projects"
                :key="project.id"
                xs12
                sm6
                lg4
                xl3
                pa-2
                d-flex
            >
                <v-card :style="{ borderTop: `2px solid ${project.color}` }">
                    <v-card-title>
                        <v-layout>
                            <v-flex xs2>
                                <v-avatar :color="project.color" :size="avatarSize" class="mr-3">
                                    <v-icon :dark="!!project.color">description</v-icon>
                                </v-avatar>
                            </v-flex>
                            <v-flex xs10>
                                <div class="mb-3">
                                    <h3>{{ project.name }}</h3>
                                    <div v-if="project.finished">
                                        <v-icon small class="mr-2">done</v-icon>{{ $t('finished') }}
                                    </div>
                                </div>
                                <div v-if="project.startDate">
                                    <div class="row-label">{{ $t('startDate') }}:</div>
                                    {{ $d(new Date(project.startDate)) }}
                                </div>
                                <div v-if="project.endDate">
                                    <div class="row-label">{{ $t('endDate') }}:</div>
                                    {{ $d(new Date(project.endDate)) }}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn flat @click="$router.push({ name: 'project', params: { id: project.id } })">
                            {{ $t('goToProject') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-card v-else>
            <v-card-title>
                {{ $t('noItems', [ $t('projectsInSentence') ]) }}
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            projects: Array
        },
        computed: {
            avatarSize() {
                return this.$vuetify.breakpoint.smAndUp ? '48px' : '32px';
            }
        }
    });
</script>

<style lang="scss" scoped>
    .row-label {
        display: inline-block;
        font-weight: bold;
        width: 85px;
    }
</style>

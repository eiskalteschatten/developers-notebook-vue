<i18n>
{
    "en": {
        "category": "Category",
        "archived": "Archived",
        "noItems": "No {0} were found.",
        "clients": "Clients",
        "clientsInSentence": "clients",
        "goToClient": "Go to the Client"
    },
    "de": {
        "category": "Kategorie",
        "archived": "Archiviert",
        "noItems": "Keine {0} wurden gefunden.",
        "clients": "Kunden",
        "clientsInSentence": "Kunden",
        "goToClient": "Zum Kunden"
    }
}
</i18n>

<template>
    <div>
        <v-card :style="{ borderLeft: `2px solid ${category.color}` }" class="mb-5">
            <v-card-title>
                <div class="avatar-container mr-3">
                    <v-avatar :color="category.color" :size="avatarSize" class="mr-4">
                        <v-icon :dark="!!category.color">category</v-icon>
                    </v-avatar>
                </div>
                <div>
                    <h1>{{ category.name }}</h1>
                </div>
            </v-card-title>
            <v-card-text>
                <div class="mb-3" v-if="category.archived">
                    <v-icon small class="mr-2">archive</v-icon>{{ $t('archived') }}
                </div>
                <div v-if="category.description">
                    {{ category.description }}
                </div>
            </v-card-text>
        </v-card>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <sub-side-nav :items="sidenavItems" @clicked="changeTab" />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="clients">
                        <v-layout wrap v-if="related.clients && related.clients.length > 0">
                            <v-flex
                                v-for="client in related.clients"
                                :key="client.id"
                                xs12
                                sm6
                                lg4
                                xl3
                                pa-2
                                d-flex
                            >
                                <v-card :style="{ borderTop: `2px solid ${client.color}` }">
                                    <v-card-title>
                                        <v-layout>
                                            <v-flex xs2>
                                                <v-avatar :color="client.color" :size="avatarSize" class="mr-3">
                                                    <v-icon :dark="!!client.color">person</v-icon>
                                                </v-avatar>
                                            </v-flex>
                                            <v-flex xs10>
                                                <h3>{{ client.name }}</h3>
                                                <div>
                                                    {{ client.companyName }}
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer />
                                        <v-btn flat @click="$router.push({ name: 'client', params: { id: client.id } })">
                                            {{ $t('goToClient') }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <v-card v-else>
                            <v-card-title>
                                {{ $t('noItems', [ $t('clientsInSentence') ]) }}
                            </v-card-title>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    import { setDocumentTitle } from '../../../router';

    import SubSideNav from '../../elements/SubSideNav.vue';

    export default Vue.extend({
        components: {
            SubSideNav
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
            ...mapState('categories', [
                'related'
            ]),
            category() {
                return this.$store.getters['categories/getCategory'](this.id);
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('clients'),
                        icon: 'people',
                        class: { active: this.tab === 'clients' },
                        click: () => 'clients'
                    }
                ];
            },
            avatarSize() {
                return this.$vuetify.breakpoint.smAndUp ? '48px' : '32px';
            }
        },
        async mounted() {
            await this.getCategories();
            setDocumentTitle(`${this.category.name} - ${this.$t('category')}`);
            await this.getRelated(this.id);
        },
        methods: {
            ...mapActions('categories', [
                'getCategories',
                'getRelated'
            ]),
            changeTab(getTab) {
                this.tab = getTab();
            }
        }
    });
</script>

<style lang="scss" scoped>
    .avatar-container {
        float: left;
        width: 50px;
    }
</style>

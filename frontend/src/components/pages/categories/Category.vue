<i18n>
{
    "en": {
        "category": "Category",
        "clients": "Clients",
        "goToClient": "Go to the Client"
    },
    "de": {
        "category": "Kategorie",
        "clients": "Kunden",
        "goToClient": "Zum Kunden"
    }
}
</i18n>

<template>
    <div>
        <h1 class="mb-4">{{ category.name }}</h1>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <sub-side-nav :items="sidenavItems" @clicked="changeTab" />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="clients">
                        <v-layout wrap>
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
                                                    <v-icon dark>person</v-icon>
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
</style>

<i18n>
{
    "en": {
        "category": "Category",
        "archived": "Archived",
        "clients": "Clients",
        "projects": "Projects",
        "parentCategory": "Parent Category",
        "subcategories": "Subcategories",
        "views": "Views"
    },
    "de": {
        "category": "Kategorie",
        "archived": "Archiviert",
        "clients": "Kunden",
        "projects": "Projekte",
        "parentCategory": "Oberkategorie",
        "subcategories": "Unterkategorien",
        "views": "Bereiche"
    }
}
</i18n>

<template>
    <div>
        <v-card :style="{ borderLeft: `2px solid ${category.color}` }" class="mb-4">
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
                <div class="mb-3" v-if="category.parentId">
                    <h4 class="parent-category-label">
                        <v-icon small class="mr-2">category</v-icon>{{ $t('parentCategory') }}:
                    </h4>
                    <router-link :to="{ name: 'category', params: { id: category.parentId } }">{{ parentCategory.name }}</router-link>
                </div>
                <div v-if="category.description">
                    {{ category.description }}
                </div>
            </v-card-text>
        </v-card>

        <v-layout wrap>
            <v-flex xs12 md2 :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">
                <sub-side-nav :items="sidenavItems" @clicked="changeTab" :mobile-title="$t('views')" />
            </v-flex>
            <v-flex xs12 md10>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="clients">
                        <client-list :clients="related.clients" />
                    </v-tab-item>
                    <v-tab-item value="projects">
                        <project-list :projects="related.projects" />
                    </v-tab-item>
                    <v-tab-item value="subcategories">
                        <category-list :categories="related.subcategories" />
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
    import ClientList from '../../elements/overview-pages/ClientList.vue';
    import ProjectList from '../../elements/overview-pages/ProjectList.vue';
    import CategoryList from '../../elements/overview-pages/CategoryList.vue';

    export default Vue.extend({
        components: {
            SubSideNav,
            ClientList,
            ProjectList,
            CategoryList
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
            parentCategory() {
                return this.$store.getters['categories/getCategory'](this.category.parentId);
            },
            sidenavItems() {
                return [
                    {
                        title: this.$t('clients'),
                        icon: 'people',
                        class: { active: this.tab === 'clients' },
                        click: () => 'clients'
                    },
                    {
                        title: this.$t('projects'),
                        icon: 'description',
                        class: { active: this.tab === 'projects' },
                        click: () => 'projects'
                    },
                    {
                        title: this.$t('subcategories'),
                        icon: 'category',
                        class: { active: this.tab === 'subcategories' },
                        click: () => 'subcategories'
                    }
                ];
            },
            avatarSize() {
                return this.$vuetify.breakpoint.smAndUp ? '48px' : '32px';
            }
        },
        watch: {
            async id() {
                await this.load();
            }
        },
        async mounted() {
            await this.load();
        },
        methods: {
            ...mapActions('categories', [
                'getCategories',
                'getRelated'
            ]),
            changeTab(getTab) {
                this.tab = getTab();
            },
            async load() {
                await this.getCategories();
                setDocumentTitle(`${this.category.name} - ${this.$t('category')}`);
                await this.getRelated(this.id);
            }
        }
    });
</script>

<style lang="scss" scoped>
    .avatar-container {
        float: left;
        width: 50px;
    }

    .parent-category-label {
        display: inline-block;
    }
</style>

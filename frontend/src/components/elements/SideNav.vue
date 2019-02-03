<i18n>
{
    "en": {
        "showSidebar": "Show Sidebar",
        "hideSidebar": "Hide Sidebar",
        "dashboard": "Dashboard",
        "clients": "Clients",
        "categories": "Categories",
        "settings": "Settings"
    },
    "de": {
        "showSidebar": "Seitenleist ausklappen",
        "hideSidebar": "Seitenleiste einklappen",
        "dashboard": "Dashboard",
        "clients": "Kunden",
        "categories": "Kategorien",
        "settings": "Einstellungen"
    }
}
</i18n>

<template>
    <v-navigation-drawer
        clipped
        fixed
        permanent="false"
        :mini-variant="mini"
        v-model="drawer"
        app
        dark
    >
        <v-layout column fill-height>
            <v-list>
                <v-list-tile @click="toggleMiniDrawer">
                    <v-list-tile-action>
                        <v-icon>{{ toggleIcon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ toggleLabel }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-divider />

                <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    @click="$router.push({ name: item.routeName })"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-spacer />

            <v-list>
                <v-divider />
                <v-list-tile @click="$router.push({ name: 'settings' })">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ $t('settings') }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-layout>
    </v-navigation-drawer>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data () {
            return {
                drawer: true,
                items: [
                    { title: this.$t('dashboard'), icon: 'dashboard', routeName: 'dashboard' },
                    { title: this.$t('clients'), icon: 'people', routeName: 'clients' },
                    { title: this.$t('categories'), icon: 'category', routeName: 'categories' }
                ],
                mini: true
            };
        },
        computed: {
            toggleIcon() {
                return this.mini ? 'chevron_right' : 'chevron_left';
            },
            toggleLabel() {
                return this.mini ? this.$t('showSidebar') : this.$t('hideSidebar');
            }
        },
        methods:{
             toggleMiniDrawer() {
                this.mini = !this.mini;
            }
        }
    });
</script>

<style lang="scss">

</style>

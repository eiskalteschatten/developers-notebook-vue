<i18n>
{
    "en": {
        "categories": "Categories"
    },
    "de": {
        "categories": "Kategorien"
    }
}
</i18n>

<template>
    <v-list dense>
        <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click="emitClick(item.click)"
            :class="item.class"
        >
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <div v-if="showCategories">
            <v-divider />

            <v-subheader>{{ $t('categories') }}</v-subheader>

            <v-list-tile
                v-for="category in sortedCategories"
                :key="category.id"
                @click="emitCategoryClick(category.id)"
                :class="{ active: selectedTab === `category${category.id}` }"
            >
                <v-list-tile-action>
                    <div class="category-color-circle" :style="{ backgroundColor: category.color }" />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ category.name }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </div>
    </v-list>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';

    export default Vue.extend({
        props: {
            items: Array,
            showCategories: Boolean,
            selectedTab: String
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            sortedCategories() {
                return this.categories.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                });
            }
        },
        methods: {
            emitClick(func) {
                this.$emit('clicked', func);
            },
            emitCategoryClick(id) {
                this.$emit('categoryClicked', id);
            }
        }
    });
</script>

<style lang="scss" scoped>
    .theme--dark {
        .active {
            background-color: var(--v-selected-darken2);
        }
    }

    .theme--light {
        .active {
            background-color: var(--v-selected-lighten2);
        }
    }

    .category-color-circle {
        border-radius: 50%;
        height: 20px;
        width: 20px;
    }
</style>

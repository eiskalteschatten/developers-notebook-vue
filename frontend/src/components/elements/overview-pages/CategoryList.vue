<i18n>
{
    "en": {
        "noItems": "No {0} were found.",
        "categoriesInSentence": "categories",
        "goToCategory": "Go to the Category"
    },
    "de": {
        "noItems": "Keine {0} wurden gefunden.",
        "categoriesInSentence": "Kategorien",
        "goToCategory": "Zur Kategorie"
    }
}
</i18n>

<template>
    <div>
        <v-layout wrap v-if="categories && categories.length > 0">
            <v-flex
                v-for="category in categoriesWithData"
                :key="category.id"
                xs12
                sm6
                lg4
                xl3
                pa-2
                d-flex
            >
                <v-card :style="{ borderTop: `2px solid ${category.color}` }">
                    <v-card-title>
                        <v-layout>
                            <v-flex xs2>
                                <v-avatar :color="category.color" :size="avatarSize" class="mr-3">
                                    <v-icon :dark="!!category.color">category</v-icon>
                                </v-avatar>
                            </v-flex>
                            <v-flex xs10>
                                <h3>{{ category.name }}</h3>
                                <div v-if="category.description">
                                    {{ category.description }}
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn flat @click="$router.push({ name: 'category', params: { id: category.id } })">
                            {{ $t('goToCategory') }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-card v-else>
            <v-card-title>
                {{ $t('noItems', [ $t('categoriesInSentence') ]) }}
            </v-card-title>
        </v-card>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            categories: Array
        },
        computed: {
            avatarSize() {
                return this.$vuetify.breakpoint.smAndUp ? '48px' : '32px';
            },
            categoriesWithData() {
                return this.categories.map(category => {
                    return this.$store.getters['categories/getCategory'](category.id);
                });
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

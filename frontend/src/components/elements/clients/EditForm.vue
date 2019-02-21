<i18n>
{
    "en": {
        "newCategory": "New Category",
        "name": "Name",
        "description": "Description",
        "color": "Color",
        "image": "Image",
        "companyName": "Company Name",
        "isCompany": "This client is a company.",
        "contactInfo": "Contact Information",
        "website": "Website",
        "email": "Email",
        "telephone": "Phone Number",
        "fax": "Fax Number",
        "address": "Address",
        "notes": "Notes",
        "category": "Category",
        "tags": "Tags",
        "tagsResultsEnter": "enter",
        "tagResults": "Press {enter} to create the tag \"{result}\".",
        "anErrorOccurred": "An error occurred while trying to save the category. Please try again."
    },
    "de": {
        "newCategory": "Neue Kategorie",
        "name": "Name",
        "description": "Beschreibung",
        "color": "Farbe",
        "image": "Bild",
        "companyName": "Firmenname",
        "isCompany": "Dieser Kunde ist eine Firma.",
        "contactInfo": "Kontaktdaten",
        "website": "Webseite",
        "email": "Email",
        "telephone": "Telefonnummer",
        "fax": "Faxnummer",
        "address": "Adresse",
        "notes": "Notizen",
        "category": "Kategorie",
        "tags": "Tags",
        "tagsResultsEnter": "Eingabetaste",
        "tagResults": "Drücken Sie die {enter}, um den Tag \"{result}\" zu erstellen.",
        "anErrorOccurred": "Ein Fehler ist beim Speichern der Kategorie aufgetreten. Bitte versuchen Sie noch einmal."
    }
}
</i18n>

<template>
    <v-container grid-list-md>
        <v-alert
            :value="errorMessage"
            type="error"
            class="mb-4"
        >
            {{ $t('anErrorOccurred') }}
        </v-alert>

        <input type="hidden" v-model="client.id">

        <v-layout wrap>
            <v-flex xs12 sm6 :class="{ 'pr-5': $vuetify.breakpoint.smAndUp }">
                <v-text-field
                    v-model="client.name"
                    :label="$t('name')"
                    :error="errors.name"
                />

                <v-text-field
                    v-model="client.companyName"
                    :label="$t('companyName')"
                    :error="errors.companyName"
                />

                <v-checkbox v-model="client.isCompany" :label="$t('isCompany')" />
                <v-combobox
                    v-model="selectedCategory"
                    :items="dropdownCategories"
                    :label="$t('category')"
                    single-line
                />
                <v-combobox
                    v-model="client.tags"
                    :items="initialTags"
                    :search-input.sync="tagSearch"
                    hide-selected
                    :label="$t('tags')"
                    multiple
                    small-chips
                >
                    <template slot="no-data">
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    <i18n path="tagResults">
                                        <kbd place="enter">{{ $t('tagsResultsEnter') }}</kbd>
                                        <span place="result">{{ tagSearch }}</span>
                                    </i18n>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-combobox>
                <v-textarea v-model="client.description" :label="$t('description')" />
                <v-textarea v-model="client.notes" :label="$t('notes')" />
            </v-flex>
            <v-flex xs12 sm6>
                <h4>{{ $t('contactInfo') }}</h4>
                <v-text-field v-model="client.website" :label="$t('website')" />
                <v-text-field v-model="client.email" :label="$t('email')" type="email" />
                <v-text-field v-model="client.telephone" :label="$t('telephone')" />
                <v-text-field v-model="client.fax" :label="$t('fax')" />
                <v-textarea v-model="client.address" :label="$t('address')" />
                <h4>{{ $t('color') }}</h4>
                <swatches
                    v-model="client.color"
                    inline
                    colors="material-basic"
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    import Swatches from 'vue-swatches';
    import 'vue-swatches/dist/vue-swatches.min.css';

    export default Vue.extend({
        components: {
            Swatches
        },
        props: {
            errors: Object,
            errorMessage: Boolean,
            editClient: Object
        },
        data() {
            return {
                client: this.editClient || {},
                tagSearch: null,
                initialTags: this.editClient ? this.editClient.tags : []
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            dropdownCategories() {
                const notArchivedCategories = this.categories.filter(category => {
                    if (!category.archived) return category;
                });

                return notArchivedCategories.map(category => {
                    return {
                        value: category.id,
                        text: category.name
                    };
                });
            },
            selectedCategory: {
                get() {
                    const categoryId = this.client.categoryId;

                    if (!categoryId) {
                        return '';
                    }

                    const category = this.$store.getters['categories/getCategory'](categoryId);

                    return category
                        ? {
                            value: categoryId,
                            text: category.name
                        }
                        : '';
                },
                set(categoryObj) {
                    this.client.categoryId = categoryObj ? categoryObj.value : '';
                }
            }
        },
        watch: {
            client: {
                handler() {
                    this.$emit('input', this.client);
                },
                deep: true
            }
        },
        async mounted() {
            await this.getCategories();
        },
        methods: {
            ...mapActions('categories', [
                'getCategories'
            ])
        }
    });
</script>

<style lang="scss">
    .vue-swatches__container {
        background-color: transparent !important;
    }
</style>

<i18n>
{
    "en": {
        "name": "Name",
        "description": "Description",
        "client": "Client",
        "categories": "Categories",
        "color": "Color",
        "required": "Required",
        "anErrorOccurred": "An error occurred while trying to save the project. Please try again."
    },
    "de": {
        "name": "Name",
        "description": "Beschreibung",
        "client": "Kunden",
        "categories": "Kategorien",
        "color": "Farbe",
        "required": "Erforderlich",
        "anErrorOccurred": "Ein Fehler ist beim Speichern des Projektes aufgetreten. Bitte versuchen Sie noch einmal."
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

        <input type="hidden" v-model="project.id">

        <v-text-field
            v-model="project.name"
            :label="$t('name')"
            :rules="rules"
            :error="errors.name"
        />

        <v-textarea v-model="project.description" :label="$t('description')" />

        <v-combobox
            v-model="selectedClient"
            :items="getComboBoxClients()"
            :label="$t('client')"
            single-line
            class="mb-3"
        />

        <v-combobox
            v-model="selectedCategory"
            :items="getComboBoxCategories()"
            :label="$t('categories')"
            multiple
            chips
            class="mb-3"
        />

        <h4>{{ $t('color') }}</h4>
        <swatches
            v-model="project.color"
            inline
            colors="material-basic"
        />
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions, mapGetters } from 'vuex';

    import Swatches from 'vue-swatches';
    import 'vue-swatches/dist/vue-swatches.min.css';

    export default Vue.extend({
        components: {
            Swatches
        },
        props: {
            errors: Object,
            errorMessage: Boolean,
            editProject: Object
        },
        data() {
            return {
                rules: [
                    value => !!value || this.$t('required')
                ],
                project: this.editProject || {}
            };
        },
        computed: {
            ...mapState('categories', [
                'categories'
            ]),
            ...mapState('clients', [
                'clients'
            ]),
            selectedClient: {
                get() {
                    const clientId = this.project.clientId;

                    if (!clientId) {
                        return '';
                    }

                    const client = this.$store.getters['clients/getClient'](clientId);

                    return client
                        ? {
                            value: clientId,
                            text: client.name
                        }
                        : '';
                },
                set(selectClient) {
                    this.project.clientId = selectClient ? selectClient.value : '';
                }
            },
            selectedCategory: {
                get() {
                    const categoryIds = this.project.categoryIds;

                    if (!categoryIds || categoryIds.length <= 0) {
                        return '';
                    }

                    return categoryIds.map(id => {
                        const category = this.$store.getters['categories/getCategory'](id);
                        return {
                            value: id,
                            text: category.name
                        };
                    });
                },
                set(selectCategories) {
                    this.project.categoryIds = selectCategories.map(category => {
                        return category.value;
                    });
                }
            }
        },
        watch: {
            project: {
                handler() {
                    this.$emit('input', this.project);
                },
                deep: true
            }
        },
        async mounted() {
            await this.getCategories();
            await this.getClients();
        },
        methods: {
            ...mapActions('categories', [
                'getCategories'
            ]),
            ...mapGetters('categories', [
                'getComboBoxCategories'
            ]),
            ...mapActions('clients', [
                'getClients'
            ]),
            ...mapGetters('clients', [
                'getComboBoxClients'
            ])
        }
    });
</script>

<style lang="scss">
    .vue-swatches__container {
        background-color: transparent !important;
    }
</style>

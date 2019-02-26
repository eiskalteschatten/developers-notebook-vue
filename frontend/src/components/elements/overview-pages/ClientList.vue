<i18n>
{
    "en": {
        "noItems": "No {0} were found.",
        "clientsInSentence": "clients",
        "goToClient": "Go to the Client"
    },
    "de": {
        "noItems": "Keine {0} wurden gefunden.",
        "clientsInSentence": "Kunden",
        "goToClient": "Zum Kunden"
    }
}
</i18n>

<template>
    <div>
        <v-layout wrap v-if="clients && clients.length > 0">
            <v-flex
                v-for="client in clients"
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
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            clients: Array
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

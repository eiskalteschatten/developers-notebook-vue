<i18n>
{
    "en": {
        "alexseifertWebsite": "https://www.alexseifert.com",
        "close": "Close"
    },
    "de": {
        "alexseifertWebsite": "https://www.alexseifert.de",
        "close": "Schließen"
    }
}
</i18n>

<template>
    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-text>
                <v-layout wrap>
                    <v-flex xs12 md5 text-xs-center text-md-left>
                        <img src="../../../public/images/icon.svg" class="icon">
                    </v-flex>
                    <v-flex xs12 md7 text-xs-center text-md-left>
                        <v-layout wrap fill-height>
                            <v-flex mt-2>
                                <h2>Developer's Notebook</h2>
                                <div class="by mb-4">
                                    by <external-link :href="$t('alexseifertWebsite')" link-content="Alex Seifert" />
                                    <div>
                                        0.2.0
                                    </div>
                                </div>

                                <div class="legal">
                                    &copy; {{ copyrightYear }} Alex Seifert
                                </div>
                            </v-flex>

                            <v-flex xs12 text-md-right align-end mt-4>
                                <v-btn flat @click="dialog = false">{{ $t('close') }}</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import Vue from 'vue';
    import eventBus from '../../eventBus';

    import ExternalLink from './ExternalLink.vue';

    export default Vue.extend({
        components: {
            ExternalLink
        },
        data() {
            return {
                dialog: false
            };
        },
        computed: {
            copyrightYear() {
                const year = new Date().getFullYear();
                return year === 2019 ? year : `2019 - ${year}`;
            }
        },
        created() {
            eventBus.$on('open-modal', () => {
                this.dialog = true;
            });
        },
        destroyed() {
            eventBus.$off('open-modal');
        }
    });
</script>

<style lang="scss" scoped>
    .icon {
        height: 175px;
        width: 175px;
    }

    .by {
        font-size: .9em;
    }

    .legal {
        font-size: .8em;
    }
</style>

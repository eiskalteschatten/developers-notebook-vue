<i18n>
{
    "en": {
        "settings": "Settings",
        "theme": "Theme",
        "light": "Light",
        "dark": "Dark"
    },
    "de": {
        "settings": "Einstellungen",
        "theme": "Erscheinungsbild",
        "light": "Hell",
        "dark": "Dunkel"
    }
}
</i18n>

<template>
    <centered-column>
        <v-card class="pa-2 mb-5">
            <v-card-title primary-title>
                <h1>{{ $t('settings') }}</h1>
            </v-card-title>
            <v-card-text>

                <div class="mb-3">
                    <h3>{{ $t('theme') }}</h3>

                    <div class="preferences-theme mt-3 mr-5" @click="setTheme('light')">
                        <div class="theme-image light" :class="{ 'selected': theme === 'light' }">
                            <div class="gradient"></div>
                        </div>
                        {{ $t('light') }}
                    </div>
                    <div class="preferences-theme" @click="setTheme('dark')">
                        <div class="theme-image dark" :class="{ 'selected': theme === 'dark' }">
                            <div class="gradient"></div>
                        </div>
                        {{ $t('dark') }}
                    </div>
                </div>

            </v-card-text>
        </v-card>
    </centered-column>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    import CenteredColumn from '../elements/layout/CenteredColumn.vue';

    export default Vue.extend({
        components: {
            CenteredColumn
        },
        computed: {
            ...mapState('settings', [
                'theme'
            ])
        },
        methods: {
            ...mapActions('settings', [
                'setTheme'
            ])
        }
    });
</script>

<style lang="scss" scoped>
    .preferences-theme {
        cursor: pointer;
        display: inline-block;
        text-align: center;

        .theme-image {
            $borderSize: 2px;
            height: 75px;
            margin-bottom: 10px;
            width: 100%;

            &.light {
                .gradient {
                    background-image: linear-gradient(to right, #000000 10%, #f3f3f3 10%, #f3f3f3 90%);
                }
            }

            &.dark {
                .gradient {
                    background-image: linear-gradient(to right, #000000 10%, #252525 10%, #252525 90%);
                }
            }

            &.selected {
                .gradient {
                    border: $borderSize solid #2261a1;
                }
            }

            .gradient {
                border: $borderSize solid rgba(0, 0, 0, 0.3);
                border-radius: 3px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                height: 100%;
                width: 120px;
            }
        }
    }
</style>

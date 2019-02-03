<i18n>
{
    "en": {
        "alexseifertWebsite": "https://www.alexseifert.com"
    },
    "de": {
        "alexseifertWebsite": "https://www.alexseifert.de"
    }
}
</i18n>

<template>
    <div>
        &copy; {{ copyrightYear }} <a :href="$t('alexseifertWebsite')" @click="openWebsite" target="_blank">Alex Seifert</a>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                isElectron: localStorage.getItem('isElectron')
            };
        },
        computed: {
            copyrightYear() {
                const year = new Date().getFullYear();
                return year === 2019 ? year : `2019 - ${year}`;
            }
        },
        methods: {
            openWebsite(event) {
                if (this.isElectron) {
                    event.preventDefault();
                    const { shell } = require('electron');
                    shell.openExternal(this.$t('alexseifertWebsite'));
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

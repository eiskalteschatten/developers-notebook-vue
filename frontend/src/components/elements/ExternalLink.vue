<template>
    <a :href="href" @click="openWebsite" :target="target">
        {{ linkContent }}
    </a>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            href: String,
            target: {
                type: [String, Boolean],
                default: '_blank'
            },
            linkContent: String
        },
        data() {
            return {
                isElectron: localStorage.getItem('isElectron')
            };
        },
        methods: {
            openWebsite(event) {
                if (this.isElectron) {
                    event.preventDefault();
                    const { shell } = require('electron');
                    shell.openExternal(this.href);
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

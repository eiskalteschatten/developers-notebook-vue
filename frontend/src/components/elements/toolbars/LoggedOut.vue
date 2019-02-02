<template>
    <v-toolbar dark color="secondary" class="toolbar">
        <v-toolbar-title class="white--text">Developer's Notebook</v-toolbar-title>
    </v-toolbar>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
    .electron {
        .toolbar {
            -webkit-app-region: drag;
            -webkit-user-select: none;
        }
    }
</style>

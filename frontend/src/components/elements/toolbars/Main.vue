<template>
    <v-toolbar dark color="secondary" class="toolbar">
        <v-flex xs12 class="text-xs-center">
            <img src="images/white-icon.svg" class="main-icon" />
        </v-flex>
    </v-toolbar>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
    });
</script>

<style lang="scss" scoped>
    .main-icon {
        height: 30px;
    }

    .electron {
        .toolbar {
            -webkit-app-region: drag;
            -webkit-user-select: none;
        }
    }
</style>

<template>
    <v-toolbar dark color="secondary" class="toolbar" app clipped-left>
        <v-flex xs4>
            <v-toolbar-side-icon v-if="$vuetify.breakpoint.mdAndDown" @click="toggleSidebar" />
        </v-flex>
        <v-flex xs4 class="text-xs-center">
            <img src="images/white-icon.svg" class="main-icon" />
        </v-flex>
        <v-flex xs4 class="text-xs-right">

        </v-flex>
    </v-toolbar>
</template>

<script>
    import Vue from 'vue';
    import eventBus from '../../../eventBus';

    export default Vue.extend({
        methods: {
            toggleSidebar() {
                eventBus.$emit('toggleSidebar');
            }
        }
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

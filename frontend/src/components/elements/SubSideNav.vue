<template>
    <v-list dense>
        <v-list-tile
            v-for="(item, index) in items"
            :key="index"
            @click="emitClick(item.click)"
            :class="item.class"
        >
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    import Vue from 'vue';

    export default Vue.extend({
        props: {
            items: Array
        },
        methods: {
            emitClick(func) {
                this.$emit('clicked', func);
            }
        }
    });
</script>

<style lang="scss" scoped>
    .theme--dark {
        .active {
            background-color: var(--v-selected-darken2);
        }
    }

    .theme--light {
        .active {
            background-color: var(--v-selected-lighten2);
        }
    }
</style>

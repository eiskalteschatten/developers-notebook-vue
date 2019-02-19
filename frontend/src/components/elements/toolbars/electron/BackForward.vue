<template>
    <div class="back-forward">
        <v-btn dark icon @click="goBack" :disabled="backDisabled">
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-btn dark icon @click="goForward" v-if="$vuetify.breakpoint.smAndUp" :disabled="forwardDisabled">
            <v-icon>arrow_forward</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapMutations } from 'vuex';

    export default Vue.extend({
        computed: {
            ...mapState('nav', [
                'historyIndex'
            ]),
            backDisabled() {
                return this.historyIndex <= 1;
            },
            forwardDisabled() {
                return this.historyIndex >= history.length;
            }
        },
        methods: {
            ...mapMutations('nav', [
                'setHistoryIndex'
            ]),
            goBack() {
                this.$router.back();
                const historyIndex = this.historyIndex - 2;
                this.setHistoryIndex(historyIndex);
            },
            goForward() {
                this.$router.forward();
            }
        }
    });
</script>

<style lang="scss" scoped>
    .back-forward {
        display: inline;
    }
</style>

<template>
    <div>
        <v-btn dark icon @click="goBack" :disabled="backDisabled">
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-btn dark icon @click="goForward" :disabled="forwardDisabled">
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
                'backUrls',
                'forwardUrls',
                'historyIndex'
            ]),
            backDisabled() {
                return this.historyIndex <= 1; //this.backUrls.length <= 0;
            },
            forwardDisabled() {
                return false;//this.forwardUrls.length <= 0;
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
                const historyIndex = this.historyIndex + 1;
                this.setHistoryIndex(historyIndex);
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

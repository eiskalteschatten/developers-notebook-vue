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
    import { mapState } from 'vuex';

    export default Vue.extend({
        computed: {
            ...mapState('nav', [
                'backUrls',
                'forwardUrls'
            ]),
            backDisabled() {
                return this.backUrls.length <= 0;
            },
            forwardDisabled() {
                return this.forwardUrls.length <= 0;
            }
        },
        methods: {
            goBack() {
                this.$router.back();
            },
            goForward() {
                this.$router.forward();
            }
        }
    });
</script>

<style lang="scss" scoped>
</style>

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

    export default Vue.extend({
        computed: {
            backDisabled() {
                return false;
            },
            forwardDisabled() {
                return false;
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

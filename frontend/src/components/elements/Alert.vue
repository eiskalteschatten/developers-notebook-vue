<template>
    <v-snackbar v-model="snackbar" bottom left>
        <v-icon v-if="isError" color="red" left>
            error
        </v-icon>

        {{ message }}

        <v-btn flat icon @click="snackbar = false">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    import Vue from 'vue';
    import eventBus from '../../eventBus';

    export default Vue.extend({
        data() {
            return {
                snackbar: false,
                message: '',
                isError: false
            };
        },
        created() {
            eventBus.$on('show-alert', this.showAlert);
            eventBus.$on('close-alert', this.closeAlert);
        },
        methods: {
            showAlert(message, isError = false) {
                this.message = message;
                this.snackbar = true;
                this.isError = isError;
            },
            closeAlert() {
                this.snackbar = false;
            }
        }
    });
</script>

<style lang="scss">

</style>

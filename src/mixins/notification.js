export default {
    methods: {
        $_notification_notify(message) {
            this.$notify({
                type: 'success',
                title: this.$t('main.notifications.title'),
                text: message,
            });
        },
        $_notification_notify_fail(message) {
            this.$notify({
                type: 'warn',
                title: this.$t('main.notifications.title'),
                text: message,
            });
        },
        $_notification_confirmDelete(question) {
            return this.$swal({
                title: this.$t('main.confirm.title'),
                text: question,
                showCancelButton: true,
                confirmButtonText: this.$t('main.confirm.yes'),
                cancelButtonText: this.$t('main.confirm.no')
            })
        },
    },
}
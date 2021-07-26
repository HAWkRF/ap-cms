<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="users-params">
    <users-params-table
        @updated="updated"
        @created="created">
    </users-params-table>
  </div>
</template>

<script>
  import notificationMixin from '@/mixins/notification'
  import UsersParamsTable from '@/components/users-params/UsersParamsTable'

  export default {
    components: {
      UsersParamsTable,
    },
    mixins: [
      notificationMixin,
    ],
    data() {
      return {};
    },
    methods: {
      created() {
        this.$_notification_notify(this.$t('main.usersParams.created'));
      },
      updated() {
        this.$_notification_notify(this.$t('main.usersParams.updated'));
      },
    },
  }
</script>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="places">
    <departments
        @updated="updated"
        @created="created">
    </departments>
  </div>
</template>

<script>
  import notificationMixin from '@/mixins/notification'
  import Departments from '@/components/places/Departments'

  export default {
    components: {
      Departments,
    },
    mixins: [
      notificationMixin,
    ],
    data() {
      return {};
    },
    methods: {
      created() {
        this.$_notification_notify(this.$t('main.notifications.created'));
      },
      updated() {
        this.$_notification_notify(this.$t('main.notifications.updated'));
      },
    },
  }
</script>

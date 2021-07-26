<template>
  <div class="main">

  </div>
</template>

<script>
  import {USER_REQUEST} from '@/store/modules/user/actions'

  export default {
    name: 'main-page',
    async created() {
      if (this.$store.getters.isAuthenticated) {
         this.$router.push({ name: "kb" });
        // if (!this.$store.getters.isProfileLoaded) {
        //   await this.$store.dispatch(USER_REQUEST);
        // }

        // if (this.$store.getters.hasOnlyClient || this.$store.getters.withoutRight) {
        //   this.$router.push({name: 'user', params: {id: this.$store.getters.getProfile.id}});
        // } else {
        //   this.$router.push({name: 'users'})
        // }
      } else {
        this.$router.push('/login');
      }
    },
  }
</script>

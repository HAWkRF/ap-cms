<template>
  <div id="app">
    <notifications classes="vue-notification" position="bottom left"></notifications>
    <vue-progress-bar></vue-progress-bar>
    <component v-bind:is="layout"></component>
  </div>
</template>

<script>
  import '@/scss/main.scss'
  import SimpleLayout from './layouts/Simple.vue'
  import EmptyLayout from './layouts/Empty.vue'
  // import {USER_REQUEST} from '@/store/modules/user/actions'

  export default {
    computed: {
      layout () {
        return this.$store.getters.layout + '-layout'
      }
    },
    components: {
      SimpleLayout,
      EmptyLayout,
    },
    mounted () {
      //  [App.vue specific] When App.vue is finish loading finish the progress bar
      this.$Progress.finish()
    },
    created: function () {
      // if (this.$store.getters.isAuthenticated) {
      //   this.$store.dispatch(USER_REQUEST);
      // }
    },

  }
</script>
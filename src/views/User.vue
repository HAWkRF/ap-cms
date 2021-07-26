<template>
  <div class="user-profile">
    <transition :name="transitionName" mode="out-in">
      <user-view
          @updated="updated"
          :userId="userId"
          :key="userId">
      </user-view>
    </transition>
  </div>
</template>

<script>
  import Form from '@/utils/Form'
  import ak from '@/utils/account'
  import notificationMixin from '@/mixins/notification'
  import UserView from "@/components/users/UserView"

  import {USER_REQUEST} from '@/store/modules/user/actions'

  export default {
    name: 'user',
    props: {
      id: {
        type: [Number, String],
        required: true,
      },
    },
    components: {
      UserView,
    },
    mixins: [
      notificationMixin,
    ],
    data() {
      return {
        transitionName: 'slide-right',

        account: ak,
        userId: this.id,

        form: new Form(),
        okOnly: false,
        formModal: {
          id: null,
          show: false,
          name: '',
          surname: '',
          patronymic: '',
          destination: '',
          okTitle: ''
        },
      };
    },
    computed: {},
    methods: {
      updated() {
      },
    },
    async beforeRouteUpdate(to, from, next) {
      this.userId = to.params.id;

      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';

      next();
    },
    async created() {
      if (this.$store.getters.isAuthenticated) {
        // if (!this.$store.getters.isProfileLoaded) {
        //   await this.$store.dispatch(USER_REQUEST);
        // }

        // if (this.$store.getters.hasOnlyClient) {
        //   this.$router.push({name: 'user', params: {id: this.$store.getters.getProfile.id}});
        // }
      }
    }
  }
</script>

<style scoped>

</style>
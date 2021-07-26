<template>
  <div id="wrapper">
    <main class="wrapper-content" :class="{ full: collapsed }">
      <div class="app-page">
        <transition :name="transitionName" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {
      transitionName: "slide-right",
      collapsed: false,
    };
  },
  computed: {
    ...mapGetters({ profile: "getProfile" }),
  },
  methods: {
    goProfile() {
      this.$router.push({ name: "user", params: { id: this.profile.id } });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },

    isCanShowNavigate() {
      return false;
      // return this.$can('userPermissionEdit');
    },

    onCollapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
  },
};
</script>

<style lang="scss">
.app-content {
  position: relative;
  padding-top: 0;
  padding-left: 220px;
  transition: padding-left 0.3s;
}

.app-content.full {
  padding-left: 50px;
}

.navbar-brand {
  padding-top: 0;
  padding-bottom: 0;

  img {
    max-height: 45px;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease;
}

.slide-right-enter,
.slide-right-leave-to,
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
}

.slide-left-enter,
.slide-right-leave-to {
  transform: translateX(50px);
}

.slide-right-enter,
.slide-left-leave-to {
  transform: translateX(-50px);
}
</style>

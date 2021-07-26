<template>
  <div id="wrapper">
    <router-view
      @collapsed="handleCollapsed"
      :collapsed="sidebarCollapsed"
      name="sidebar"
    ></router-view>

    <div class="content-ap">
      <b-navbar class="navbar-ap">
        <template v-if="sidebarCollapsed">
          <span
            @click="sidebarCollapsed = false"
            class="micon micon__chevron-double-right"
          ></span>
          <logo @click.stop="sidebarCollapsed = false"></logo>
        </template>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto" v-if="isAuthenticated()">
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>{{ profile.name }}</em>
              </template>
              <b-dropdown-item @click="goUsers">{{
                $t("main.menu.users")
              }}</b-dropdown-item>
              <b-dropdown-item @click="goProfile">{{
                $t("main.menu.profile")
              }}</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout">{{
                $t("main.menu.logout")
              }}</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>

        <header
          class="header-navigation d-none d-sm-block"
          v-if="isCanShowNavigate() && isAuthenticated()"
        >
          <router-view name="navbar"></router-view>
        </header>
      </b-navbar>

      <main class="wrapper-content" :class="{ full: collapsed }">
        <div class="app-page">
          <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </main>

      <router-view name="footer"></router-view>
    </div>
  </div>
</template>

<script>
import Logo from "@/layouts/Logo";
// import Help from '@/components/Help';
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";
import { mapGetters } from "vuex";

export default {
  components: {
    Logo,
    // Help,
  },
  data() {
    return {
      transitionName: "slide-right",
      collapsed: false,

      sidebarCollapsed: false,

      formModalHelp: {
        id: null,
        show: false,
        title: this.$t("main.help"),
      },
    };
  },
  computed: {
    ...mapGetters({ profile: "getProfile" }),
  },
  methods: {
    collapsedInit() {
      const width = window.innerWidth;
      if (width < 992) {
        this.sidebarCollapsed = true;
      }
    },
    handleCollapsed() {
      this.sidebarCollapsed = true;
    },

    openHelpModal() {
      this.formModalHelp.show = true;
    },
    handleClose(event) {
      event.preventDefault();
      this.formModalHelp.show = false;
    },

    isWorker() {
      return true;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    goProfile() {
      this.$router.push({ name: "user", params: { id: this.profile.id } });
    },
    goUsers() {
      this.$router.push({ name: "users" });
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },

    isCanShowNavigate() {
      return true;
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
  async created() {
    this.collapsedInit();
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

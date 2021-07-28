<template>
  <div class="sidebar-ap" ref="sidebar" :class="{ collapsed: collapsed }">
    <div class="logo-ap">
      <logo></logo>

      <span
        @click="handleSidebar"
        class="micon micon__chevron-double-left"
      ></span>
    </div>

    <div class="items-ap">
      <div class="item-ap" @click="handleProfile">
        <span class="micon micon__user-ap"></span>
        <span class="title">{{ $t("main.nav.profile") }}</span>
      </div>

      <div class="item-ap" @click="handleUsers">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.users") }}</span>
      </div>
      
       <div class="item-ap" @click="handleArticles">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.kb") }}</span>
      </div>

       <div class="item-ap" @click="handleCategories">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.kbCategories") }}</span>
      </div>

      <hr />
    </div>
  </div>
</template>

<script>
import Logo from "@/layouts/Logo";

import { mapGetters } from "vuex";

export default {
  name: "sidebar",
  props: {
    collapsed: {
      default: false,
    },
  },
  components: {
    Logo,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ profile: "getProfile" }),
  },
  methods: {
    handleSidebar() {
      this.$emit("collapsed");
    },

    handleProfile() {
      this.$router.push({ name: "user", params: { id: this.profile.id } });
      this.collapsedCondition();
    },
    handleUsers() {
      this.$router.push({ name: "users" });
      this.collapsedCondition();
    },
    handleArticles() {
      this.$router.push({ name: "kb" });
      this.collapsedCondition();
    },
    handleCategories() {
      this.$router.push({ name: "kbcategory" });
      this.collapsedCondition();
    },
    collapsedCondition() {
      const width = window.innerWidth;
      if (width < 992) {
        this.$emit("collapsed");
      }
    },
  },
  created() {},
};
</script>
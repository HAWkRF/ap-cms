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
      
      <hr />

       <div class="item-ap" @click="handleArticles">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.kb") }}</span>
      </div>

       <div class="item-ap" @click="handleKbCategories">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.kbCategories") }}</span>
      </div>

      <hr />
      <div class="item-ap" @click="handleVacancies">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.vacancy") }}</span>
      </div>

        <div class="item-ap" @click="handlePartners">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.partners") }}</span>
      </div>

        <div class="item-ap" @click="handleEmployees">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.employees") }}</span>
      </div>
      <hr />
        <div class="item-ap" @click="handleSettings">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.settingsSite") }}</span>
      </div>
      <hr />
      <div class="item-ap" @click="handleCategories">
        <span class="micon micon__users"></span>
        <span class="title">{{ $t("main.nav.categoriesGoods") }}</span>
      </div>
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
    handleKbCategories() {
      this.$router.push({ name: "kbcategory" });
      this.collapsedCondition();
    },
    handleVacancies() {
      this.$router.push({ name: "vacancy" });
      this.collapsedCondition();
    },
    handlePartners() {
      this.$router.push({ name: "partners" });
      this.collapsedCondition();
    },
    handleEmployees() {
      this.$router.push({ name: "employees" });
      this.collapsedCondition();
    },
    handleSettings() {
      this.$router.push({ name: "settings" });
      this.collapsedCondition();
    },
    handleCategories() {
      this.$router.push({ name: "categories" });
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
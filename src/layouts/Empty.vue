<template>
  <section class="wrapper-content">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  components: {
  },
  mounted() {
    document.body.classList.add("empty");
  },
  destroyed() {
    document.body.classList.remove("empty");
  },
};
</script>

<style lang="scss">
body.empty {
  background-color: #f8f8f8;
}
</style>
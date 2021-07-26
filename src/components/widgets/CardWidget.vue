<template>
  <b-card class="custom-card" :class="cardClass" :title="cardTitle">
    <b-card-sub-title>
      <a @click.prevent="handleClickAction">{{ cardActionTitle }}</a>
    </b-card-sub-title>

    <slot name="card" />
  </b-card>
</template>

<script>
export default {
  components: {},
  props: {
    cardClass: {
      type: String,
      default: "",
    },
    cardTitle: {
      type: String,
      default: function () {
        return this.$t("cardWidget.cardTitle");
      },
    },
    cardActionTitle: {
      type: String,
      default: function () {
        return this.$t("cardWidget.cardActionTitle");
      },
    },
  },

  data: function () {
    return {
      loading: false,
    };
  },
  methods: {
    handleClickAction() {
      this.$emit("clickAction");
    },

    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },
  },
  async created() {
    this.loading = true;
    this.loading = false;
  },
};
</script>


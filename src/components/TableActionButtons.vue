<template>
  <div class="float-right">
    <slot name="prependButtons"></slot>
    <b-button
      v-if="updateVisible"
      size="sm"
      class="ml-1"
      variant="outline-secondary"
      @click.stop="updateClick"
    >
      <!-- <font-awesome-icon
                    fixed-width
                    icon="edit">
            </font-awesome-icon> -->
      <span class="micon micon__pencil"> </span>
    </b-button>
    <b-button
      v-if="deleteVisible"
      size="sm"
      class="ml-1"
      variant="outline-secondary"
      @click.stop="deleteClick"
    >
      <span class="micon micon__delete"> </span>

      <!-- <font-awesome-icon
                    fixed-width
                    icon="trash-alt">
            </font-awesome-icon> -->
    </b-button>
    <slot name="appendButtons"></slot>
  </div>
</template>

<script>
export default {
  props: {
    updateVisible: {
      type: Boolean,
      default: true,
    },
    deleteVisible: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    updateClick() {
      this.$emit("update");
    },
    deleteClick() {
      this.$emit("delete");
    },
  },
};
</script>
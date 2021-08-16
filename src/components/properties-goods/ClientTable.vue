<template>
  <div>
    <v-client-table
      ref="itemsTable"
      :columns="tableColumnsItems"
      :options="tableOptions"
      :data="items"
      @row-click="handleView"
    >
      <template v-slot:values="{ row }">
        {{ row.items.alias }}
      </template>
      <template v-slot:actions="{ row }">
        <table-action-buttons
          :update-visible="true"
          :delete-visible="true"
          @update="openUpdateModal(row.id)"
          @delete="handleDelete(row.id)"
        >
        </table-action-buttons>
      </template>
    </v-client-table>

    <b-modal
      lazy
      v-model="formModal.show"
      modal-class="modal-right"
      size="lg"
      :title="formModal.title"
      :okTitle="$t('main.save')"
      :cancelTitle="$t('main.cancel')"
      @ok="handleSave"
      @hidden="resetForm"
    >
      <properties-goods-items-form
        ref="propertiesItemsForm"
        :internalId="formModal.id"
        @updated="updated"
        @created="created"
      >
      </properties-goods-items-form>
    </b-modal>
  </div>
</template>
<script>
import PropertiesGoodsItemsForm from "@/components/properties-goods/PropertiesGoodsItemsForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  components: {
    PropertiesGoodsItemsForm,
    TableActionButtons,
  },
  data: function () {
    return {
      tableOptions: {
        perPage: 10,
      },
      formModal: {
        id: null,
        show: false,
        title: "",
      },
    };
  },
  props: {
    items: {
      type: [Array, Object],
      default: function () {
        return [];
      },
    },
  },
  computed: {
    tableColumnsItems() {
      const actions = ["actions"];
      return ["value", ...actions];
    },
  },
  methods: {
    created() {
      this.$_notification_notify(this.$t("main.notifications.created"));
      this.saved();
    },
    updated() {
      this.$_notification_notify(this.$t("main.notifications.updated"));
      this.saved();
    },
    async saved() {
      this.formModal.show = false;
      this.refreshTable();
    },
    refreshTable() {
      this.$refs.itemsTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("propertiesGoods.items.create");
    },
    openUpdateModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("propertiesGoods.items.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.propertiesItemsForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    handleView({ row }) {
      this.openUpdateModal(row.id);
    },
  },
};
</script>

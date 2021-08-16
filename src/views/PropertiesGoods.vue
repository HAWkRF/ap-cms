<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <div class="row-ap">
      <div class="col-12">
        <h1>{{ $t("propertiesGoods.page_title") }}</h1>
        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('propertiesGoods.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <properties-goods-search ref="searchForm" @search="search">
              </properties-goods-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="propertiesTable"
          :url="apiUrl"
          :columns="tableColumns"
          :options="tableOptions"
          @row-click="handleView"
        >
          <template v-slot:title="{ row }">
            {{ row.title }}
          </template>
          <template v-slot:count_canvas="{ row }">
            {{ row.count_canvas }}
          </template>
          <template v-slot:values="{ row }">
            <client-table :items="row.propertiesItems">
            </client-table>
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
        </v-server-table>

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
          <properties-goods-form
            ref="propertiesForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </properties-goods-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/properties-goods";
import PropertiesGoodsSearch from "@/components/properties-goods/PropertiesGoodsSearch";
import PropertiesGoodsForm from "@/components/properties-goods/PropertiesGoodsForm";
import TableActionButtons from "@/components/TableActionButtons";
import ClientTable from "@/components/properties-goods/ClientTable";

export default {
  name: "properties-goods",
  components: {
    PropertiesGoodsForm,
    PropertiesGoodsSearch,
    TableActionButtons,
    ClientTable,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      apiUrl: Api.baseUrl + `?expand=propertiesItems`,
      baseUrl: process.env.VUE_APP_API,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("propertiesGoods.table.id"),
          title: this.$t("propertiesGoods.table.title"),
          values: this.$t("propertiesGoods.table.values"),
          actions: "",
        },
        sortable: ["id"],
        params: {},
        columnsClasses: {
          id: "properties-goods-id",
        },
      },
      formModal: {
        id: null,
        show: false,
        title: "",
      },
    };
  },
  computed: {
    tableColumns() {
      const actions = ["actions"];
      return ["id", "title", "values", ...actions];
    },
  },
  methods: {
    searchRefresh() {
      this.$refs.searchForm.fetchFilters();
    },
    search(searchForm) {
      this.$set(this.tableOptions, "params", searchForm);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.propertiesTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("propertiesGoods.create");
    },
    openUpdateModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("propertiesGoods.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.propertiesForm.submit();
    },
    resetForm() {
      this.formModal.id = null;
    },
    async handleDelete(id) {
      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete")
      );
      if (result.value) {
        await Api.deleteModel(id);
        this.$_notification_notify(this.$t("main.notifications.deleted"));
        this.searchRefresh();
        this.refreshTable();
      }
    },
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
      this.searchRefresh();
      this.refreshTable();
    },
    handleView({ row }) {
      this.openUpdateModal(row.id);
    },
  },
};
</script>

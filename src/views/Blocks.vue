<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <div class="row-ap">
      <div class="col-12">
        <h1>{{ $t("blocks.page_title") }}</h1>
        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button @click="openCreateModal" v-text="$t('blocks.create')" block>
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <blocks-search ref="searchForm" @search="search"> </blocks-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="blocksTable"
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
          <blocks-form
            ref="blocksForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </blocks-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/blocks";
import BlocksSearch from "@/components/blocks/BlocksSearch";
import BlocksForm from "@/components/blocks/BlocksForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "blocks",
  components: {
    BlocksForm,
    BlocksSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      apiUrl: Api.baseUrl,
      baseUrl: process.env.VUE_APP_API,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("blocks.table.id"),
          title: this.$t("blocks.table.title"),
          alias: this.$t("blocks.table.alias"),
          statusTitle: this.$t("blocks.table.status"),
          actions: "",
        },
        sortable: ["id", "title", "alias", "statusTitle"],
        params: {},
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
      return ["id", "title", "alias", "statusTitle", ...actions];
    },
  },
  methods: {
    imgUrl(rowItem) {
      return this.baseUrl + rowItem.prev_img.src + this.img_size;
    },
    searchRefresh() {
      this.$refs.searchForm.fetchFilters();
    },
    search(searchForm) {
      this.$set(this.tableOptions, "params", searchForm);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.blocksTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("blocks.create");
    },
    openUpdateModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("blocks.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.blocksForm.submit();
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

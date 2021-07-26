<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <div class="row-ap">
      <div class="col-12">
        <h1>{{ $t("kb.articles.title") }}</h1>

        <div class="search-form">
          <b-row>
            <b-col order-lg="2" lg="auto">
              <b-button
                @click="openCreateModal"
                v-text="$t('kb.create')"
                block
              >
              </b-button>
            </b-col>
            <b-col order-md="1" col>
              <kb-search ref="searchForm" @search="search"> </kb-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="kbArticlesTable"
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
          <kb-form
            ref="kbForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </kb-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/kb";
import KbSearch from "@/components/kb/articles/KbSearch";
import KbForm from "@/components/kb/articles/KbForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "kb",
  components: {
    KbForm,
    KbSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      apiUrl: Api.baseUrl,
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("kb.articles.table.id"),
          title: this.$t("kb.articles.table.title"),
          status_title: this.$t("kb.articles.table.status"),
          actions: "",
        },
        sortable: ["id", "title", "statusTitle"],
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
      return ["id", "title", "status_title", ...actions];
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
      this.$refs.kbArticlesTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("kb.create");
    },
    openUpdateModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("kb.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.kbForm.submit();
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

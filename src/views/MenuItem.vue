<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="container-fluid">
    <div class="row-ap">
      <div class="col-12">
        <h1>{{ $t("menuItem.page_title") }}</h1>
          <div class="search-form">
            <b-row>
              <b-col order-lg="2" lg="auto">
                <b-button
                @click="openCreateModal"
                v-text="$t('menuItem.create')"
                block
              >
                </b-button>
              </b-col>
            <b-col order-md="1" col>
              <menu-item-search ref="searchForm" @search="search"> </menu-item-search>
            </b-col>
          </b-row>
        </div>

        <v-server-table
          ref="menuItemTable"
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
              ref="tableButtons"
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
          <menu-item-form
            ref="menuItemForm"
            :internalId="formModal.id"
            @updated="updated"
            @created="created"
          >
          </menu-item-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/menu-item";
import MenuItemSearch from "@/components/menu-item/MenuItemSearch";
import MenuItemForm from "@/components/menu-item/MenuItemForm";
import TableActionButtons from "@/components/TableActionButtons";

export default {
  name: "menu-item",
  components: {
    MenuItemForm,
    MenuItemSearch,
    TableActionButtons,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      isCreate: null,
      apiUrl: Api.baseUrl + `/item-index/${this.$route.params.id}`,
      baseUrl: process.env.VUE_APP_API,
      img_size: "?w=80&h=80",
      tableOptions: {
        perPage: 10,
        headings: {
          id: this.$t("menuItem.table.id"),
          title: this.$t("menuItem.table.title"),
          image: this.$t("menuItem.table.image"),
          parent_title: this.$t("menuItem.table.parent_id"),
          sort: this.$t("menuItem.table.sort"),
          status_title: this.$t("menuItem.table.status"),
          actions: "",
        },
        sortable: ["id", "title", "parent_tile", "sort", "status"],
        params: {},
      },
      formModal: {
        id: null,
        show: false,
        title: "",
      },
    };
  },
  created() {
    this.$route.params.id ? (this.isCreate = true) : (this.isCreate = false);
    if (this.isCreate) {
     // this.getMenuItems();
    }
  },
  computed: {
    tableColumns() {
      const actions = ["actions"];
      return ["id", "title", "image", "parent_title", "sort", "status_title", ...actions];
    },
  },
  methods: {
    async getMenuItems() {
        //const responseFilter = await Api.getFilters(this.$route.params.id);
        //const response = await Api.getItemId(this.$route.params.id);
        
    },
    searchRefresh() {
      this.$refs.searchForm.fetchFilters();
    },
    search(searchForm) {
      this.$set(this.tableOptions, "params", searchForm);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.menuItemTable.getData();
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("menuItem.create");
    },
    openUpdateModal(id) {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.title = this.$t("menuItem.update");
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.menuItemForm.submit();
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
    created(id) {
      this.$_notification_notify(this.$t("main.notifications.created"));
      this.isCreate = true;
      this.$router.push({ name: "menu-item", params: { id: id } });
      this.getMenuItems();
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

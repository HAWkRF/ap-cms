<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="users">
    <div class="container-fluid">
      <div class="row-ap align-items-center justify-content-start">
        <div class="action-menu col-4 col-md-auto ml-0 ml-sm-auto">
          <div class="item" @click="handleAddUser">
            <span class="micon micon__add-user"></span>
            <span class="title">{{ $t("main.nav.add") }}</span>
          </div>
        </div>

        <div class="action-menu col-4 col-md-auto">
          <div class="item" @click="handleSearch">
            <span class="micon micon__search-user"></span>
            <span class="title">{{ $t("main.nav.search") }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <v-server-table
            ref="usersTable"
            :url="apiUrl"
            @loaded="onLoaded"
            :columns="tableColumns"
            :options="tableOptions"
          >
            <template v-slot:avatar="{ row }">
              <div class="avatar" @click="handleView({ row })">
                <div class="avatar-img">
                  <img
                    :src="account.host(row.profile.avatarUrl)"
                    alt=""
                    class="img-avatar"
                  />
                </div>
                <div
                  class="avatar-status"
                  :class="{
                    'bg-danger': !row.online,
                    'bg-success': row.online,
                  }"
                ></div>
              </div>
            </template>

            <template v-slot:profile.fullName="{ row }">
              <div @click="handleView({ row })">
                <div>{{ row.profile.fullName }}</div>

                <small class="text-muted">
                  <span v-if="row.profile.birthday">{{
                    row.profile.birthday
                  }}</span>
                  <span v-if="row.profile.age && row.profile.birthday">
                    ({{ row.profile.age }})</span
                  >
                  <p class="mt-0 mb-0">{{ row.activity }}</p>
                </small>
              </div>
            </template>

            <template v-slot:actions="{ row }">
              <b-dropdown squared variant="outline-secondary" right no-caret>
                <template v-slot:button-content>
                  <font-awesome-icon fixed-width icon="bars">
                  </font-awesome-icon>
                </template>

                <b-dropdown-item @click="handleDelete(row.id, $event)"
                  >{{ $t("users.delete") }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </v-server-table>
        </div>
      </div>
    </div>

    <b-modal
      lazy
      :ok-only="okOnly"
      v-model="formModal.show"
      :modal-class="getClassFormModal()"
      :size="getSizeFormModal()"
      :title="formModal.title"
      content-class="content-wrap"
      :okTitle="formModal.okTitle"
      :cancelTitle="$t('main.cancel')"
      @ok="wrapperHandlers"
    >
      <user-view
        v-if="formModal.destination == 'viewUser'"
        @updated="updated"
        :userId="formModal.id"
      >
      </user-view>

      <search-form
        v-if="formModal.destination == 'searchUsers'"
        ref="searchForm"
        :obForm="form ? form : null"
        @search="search"
      >
      </search-form>
    </b-modal>
  </div>
</template>

<script>
import Form from "@/utils/Form";
import ak from "@/utils/account";
import tableRefreshMixin from "@/mixins/table";
import notificationMixin from "@/mixins/notification";
import filtersMixin from "@/mixins/filters";
import Api from "@/api/v1/users";
import UserView from "@/components/users/UserView";
import SearchForm from "@/components/users/SearchForm";

import { USER_REQUEST } from "@/store/modules/user/actions";

export default {
  name: "users",
  components: {
    UserView,
    SearchForm,
  },
  mixins: [notificationMixin, tableRefreshMixin, filtersMixin],
  data() {
    return {
      account: ak,

      popoverShow: false,
      selectAllPages: false,
      selectAll: false,
      usersIds: {},

      apiUrl: Api.baseUrl,
      tableOptions: {
        perPage: 50,
        skin: "table table-sm table-hover",
        columnsClasses: {
          avatar: "ava",
          "profile.fullName": "user-info",
          contacts: "user-info-contacts",
          actions: "act",
        },
        headings: {
          select: false,
          avatar: false,
          "profile.fullName": this.$t("users.fullName"),
          contacts: this.$t("users.contacts"),
          actions: "",
        },
        params: {},
      },
      form: new Form(),
      okOnly: false,
      formModal: {
        id: null,
        show: false,
        name: "",
        surname: "",
        patronymic: "",
        destination: "",
        okTitle: "",
      },
    };
  },
  computed: {
    tableColumns() {
      const actions = ["actions"];
      return ["avatar", "profile.fullName", "contacts", ...actions];
    },
  },
  methods: {
    getClassFormModal() {
      const width = window.innerWidth;
      if (width < 768) {
        return "modal";
      } else {
        return "modal-right";
      }
    },
    getSizeFormModal() {
      const width = window.innerWidth;
      if (width >= 768 && width <= 991) {
        return "xl";
      } else {
        return "lg";
      }
    },

    onLoaded() {
      this.selectAll = false;
      if (this.selectAllPages === true) {
        this.usersIds = {};
        for (let key in this.$refs.usersTable.data) {
          this.usersIds[this.$refs.usersTable.data[key].id] =
            this.selectAllPages;
        }
      }
    },
    normalizedUsersIds() {
      let uIds = [];
      if (this.selectAllPages === false) {
        for (let key in this.usersIds) {
          if (this.usersIds[key]) {
            uIds.push(key);
          }
        }
      }
      return uIds;
    },
    wrapperHandlers() {
      switch (this.formModal.destination) {
        case "searchUsers":
          return this.handleSearchUsers();
      }
    },

    clickContacts(event) {
      event.stopPropagation();
    },
    handleSearch() {
      this.okOnly = false;

      this.openUpdateModal(
        null,
        "searchUsers",
        this.$t("users.search.title"),
        this.$t("main.search")
      );
    },
    handleAddUser() {
      this.okOnly = true;

      this.openUpdateModal(
        null,
        "viewUser",
        this.$t("users.view.title"),
        this.$t("main.cancel")
      );
    },

    search(searchForm) {
      this.form = searchForm;
    },
    handleSearchUsers() {
      this.$set(this.tableOptions, "params", this.form.data);
      this.$_table_debouncedRefresh();
    },
    refreshTable() {
      this.$refs.usersTable.getData();
      this.selectAllPages = false;
      this.selectAll = false;
      this.usersIds = {};
    },
    openCreateModal() {
      this.formModal.show = true;
      this.formModal.title = this.$t("users.create");
    },
    openUpdateModal(id = null, destination = "", title = "", okTitle = "") {
      this.formModal.id = id;
      this.formModal.show = true;
      this.formModal.destination = destination;
      this.formModal.okTitle = okTitle;

      if (title == "") {
        this.formModal.title = "";
      } else {
        this.formModal.title = title;
      }
    },
    handleSave(event) {
      event.preventDefault();
      this.$refs.controlUserForm.submit();
    },
    handleClose(event) {
      event.preventDefault();
      this.formModal.show = false;
    },
    resetForm() {
      this.formModal.id = null;
    },
    isCanDeleteUser() {
      return this.$can("userDelete");
    },
    async handleDelete(id, event) {
      event.stopPropagation();

      const result = await this.$_notification_confirmDelete(
        this.$t("main.confirm.delete")
      );
      if (result.value) {
        await Api.deleteModel(id);
        this.$_notification_notify(this.$t("main.notifications.deleted"));
        this.refreshTable();
      }
    },
    created() {
      this.$_notification_notify(this.$t("main.notifications.created"));
      this.saved();
    },
    updated() {
      this.saved();
    },
    handleView({ row }) {
      this.okOnly = true;

      this.openUpdateModal(
        row.id,
        "viewUser",
        this.$t("users.view.title"),
        this.$t("main.cancel")
      );
    },
  },
  async beforeCreate() {
    if (this.$store.getters.isAuthenticated) {
      // if (!this.$store.getters.isProfileLoaded) {
      //   await this.$store.dispatch(USER_REQUEST);
      // }

      // if (this.$store.getters.hasOnlyClient) {
      //   this.$router.push({
      //     name: "user",
      //     params: { id: this.$store.getters.getProfile.id },
      //   });
      // }
    }
  },
};
</script>

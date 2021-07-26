<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="users-params-table">

    <div class="users-params-form">
      <b-form-row>
        <b-col
            order-lg="2"
            lg="auto">
          <b-button
              @click="openCreateModal"
              class="mb-2"
              v-text="$t('users.params.create')"
              block>
          </b-button>
        </b-col>

        <b-col
            order-md="1"
            col>
          <!--          <h2>{{ $t('11') }}</h2>-->
        </b-col>
      </b-form-row>
    </div>

    <v-server-table
        ref="usersParamsTable"
        :url="apiUrl"
        :columns="tableColumns"
        :options="tableOptions"
        @row-click="handleView">

      <template v-slot:title="{row}">
        {{ row.title }}
        <small v-if="row.description" class="text-muted">
          <br>
          <span>{{ row.description }}</span>
        </small>
      </template>

      <template v-slot:actions="{row}">
        <table-action-buttons
            :update-visible="true"
            :delete-visible="true"
            @update="openUpdateModal(row.id)"
            @delete="handleDelete(row.id)">
        </table-action-buttons>
      </template>
    </v-server-table>

    <b-modal
        lazy
        v-model="formModal.show"
        modal-class="modal-right"
        size="sm"
        :title="formModal.title"
        :okTitle="$t('main.save')"
        :cancelTitle="$t('main.cancel')"
        @ok="handleSave"
        @hidden="resetForm">
      <users-params-form
          ref="usersParamsForm"
          :internalId="formModal.id"
          @updated="updated"
          @created="created">
      </users-params-form>
    </b-modal>
  </div>
</template>

<script>
  import tableRefreshMixin from '@/mixins/table'
  import notificationMixin from '@/mixins/notification'
  import filtersMixin from '@/mixins/filters'
  import Api from '@/api/v1/users-params'
  import UsersParamsForm from '@/components/users-params/UsersParamsForm'
  import TableActionButtons from '@/components/TableActionButtons'

  export default {
    components: {
      UsersParamsForm,
      TableActionButtons,
    },
    mixins: [
      notificationMixin,
      tableRefreshMixin,
      filtersMixin
    ],
    data() {
      return {
        apiUrl: Api.baseUrl,
        tableOptions: {
          perPage: 10,
          skin: 'table table-sm table-hover responsive',
          headings: {
            title: this.$t('users.params.params'),
            statusTitle: this.$t('users.params.status'),
            actions: '',
          },
          sortable: [],
          params: {},
        },
        formModal: {
          id: null,
          show: false,
          title: '',
        },
      };
    },
    computed: {
      tableColumns() {
        return ['title', 'statusTitle', 'actions'];
      }
    },
    methods: {
      search(searchForm) {
        this.$set(this.tableOptions, 'params', searchForm);
        this.$_table_debouncedRefresh();
      },
      refreshTable() {
        this.$refs.usersParamsTable.getData();
      },
      openCreateModal() {
        this.formModal.show = true;
        this.formModal.title = this.$t('users.params.create');
      },
      openUpdateModal(id) {
        this.formModal.id = id;
        this.formModal.show = true;
        this.formModal.title = this.$t('users.params.update');
      },
      handleSave(event) {
        event.preventDefault();
        this.$refs.usersParamsForm.submit();
      },
      resetForm() {
        this.formModal.id = null;
      },
      async handleDelete(id) {
        const result = await this.$_notification_confirmDelete(this.$t('main.confirm.delete'));
        if (result.value) {
          await Api.deleteModel(id);
          this.$_notification_notify(this.$t('users.params.deleted'));
          this.refreshTable();
        }
      },
      created() {
        this.$_notification_notify(this.$t('users.params.created'));
        this.saved();
      },
      updated() {
        this.$_notification_notify(this.$t('users.params.updated'));
        this.saved();
      },
      async saved() {
        this.formModal.show = false;
        this.refreshTable();
      },
      handleView({row}) {
        this.openUpdateModal(row.id)
      },
    },
  }
</script>

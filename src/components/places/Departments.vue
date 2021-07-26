<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="departments">

    <div class="settings-form">
      <b-form-row>
        <b-col
            order-lg="2"
            lg="auto">
          <b-button
              @click="openCreateModal"
              class="mb-2"
              v-text="$t('places.departments.create')"
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
        ref="departmentsTable"
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

        <br> {{ row.statusTitle }}
      </template>

      <template v-slot:rooms="{row}">
        <roomsTable :department="row.id" :rooms="row.rooms"></roomsTable>
      </template>

      <template v-slot:actions="{row}">
        <table-action-buttons
            :update-visible="$can('userPermissionEdit')"
            :delete-visible="$can('userPermissionEdit')"
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
      <departments-form
          ref="departmentsForm"
          :internalId="formModal.id"
          @updated="updated"
          @created="created">
      </departments-form>
    </b-modal>
  </div>
</template>

<script>
  import tableRefreshMixin from '@/mixins/table'
  import notificationMixin from '@/mixins/notification'
  import filtersMixin from '@/mixins/filters'
  import Api from '@/api/v1/departments'
  import DepartmentsForm from '@/components/places/DepartmentsForm'
  import RoomsTable from '@/components/places/RoomsTable'
  import TableActionButtons from '@/components/TableActionButtons'

  export default {
    components: {
      DepartmentsForm,
      RoomsTable,
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
          skin: 'table table-sm responsive',
          headings: {
            title: this.$t('places.departments.title'),
            rooms: this.$t('places.departments.rooms'),
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
        const actions = this.$can('userPermissionEdit') || this.$can('userPermissionEdit') ? ['actions'] : [];
        return ['title', 'rooms', ...actions];
      }
    },
    methods: {
      search(searchForm) {
        this.$set(this.tableOptions, 'params', searchForm);
        this.$_table_debouncedRefresh();
      },
      refreshTable() {
        this.$refs.departmentsTable.getData();
      },
      openCreateModal() {
        this.formModal.show = true;
        this.formModal.title = this.$t('places.departments.create');
      },
      openUpdateModal(id) {
        this.formModal.id = id;
        this.formModal.show = true;
        this.formModal.title = this.$t('places.departments.update');
      },
      handleSave(event) {
        event.preventDefault();
        this.$refs.departmentsForm.submit();
      },
      resetForm() {
        this.formModal.id = null;
      },
      async handleDelete(id) {
        const result = await this.$_notification_confirmDelete(this.$t('main.confirm.delete'));
        if (result.value) {
          await Api.deleteModel(id);
          this.$_notification_notify(this.$t('main.notifications.deleted'));
          this.refreshTable();
        }
      },
      created() {
        this.$_notification_notify(this.$t('main.notifications.created'));
        this.saved();
      },
      updated() {
        this.$_notification_notify(this.$t('main.notifications.updated'));
        this.saved();
      },
      async saved() {
        this.formModal.show = false;
        this.refreshTable();
      },
      handleView({row}) {
        // this.openUpdateModal(row.id)
      },
    },
  }
</script>

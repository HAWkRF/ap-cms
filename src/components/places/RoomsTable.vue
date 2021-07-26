<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-client-table
        ref="roomsTable"
        :data="getData"
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

      <template v-slot:afterTable>
        <div class="float-right">
          <button v-if="$can('userPermissionEdit')" @click="openCreateModal"
                  type="button" class="btn btn-outline-primary btn-sm">
            {{ $t('places.rooms.create') }}
          </button>
        </div>
      </template>
      <template v-slot:actions="props">
        <table-action-buttons
            :update-visible="false"
            :delete-visible="$can('userPermissionEdit')"
            @update="openUpdateModal(props.row.id)"
            @delete="handleDelete(props.row.id, props.index)">
        </table-action-buttons>
      </template>
    </v-client-table>

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
      <rooms-form
          ref="roomsForm"
          :internalId="formModal.id"
          :department="this.department"
          @updated="updated"
          @created="created">
      </rooms-form>
    </b-modal>
  </div>
</template>

<script>
  import notificationMixin from '@/mixins/notification'
  import filtersMixin from '@/mixins/filters'
  import Api from '@/api/v1/rooms'
  import RoomsForm from '@/components/places/RoomsForm'
  import TableActionButtons from '@/components/TableActionButtons'

  export default {
    props: {
      rooms: {
        default: null,
      },
      department: {
        default: null,
      }
    },
    components: {
      RoomsForm,
      TableActionButtons,
    },
    mixins: [
      notificationMixin,
      filtersMixin
    ],
    data() {
      return {
        tableOptions: {
          perPage: 100,
          skin: 'table table-borderless table-hover table-sm',
          texts: {
            count: '',
          },
          headings: {
            title: '',
            statusTitle: '',
            actions: '',
          },
          params: {
            'department': this.department
          },
        },
        formModal: {
          id: null,
          show: false,
          title: '',
        },
      };
    },
    computed: {
      getData() {
        return this.rooms;
      },
      tableColumns() {
        const actions = this.$can('userPermissionEdit') ? ['actions'] : [];
        return ['title', 'statusTitle', ...actions];
      }
    },
    methods: {
      openCreateModal() {
        this.formModal.show = true;
        this.formModal.title = this.$t('places.rooms.create');
      },
      openUpdateModal(id) {
        this.formModal.id = id;
        this.formModal.show = true;
        this.formModal.title = this.$t('places.rooms.update');
      },
      handleSave(event) {
        event.preventDefault();
        this.$refs.roomsForm.submit();
      },
      resetForm() {
        this.formModal.id = null;
      },
      async handleDelete(id, index) {
        const result = await this.$_notification_confirmDelete(this.$t('main.confirm.delete'));
        if (result.value) {
          await Api.deleteModel(id);
          this.$_notification_notify(this.$t('main.notifications.deleted'));

          this.rooms.splice(index - 1, 1);
        }
      },
      created(model) {
        this.$_notification_notify(this.$t('main.notifications.created'));
        this.rooms.splice(this.rooms.length, 0, model);
        this.saved();
      },
      updated() {
        this.$_notification_notify(this.$t('main.notifications.updated'));

        let row = this.rooms.find(x => x.id === this.formModal.id);
        row.title = this.$refs.roomsForm.form.data.title;
        row.statusTitle = this.$refs.roomsForm.statusIdSelect.title;

        this.saved();
      },
      async saved() {
        this.formModal.show = false;
      },
      handleView({row}) {
        this.openUpdateModal(row.id);
      }
    },
  }
</script>
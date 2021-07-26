<template>
  <b-form
      autocomplete="off"
      @keydown="form.errors.clear()"
      @submit.prevent="submit"
      @reset="reset">
    <loading
        :active="loading"
        :is-full-page="false">
    </loading>

    <b-form-row>
      <b-col md="12">
        <b-form-group
            :label="$t('users.params.labels.title')"
            label-for="titleInput">
          <b-form-input
              id="titleInput"
              :state="form.isValid('title')"
              v-model="form.title">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('title')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
            :label="$t('users.params.labels.slug')"
            label-for="slugInput">
          <b-form-input
              id="slugInput"
              :state="form.isValid('slug')"
              v-model="form.slug">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('slug')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group
            :label="$t('users.params.labels.description')"
            label-for="descriptionInput">
          <b-form-textarea
              id="descriptionInput"
              :state="form.isValid('description')"
              v-model="form.description">
          </b-form-textarea>
          <b-form-invalid-feedback v-text="form.errors.get('description')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group
            :label="$t('users.params.labels.status')"
            label-for="statusInput">
          <multiselect
              v-model="statusIdSelect"
              track-by="id"
              label="title"
              :placeholder="$t('main.pickAValue')"
              :options="statuses"
              :searchable="false"
              :allow-empty="false"
              v-bind="selectOptions">
            <template slot="singleLabel" slot-scope="{ option }">{{ option.title }}</template>
          </multiselect>
          <b-form-invalid-feedback v-text="form.errors.get('status')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/users-params'
  import Multiselect from 'vue-multiselect'

  export default {
    props: {
      internalId: {
        default: null,
      },
    },
    components: {
      Multiselect,
    },
    data: function () {
      return {
        loading: false,

        statuses: [],
        statusIdSelect: null,
        selectOptions: {
          multiple: false,
          showNoOptions: false,
          showNoResults: false,
          selectLabel: '',
          selectedLabel: '',
          deselectLabel: '',
          openDirection: 'bottom',
        },

        form: new Form({
          id: null,
          title: '',
          description: '',
          slug: '',
          status: '',
        }),
      }
    },
    watch: {
      statusIdSelect(newValue) {
        if (newValue !== undefined) {
          this.form.status = newValue.id
        }
      },
    },
    methods: {
      async load(id) {
        const response = await Api.getModel(id);
        this.form.load(response.data);
        this.form.id = id;
        this.statusIdSelect = this.statuses.find(x => String(x.id) === String(this.form.status))
      },
      async statusesLoad() {
        const response = await Api.getFilters();
        this.statuses = response.data.statuses;
      },
      async submit() {
        try {
          if (this.form.id) {
            await Api.updateModel(this.form.id, this.form.data);
            this.$emit('updated');
          } else {
            await Api.createModel(this.form.data);
            this.$emit('created');
          }
          this.form.onSuccess();
        } catch (error) {
          this.form.onFail(error.response.data);
        }
      },
      reset() {
        this.form.reset();
      },
    },
    async created() {
      this.loading = true;
      await this.statusesLoad();
      if (this.internalId) {
        await this.load(this.internalId);
      }
      this.loading = false;
    },
  }
</script>
<template>
  <b-form
    autocomplete="off"
    @keydown="form.errors.clear()"
    @submit.prevent="submit"
    @reset="reset"
  >
    <loading :active="loading" :is-full-page="false"> </loading>

    <b-form-row>
      <b-col md="12">
        <b-form-group
          :label="$t('kb.articles.labels.title')"
          label-for="titleInput"
        >
          <b-form-input
            id="titleInput"
            :state="form.isValid('title')"
            v-model="form.title"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="form.errors.get('title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group
          :label="$t('kb.articles.labels.status')"
          label-for="statusInput"
        >
          <multiselect
            id="statusInput"
            v-model="statusIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="statuses"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            v-text="form.errors.get('status')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/kb";
import Multiselect from "vue-multiselect";

export default {
  props: {
    internalId: {
      default: null,
    },
  },
  components: {
    Multiselect,
  },
  watch: {
    statusIdSelect(value) {
      if (value !== undefined) {
        this.form.status = value.id;
      }
    },
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
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
      },

      form: new Form({
        id: null,
        title: "",
        status: null,
      }),
    };
  },
  methods: {
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.form.id = id;

      this.statusIdSelect = this.statuses.find(
        (x) => x.id === this.form.status
      );
    },
    async loadFilters() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
    },
    async submit() {
      try {
        if (this.form.id) {
          await Api.updateModel(this.form.id, this.form.data);
          this.$emit("updated");
        } else {
          await Api.createModel(this.form.data);
          this.$emit("created");
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
    await this.loadFilters();
    if (this.internalId) {
      await this.load(this.internalId);
    }
    this.loading = false;
  },
};
</script>
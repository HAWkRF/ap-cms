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
        <b-form-group :label="$t('blocks.labels.title')" label-for="titleInput">
          <b-form-input
            id="titleInput"
            :state="form.isValid('title')"
            v-model="form.title"
          >
          </b-form-input>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('title') ? 'block' : 'none' }"
            v-text="form.errors.get('title')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('blocks.labels.alias')" label-for="aliasInput">
          <multiselect
            id="aliasInput"
            v-model="aliasIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="aliases"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>

          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('alias') ? 'block' : 'none' }"
            v-text="form.errors.get('alias')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('blocks.labels.content')">
          <editor :content="form.content" @content="setContent" />
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('content') ? 'block' : 'none' }"
            v-text="form.errors.get('content')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('blocks.labels.status')" label-for="statusInput">
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
            :style="{ display: !!form.errors.get('status') ? 'block' : 'none' }"
            v-text="form.errors.get('status')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/blocks";
import Multiselect from "vue-multiselect";
import editor from "@/components/editor";

export default {
  props: {
    internalId: {
      default: null,
    },
  },
  components: {
    Multiselect,
    editor,
  },
  watch: {
    statusIdSelect(value) {
      if (value !== undefined) {
        this.form.status = value.id;
      }
    },
    aliasIdSelect(value) {
      if (value !== undefined) {
        this.form.alias = value.id;
      }
    },
  },
  data: function () {
    return {
      loading: false,
      isSeoFieldsShown: false,

      statuses: [],
      aliases: [],
      params: [],
      statusIdSelect: null,
      aliasIdSelect: null,

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
        status: 0,
        alias: "",
      }),
    };
  },
  methods: {
    setContent(content) {
      this.form.content = content;
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.form.id = id;

      this.statusIdSelect = this.statuses.find((x) => x.id === this.form.status);
      this.aliasIdSelect = this.aliases.find((x) => x.id === this.form.alias_id);
    },
    async loadFilters() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.aliases = response.data.aliases;
      this.params = response.data.params;
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

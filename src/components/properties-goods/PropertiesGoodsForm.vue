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
        <b-form-group :label="$t('propertiesGoods.labels.title')" label-for="titleInput">
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
      <b-col md="12">
        <b-form-group :label="$t('propertiesGoods.labels.alias')" label-for="aliasInput">
          <b-form-input
            id="aliasInput"
            :state="form.isValid('alias')"
            v-model="form.alias"
          >
          </b-form-input>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('alias') ? 'block' : 'none' }"
            v-text="form.errors.get('alias')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('propertiesGoods.labels.category')" label-for="categoryInput">
          <multiselect
            id="categoryInput"
            v-model="categorySelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="categories"
            :searchable="false"
            :multiple="true"
            :taggable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('category') ? 'block' : 'none' }"
            v-text="form.errors.get('category')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Form from "@/utils/Form";
import Api from "@/api/v1/properties-goods";
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
    categorySelect(value) {
      if (value !== undefined) {
        this.form.category.push(value);
      }
    },
  },
  data: function () {
    return {
      loading: false,

      categories: [],
      categorySelect: null,

      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
      },

      form: new Form({
        sid: "",
        id: null,
        category: [],
        title: "",
        unit: "",
        unit_alias: "",
        alias: "",
      }),
    };
  },
  methods: {
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.form.id = id;

      this.categorySelect = this.categories.find((x) => x.id === this.form.category);
    },
    async loadFilters() {
      const response = await Api.getFilters();
      this.categories = response.data.categories;
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

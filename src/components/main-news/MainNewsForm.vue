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
        <b-form-group :label="$t('mainNews.labels.title')" label-for="titleInput">
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
        <b-form-group :label="$t('mainNews.labels.img')">
          <b-form-file
            v-model="setImg"
            :state="true"
            :placeholder="$t('main.load_img')"
          ></b-form-file>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('img') ? 'block' : 'none' }"
            v-text="form.errors.get('img')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <div class="btn btn-link mb-3" @click="isSeoFieldsShown = !isSeoFieldsShown">
      Дополнительные поля для SEO
    </div>
    <div v-if="isSeoFieldsShown">
      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('mainNews.labels.seo_title')"
            label-for="seoTitleInput"
          >
            <b-form-input
              id="seoTitleInput"
              :state="form.isValid('seo_title')"
              v-model="form.seo_title"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('seo_title') ? 'block' : 'none' }"
              v-text="form.errors.get('seo_title')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('mainNews.labels.seo_description')"
            label-for="seoDescriptionInput"
          >
            <b-form-input
              id="seoDescriptionInput"
              :state="form.isValid('seo_description')"
              v-model="form.seo_description"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{
                display: !!form.errors.get('seo_description') ? 'block' : 'none',
              }"
              v-text="form.errors.get('seo_description')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('mainNews.labels.og_site_name')"
            label-for="ogSiteNameInput"
          >
            <b-form-input
              id="ogSiteNameInput"
              :state="form.isValid('og_site_name')"
              v-model="form.og_site_name"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('og_site_name') ? 'block' : 'none' }"
              v-text="form.errors.get('og_site_name')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('mainNews.labels.og_title')" label-for="ogTitleInput">
            <b-form-input
              id="ogTitleInput"
              :state="form.isValid('og_title')"
              v-model="form.og_title"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('og_title') ? 'block' : 'none' }"
              v-text="form.errors.get('og_title')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('mainNews.labels.og_type')" label-for="ogTypeInput">
            <b-form-input
              id="ogTypeInput"
              :state="form.isValid('og_type')"
              v-model="form.og_type"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('og_type') ? 'block' : 'none' }"
              v-text="form.errors.get('og_type')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('mainNews.labels.og_image')" label-for="ogImageInput">
            <b-form-file
              :state="true"
              v-model="setImg"
              :placeholder="$t('main.load_img')"
            >
            </b-form-file>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('og_image') ? 'block' : 'none' }"
              v-text="form.errors.get('og_image')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group :label="$t('mainNews.labels.og_url')" label-for="ogUrlInput">
            <b-form-input
              id="ogTypeInput"
              :state="form.isValid('og_url')"
              v-model="form.og_url"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('og_url') ? 'block' : 'none' }"
              v-text="form.errors.get('og_url')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col md="12">
          <b-form-group
            :label="$t('mainNews.labels.og_description')"
            label-for="ogDescriptionInput"
          >
            <b-form-input
              id="ogDescriptionInput"
              :state="form.isValid('og_description')"
              v-model="form.og_description"
            >
            </b-form-input>
            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('og_description') ? 'block' : 'none' }"
              v-text="form.errors.get('og_description')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </div>
    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('mainNews.labels.status')" label-for="statusInput">
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
import Api from "@/api/v1/main-news";
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
      isSeoFieldsShown: false,

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
        status: "",
        img: "",
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        og_site_name: "",
        og_title: "",
        og_type: null,
        og_image: null,
        og_url: "",
        og_description: "",
      }),
    };
  },
  methods: {
    setImg(content) {
      (this.Form.img = content), (this.form.img = content.src);
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.form.id = id;

      this.statusIdSelect = this.statuses.find((x) => x.id === this.form.status);
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

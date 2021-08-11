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
        <b-form-group :label="$t('menuItem.labels.title')" label-for="titleInput">
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
        <b-form-group :label="$t('menuItem.labels.type')" label-for="typeInput">
          <multiselect
            id="typeInput"
            v-model="typeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="types"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>

          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('type') ? 'block' : 'none' }"
            v-text="form.errors.get('type')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <template v-if="form.type == typeUr">
      <b-form-row>
        <b-col md="12">
          <b-form-group label-for="sourceUrlInput">
            <b-form-input :state="form.isValid('source_url')" v-model="form.source_url">
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('source_url')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <template v-if="form.type !== typeUr">
      <b-form-row>
        <b-col md="12">
          <b-form-group label-for="sourceTitleInput">
            <b-form-input
              :state="form.isValid('source_title')"
              v-model="form.source_title"
            >
            </b-form-input>
            <b-form-invalid-feedback
              v-text="form.errors.get('source_title')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <template v-if="form.type == typeMainNews">
      <b-form-row>
        <b-col md="6">
          <b-form-group :label="$t('menuItem.labels.mainNews')" label-for="mainNewsInput">
            <multiselect
              id="mainNewsInput"
              v-model="searchMainNews"
              track-by="id"
              label="title"
              @search-change="loadMainNews"
              :placeholder="$t('main.pickAValue')"
              :options="mainNews"
              :searchable="true"
              :allow-empty="false"
              v-bind="selectOptions"
            >
              <template slot="singleLabel" slot-scope="{ option }">{{
                option.title
              }}</template>
            </multiselect>

            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('mainNews') ? 'block' : 'none' }"
              v-text="form.errors.get('mainNews')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <template v-if="form.type == typeNews">
      <b-form-row>
        <b-col md="6">
          <b-form-group :label="$t('menuItem.labels.typeNews')" label-for="NewsInput">
            <multiselect
              id="NewsInput"
              v-model="searchNews"
              track-by="id"
              label="title"
              @search-change="loadNews"
              :placeholder="$t('main.pickAValue')"
              :options="news"
              :searchable="true"
              :allow-empty="false"
              v-bind="selectOptions"
            >
              <template slot="singleLabel" slot-scope="{ option }">{{
                option.title
              }}</template>
            </multiselect>

            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('news') ? 'block' : 'none' }"
              v-text="form.errors.get('news')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <template v-if="form.type == typePage">
      <b-form-row>
        <b-col md="6">
          <b-form-group :label="$t('menuItem.labels.typePages')" label-for="PagesInput">
            <multiselect
              id="PagesInput"
              v-model="searchPages"
              track-by="id"
              label="title"
              @search-change="loadPages"
              :placeholder="$t('main.pickAValue')"
              :options="pages"
              :searchable="true"
              :allow-empty="false"
              v-bind="selectOptions"
            >
              <template slot="singleLabel" slot-scope="{ option }">{{
                option.title
              }}</template>
            </multiselect>

            <b-form-invalid-feedback
              :style="{ display: !!form.errors.get('pages') ? 'block' : 'none' }"
              v-text="form.errors.get('pages')"
            ></b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-form-row>
    </template>

    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('menuItem.labels.parent_id')" label-for="parentInput">
          <multiselect
            id="parentInput"
            v-model="searchParent"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="menuItems"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>

          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('parent_id') ? 'block' : 'none' }"
            v-text="form.errors.get('parent_id')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.sort')" label-for="sortInput">
          <b-form-input
            type="number"
            :value="0"
            :min="0"
            id="sortInput"
            :state="form.isValid('sort')"
            v-model="form.sort"
          >
          </b-form-input>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('sort') ? 'block' : 'none' }"
            v-text="form.errors.get('sort')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group
          :label="$t('menuItem.labels.in_new_window')"
          label-for="inNewWindowInput"
        >
          <multiselect
            id="inNewWindowInput"
            v-model="newWindowSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="in_new_window"
            :searchable="true"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>

          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('type') ? 'block' : 'none' }"
            v-text="form.errors.get('type')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('menuItem.labels.image')">
          <b-form-file
            v-model="setImg"
            :state="true"
            :placeholder="$t('main.load_img')"
          ></b-form-file>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('image') ? 'block' : 'none' }"
            v-text="form.errors.get('image')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('menuItem.labels.status')" label-for="statusInput">
          <multiselect
            id="statusInput"
            v-model="statusIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="statuses"
            :searchable="true"
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
import Api from "@/api/v1/menu-item";
import ApiMainNews from "@/api/v1/main-news";
import ApiNews from "@/api/v1/news";
import ApiPages from "@/api/v1/pages";
import Multiselect from "vue-multiselect";
import {
  typeUr,
  typeMainNews,
  typeNews,
  typePage,
  typeCategories,
} from "@/utils/formTypes";

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
    typeIdSelect(newValue) {
      if (newValue !== undefined) {
        this.form.type = newValue.id;
      }
      /* if (this.form.type == typeUrl) {
          this.isDisabledSourceUrl = false;
          this.isDisabledMult = true;
        }
        if(this.form.type == typeMainNews) {
          this.isDisabledSourceUrl = true;
          //this.isDisabledMult = false;
        }
        if(this.form.type == typeNews) {
          this.isDisabledSourceUrl = true;
          //this.isDisabledMult = false;
        }

      } */
    },
    newWindowSelect(value) {
      if (value !== undefined) {
        this.form.in_new_window = value.id;
      }
    },
    searchParent(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.form.parent_id = newValue.id;
      }
    },
    searchMainNews(value) {
      if (value !== null && value != "") {
        this.form.mainNew = value;
      }
    },
    searchNews(value) {
      if (value !== null && value != "") {
        this.form.news = value;
      }
    },
    searchPages(value) {
      if (value !== null && value != "") {
        this.form.pages = value;
      }
    },
  },
  data: function () {
    return {
      typeUr: Object.freeze(typeUr),
      typeMainNews: Object.freeze(typeMainNews),
      typeNews: Object.freeze(typeNews),
      typePage: Object.freeze(typePage),
      typeCategories: Object.freeze(typeCategories),

      searchMainNews: [],
      searchNews: [],
      searchPages: [],

      loading: false,
      isDisabledSourceUrl: true,
      isDisabledMult: true,

      statuses: [],
      statusIdSelect: null,

      types: [],
      typeIdSelect: null,

      in_new_window: [],
      newWindowSelect: null,

      menuItems: [],
      searchParent: null,

      mainNews: [],
      news: [],
      pages: [],
      categories: [],

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
        type: null,
        sort: 0,
        source_url: "",
        source_title: "",
        source_id: null,
        menu_id: Number.parseInt(this.$route.params.id),
        parent_id: null,
        in_new_window: "",
        image: "",
        content: "",
        mainNew: "",
        news: "",
        pages: "",
      }),
    };
  },
  methods: {
    setImg(content) {
      (this.Form.image = content), (this.form.image = content.src);
    },
    async load(id) {
      //const response = await Api.getModel(id);
      const response = await Api.getItemId(id);
      this.form.load(response.data);
      this.form.id = id;
      
      this.loadFilters();

      this.statusIdSelect = this.statuses.find((x) => x.id === this.form.status);
      this.typeIdSelect = this.types.find((x) => x.id === this.form.type);
      this.newWindowSelect = this.in_new_window.find(
        (x) => x.id === this.form.in_new_window
      );
      this.searchParent = this.menuItems.find((x) => x.id === this.form.parent_id);
  
    },
    async loadFilters() {
      const response = await Api.getFilters(this.$route.params.id);
      this.statuses = response.data.statuses;
      this.types = response.data.types;
      this.in_new_window = response.data.in_new_window;
      this.menuItems = response.data.menuItems;
    },
    async submit() {
      try {
        if (this.form.id) {
          //await Api.updateModel(this.form.id, this.form.data);
            await Api.putMenuItem(this.form.id, this.form.data);
          this.$emit("updated");
        } else {
           //await Api.createModel(this.form.data);
             await Api.postItem(this.form.data);
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
    async loadMainNews(params) {
      if (params.trim() !== "") {
        const response = await ApiMainNews.getMainNews({
          title: params.trim(),
        });
        this.mainNews = response.data;
      }
    },
    async loadNews(params) {
      if (params.trim() !== "") {
        const response = await ApiNews.getNews({
          title: params.trim(),
        });
        this.news = response.data;
      }
    },
    async loadPages(params) {
      if (params.trim() !== "") {
        const response = await ApiPages.getPages({
          title: params.trim(),
        });
        this.pages = response.data;
      }
    },
    async loadCategories() {},
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

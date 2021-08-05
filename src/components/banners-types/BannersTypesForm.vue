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
        <b-form-group :label="$t('bannersTypes.labels.title')" label-for="titleInput">
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
        <b-form-group :label="$t('bannersTypes.labels.alias')" label-for="aliasInput">
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
        <b-form-group
          :label="$t('bannersTypes.labels.banner_id')"
          label-for="bannerIdInput"
        >
          <multiselect
            id="bannerIdInput"
            v-model="bannerIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="banners"
            :searchable="false"
            :allow-empty="false"
            v-bind="selectOptions"
          >
            <template slot="singleLabel" slot-scope="{ option }">{{
              option.title
            }}</template>
          </multiselect>
          <b-form-invalid-feedback
            :style="{ display: !!form.errors.get('banner_id') ? 'block' : 'none' }"
            v-text="form.errors.get('banner_id')"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="6">
        <b-form-group :label="$t('bannersTypes.labels.type')" label-for="typeInput">
          <multiselect
            id="typeInput"
            v-model="typeSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="types"
            :searchable="false"
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
        <b-form-group :label="$t('bannersTypes.labels.img')">
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

    <div v-if="typeSelect !== null">
      <template v-if="typeSelect.id == 0">
        <b-form-row>
          <b-col md="12">
            <b-form-group :label="$t('bannersTypes.labels.link')" label-for="linkInput">
              <b-form-input
                id="linkInput"
                :state="form.isValid('link')"
                v-model="form.link"
              >
              </b-form-input>
              <b-form-invalid-feedback
                :style="{ display: !!form.errors.get('link') ? 'block' : 'none' }"
                v-text="form.errors.get('link')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>

      <template v-if="typeSelect.id == 1">
        <b-form-row>
          <b-col md="12">
            <b-form-group :label="$t('bannersTypes.labels.content')">
              <editor :content="form.content" @content="setContent" />
              <b-form-invalid-feedback
                :style="{ display: !!form.errors.get('content') ? 'block' : 'none' }"
                v-text="form.errors.get('content')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col md="12">
            <b-form-group
              :label="$t('bannersTypes.labels.position')"
              label-for="positionInput"
            >
              <b-form-input
                type="number"
                :value="0"
                :min="0"
                id="positionInput"
                :state="form.isValid('position')"
                v-model="form.position"
              >
              </b-form-input>
              <b-form-invalid-feedback
                :style="{ display: !!form.errors.get('position') ? 'block' : 'none' }"
                v-text="form.errors.get('position')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>

      <template v-if="typeSelect.id == 2">
        <b-form-row>
          <b-col md="12">
            <b-form-group
              :label="$t('bannersTypes.labels.position')"
              label-for="positionInput"
            >
              <b-form-input
                type="number"
                :value="0"
                :min="0"
                id="positionInput"
                :state="form.isValid('position')"
                v-model="form.position"
              >
              </b-form-input>
              <b-form-invalid-feedback
                :style="{ display: !!form.errors.get('position') ? 'block' : 'none' }"
                v-text="form.errors.get('position')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col md="6">
            <b-form-group
              :label="$t('bannersTypes.labels.source_id')"
              label-for="menuInput"
            >
              <multiselect
                id="menuInput"
                v-model="menuSelect"
                track-by="id"
                label="title"
                :placeholder="$t('main.pickAValue')"
                :options="menus"
                :searchable="false"
                :allow-empty="false"
                v-bind="selectOptions"
              >
                <template slot="singleLabel" slot-scope="{ option }">{{
                  option.title
                }}</template>
              </multiselect>
              <b-form-invalid-feedback
                :style="{ display: !!form.errors.get('source_id') ? 'block' : 'none' }"
                v-text="form.errors.get('source_id')"
              ></b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>
    </div>

    <b-form-row>
      <b-col md="12">
        <b-form-group :label="$t('bannersTypes.labels.sort')" label-for="sortInput">
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
        <b-form-group :label="$t('bannersTypes.labels.status')" label-for="statusInput">
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
import Api from "@/api/v1/banners-types";
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
    bannerIdSelect(value) {
      if (value !== undefined) {
        this.form.banner_id = value.id;
      }
    },
    typeSelect(value) {
      if (value !== undefined) {
        this.form.type = value.id;
      }
    },
    menuSelect(value) {
      if (value !== undefined) {
        this.form.source_id = value.id;
      }
    },
  },
  data: function () {
    return {
      loading: false,
      isSeoFieldsShown: false,

      statuses: [],
      statusIdSelect: null,

      banners: [],
      bannerIdSelect: null,

      types: [],
      typeSelect: null,

      menus: [],
      menuSelect: null,

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
        alias: "",
        banner_id: null,
        type: null,
        img: "",
        link: "",
        content: "",
        position: 0,
        source_id: null,
        sort: 0,
        statusTitle: "",
        status: 0,
      }),
    };
  },
  methods: {
    setContent(content) {
      this.form.content = content;
    },
    setImg(content) {
      (this.Form.img = content), (this.form.img = content.src);
    },
    async load(id) {
      const response = await Api.getModel(id);
      this.form.load(response.data);
      this.form.id = id;

      this.statusIdSelect = this.statuses.find((x) => x.id === this.form.status);
      this.bannerIdSelect = this.banners.find((x) => x.id === this.form.banner_id);
      this.typeSelect = this.types.find((x) => x.id === this.form.type);
      this.menuSelect = this.menus.find((x) => x.id == this.form.source_id);
    },
    async loadFilters() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
      this.banners = response.data.banners;
      this.types = response.data.types;
      this.menus = response.data.menus;
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

<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-form-group>
          <b-form-input
            v-model="search.id"
            :placeholder="$t('kb.articles.search.id')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-input
            v-model="search.title"
            :placeholder="$t('kb.articles.search.title')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <multiselect
          v-model="searchCategoryTitle"
          track-by="id"
          label="title"
          :placeholder="$t('kb.articles.search.category_title')"
          :options="categories"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.category_id !== ''"
              @mousedown.prevent.stop="
                clearField('category_id', 'searchCategoryTitle')
              "
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>
      <b-col>
        <multiselect
          v-model="searchStatus"
          track-by="id"
          label="title"
          :placeholder="$t('kb.articles.search.status_title')"
          :options="statuses"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.status !== ''"
              @mousedown.prevent.stop="clearField('status', 'searchStatus')"
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Multiselect from "vue-multiselect";
import Api from '@/api/v1/kb';

export default {
  components: {
    Multiselect
  },
   data () {
    return {
      loaded: false,
      searchCategoryTitle: null,
      searchStatus: null,
      categories: [],
      statuses: [],
      status: "",
      categorySelect: "",
      search: {
        status: "",
        category_id: "",
        title: "",
        id: "",
      },
      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
        openDirection: "bottom",
      },
    };
  },
  computed: {},
  methods: {
    async fetchFilters() {
      this.loaded = true;
      const response = await Api.getFilters();
      this.categories = response.data.categories;
      this.statuses = response.data.statuses;
    },
    clearField(field, searhField) {
      this.search[field] = "";
      this[searhField] = null;
    },
  },
  watch: {
    searchCategoryTitle(newValue) {
      if(newValue !== null && newValue !== undefined) {
        this.search.category_id = newValue.id;
      }
    },
    searchStatus(newValue) {
        if(newValue !== null && newValue !== undefined) {
          this.search.status = newValue.id;
        }
      },
    search: {
      handler(value) {
        this.$emit("search", value);
      },
      deep: true,
    },
  },
  created() {
    this.fetchFilters();
  },
};
</script>
<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-form-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('ourWorks.search.id')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('ourWorks.search.title')"
          >
          </b-form-input>
        </b-input-group>
      </b-col>
      <b-col md="4">
        <multiselect
          v-model="searchParentTitle"
          track-by="id"
          label="title"
          :placeholder="$t('ourWorks.search.categories')"
          :options="categories"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.parent_id !== ''"
              @mousedown.prevent.stop="clearField('parent_id', 'searchParentTitle')"
            >
              <font-awesome-icon icon="times"></font-awesome-icon>
            </div>
          </template>
        </multiselect>
      </b-col>
      <b-col md="3">
        <multiselect
          v-model="searchStatus"
          track-by="id"
          label="title"
          :placeholder="$t('ourWorks.search.status')"
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
import Api from "@/api/v1/ourworks";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchParentTitle: null,
      searchStatus: null,
      categories: [],
      statuses: [],
      status: "",
      search: {
        status: "",
        parent_id: "",
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
      this.statuses = response.data.statuses;
      this.categories = response.data.categories;
    },
    clearField(field, searhField) {
      this.search[field] = "";
      this[searhField] = null;
    },
  },
  watch: {
    searchParentTitle(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.parent_id = newValue.id;
      }
    },
    searchStatus(newValue) {
      if (newValue !== null && newValue !== undefined) {
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

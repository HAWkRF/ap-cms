<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-form-group>
          <b-form-input
            v-model="search.id"
            :placeholder="$t('propertiesGoods.search.id')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('propertiesGoods.search.title')"
          >
          </b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('propertiesGoods.search.value')"
          >
          </b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <multiselect
          v-model="searchCategory"
          track-by="id"
          label="title"
          :placeholder="$t('propertiesGoods.search.category')"
          :options="categories"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.category !== ''"
              @mousedown.prevent.stop="clearField('category', 'searchType')"
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
import Api from "@/api/v1/properties-goods";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchCategory: null,
      categories: [],
      //type: "",
      search: {
        title: "",
        category: "",
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
    },
    clearField(field, searhField) {
      this.search[field] = "";
      this[searhField] = null;
    },
  },
  watch: {
    searchCategory(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.category = newValue.id;
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

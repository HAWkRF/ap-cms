<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-form-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('menuItem.search.id')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('menuItem.search.title')"
          >
          </b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <multiselect
          v-model="searchParent"
          track-by="id"
          label="title"
          :placeholder="$t('menuItem.search.parent_id')"
          :options="menuItems"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.parent_id !== ''"
              @mousedown.prevent.stop="clearField('parent_id', 'searchParent')"
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
          :placeholder="$t('menuItem.search.status')"
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
import Api from "@/api/v1/menu-item";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,

      statuses: [],
      searchStatus: null,
      status: "",
      menuItems: [],
      parent_id: "",
      searchParent: null,
      search: {
        status: "",
        title: "",
        id: "",
        parent_id: "",
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
      const response = await Api.getFilters(this.$route.params.id);
      this.statuses = response.data.statuses;
      this.menuItems = response.data.menuItems;
    },
    clearField(field, searhField) {
      this.search[field] = "";
      this[searhField] = null;
    },
  },
  watch: {
    searchStatus(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.status = newValue.id;
      }
    },
    searchParent(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.parent_id = newValue.id;
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

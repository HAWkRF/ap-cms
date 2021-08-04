<template>
  <b-form>
    <b-form-row>
      <b-col md="1">
        <b-form-group>
          <b-form-input
            type="search"
            v-model="search.id"
            :placeholder="$t('blocks.search.id')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-input-group>
          <b-form-input
            type="search"
            v-model="search.title"
            :placeholder="$t('blocks.search.title')"
          >
          </b-form-input>
        </b-input-group>
      </b-col>

      <b-col>
        <multiselect
          v-model="searchAlias"
          track-by="id"
          label="title"
          :placeholder="$t('blocks.search.alias')"
          :options="aliases"
          :searchable="true"
          :allow-empty="true"
          v-bind="selectOptions"
        >
          <template slot="clear">
            <div
              class="multiselect__clear"
              v-if="search.alias !== ''"
              @mousedown.prevent.stop="clearField('alias', 'searchAlias')"
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
          :placeholder="$t('blocks.search.status')"
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
import Api from "@/api/v1/blocks";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      loaded: false,
      searchAlias: null,
      searchStatus: null,
      aliases: [],
      alias: "",
      params: [],
      statuses: [],
      status: "",
      aliasSelect: "",
      search: {
        status: "",
        alias: "",
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
      this.aliases = response.data.aliases;
      this.params = response.data.params;
      this.statuses = response.data.statuses;
    },
    clearField(field, searhField) {
      this.search[field] = "";
      this[searhField] = null;
    },
  },
  watch: {
    searchAlias(newValue) {
      if (newValue !== null && newValue !== undefined) {
        this.search.alias = newValue.id;
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

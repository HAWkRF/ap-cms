<template>
  <b-form>
    <b-form-row>
      <b-col>
        <b-form-group>
          <b-form-input
            v-model="search.id"
            :placeholder="$t('kb.categories.search.id')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <b-form-input
            v-model="search.title"
            :placeholder="$t('kb.categories.search.title')"
          >
          </b-form-input>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group>
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
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
import Api from "@/api/v1/kbcategories";
import Multiselect from "vue-multiselect";
export default {
   data: function () {
    return {
      loaded: false,
      search: {
        title: "",
        id: "",
        status: "",
      },

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
    };
  },
  components: {
    Multiselect
  },
  computed: {},
  methods: {
    async fetchFilters() {
      const response = await Api.getFilters();
      this.statuses = response.data.statuses;
    },
    clearField(field) {
      this.search[field] = "";
    },
  },
  watch: {
    statusIdSelect(newValue) {
        if ((newValue !== null) && (newValue !== undefined)) {
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
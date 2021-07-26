<template>
  <div>
    <b-form-row>
      <b-col cols="12" md="6">
        <b-form-group
          :label="$t('recur.labels.rBeginDate')"
          label-for="rBeginDateInput"
        >
          <b-form-input
            id="rBeginDateInput"
            v-dateFormat
            placeholder="dd-mm-yyyy"
            v-model="recur.rBeginDate"
            :state="isEmpty(errors.rBeginDate)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rBeginDate"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col cols="6" md="3">
        <b-form-group :label="$t('recur.labels.rHour')" label-for="rHour">
          <b-form-input
            id="rHour"
            v-model="recur.rHour"
            :state="isEmpty(errors.rHour)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rHour"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="6" md="3">
        <b-form-group :label="$t('recur.labels.rMin')" label-for="rMin">
          <b-form-input
            id="rMin"
            v-model="recur.rMin"
            :state="isEmpty(errors.rMin)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rMin"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <hr />

    <b-form-row>
      <b-col cols="12" md="6">
        <b-form-group :label="$t('recur.labels.rType')" label-for="rTypeInput">
          <multiselect
            id="rTypeInput"
            v-model="rTypeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rTypes"
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

    <b-form-row v-if="recur.rType == R_TYPE_D">
      <b-col cols="12" md="6">
        <b-form-group
          :label="$t('recur.labels.rDailyCount')"
          label-for="rDailyCountInput"
        >
          <b-form-input
            id="rDailyCountInput"
            v-model="recur.rDailyCount"
            :state="isEmpty(errors.rDailyCount)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rDailyCount"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rDailyType')"
          label-for="rDailyTypeInput"
        >
          <multiselect
            id="rDailyTypeInput"
            v-model="rDailyTypeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rDailyTypes"
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

    <b-form-row v-if="recur.rType == R_TYPE_W">
      <b-col cols="12" md="6">
        <b-form-group
          :label="
            $t('recur.labels.rWeekCount') +
            ' ' +
            (recur.rWeekCount > 0 ? recur.rWeekCount : '___') +
            ' ' +
            $t('recur.week')
          "
          label-for="rWeekCountInput"
        >
          <b-form-input
            id="rWeekCountInput"
            :placeholder="$t('recur.weekCountTitle')"
            v-model="recur.rWeekCount"
            :state="isEmpty(errors.rWeekCount)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rWeekCount"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row v-if="recur.rType == R_TYPE_W">
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekMon"
          v-model="recur.rWeekMon"
          name="rWeekMon"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekMon") }}
        </b-form-checkbox>
      </b-col>
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekTue"
          v-model="recur.rWeekTue"
          name="rWeekTue"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekTue") }}
        </b-form-checkbox>
      </b-col>
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekWed"
          v-model="recur.rWeekWed"
          name="rWeekWed"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekWed") }}
        </b-form-checkbox>
      </b-col>
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekThu"
          v-model="recur.rWeekThu"
          name="rWeekThu"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekThu") }}
        </b-form-checkbox>
      </b-col>
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekFri"
          v-model="recur.rWeekFri"
          name="rWeekFri"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekFri") }}
        </b-form-checkbox>
      </b-col>
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekSat"
          v-model="recur.rWeekSat"
          name="rWeekSat"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekSat") }}
        </b-form-checkbox>
      </b-col>
      <b-col cols="6">
        <b-form-checkbox
          id="rWeekSun"
          v-model="recur.rWeekSun"
          name="rWeekSun"
          value="1"
          :unchecked-value="null"
        >
          {{ $t("recur.labels.rWeekSun") }}
        </b-form-checkbox>
      </b-col>
    </b-form-row>

    <b-form-row v-if="recur.rType == R_TYPE_M">
      <b-col cols="12" md="6">
        <b-form-group
          :label="
            $t('recur.labels.rMonthCount') +
            ' ' +
            (recur.rMonthCount > 0 ? recur.rMonthCount : '___') +
            ' ' +
            $t('recur.month')
          "
          label-for="rMonthCountInput"
        >
          <b-form-input
            id="rMonthCountInput"
            :placeholder="$t('recur.monthCountTitle')"
            v-model="recur.rMonthCount"
            :state="isEmpty(errors.rMonthCount)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rMonthCount"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group
          :label="$t('recur.labels.rMonthDay')"
          label-for="rMonthDayInput"
        >
          <b-form-input
            id="rMonthDayInput"
            v-model="recur.rMonthDay"
            :state="isEmpty(errors.rMonthDay)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rMonthDay"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row v-if="recur.rType == R_TYPE_M && false">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rMonthType')"
          label-for="rMonthTypeInput"
        >
          <multiselect
            id="rMonthTypeInput"
            v-model="rMonthTypeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rMonthTypes"
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
    <b-form-row v-if="recur.rType == R_TYPE_M && false">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rMonthWeekType')"
          label-for="rMonthWeekTypeInput"
        >
          <multiselect
            id="rMonthWeekTypeInput"
            v-model="rMonthWeekTypeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rMonthWeekTypes"
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
    <b-form-row v-if="recur.rType == R_TYPE_M && false">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rMonthDayOfWeek')"
          label-for="rMonthDayOfWeekInput"
        >
          <multiselect
            id="rMonthDayOfWeekInput"
            v-model="rMonthDayOfWeekIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rMonthDaysOfWeek"
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

    <b-form-row v-if="recur.rType == R_TYPE_Y && false">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rYearType')"
          label-for="rYearTypeInput"
        >
          <multiselect
            id="rYearTypeInput"
            v-model="rYearTypeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rYearTypes"
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

    <b-form-row v-if="recur.rType == R_TYPE_Y">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rYearMonth')"
          label-for="rYearMonthInput"
        >
          <multiselect
            id="rYearMonthInput"
            v-model="rYearMonthIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rYearMonths"
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

      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rYearMonthDay')"
          label-for="rYearMonthDayInput"
        >
          <b-form-input
            id="rYearMonthDayInput"
            v-model="recur.rYearMonthDay"
            :state="isEmpty(errors.rYearMonthDay)"
          >
          </b-form-input>
          <b-form-invalid-feedback
            v-text="errors.rYearMonthDay"
          ></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row v-if="recur.rType == R_TYPE_Y && false">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rYearWeekType')"
          label-for="rYearWeekTypeInput"
        >
          <multiselect
            id="rYearWeekTypeInput"
            v-model="rYearWeekTypeIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rYearWeekTypes"
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

    <b-form-row v-if="recur.rType == R_TYPE_Y && false">
      <b-col md="6">
        <b-form-group
          :label="$t('recur.labels.rYearDayOfWeek')"
          label-for="rYearDayOfWeekInput"
        >
          <multiselect
            id="rYearDayOfWeekInput"
            v-model="rYearDayOfWeekIdSelect"
            track-by="id"
            label="title"
            :placeholder="$t('main.pickAValue')"
            :options="rYearDaysOfWeek"
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
  </div>
</template>

<script>
import Api from "@/api/v1/notifications-tasks";
import Multiselect from "vue-multiselect";

const R_TYPE_NO = 0;
const R_TYPE_D = 1;
const R_TYPE_W = 2;
const R_TYPE_M = 3;
const R_TYPE_Y = 4;

export default {
  props: {
    recur: {
      type: Object,
      default: function () {
        return {
          rHour: null,
          rMin: null,
          rBeginDate: null,
          rEndDate: null,
          rType: null,
          rDailyType: null,
          rDailyCount: null,
          rWeekCount: null,
          rWeekMon: null,
          rWeekTue: null,
          rWeekWed: null,
          rWeekThu: null,
          rWeekFri: null,
          rWeekSat: null,
          rWeekSun: null,
          rMonthType: null,
          rMonthCount: null,
          rMonthDay: null,
          rMonthWeekType: null,
          rMonthDayOfWeek: null,
          rYearType: null,
          rYearMonth: null,
          rYearMonthDay: null,
          rYearWeekType: null,
          rYearDayOfWeek: null,
        };
      },
    },

    errors: {
      type: Object,
      default: function () {
        return {
          rHour: {},
          rMin: {},
          rBeginDate: {},
          rEndDate: {},
          rType: {},
          rDailyType: {},
          rDailyCount: {},
          rWeekCount: {},
          rWeekMon: {},
          rWeekTue: {},
          rWeekWed: {},
          rWeekThu: {},
          rWeekFri: {},
          rWeekSat: {},
          rWeekSun: {},
          rMonthType: {},
          rMonthCount: {},
          rMonthDay: {},
          rMonthWeekType: {},
          rMonthDayOfWeek: {},
          rYearType: {},
          rYearMonth: {},
          rYearMonthDay: {},
          rYearWeekType: {},
          rYearDayOfWeek: {},
        };
      },
    },
  },
  components: {
    Multiselect,
  },
  data: function () {
    return {
      loading: false,

      R_TYPE_NO: R_TYPE_NO,
      R_TYPE_D: R_TYPE_D,
      R_TYPE_W: R_TYPE_W,
      R_TYPE_M: R_TYPE_M,
      R_TYPE_Y: R_TYPE_Y,

      selectOptions: {
        multiple: false,
        showNoOptions: false,
        showNoResults: false,
        selectLabel: "",
        selectedLabel: "",
        deselectLabel: "",
      },

      rTypes: [],
      rTypeIdSelect: null,
      rDailyTypes: [],
      rDailyTypeIdSelect: null,
      rMonthTypes: [],
      rMonthTypeIdSelect: null,
      rMonthWeekTypes: [],
      rMonthWeekTypeIdSelect: null,
      rMonthDaysOfWeek: [],
      rMonthDayOfWeekIdSelect: null,
      rYearTypes: [],
      rYearTypeIdSelect: null,
      rYearMonths: [],
      rYearMonthIdSelect: null,
      rYearWeekTypes: [],
      rYearWeekTypeIdSelect: null,
      rYearDaysOfWeek: [],
      rYearDayOfWeekIdSelect: null,
    };
  },
  watch: {
    rTypeIdSelect(value) {
      if (value !== undefined) {
        this.recur.rType = value.id;
      }
    },
    rDailyTypeIdSelect(value) {
      if (value !== undefined) {
        this.recur.rDailyType = value.id;
      }
    },
    rMonthTypeIdSelect(value) {
      if (value !== undefined) {
        this.recur.rMonthType = value.id;
      }
    },
    rMonthWeekTypeIdSelect(value) {
      if (value !== undefined) {
        this.recur.rMonthWeekType = value.id;
      }
    },
    rMonthDayOfWeekIdSelect(value) {
      if (value !== undefined) {
        this.recur.rMonthDayOfWeek = value.id;
      }
    },
    rYearTypeIdSelect(value) {
      if (value !== undefined) {
        this.recur.rYearType = value.id;
      }
    },
    rYearMonthIdSelect(value) {
      if (value !== undefined) {
        this.recur.rYearMonth = value.id;
      }
    },
    rYearWeekTypeIdSelect(value) {
      if (value !== undefined) {
        this.recur.rYearWeekType = value.id;
      }
    },
    rYearDayOfWeekIdSelect(value) {
      if (value !== undefined) {
        this.recur.rYearDayOfWeek = value.id;
      }
    },
  },
  methods: {
    isEmpty(obj) {
      for (let key in obj) {
        return false;
      }
      return true;
    },

    async filtersLoad() {
      const response = await Api.getFilters();
      this.rTypes = response.data.recurTypes;
      this.rDailyTypes = response.data.recurDailyTypes;
      this.rMonthTypes = response.data.recurMonthTypes;
      this.rMonthWeekTypes = response.data.recurMonthWeekTypes;
      this.rMonthDaysOfWeek = response.data.recurMonthDaysOfWeek;
      this.rYearTypes = response.data.recurYearTypes;
      this.rYearMonths = response.data.recurYearMonths;
      this.rYearWeekTypes = response.data.recurYearWeekTypes;
      this.rYearDaysOfWeek = response.data.recurYearDaysOfWeek;
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
    await this.filtersLoad();

    this.rTypeIdSelect = this.rTypes.find(
      (x) => String(x.id) === String(this.recur.rType)
    );
    this.rDailyTypeIdSelect = this.rDailyTypes.find(
      (x) => String(x.id) === String(this.recur.rDailyType)
    );
    this.rMonthTypeIdSelect = this.rMonthTypes.find(
      (x) => String(x.id) === String(this.recur.rMonthType)
    );
    this.rMonthWeekTypeIdSelect = this.rMonthWeekTypes.find(
      (x) => String(x.id) === String(this.recur.rMonthWeekType)
    );
    this.rMonthDayOfWeekIdSelect = this.rMonthDaysOfWeek.find(
      (x) => String(x.id) === String(this.recur.rMonthDayOfWeek)
    );
    this.rYearTypeIdSelect = this.rYearTypes.find(
      (x) => String(x.id) === String(this.recur.rYearType)
    );
    this.rYearMonthIdSelect = this.rYearMonths.find(
      (x) => String(x.id) === String(this.recur.rYearMonth)
    );
    this.rYearWeekTypeIdSelect = this.rYearWeekTypes.find(
      (x) => String(x.id) === String(this.recur.rYearWeekType)
    );
    this.rYearDayOfWeekIdSelect = this.rYearDaysOfWeek.find(
      (x) => String(x.id) === String(this.recur.rYearDayOfWeek)
    );

    this.loading = false;
  },
};
</script>
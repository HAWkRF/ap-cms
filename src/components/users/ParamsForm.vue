<template>
  <b-form
      autocomplete="off"
      @keydown="form.errors.clear()"
      @submit.prevent="submit"
      @reset="reset">
    <loading
        :active="loading"
        :is-full-page="false">
    </loading>

    <b-form-row v-for="(item, index) in itemsList">
      <b-col md="4">
        <b-form-checkbox v-model="itemsIds[item.users_params_id]">
          {{ item.title }}
        </b-form-checkbox>
      </b-col>
      <b-col md="4">
        <b-form-group>
          <b-form-input
              :id="'valueInput' + item.users_params_id"
              :state="form.isValid('value')"
              v-model="item.value">
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>

  </b-form>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/users'

  export default {
    components: {},
    props: {
      internalId: {
        default: null,
      },
    },
    data: function () {
      return {
        destination: 'params',
        loading: false,

        items: [], //load массив
        itemsIds: {}, //результат
        itemsList: [], //входные данные filters

        form: new Form({
          id: null,
          itemsIds: [],
        }),
      }
    },
    methods: {
      async load(id) {
        const response = await Api.getModel(id, {expand: this.destination});
        this.form.id = id;

        this.items = response.data[this.destination];
        for (let key in this.items) {
          this.itemsIds[this.items[key].users_params_id] = true;
        }
      },
      async filtersLoad() {
        const response = await Api.getFilters({
          userId: this.internalId
        });
        this.itemsList = response.data[this.destination];
      },
      async submit() {
        try {
          this.form.itemsIds = this.itemsList.filter(function (item) {
            return (this.itemsIds[item.users_params_id] === true)
          }, this);

          await Api.updateDestModel(this.internalId, this.destination, this.form.data);
          this.$emit('updated');
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
      if (this.internalId) {
        await this.load(this.internalId);
      }
      this.loading = false;
    },
  }
</script>
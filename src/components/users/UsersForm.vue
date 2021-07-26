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

    <b-form-checkbox @change="handleSelectAll()" v-model="selectAll">
      <b>{{ $t(`main.selectAll`) }}</b>
    </b-form-checkbox>

    <b-form-row v-for="user in usersList">
      <b-col md="12">
        <b-form-checkbox @input="handleSelectUser()" v-model="usersIds[user.id]">
          {{ user.profile.fullName }}
        </b-form-checkbox>
      </b-col>
    </b-form-row>

  </b-form>
</template>

<script>
  import Form from '@/utils/Form'

  export default {
    props: {
      searchUsers: {
        default: function () {
          return [];
        },
      },
    },
    components: {},
    data: function () {
      return {
        loading: false,

        usersIds: {}, //результат
        usersList: this.searchUsers, //входные данные filters

        selectAll: false,

        form: new Form({
          usersIds: [],
        }),

        formModal: {
          id: null,
          show: false,
          name: '',
          surname: '',
          patronymic: '',
          okTitle: ''
        },
      }
    },
    methods: {
      handleSelectAll() {
        let select = !this.selectAll ? true : false;
        for (let key in this.usersList) {
          this.usersIds[this.usersList[key].id] = select;
        }
      },
      handleSelectUser() {
        for (let key in this.usersList) {
          if(this.usersIds[this.usersList[key].id] !== true) {
            this.selectAll = false;
            return;
          }
          this.selectAll = true;
        }
      },

      search(searchForm) {
        this.form = searchForm;
      },
      async submit() {

        try {
          this.form.usersIds = [];

          for (let key in this.usersIds) {
            if (this.usersIds[key]) {
              this.form.usersIds.push(key);
            }
          }

          this.$emit('updated', this.form.data);
          this.form.onSuccess();
        } catch (error) {
          this.form.onFail(error.response.data);
        }
      },

      reset() {
        this.form.reset();
      },
    },
  }
</script>
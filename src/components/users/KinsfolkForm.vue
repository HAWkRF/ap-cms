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
  import Api from '@/api/v1/users'

  export default {
    props: {
      userId: {
        default: null,
      },
      scenario: {
        default: null,
      },
      searchUsers: {
        default: function () {
          return [];
        },
      },
    },
    components: {},
    data: function () {
      return {
        destination: 'kinsfolk',
        loading: false,

        selectAll: false,

        usersIds: {}, //результат
        usersList: this.searchUsers, //входные данные filters

        form: new Form({
          parentsIds: [],
          childrenIds: [],
        }),

        formModal: {
          id: null,
          show: false,
          name: '',
          surname: '',
          patronymic: '',
          destination: '',
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
        if (this.scenario == null) {
          return false;
        }

        try {
          this.scenarioAction();

          await Api.updateDestModel(this.userId, this.scenario, this.form.data);
          this.$emit('updated');
          this.form.onSuccess();
        } catch (error) {
          this.form.onFail(error.response.data);
        }
      },
      scenarioAction() {
        if (this.scenario == 'parents') {
          this.form.parentsIds = [];

          for (let key in this.usersIds) {
            if (this.usersIds[key]) {
              this.form.parentsIds.push(key);
            }
          }
        }

        if (this.scenario == 'children') {
          this.form.childrenIds = [];

          for (let key in this.usersIds) {
            if (this.usersIds[key]) {
              this.form.childrenIds.push(key);
            }
          }
        }
      },
      reset() {
        this.form.reset();
      },
    },
  }
</script>
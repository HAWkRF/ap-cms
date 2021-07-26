<template>
  <div class="container-fluid user">
    <div class="row">
      <div class="col-12">
        <b-form
            autocomplete="off"
            @keydown="form.errors.clear()"
            @submit.prevent="submit"
            @reset="reset">
          <loading
              :active="loading"
              :is-full-page="false">
          </loading>

          <b-form-row>
            <b-col md="4">
              <b-form-group
                  :label="$t('users.search.surname')"
                  label-for="surnameInput">
                <b-form-input
                    id="surnameInput"
                    :state="form.isValid('surname')"
                    v-model="form.surname">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('surname')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  :label="$t('users.search.name')"
                  label-for="nameInput">
                <b-form-input
                    id="nameInput"
                    :state="form.isValid('name')"
                    v-model="form.name">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('name')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  :label="$t('users.search.patronymic')"
                  label-for="patronymicInput">
                <b-form-input
                    id="patronymicInput"
                    :state="form.isValid('patronymic')"
                    v-model="form.patronymic">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('patronymic')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <!-- <b-col md="4">
              <b-form-group
                  :label="$t('users.search.roles')"
                  label-for="roleInput">
                <b-form-checkbox
                    v-for="role in rolesOptions"
                    :id="'roleInput' + role.value"
                    @change="handleRoles(role.value, $event)"
                    v-model="roles[role.value]">
                  {{ role.label }}
                </b-form-checkbox>
                <b-form-invalid-feedback v-text="form.errors.get('ageFrom')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col> -->

            <b-col md="4">
              <b-form-group
                  :label="$t('users.search.sex')"
                  label-for="sexInput">
                <b-form-checkbox
                    v-for="option in sexOptions"
                    :id="'sexInput_' + option.id"
                    @change="handleSex(option.id, $event)"
                    v-model="sex[option.id]">
                  {{ option.title }}
                </b-form-checkbox>
                <b-form-invalid-feedback v-text="form.errors.get('ageFrom')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>

          <b-form-row>
            <b-col md="2">
              <b-form-group
                  :label="$t('users.search.ageFrom')"
                  label-for="ageFromInput">
                <b-form-input
                    id="ageFromInput"
                    :state="form.isValid('ageFrom')"
                    v-model="form.ageFrom">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('ageFrom')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="2">
              <b-form-group
                  :label="$t('users.search.ageTo')"
                  label-for="ageToInput">
                <b-form-input
                    id="ageToInput"
                    :state="form.isValid('ageTo')"
                    v-model="form.ageTo">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('ageTo')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  :label="$t('users.search.birthDateFrom')"
                  label-for="birthDateFromInput">
                <b-form-input
                    id="birthDateFromInput"
                    :state="form.isValid('birthDateFrom')"
                    v-dateFormat
                    placeholder="dd-mm-yyyy"
                    v-model="form.birthDateFrom">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('birthDateFrom')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                  :label="$t('users.search.birthDateTo')"
                  label-for="birthDateToInput">
                <b-form-input
                    id="birthDateToInput"
                    :state="form.isValid('birthDateTo')"
                    v-dateFormat
                    placeholder="dd-mm-yyyy"
                    v-model="form.birthDateTo">
                </b-form-input>
                <b-form-invalid-feedback v-text="form.errors.get('birthDateTo')"></b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>

          <!-- <b-form-row>
            <b-col md="8">
              <b-form-group
                  :label="$t('users.search.services')"
                  label-for="servicesInput">
                <div class="mb-2" v-for="(instructor, iId) in servicesOptions">
                  <b>{{ instructorsServices[iId].profile.fullName }}</b>
                  <b-form-checkbox
                      v-for="service in instructor"
                      :id="'servicesInput_' + service.id + '_' + iId"
                      @change="handleServices(service.id, $event)"
                      v-model="services[service.id]">
                    {{ service.title }}
                  </b-form-checkbox>
                </div>
              </b-form-group>
            </b-col>
          </b-form-row> -->

        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/users'

  export default {
    props: {
      obForm: {
        type: Form,
        default: null
      },
    },
    data: function () {
      return {
        loading: false,

        activitiesOptions: [],
        activitiesIdSelect: null,
        sexOptions: [],
        sex: {},
        servicesOptions: {},
        instructorsServices: {},
        services: {},
        rolesOptions: [],
        roles: {},

        selectOptions: {
          multiple: false,
          showNoOptions: false,
          showNoResults: false,
          selectLabel: '',
          selectedLabel: '',
          deselectLabel: '',
          openDirection: 'bottom',
        },

        form: new Form({
          //группы и занятия
          byVisitedTrainings: '',

          'per-page': 10000,

          //данные профиля
          surname: '',
          name: '',
          patronymic: '',
          sex: [],
          services: [],
          birthDateFrom: '',
          birthDateTo: '',
          ageFrom: '',
          ageTo: '',

          //типы пользователя
          roles: [],

          instructors: '',
        }),
      }
    },
    watch: {
      form: {
        handler(value) {
          // console.log(value);
          this.$emit('search', this.form);
        },
        deep: true,
      },
    },
    methods: {
      handleRoles(id, event) {
        if (event == true) {
          this.form.roles.push(id);
        } else {
          for (let key in this.form.roles) {
            if (this.form.roles[key] == id) {
              this.form.roles.splice(key, 1);
            }
          }
        }
      },
      handleSex(id, event) {
        if (event == true) {
          this.form.sex.push(id);
        } else {
          for (let key in this.form.sex) {
            if (this.form.sex[key] == id) {
              this.form.sex.splice(key, 1);
            }
          }
        }
      },
      handleServices(id, event) {
        if (event == true) {
          this.form.services.push(id);
        } else {
          for (let key in this.form.services) {
            if (this.form.services[key] == id) {
              this.form.services.splice(key, 1);
            }
          }
        }
      },
      async filtersLoad() {
        const response = await Api.getFilters();
        this.activitiesOptions = response.data.activities;
        this.rolesOptions = response.data.roles;
        this.sexOptions = response.data.sex;
        let services = response.data.services;

        for (let key in this.rolesOptions) {
          let role = this.rolesOptions[key];
          this.roles[role.value] = false;
        }

        for (let key in this.sexOptions) {
          let sex = this.sexOptions[key];
          this.sex[sex.id] = false;
        }

        for (let key in services) {
          let instructors = services[key].instructors;
          for (let keyInst in instructors) {
            let instructor = instructors[keyInst];
            this.instructorsServices[instructors[keyInst].id] = instructor;
            if (this.servicesOptions[instructor.id] === undefined) {
              this.servicesOptions[instructor.id] = {};
            }
            this.servicesOptions[instructor.id][services[key].id] = services[key]
          }
        }
        for (let key in services) {
          let service = services[key];
          this.$set(this.services, service.id, false);
          this.services[service.id] = false;
        }

        if (this.obForm) {
          this.initForm();
        }
      },
      initForm() {
        if (this.obForm.hasOwnProperty('surname')) {
          Object.assign(this.form, this.obForm);

          for (let service in this.obForm.data.services) {
            this.services[this.obForm.data.services[service]] = true;
          }

          for (let sex in this.obForm.data.sex) {
            this.sex[this.obForm.data.sex[sex]] = true;
          }

          for (let role in this.obForm.data.roles) {
            this.roles[this.obForm.data.roles[role]] = true;
          }
        }
      },
      reset() {
        this.form.reset();
      },
    },
    async created() {
      this.loading = true;
      await this.filtersLoad();

      this.loading = false;
    },
  }
</script>
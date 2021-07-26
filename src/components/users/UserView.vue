<template>
  <div class="container-fluid user">

    <div class="row">
      <div class="col-8 col-sm-3 col-md-2 offset-2 offset-sm-0">
        <div class="avatar">
          <img :src="account.host(profile.avatarUrl)" alt="">
          <span class="avatar-status bg-danger"></span>
        </div>
      </div>

      <div class="col-12 col-md-10">
        <p class="display-4">{{ $t('users.view.profileTitle') }}</p>

        <b-row>
          <!-- profile -->
          <b-col cols="12" sm="12" md="6">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.profile')">
                <b-card-sub-title>
                  <a v-if="isCanChange('profile')" @click.prevent="openUpdateModal('profile')">
                    {{ (userIdLocal ? $t('users.view.change') : $t('users.view.create')) }}
                  </a>
                </b-card-sub-title>
                <b-row>
                  <b-col v-if="profile.fullName" cols="12">{{ profile.fullName }}</b-col>
                  <b-col v-if="profile.birthday" cols="12">{{ profile.birthday }} ({{ profile.age }})
                  </b-col>
                  <b-col v-if="profile.sex" cols="12">{{ profile.sexString }}</b-col>

                  <b-col v-if="!profile.fullName && !profile.birthday && !profile.sex" cols="12">
                    {{ $t('main.noData') }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <!-- address -->
          <b-col cols="12" sm="12" md="6" v-if="address.fullAddress || isCanChange('profile')">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.address')">
                <b-card-sub-title>
                  <a v-if="userIdLocal && isCanChange('profile')"
                     @click.prevent="openUpdateModal('address')">{{
                    $t('users.view.change') }}</a>
                </b-card-sub-title>
                <b-row>
                  <b-col v-if="address.fullAddress" cols="12">{{ address.fullAddress }}</b-col>

                  <b-col v-if="!address.fullAddress" cols="12">
                    {{ $t('main.noData') }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>

          <!-- account -->
          <b-col cols="12" sm="12" md="6">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.account')">
                <b-card-sub-title>
                  <a v-if="userIdLocal && isCanChange('contact')"
                     @click.prevent="openUpdateModal('account')">{{
                    $t('users.view.change') }}</a>
                </b-card-sub-title>
                <b-row>
                  <b-col v-if="email" cols="12">{{ email }}</b-col>
                  <b-col v-if="phone" cols="12">{{ phone }}</b-col>

                  <b-col v-if="!email && !phone" cols="12">
                    {{ $t('main.noData') }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>


          <!-- userRight -->
          <b-col cols="12" sm="12" md="6" v-if="!isOnlyClient()">
            <div class="wrap-card">
              <b-card class="separately" :title="$t('users.view.permissions')">
                <b-card-sub-title>
                  <a v-if="userIdLocal && isCanChange('permissions')"
                     @click.prevent="openUpdateModal('userRight')">{{
                    $t('users.view.change') }}</a>
                </b-card-sub-title>
                <b-row v-for="permission in permissions">
                  <b-col cols="12" v-if="permission.item_name !== 'accountant'
                && permission.item_name !== 'administrator' && permission.item_name !== 'employee'
                && permission.item_name !== 'manager' && permission.item_name !== 'receptionist'">
                    {{ permission.description }}
                  </b-col>
                </b-row>

                <b-row>
                  <b-col v-if="isEmpty(permissions)" cols="12">
                    {{ $t('main.noData') }}
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>


        </b-row>


      </div>
    </div>

    <b-modal
        lazy
        v-model="formModalSearch.show"
        modal-class="modal-right"
        size="md"
        :title="$t('users.search.title')"
        :okTitle="$t('main.search')"
        :cancelTitle="$t('main.cancel')"
        @ok="handleSearchUsers">

      <search-form
          ref="searchForm"
          :obForm="(form ? form : null)"
          @search="search">
      </search-form>

    </b-modal>

    <b-modal
        lazy
        modal-class="modal-right"
        size="md"
        v-model="formModal.show"
        :title="formModal.title"
        :okTitle="$t('main.save')"
        :cancelTitle="$t('main.cancel')"
        @ok="handleSave">
      <profile-form
          ref="profileForm"
          @updated="updated"
          @created="created"
          v-if="formModal.destination == 'profile'"
          :userId="formModal.id">
      </profile-form>

      <kinsfolk-form
          :ref="formModal.destination + 'Form'"
          @updated="updated"
          v-if="formModal.destination == 'parents' || formModal.destination == 'children'"
          :searchUsers="searchUsers"
          :scenario="scenarioKinsfolk"
          :userId="formModal.id">
      </kinsfolk-form>

      <activity-form
          ref="activityForm"
          @updated="updated"
          v-if="formModal.destination == 'activity'"
          :userId="formModal.id">
      </activity-form>

      <params-form
          ref="paramsForm"
          @updated="updated"
          v-if="formModal.destination == 'params'"
          :internalId="formModal.id">
      </params-form>

      <account-form
          ref="accountForm"
          @updated="updated"
          v-if="formModal.destination == 'account'"
          :userId="formModal.id">
      </account-form>

      <socials-form
          ref="socialsForm"
          @updated="updated"
          v-if="formModal.destination == 'socials'"
          :userId="formModal.id">
      </socials-form>

      <work-card-form
          ref="workCardForm"
          @updated="updated"
          v-if="formModal.destination == 'workCard'"
          :userId="formModal.id">
      </work-card-form>

      <education-card-form
          ref="educationCardForm"
          @updated="updated"
          v-if="formModal.destination == 'educationCard'"
          :userId="formModal.id">
      </education-card-form>

      <med-card-form
          ref="medCardForm"
          @updated="updated"
          v-if="formModal.destination == 'medCard'"
          :userId="formModal.id">
      </med-card-form>

      <documents-form
          ref="documentsForm"
          @updated="updated"
          v-if="formModal.destination == 'documents'"
          :userId="formModal.id">
      </documents-form>

      <address-form
          ref="addressForm"
          @updated="updated"
          v-if="formModal.destination == 'address'"
          :userId="formModal.id">
      </address-form>

      <passport-form
          ref="passportForm"
          @updated="updated"
          v-if="formModal.destination == 'passport'"
          :userId="formModal.id">
      </passport-form>

      <birth-certificate-form
          ref="birthCertificateForm"
          @updated="updated"
          v-if="formModal.destination == 'birthCertificate'"
          :userId="formModal.id">
      </birth-certificate-form>

      <roles-form
          ref="rolesForm"
          @updated="updated"
          v-if="formModal.destination == 'roles'"
          :userId="formModal.id">
      </roles-form>

      <user-right-form
          ref="userRightForm"
          @updated="updated"
          v-if="formModal.destination == 'userRight'"
          :userId="formModal.id">
      </user-right-form>
    </b-modal>
  </div>
</template>

<script>
  import Api from '@/api/v1/users'
  import ak from '@/utils/account'
  import notificationMixin from '@/mixins/notification'
  import ProfileForm from "@/components/users/ProfileForm"
  import ParamsForm from "@/components/users/ParamsForm"
  import WorkCardForm from "@/components/users/WorkCardForm"
  import EducationCardForm from "@/components/users/EducationCardForm"
  import SocialsForm from "@/components/users/SocialsForm"
  import MedCardForm from "@/components/users/MedCardForm"
  import DocumentsForm from "@/components/users/DocumentsForm"
  import AddressForm from "@/components/users/AddressForm"
  import RolesForm from "@/components/users/RolesForm"
  import UserRightForm from "@/components/users/UserRightForm"
  import AccountForm from "@/components/users/AccountForm";
  import PassportForm from "@/components/users/PassportForm";
  import BirthCertificateForm from "@/components/users/BirthCertificateForm";
  import KinsfolkForm from "@/components/users/KinsfolkForm";
  import Form from '@/utils/Form';
  import SearchForm from "@/components/users/SearchForm";

  import {
    ROLE_PUPIL,
    ROLE_PARENT,
  } from '@/utils/rolesUsers'

  export default {
    components: {
      AccountForm,
      EducationCardForm,
      WorkCardForm,
      ProfileForm,
      ParamsForm,
      MedCardForm,
      DocumentsForm,
      AddressForm,
      RolesForm,
      UserRightForm,
      PassportForm,
      BirthCertificateForm,
      KinsfolkForm,
      SearchForm,
      SocialsForm,
    },
    mixins: [
      notificationMixin,
    ],
    props: {
      userId: {
        default: null,
      },
    },

    data: function () {
      return {
        userIdLocal: this.userId,
        account: ak,
        loading: false,
        email: null,
        phone: null,
        profile: {
          avatarUrl: '/statics/images/user.png'
        },
        socials: {},
        address: {},
        activities: {},
        params: {},
        activitiesValues: {},
        medCard: {},
        documents: {},
        workCard: {},
        educationCard: {},
        activitiesFormatted: {},
        roles: {},
        permissions: {},
        passport: {},
        birthCertificate: {},
        parents: {},
        children: {},

        scenarioKinsfolk: null,
        searchUsers: [],
        form: new Form(),

        formModal: {
          id: null,
          destination: null,
          show: false,
        },
        formModalSearch: {
          id: null,
          show: false,
        },
      }
    },
    methods: {
      isCanShowPayments() {
        let isPupil = false;
        let isParent = false;
        for (let key in this.roles) {
          if (this.roles[key].role === ROLE_PUPIL) {
            isPupil = true;
          }
          if (this.roles[key].role === ROLE_PARENT) {
            isParent = true;
          }
        }

        let canShowPupil = isPupil && this.$can('showPaymentsProfilePupil');
        let canShowParent = isParent && this.$can('showPaymentsProfileParent');

        return canShowPupil || canShowParent;
      },
      isCanShowLessons() {
        let isPupil = false;
        let isParent = false;

        for (let key in this.roles) {

          if (this.roles[key].role === ROLE_PUPIL) {
            isPupil = true;
          }
          if (this.roles[key].role === ROLE_PARENT) {
            isParent = true;
          }
        }

        let canShowPupil = isPupil && this.$can('showLessonsProfilePupil');
        let canShowParent = isParent && this.$can('showLessonsProfileParent');

        return canShowPupil || canShowParent;
      },
      isCanChange(block) {
        return this.$isAccessChangeData(String(this.userIdLocal), block);
      },
      isCanView(block) {
        return this.$isAccessViewData(String(this.userIdLocal), block);
      },
      isOnlyClient() {
        return this.$store.getters.hasOnlyClient;
      },

      clickToKinsfolk(profileId) {
        this.$router.push({name: 'user', params: {id: profileId}})
      },
      openSearchModal(scenario) {
        this.formModalSearch.id = this.userIdLocal;
        this.formModalSearch.show = true;
        this.scenarioKinsfolk = scenario;
      },
      search(searchForm) {
        this.form = searchForm;
      },
      async handleSearchUsers() {
        const response = await Api.getModels(this.form.data);
        this.searchUsers = response.data;

        this.openUpdateModal(this.scenarioKinsfolk);
      },

      isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      },
      async forceRerender() {
        this.userIdLocal = this.userId;
        await this.load(this.userIdLocal);
      },
      async load(id) {
        const response = await Api.getModel(id, {
          expand: 'profile,address,medCard,documents,workCard,educationCard,activities,activitiesValues,roles,passport,birthCertificate,parents,children,socials,rights,params.param'
        });
        this.email = response.data.email;
        this.phone = response.data.phone;
        this.profile = response.data.profile;
        this.socials = response.data.socials;
        this.address = response.data.address;
        this.medCard = response.data.medCard;
        this.documents = response.data.documents;
        this.workCard = response.data.workCard;
        this.educationCard = response.data.educationCard;
        this.activities = response.data.activities;
        this.params = response.data.params;
        this.activitiesValues = response.data.activitiesValues;
        this.roles = response.data.roles;
        this.permissions = response.data.rights;
        this.passport = response.data.passport;
        this.birthCertificate = response.data.birthCertificate;
        this.parents = response.data.parents;
        this.children = response.data.children;

        this.activitiesFormatted = {};
        for (let key in this.activities) {
          let aId = this.activities[key].activity;
          this.activitiesFormatted[aId] = [];
        }

        for (let key in this.activitiesValues) {
          let aId = this.activitiesValues[key].activity;
          this.activitiesFormatted[aId].push({
            'property': this.activitiesValues[key].property,
            'value': this.activitiesValues[key].value,
          });
        }
      },

      openUpdateModal(destination) {
        if (this.userIdLocal != null) {
          this.formModal.id = this.userIdLocal;
          this.formModal.title = this.$t(`users.update.${destination}`);
        } else {
          this.formModal.title = this.$t(`users.create.${destination}`);
        }

        this.formModal.destination = destination;
        this.formModal.show = true;
      },
      handleSave(event) {
        event.preventDefault();
        this.$refs[this.formModal.destination + 'Form'].submit();
      },
      // handleClose(event) {
      //     event.preventDefault();
      //     this.formModal.show = false;
      // },
      updated() {
        this.$_notification_notify(this.$t('main.notifications.updated'));
        this.saved();
        this.$emit('updated');
      },
      created(id) {
        this.userIdLocal = id;
        // this.load(this.userIdLocal);
        this.$_notification_notify(this.$t('main.notifications.updated'));
        this.saved();
        this.$emit('updated');
      },
      async saved() {
        this.formModal.show = false;
        this.load(this.userIdLocal);
      },
    },
    async created() {
      this.loading = true;
      if (this.userIdLocal) {
        await this.load(this.userIdLocal);
      }
      this.loading = false;
    },
  }
</script>
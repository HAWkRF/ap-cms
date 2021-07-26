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

    <b-form-row v-for="(social, index) in form.socials">
      <b-col md="12">
        {{social.providerTitle}}
      </b-col>
      <b-col md="4">
        <b-form-group
            :label="$t('users.socials.internal_id')"
            :label-for="'userIdInput' + social.provider">
          <b-form-input
              :id="'userIdInput' + social.provider"
              v-model="form.socials[index].internal_id">
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group
            :label="$t('users.socials.username')"
            :label-for="'usernameInput' + social.provider">
          <b-form-input
              :id="'usernameInput' + social.provider"
              v-model="form.socials[index].username">
          </b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="4">
        <b-form-group
            :label="$t('users.socials.account_link')"
            :label-for="'accountLinkInput' + social.provider">
          <b-form-input
              :id="'accountLinkInput' + social.provider"
              v-model="form.socials[index].account_link">
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
    props: {
      userId: {
        default: null,
      },
    },
    data: function () {
      return {
        destination: 'socials',
        loading: false,
        form: new Form({
          // id: null,
          socials: []
        }),
      }
    },
    methods: {
      async load(id) {
        const response = await Api.getModel(id, {expand: this.destination});
        this.form.socials = response.data[this.destination];

        if (this.form.socials.length == 0) {
          const socials = await Api.createSocials(id);
          this.form.socials = socials.data;
        }
      },
      async submit() {
        try {
          await Api.updateDestModel(this.userId, this.destination, this.form.data.socials);
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
      if (this.userId) {
        await this.load(this.userId);
      }
      this.loading = false;
    },
  }
</script>
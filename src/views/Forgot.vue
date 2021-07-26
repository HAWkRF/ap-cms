<template>
  <div class="auth animated fadeInDown">
    <b-card class="auth-box">
      <div class="logo">
        <div class="brand">
          <div>Akrato<span>PRIME</span></div>
          <span>EDU</span>
        </div>
      </div>

      <h1 v-t="'forgot.passwordRecovery'"></h1>

      <div class="auth-box">
        <b-form
            id="sign-in-form"
            @keydown="form.errors.clear()"
            @submit.prevent="onSubmit"
            @reset.prevent="onReset"
            novalidate>

          <b-form-group>

<!--            <VuePhoneNumberInput-->
<!--                v-model="phone"-->
<!--                id="phoneInput"-->
<!--                @update="phoneFormatted"-->
<!--                :error="(form.isValid('phone') == null ? false : true) "-->
<!--                :only-countries="['RU', 'BY', 'UA', 'KZ', 'KG', 'MD']"-->
<!--                :translations="translationsOptions"-->
<!--                default-country-code="RU"/>-->

            <b-form-input
                type="email"
                size="lg"
                v-model="form.email"
                :state="form.isValid('email')"
                required
                :placeholder="$t('login.labels.email')">
            </b-form-input>

            <b-form-invalid-feedback
                :style="{display: (form.isValid('email') == null ? 'none' : 'block')}"
                v-text="form.errors.get('email')">
            </b-form-invalid-feedback>
          </b-form-group>

          <p class="text-center">
            <b-link
                class="text-muted"
                to="/login">
              {{ $t('forgot.login') }}
            </b-link>
          </p>

          <b-button
              :disabled="form.errors.any()"
              type="submit"
              class="btn-p-blue"
              block>
            {{ $t("forgot.send") }}
          </b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/user'
  // import VuePhoneNumberInput from 'vue-phone-number-input';
  // import 'vue-phone-number-input/dist/vue-phone-number-input.css';

  export default {
    // components: {
    //   VuePhoneNumberInput,
    // },
    data() {
      return {
        // email: '',
        // translationsOptions: {
        //   countrySelectorLabel: this.$t('users.account.countryCode'),
        //   phoneNumberLabel: this.$t('users.account.phoneNumber'),
        //   example: this.$t('users.account.phoneExample')
        // },
        form: new Form({
          email: '',
        }),
      }
    },
    methods: {
      // phoneFormatted(event) {
      //   this.form.phone = event.e164;
      // },
      async onSubmit() {
        try {
          const response = await Api.forgot(this.form.data);

          if (Number(response.status) == 200) {
            this.$swal(this.$t('forgot.waitForInstruction'));

            this.$router.push('/reset');
          }

        } catch (error) {
          this.form.onFail(error.response.data);
        }
      },
      onReset() {
        this.form.reset();
      }
    }
  }
</script>

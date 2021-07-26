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

    <b-form-row>
      <b-col md="4">
        <b-form-group
            :label="$t('users.medCard.height')"
            label-for="heightInput">
          <b-form-input
              id="heightInput"
              :state="form.isValid('height')"
              v-model="form.height">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('height')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="4">
        <b-form-group
            :label="$t('users.medCard.weight')"
            label-for="weightInput">
          <b-form-input
              id="weightInput"
              :state="form.isValid('weight')"
              v-model="form.weight">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('weight')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>

      <b-col md="4">
        <b-form-group
            :label="$t('users.medCard.imageMedCard')"
            label-for="image_med_card">
          <upload-image class="imageMedCard-upload"
                        ref="imageMedCardInput"
                        :image="form.image_med_card"
                        :imageUrl="imageMedCardUrl"
                        :placeholder="medCardPlaceholder"
                        @upload="uploadMedCard"
                        @delete="deleteMedCard">
            <b-button
                class="mr-1"
                variant="info"
                size="sm"
                v-if="form.image_med_card"
                @click="downloadMedCard">
              <font-awesome-icon icon="link"></font-awesome-icon>
            </b-button>
          </upload-image>
        </b-form-group>
      </b-col>

      <b-col md="4">
        <b-form-group
            :label="$t('users.medCard.medCardExpiresAt')"
            label-for="medCardExpiresAtInput">
          <b-form-input
              id="medCardExpiresAtInput"
              :state="form.isValid('medCardExpiresAt')"
              v-dateFormat
              placeholder="dd-mm-yyyy"
              v-model="form.medCardExpiresAt">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('medCardExpiresAt')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="4">
        <b-form-group
            :label="$t('users.medCard.imageInsurance')"
            label-for="image_insurance">
          <upload-image class="imageInsurance-upload"
                        ref="imageInsuranceInput"
                        :image="form.image_insurance"
                        :imageUrl="imageInsuranceUrl"
                        :placeholder="insurancePlaceholder"
                        @upload="uploadInsurance"
                        @delete="deleteInsurance">
            <b-button
                class="mr-1"
                variant="info"
                size="sm"
                v-if="form.image_insurance"
                @click="downloadInsurance">
              <font-awesome-icon icon="link"></font-awesome-icon>
            </b-button>
          </upload-image>
        </b-form-group>
      </b-col>

      <b-col md="4">
        <b-form-group
            :label="$t('users.medCard.insuranceExpiresAt')"
            label-for="insuranceExpiresAtInput">
          <b-form-input
              id="insuranceExpiresAtInput"
              :state="form.isValid('insuranceExpiresAt')"
              v-dateFormat
              placeholder="dd-mm-yyyy"
              v-model="form.insuranceExpiresAt">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('insuranceExpiresAt')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>

    </b-form-row>

  </b-form>
</template>

<script>
  import Form from '@/utils/Form'
  import Api from '@/api/v1/users'
  import UploadImage from '../UploadImage.vue'

  export default {
    components: {
      UploadImage,
    },
    props: {
      userId: {
        default: null,
      },
      medCardPlaceholder: {
        type: String,
        default: '/img/placeholder-image.png',
      },
      insurancePlaceholder: {
        type: String,
        default: '/img/placeholder-image.png',
      },
    },
    data: function () {
      return {
        destination: 'medCard',
        loading: false,
        popupStyle: {
          left: 0
        },
        // medCardDateSelect: null,
        // insuranceDateSelect: null,
        imageMedCardUrl: '',
        imageInsuranceUrl: '',
        form: new Form({
          id: null,
          height: '',
          weight: '',
          medCardExpiresAt: '',
          insuranceExpiresAt: '',
          image_med_card: '',
          image_insurance: ''
        }),
      }
    },
    watch: {
      // medCardDateSelect(date) {
      //   if (date !== undefined) {
      //     this.form.medCardExpiresAt = date.valueOf() / 1000
      //   }
      // },
      // insuranceDateSelect(date) {
      //   if (date !== undefined) {
      //     this.form.insuranceExpiresAt = date.valueOf() / 1000
      //   }
      // },
    },
    methods: {
      async uploadMedCard(fileList) {
        let file = fileList[0];
        let response = await this.uploadFile(file);
        this.form.image_med_card = response.data.name;
        this.imageMedCardUrl = response.data.url;
        this.clearMedCardInput();
      },
      clearMedCardInput() {
        this.$refs.imageMedCardInput.clearInput();
      },
      deleteMedCard() {
        this.form.image_med_card = '';
        this.imageMedCardUrl = '';
      },
      async uploadInsurance(fileList) {
        let file = fileList[0];
        let response = await this.uploadFile(file);
        this.form.image_insurance = response.data.name;
        this.imageInsuranceUrl = response.data.url;
        this.clearInsuranceInput();
      },
      clearInsuranceInput() {
        this.$refs.imageInsuranceInput.clearInput();
      },
      deleteInsurance() {
        this.form.image_insurance = '';
        this.imageInsuranceUrl = '';
      },
      uploadFile(file) {
        let form = new FormData();
        form.append('file', file);

        return Api.uploadFile('image', form)
      },
      downloadMedCard() {
        const link = document.createElement('a');
        link.href = this.imageMedCardUrl;
        link.setAttribute('download', this.form.image_med_card);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      },
      downloadInsurance() {
        const link = document.createElement('a');
        link.href = this.imageInsuranceUrl;
        link.setAttribute('download', this.form.image_insurance);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      },
      async load(id) {
        const response = await Api.getModel(id, {expand: this.destination});
        this.form.load(response.data[this.destination]);
        this.form.id = id;

        if (this.form.image_med_card != '') {
          try {
            let medCard = await Api.image('med-sertificate', {userId: this.userId, file: this.form.image_med_card});
            this.imageMedCardUrl = medCard.data.url;
            this.clearMedCardInput();
          } catch (e) {
            console.log(e.toString())
          }
        }

        if (this.form.image_insurance != '') {
          try {
            let insurance = await Api.image('insurance', {userId: this.userId, file: this.form.image_insurance});
            this.imageInsuranceUrl = insurance.data.url;
            this.clearInsuranceInput();
          } catch (e) {
            console.log(e.toString())
          }
        }
      },
      async submit() {
        try {
          await Api.updateDestModel(this.userId, 'med-card', this.form.data);
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

<style lang="scss">
  .post-form-btn-clear {
    float: left;
    padding: 0;
  }

  .imageMedCard-upload {
    img {
      max-width: 250px;
    }
  }
</style>
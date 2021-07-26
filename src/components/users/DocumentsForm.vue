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
            :label="$t('users.documents.snils')"
            label-for="snilsInput">
          <b-form-input
              id="snilsInput"
              :state="form.isValid('snils')"
              v-model="form.snils">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('snils')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>

    </b-form-row>

    <b-form-row>
      <b-col md="4">
        <b-form-group
            :label="$t('users.documents.imageSnils')"
            label-for="image_snils">
          <upload-image class="imageSnils-upload"
                        ref="imageSnilsInput"
                        :image="form.snils_image"
                        :imageUrl="imageSnilsUrl"
                        :placeholder="snilsPlaceholder"
                        @upload="uploadSnils"
                        @delete="deleteSnils">
            <b-button
                class="mr-1"
                variant="info"
                size="sm"
                v-if="form.snils_image"
                @click="downloadSnils">
              <font-awesome-icon icon="link"></font-awesome-icon>
            </b-button>
          </upload-image>
        </b-form-group>
      </b-col>

    </b-form-row>


    <b-form-row>
      <b-col md="4">
        <b-form-group
            :label="$t('users.documents.contract')"
            label-for="contractInput">
          <b-form-input
              id="contractInput"
              :state="form.isValid('contract')"
              v-model="form.contract">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('contract')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col md="4">
        <b-form-group
            :label="$t('users.documents.contractDate')"
            label-for="contractDateFormattedInput">
          <b-form-input
              id="contractDateFormattedInput"
              :state="form.isValid('contractDateFormatted')"
              v-dateFormat
              placeholder="dd-mm-yyyy"
              v-model="form.contractDateFormatted">
          </b-form-input>
          <b-form-invalid-feedback v-text="form.errors.get('contractDateFormatted')"></b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col md="4">
        <b-form-group
            :label="$t('users.documents.fileContract')"
            label-for="file_contract">
          <upload-image class="fileContract-upload"
                        ref="fileContractInput"
                        :image="form.contract_document"
                        :imageUrl="fileContractUrlVisible"
                        :source="fileContractUrl"
                        mimeType="application/pdf"
                        :placeholder="contractPlaceholder"
                        @upload="uploadContract"
                        @delete="deleteContract">
            <b-button
                class="mr-1"
                variant="info"
                size="sm"
                v-if="form.contract_document"
                placeholder="/img/placeholder-file.png"
                @click="downloadFile">
              <font-awesome-icon icon="link"></font-awesome-icon>
            </b-button>
          </upload-image>
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
      snilsPlaceholder: {
        type: String,
        default: '/img/placeholder-image.png',
      },
      contractPlaceholder: {
        type: String,
        default: '/img/placeholder-file.png',
      },
      contractPlaceholderLoaded: {
        type: String,
        default: '/img/placeholder-file-loaded.png',
      },
    },
    data: function () {
      return {
        destination: 'documents',
        loading: false,
        popupStyle: {
          left: 0
        },
        contractDateSelect: null,
        imageSnilsUrl: '',
        fileContractUrl: '',
        fileContractUrlVisible: '',
        form: new Form({
          id: null,
          snils: '',
          snils_image: '',
          contract: '',
          contractDateFormatted: '',
          contract_document: ''
        }),
      }
    },
    watch: {
      contractDateSelect(date) {
        if (date !== undefined) {
          this.form.contractDateFormatted = date.valueOf() / 1000
        }
      },
    },
    methods: {
      async uploadContract(fileList) {
        let file = fileList[0];
        let response = await this.uploadFile(file, 'file');
        this.form.contract_document = response.data.name;
        this.fileContractUrl = response.data.url;
        this.fileContractUrlVisible = this.contractPlaceholderLoaded;
        this.clearContractInput();
      },
      clearContractInput() {
        this.$refs.fileContractInput.clearInput();
      },
      deleteContract() {
        this.form.contract_document = '';
        this.fileContractUrl = '';
        this.fileContractUrlVisible = this.contractPlaceholder;
      },
      async uploadSnils(fileList) {
        let file = fileList[0];
        let response = await this.uploadFile(file, 'image-doc');
        this.form.snils_image = response.data.name;
        this.imageSnilsUrl = response.data.url;
        this.clearSnilsInput();
      },
      clearSnilsInput() {
        this.$refs.imageSnilsInput.clearInput();
      },
      deleteSnils() {
        this.form.snils_image = '';
        this.imageSnilsUrl = '';
      },
      downloadSnils() {
        const link = document.createElement('a');
        link.href = this.imageSnilsUrl;
        link.setAttribute('download', this.form.snils_image);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      },
      downloadFile() {
        const link = document.createElement('a');
        link.href = this.fileContractUrl;
        link.setAttribute('download', this.form.contract_document);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      },
      uploadFile(file, url = 'file') {
        let form = new FormData();
        form.append('file', file);

        return Api.uploadFile(url, form)
      },
      async load(id) {
        const response = await Api.getModel(id, {expand: this.destination});
        this.form.load(response.data[this.destination]);
        this.form.id = id;

        if (this.form.snils_image != '' && this.form.snils_image != null) {
          try {
            let snils = await Api.image('snils', {userId: this.userId, file: this.form.snils_image});
            this.imageSnilsUrl = snils.data.url;
            this.clearSnilsInput();
          } catch (e) {
            console.log(e.toString())
          }
        }
        if (this.form.contract_document != '' && this.form.contract_document != null) {
          let contract = await Api.file('contract', {userId: this.userId, file: this.form.contract_document});
          this.fileContractUrl = contract.data.url;
          this.fileContractUrlVisible = this.contractPlaceholderLoaded;
          this.clearContractInput();
        }
      },
      async submit() {
        try {
          await Api.updateDestModel(this.userId, this.destination, this.form.data);
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
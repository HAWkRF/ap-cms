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
                        :label="$t('users.passport.series')"
                        label-for="seriesInput">
                    <b-form-input
                            id="seriesInput"
                            :state="form.isValid('series')"
                            v-model="form.series">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('series')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.passport.number')"
                        label-for="numberInput">
                    <b-form-input
                            id="numberInput"
                            :state="form.isValid('number')"
                            v-model="form.number">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('number')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.passport.issue_date')"
                        label-for="issueDateFormattedInput">
                    <b-form-input
                            id="issueDateFormattedInput"
                            :state="form.isValid('issueDateFormatted')"
                            v-dateFormat
                            placeholder="dd-mm-yyyy"
                            v-model="form.issueDateFormatted">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('issueDateFormatted')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>


        <b-form-row>
            <b-col md="12">
                <b-form-group
                        :label="$t('users.passport.issued_by')"
                        label-for="issued_byInput">
                    <b-form-input
                            id="issued_byInput"
                            :state="form.isValid('issued_by')"
                            v-model="form.issued_by">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('issued_by')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.passport.code_division')"
                        label-for="code_divisionInput">
                    <b-form-input
                            id="code_divisionInput"
                            :state="form.isValid('code_division')"
                            v-model="form.code_division">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('code_division')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

        <hr>

        <b-form-row>
            <b-col md="12">
                <b-form-group
                        :label="$t('users.passport.registration_address')"
                        label-for="registration_addressInput">
                    <b-form-input
                            id="registration_addressInput"
                            :state="form.isValid('registration_address')"
                            v-model="form.registration_address">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('registration_address')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group
                        :label="$t('users.passport.registration_by')"
                        label-for="registration_byInput">
                    <b-form-input
                            id="registration_byInput"
                            :state="form.isValid('registration_by')"
                            v-model="form.registration_by">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('registration_by')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.passport.registration_date')"
                        label-for="registrationDateFormattedInput">
                    <b-form-input
                            id="registrationDateFormattedInput"
                            :state="form.isValid('registrationDateFormatted')"
                            v-dateFormat
                            placeholder="dd-mm-yyyy"
                            v-model="form.registrationDateFormatted">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('registrationDateFormatted')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.passport.registration_code')"
                        label-for="registration_codeInput">
                    <b-form-input
                            id="registration_codeInput"
                            :state="form.isValid('registration_code')"
                            v-model="form.registration_code">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('registration_code')"></b-form-invalid-feedback>
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
                destination: 'passport',
                loading: false,

                form: new Form({
                    id: null,
                    series: '',
                    number: '',
                    issued_by: '',
                    issueDateFormatted: '',
                    code_division: '',
                    registrationDateFormatted: '',
                    registration_address: '',
                    registration_by: '',
                    registration_code: ''
                }),
            }
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data[this.destination]);
                this.form.id = id;

                this.form.issueDateFormatted = response.data[this.destination].issue_date;
                this.form.registrationDateFormatted = response.data[this.destination].registration_date;
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
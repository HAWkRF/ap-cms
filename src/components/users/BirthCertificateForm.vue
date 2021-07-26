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
                        :label="$t('users.birthCertificate.act_date')"
                        label-for="actDateFormattedInput">
                    <b-form-input
                            id="actDateFormattedInput"
                            :state="form.isValid('actDateFormatted')"
                            v-dateFormat
                            placeholder="dd-mm-yyyy"
                            v-model="form.actDateFormatted">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('actDateFormatted')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.birthCertificate.act_number')"
                        label-for="act_numberInput">
                    <b-form-input
                            id="act_numberInput"
                            :state="form.isValid('act_number')"
                            v-model="form.act_number">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('act_number')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>


        <b-form-row>
            <b-col md="12">
                <b-form-group
                        :label="$t('users.birthCertificate.father')"
                        label-for="fatherInput">
                    <b-form-input
                            id="fatherInput"
                            :state="form.isValid('father')"
                            v-model="form.father">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('father')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="12">
                <b-form-group
                        :label="$t('users.birthCertificate.mother')"
                        label-for="motherInput">
                    <b-form-input
                            id="motherInput"
                            :state="form.isValid('mother')"
                            v-model="form.mother">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('mother')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row>
            <b-col md="12">
                <b-form-group
                        :label="$t('users.birthCertificate.issued_by')"
                        label-for="issued_byInput">
                    <b-form-input
                            id="code_divisionInput"
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
                        :label="$t('users.birthCertificate.issue_date')"
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
            <b-col md="4">
                <b-form-group
                        :label="$t('users.birthCertificate.number')"
                        label-for="numberInput">
                    <b-form-input
                            id="numberInput"
                            :state="form.isValid('number')"
                            v-model="form.number">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('number')"></b-form-invalid-feedback>
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
                destination: 'birthCertificate',
                loading: false,

                form: new Form({
                    id: null,
                    actDateFormatted: '',
                    act_number: '',
                    father: '',
                    mother: '',
                    issued_by: '',
                    issueDateFormatted: '',
                    number: '',
                }),
            }
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data[this.destination]);
                this.form.id = id;

                this.form.actDateFormatted = response.data[this.destination].act_date;
                this.form.issueDateFormatted = response.data[this.destination].issue_date;
            },
            async submit() {
                try {
                    await Api.updateDestModel(this.userId, 'birth-certificate', this.form.data);
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
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
                        :label="$t('users.workCard.company')"
                        label-for="companyInput">
                    <b-form-input
                            id="companyInput"
                            :state="form.isValid('company')"
                            v-model="form.company">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('company')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.workCard.address')"
                        label-for="addressInput">
                    <b-form-input
                            id="addressInput"
                            :state="form.isValid('address')"
                            v-model="form.address">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('address')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>
        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.workCard.position')"
                        label-for="positionInput">
                    <b-form-input
                            id="positionInput"
                            :state="form.isValid('position')"
                            v-model="form.position">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('position')"></b-form-invalid-feedback>
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
                destination: 'workCard',
                loading: false,

                form: new Form({
                    id: null,
                    company: '',
                    address: '',
                    position: '',
                }),
            }
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data[this.destination]);
                this.form.id = id;
            },
            async submit() {
                try {
                    await Api.updateDestModel(this.userId, 'work-card', this.form.data);
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
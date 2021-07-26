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
                        :label="$t('users.educationCard.education')"
                        label-for="typeInput">
                    <multiselect
                            id="typeInput"
                            v-model="typeIdSelect"
                            track-by="id"
                            label="title"
                            :placeholder="$t('main.pickAValue')"
                            :options="typeOptions"
                            :searchable="false"
                            :allow-empty="false"
                            v-bind="selectOptions">
                        <template slot="singleLabel" slot-scope="{ option }">{{ option.title }}</template>
                    </multiselect>
                    <b-form-invalid-feedback v-text="form.errors.get('type')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

        <b-form-row>
            <b-col md="4">
                <b-form-group
                        :label="$t('users.educationCard.educationPlace')"
                        label-for="universityInput">
                    <b-form-input
                            id="universityInput"
                            :state="form.isValid('university')"
                            v-model="form.university">
                    </b-form-input>
                    <b-form-invalid-feedback v-text="form.errors.get('university')"></b-form-invalid-feedback>
                </b-form-group>
            </b-col>
        </b-form-row>

    </b-form>
</template>

<script>
    import Form from '@/utils/Form'
    import Api from '@/api/v1/users'
    import Multiselect from 'vue-multiselect'

    export default {
        components: {
            Multiselect,
        },
        props: {
            userId: {
                default: null,
            },
        },
        data: function () {
            return {
                destination: 'educationCard',
                loading: false,
                typeOptions: [],
                typeIdSelect: null,
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
                    id: null,
                    type: '',
                    university: '',
                }),
            }
        },
        watch: {
            typeIdSelect(newValue) {
                if(newValue !== undefined) {
                    this.form.type = newValue.id;
                }
            },
        },
        methods: {
            async load(id) {
                const response = await Api.getModel(id, {expand: this.destination});
                this.form.load(response.data[this.destination]);
                this.form.id = id;
                this.typeIdSelect = this.typeOptions.find(x => x.id === this.form.type);
            },
            async filtersLoad() {
                const response = await Api.getFilters();
                this.typeOptions = response.data.educationTypes;
            },
            async submit() {
                try {
                    await Api.updateDestModel(this.userId, 'education-card', this.form.data);
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
            await this.filtersLoad();
            if (this.userId) {
                await this.load(this.userId);
            }
            this.loading = false;
        },
    }
</script>
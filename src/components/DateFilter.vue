<template>
        <span>
            <b-button size="sm" @click="changeDate(-1)" variant="outline-secondary" squared>
                <font-awesome-icon
                        fixed-width
                        icon="chevron-left">
                </font-awesome-icon>
            </b-button>
            <b-button size="sm" @click="changeDate(1)" variant="outline-secondary" squared>
                <font-awesome-icon
                        fixed-width
                        icon="chevron-right">
                </font-awesome-icon>
            </b-button>
        </span>
</template>

<script>
    import formatDate from '@/utils/formatDate'

    export default {
        name: 'dateFilter',
        data() {
            return {
                month: '',
            };
        },
        computed: {
            dateStart() {
                let d = new Date();
                d.setDate(1);
                d.setMonth(this.month);
                return d;
            },
            dateStop() {
                let d = new Date();
                d.setMonth(this.month);
                d.setDate(new Date(d.getFullYear(), (this.month + 1), 0).getDate());
                return d;
            },
        },
        methods: {
            monthNow() {
                let d = new Date();
                return d.getMonth();
            },
            changeDate(offset) {
                this.month = this.month + offset;
                this.$emit('changeDate', {
                    start: this.dateStart,
                    stop: this.dateStop
                });
            },
        },
        async created() {
            this.loading = true;
            this.month = this.monthNow();
            this.changeDate(0);
            this.loading = false;
        },
    }
</script>

<template>
    <div id="day-select">
        <ul class="days">
            <li
                v-for="day in days"
                v-on:click="selectDay(day)"
                :class="{'day': true, active: isActive(day)}"
            >
                {{ formatDay(day) }}
            </li>
            <li class="day-selector">
                <span class="dec" v-on:click="changeDay(-1)"></span>
                <span class="inc" v-on:click="changeDay(1)"></span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days'))
            };
        },
        props: ['selected'],
        methods: {
            selectDay(day) {
                return this.$bus.$emit('set-day', day);
            },
            isActive(day) {
                return day.isSame(this.selected, 'day');
            },
            formatDay(raw) {
                let result;

                if (raw.isSame(this.$moment(), 'day')) {
                    result = 'Today';
                } else {
                    result = raw.format('ddd DD/MM');
                }
                return result;
            },
            changeDay(change) {
                let newDay = this.$moment(this.selected).add(change, 'days');
                if (this.days.find(day => newDay.isSame(day, 'day'))) this.selectDay(newDay);
            }
        }
    }
</script>
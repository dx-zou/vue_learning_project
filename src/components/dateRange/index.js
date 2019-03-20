import DateRange from './dateRange.vue'
import Vue from 'vue'
DateRange.install = function() {
    Vue.component(DateRange.name,DateRange)
}
export default DateRange
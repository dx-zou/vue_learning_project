import Alert from './alert.vue'
import Vue from 'vue'
Alert.install = function (vue) {
    Vue.component(Alert.name,Alert)
}

export default Alert
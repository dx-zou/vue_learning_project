import ToDo from './todo.vue'
import Vue from 'vue'
ToDo.install = function() {
    Vue.component(ToDo.name,ToDo)
}
export default ToDo
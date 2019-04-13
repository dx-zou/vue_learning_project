import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'
Vue.use(Vuex)
const state = {
  name: localStorage.getItem('name') || 'feng',
  age: localStorage.getItem('age') || 28
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
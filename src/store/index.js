import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
import deleteData from "./modules/deleteData";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    deleteData
  },
  getters
});

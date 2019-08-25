import { CHANGE_SETTING, TOGGLE_SIDEBAR } from "../mutation-types";
import Cookies from "js-cookie";
const state = {
  // 固定顶部导航栏
  fixedHeader: Cookies.get("fixHeader") ? !!+Cookies.get("fixHeader") : true,
  // 显示logo
  showLogo: Cookies.get("showLogo") ? !!+Cookies.get("showLogo") : true,
  // 旋转logo
  rotateLogo: Cookies.get("rotateLogo") ? !!+Cookies.get("rotateLogo") : true,
  // sidebar 折叠
  sidebarCollapse: Cookies.get("sidebarCollapse") ? !!+Cookies.get("sidebarCollapse") : false
};
const mutations = {
  // 改变状态
  [CHANGE_SETTING]: (state, { key }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = !state[key];
      state[key] ? Cookies.set(key, 1) : Cookies.set(key, 0);
    }
  }
};

const actions = {
  // 改变需要设置的状态，分发actions 传入一个对象形式的 Payload  { key: '设置项的名称'}
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

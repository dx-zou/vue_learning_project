import {
  CHANGE_SETTING,
  CLOSE_SIDEBAR,
  CHANGE_LOCALE
} from "../mutation-types";
import Cookies from "js-cookie";

const state = {
  // 固定顶部导航栏
  fixedHeader: Cookies.get("fixHeader") ? !!+Cookies.get("fixHeader") : true,
  // 显示logo
  showLogo: Cookies.get("showLogo") ? !!+Cookies.get("showLogo") : true,
  // 旋转logo
  rotateLogo: Cookies.get("rotateLogo") ? !!+Cookies.get("rotateLogo") : true,
  // sidebar 折叠
  sidebarCollapse: Cookies.get("sidebarCollapse")
    ? !!+Cookies.get("sidebarCollapse")
    : false,
  // 菜单布局方式 true: 侧边栏 false: 顶布局
  sideLayout: Cookies.get("sideLayout") ? !!+Cookies.get("sideLayout") : true,
  // 主题风格
  darkTheme: Cookies.get("darkTheme") ? !!+Cookies.get("darkTheme") : true,
  // 语言
  locale: "en-US"
  // locale: "zh-CN" ,// 语言
};

const mutations = {
  // 改变状态
  [CHANGE_SETTING]: (state, { key }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = !state[key];
      state[key] ? Cookies.set(key, 1) : Cookies.set(key, 0);
    }
  },

  // 关闭sidebar
  [CLOSE_SIDEBAR]: state => {
    Cookies.set("sidebarCollapse", 1);
    state.sidebarCollapse = true;
  },

  // 切换语言
  [CHANGE_LOCALE]: state => {
    state.locale = state.locale === "en-US" ? "zh-CN" : "en-US";
  }
};

const actions = {
  // 改变需要设置的状态，分发actions 传入一个对象形式的 Payload  { key: '设置项的名称'}
  changeSetting({ commit }, Payload) {
    commit("CHANGE_SETTING", Payload);
  },

  // 收起侧边栏
  closeSideBar({ commit }) {
    commit("CLOSE_SIDEBAR");
  },

  // 切换语言
  changeLocale({ commit }) {
    commit("CHANGE_LOCALE");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

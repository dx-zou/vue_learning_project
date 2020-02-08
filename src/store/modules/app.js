import {
  TOGGLE_DEVICE,
  CHANGE_ACTIVEINDEX,
  TOGGLE_MESSAGEBOX
} from "../mutation-types";

const state = {
  device: "desktop",
  activeIndex: "",
  showMsgBox: false
};

const mutations = {
  // 切换设备
  [TOGGLE_DEVICE]: (state, device) => {
    state.device = device;
  },
  // 切换选中的菜单项index
  [CHANGE_ACTIVEINDEX]: (state, playload) => {
    state.activeIndex = playload;
  },
  // 消息盒子
  [TOGGLE_MESSAGEBOX]: state => {
    state.showMsgBox = !state.showMsgBox;
  }
};

const actions = {
  // 提交设备切换
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  // 提交菜单项切换
  changeActiveIndex({ commit }, data) {
    commit("CHANGE_ACTIVEINDEX", data);
  },
  toggleMsgBox({ commit }) {
    commit("TOGGLE_MESSAGEBOX");
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

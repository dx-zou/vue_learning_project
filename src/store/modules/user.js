import config from "@/plugins/http/api";
import $http from "@/plugins/http/request";
import { SET_TOKEN, SET_MENULIST, GET_MENU_NAME } from "../mutation-types";
const state = {
  userInfo: {
    username: "",
    userToken: ""
  },
  menuList: [],
  menuName: []
};
// 校验登录
const checkLogin = userData => {
  return new Promise((resolve, reject) => {
    $http({
      url: config.login,
      method: "post",
      data: userData
    }).then(res => {
      if (res.data._req.code === 1) {
        resolve(res.data._req);
      } else {
        reject(res.data._req);
      }
    });
  });
};
// 获取菜单
const getUserMenu = playload => {
  return new Promise(resolve => {
    $http({
      url: config.getUserMenu,
      params: { userRole: playload }
    }).then(res => {
      if (res.data._req.code === 1) {
        resolve(res.data._req);
      }
    });
  });
};
// 获取所有的菜单名称
const generateMenuName = (state, arr) => {
  arr.forEach(item => {
    if (item.children) {
      generateMenuName(state, item.children);
    }
    state.menuName.push(item.title);
  });
};
const mutations = {
  [SET_TOKEN](state, val) {
    state.userInfo.userToken = val;
    sessionStorage.setItem("userToken", val);
  },
  [SET_MENULIST](state, val) {
    state.menuList = val;
  },
  // 获取所有的菜单名称
  [GET_MENU_NAME]: (state, data) => {
    generateMenuName(state, data);
  }
};

const actions = {
  // 登录
  async _login({ commit, dispatch }, userData) {
    try {
      let res = await checkLogin(userData);
      commit("SET_TOKEN", Math.random());
      sessionStorage.setItem("username", userData.username);
      dispatch("getUserMenu", userData.username);
      return res;
    } catch (error) {
      return error;
    }
  },
  // 获取用户的菜单列表
  async getUserMenu({ commit }, playload) {
    let res = await getUserMenu(playload);
    commit("SET_MENULIST", res.menu);
    commit("GET_MENU_NAME", res.menu);
  }
  // 退出登录
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

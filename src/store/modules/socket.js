import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from "../mutation-types";
import Vue from "vue";
const state = {
  token: "",
  userID: "",
  // 用户头像
  profilePicture: "",
  socket: {
    // 连接状态
    isConnected: false,
    // 消息内容
    message: "",
    // 重新连接错误
    reconnectError: false
  }
};
const mutations = {
  [SOCKET_ONOPEN](state, event) {
    // 连接打开触发的函数
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  [SOCKET_ONCLOSE](state, event) {
    state.socket.isConnected = false;
    console.log(event);
  },
  [SOCKET_ONERROR](state, event) {
    console.error(state, event);
  },
  // default handler called for all methods
  [SOCKET_ONMESSAGE](state, message) {
    state.socket.message = message;
  },
  // mutations for reconnect methods
  [SOCKET_RECONNECT](state, count) {
    console.info(state, count);
  },
  [SOCKET_RECONNECT_ERROR](state) {
    state.socket.reconnectError = true;
  }
};
export default {
  namespaced: true,
  state,
  mutations
};

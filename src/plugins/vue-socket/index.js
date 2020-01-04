import VueNativeSock from "vue-native-websocket";
import Vue from "vue";
import store from "@/store";
Vue.use(VueNativeSock, "ws:127.0.0.1:3000", {
  // 启用Vuex集成,store的值为你的vuex
  store: store,
  // 数据发送/接收使用使用json格式
  format: "json",
  // 开启自动重连
  reconnection: true,
  // 尝试重连的次数
  reconnectionAttempts: 5,
  // 重连间隔时间
  reconnectionDelay: 3000,
  // 将数据进行序列化，由于启用了json格式的数据传输这里需要进行重写
  passToStoreHandler: function(eventName, event) {
    if (!eventName.startsWith("SOCKET_")) {
      return;
    }
    let method = "commit";
    let target = eventName.toUpperCase();
    let msg = event;
    if (this.format === "json" && event.data) {
      msg = JSON.parse(event.data);
      if (msg.mutation) {
        target = [msg.namespace || "", msg.mutation].filter(e => !!e).join("/");
      } else if (msg.action) {
        method = "dispatch";
        target = [msg.namespace || "", msg.action].filter(e => !!e).join("/");
      }
    }
    this.store[method](target, msg);
    this.store.state.socket.message = msg;
  }
});

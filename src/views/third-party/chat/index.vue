<template>
  <div class="messages-panel" ref="messagesContainer">
    <div class="row-panel" v-for="item in senderMessageList" :key="item.msgId">
      <!--发送者消息样式-->
      <div class="sender-panel" v-if="item.userID === userID">
        <!--消息-->
        <div class="msg-body">
          <!--消息尾巴-->
          <div class="tail-panel">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zbds30duihuakuangyou"></use>
            </svg>
          </div>
          <!--消息内容-->
          <p v-html="item.msgText" />
        </div>
        <!--头像-->
        <div class="avatar-panel">
          <img :src="item.avatarSrc" alt="" />
        </div>
      </div>
      <!--对方消息样式-->
      <div class="otherSide-panel" v-else>
        <!--头像-->
        <div class="avatar-panel">
          <img :src="item.avatarSrc" alt="" />
        </div>
        <!--消息-->
        <div class="msg-body">
          <!--消息尾巴-->
          <div class="tail-panel">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zbds30duihuakuangzuo"></use>
            </svg>
          </div>
          <!--消息内容-->
          <p v-html="item.msgText" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      senderMessageList: [{ msgText: "test", avatarSrc: "123" }]
    };
  },

  mounted() {
    // 监听消息接收
    this.$options.sockets.onmessage = res => {
      // res.data为服务端返回的数据
      const data = JSON.parse(res.data);
      // 200为服务端连接建立成功时返回的状态码(此处根据真实后端返回值进行相应的修改)
      if (data.code === 200) {
        // 连接建立成功
        console.log(data.msg);
      } else {
        // 获取服务端推送的消息
        const msgObj = {
          msg: data.msg,
          avatarSrc: data.avatarSrc,
          userID: data.userID
        };
        // 渲染页面:如果msgArray存在则转json
        if (_.isEmpty(localStorage.getItem("msgArray"))) {
          this.renderPage([], msgObj, 0);
        } else {
          this.renderPage(
            JSON.parse(localStorage.getItem("msgArray")),
            msgObj,
            0
          );
        }
      }
    };
  },
  methods: {
    // 消息发送函数
    sendMessage(event) {
      if (event.keyCode === 13) {
        // 阻止编辑框默认生成div事件
        event.preventDefault();
        let msgText = "";
        // 获取输入框下的所有子元素
        let allNodes = event.target.childNodes;
        for (let item of allNodes) {
          // 判断当前元素是否为img元素
          if (item.nodeName === "IMG") {
            msgText += `/${item.alt}/`;
          } else {
            // 获取text节点的值
            if (item.nodeValue !== null) {
              msgText += item.nodeValue;
            }
          }
        }
        // 消息发送: 消息内容、状态码、当前登录用户的头像地址、用户id
        this.$socket.sendObj({
          msg: msgText,
          code: 0,
          avatarSrc: this.$store.getters.profilePicture,
          userID: this.$store.getters.userID
        });
        // 清空输入框中的内容
        event.target.innerHTML = "";
      }
    },
    // 渲染页面函数
    renderPage(msgArray, msgObj, status) {
      if (status === 1) {
        // 页面第一次加载，如果本地存储中有数据则渲染至页面
        let msgArray = [];
        if (localStorage.getItem("msgArray") !== null) {
          msgArray = JSON.parse(localStorage.getItem("msgArray"));
          for (let i = 0; i < msgArray.length; i++) {
            const thisSenderMessageObj = {
              msgText: msgArray[i].msg,
              msgId: i,
              avatarSrc: msgArray[i].avatarSrc,
              userID: msgArray[i].userID
            };
            // 解析并渲染
            this.messageParsing(thisSenderMessageObj);
          }
        }
      } else {
        // 判断本地存储中是否有数据
        if (localStorage.getItem("msgArray") === null) {
          // 新增记录
          msgArray.push(msgObj);
          localStorage.setItem("msgArray", JSON.stringify(msgArray));
          for (let i = 0; i < msgArray.length; i++) {
            const thisSenderMessageObj = {
              msgText: msgArray[i].msg,
              msgId: i,
              avatarSrc: msgArray[i].avatarSrc,
              userID: msgArray[i].userID
            };
            // 解析并渲染
            this.messageParsing(thisSenderMessageObj);
          }
        } else {
          // 更新记录
          msgArray = JSON.parse(localStorage.getItem("msgArray"));
          msgArray.push(msgObj);
          localStorage.setItem("msgArray", JSON.stringify(msgArray));
          const thisSenderMessageObj = {
            msgText: msgObj.msg,
            msgId: Date.now(),
            avatarSrc: msgObj.avatarSrc,
            userID: msgObj.userID
          };
          // 解析并渲染
          this.messageParsing(thisSenderMessageObj);
        }
      }
    },
    // 消息解析
    messageParsing(msgObj) {
      // 解析接口返回的数据进行渲染
      let separateReg = /(\/[^/]+\/)/g;
      let msgText = msgObj.msgText;
      let finalMsgText = "";
      // 将符合条件的字符串放到数组里
      const resultArray = msgText.match(separateReg);
      if (resultArray !== null) {
        for (let item of resultArray) {
          // 删除字符串中的/符号
          item = item.replace(/\//g, "");
          for (let emojiItem of this.emojiList) {
            // 判断捕获到的字符串与配置文件中的字符串是否相同
            if (emojiItem.info === item) {
              const imgSrc = require(`../assets/img/emoji/${emojiItem.hover}`);
              const imgTag = `<img src="${imgSrc}" width="28" height="28" alt="${item}">`;
              // 替换匹配的字符串为img标签:全局替换
              msgText = msgText.replace(new RegExp(`/${item}/`, "g"), imgTag);
            }
          }
        }
        finalMsgText = msgText;
      } else {
        finalMsgText = msgText;
      }
      msgObj.msgText = finalMsgText;
      // 渲染页面
      this.senderMessageList.push(msgObj);
      // 修改滚动条位置
      this.$nextTick(function() {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>

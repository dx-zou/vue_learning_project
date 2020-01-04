<template>
  <div class="chat-container">
    <div class="user-container">
      <!-- 搜索用户 -->
      <div class="search-user">
        <el-input
          v-model="username"
          clearable
          suffix-icon="el-icon-search"
          placeholder="请输入用户名称"
        ></el-input>
      </div>
      <!-- 用户列表模块 -->
      <div class="user-list">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
          <el-tab-pane label="当前" name="first">
            <a-collapse defaultActiveKey="1" :bordered="false" accordion>
              <template v-slot:expandIcon="props">
                <a-icon
                  type="caret-right"
                  :style="{
                    fontSize: '16px',
                    marginRight: '10px',
                    color: '#bdccda'
                  }"
                  :rotate="props.isActive ? 90 : 0"
                />
              </template>
              <a-collapse-panel header="对话中" key="1">
                <div class="user-list-container">
                  <div
                    v-for="item in chattingList"
                    :key="item.id"
                    :class="[
                      'user-item',
                      activeChatId === item.id ? 'user-item-active' : ''
                    ]"
                    @click="handleUserClick(item)"
                  >
                    <el-badge
                      v-if="item.msgNum"
                      :value="item.msgNum"
                      class="item"
                    >
                      <img :src="item.img" alt="" />
                    </el-badge>
                    <img v-else :src="item.img" alt="" />

                    <div class="chat-user">
                      <h3 class="chat-name">
                        {{ item.name }}
                      </h3>
                      <p class="chat-time">{{ item.time }}</p>
                    </div>
                  </div>
                </div>
              </a-collapse-panel>
              <a-collapse-panel header="排队中" key="2">
                2
              </a-collapse-panel>
            </a-collapse>
          </el-tab-pane>
          <el-tab-pane label="历史" name="second"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 中间聊天模块 -->
    <div class="chat-content-wrapper">
      <!-- 客户名称 -->
      <div class="chatting-user">
        <h3>{{ chattingUserInfo.name || "" }}</h3>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img
              src="@/assets/images/phone-icon.png"
              class="icon-phone"
              alt=""
            />
            转接给其它客服<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="hotel-item">
                <img src="@/assets/images/hotel-icon.png" alt="" />
                <span>上海静安香格里拉大酒店</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="hotel-item">
                <img src="@/assets/images/hotel-icon.png" alt="" />
                <span>上海静安香格里拉大酒店</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="hotel-item">
                <img src="@/assets/images/hotel-icon.png" alt="" />
                <span>上海静安香格里拉大酒店</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="chatting-content" ref="chattingContent">
        <template v-for="(item, index) in ChatContentList">
          <!-- 渲染客户发言 -->
          <div v-if="item.type === 'cust'" :key="index">
            <div
              class="chatting-date"
              v-if="
                index === 0 ||
                  item.date - ChatContentList[index - 1].date > 5000
              "
            >
              <span>{{ item.date | filterTime }}</span>
            </div>
            <div class="customer-chat">
              <img class="chat-head" src="@/assets/images/head1.png" alt="" />
              <div class="customer-chat-content" v-html="item.content">
                <div class="arrow-left"></div>
              </div>
            </div>
          </div>
          <div v-else :key="index">
            <!-- 渲染我的发言 -->
            <div
              class="chatting-date"
              v-if="
                index === 0 ||
                  item.date - ChatContentList[index - 1].date > 5000
              "
            >
              <span>{{ item.date | filterTime }}</span>
            </div>
            <div class="mine-chat">
              <div class="mine-chat-content" v-html="item.content">
                <div class="arrow-right"></div>
              </div>
              <img
                class="chat-head"
                src="@/assets/images/hotel-icon.png"
                alt=""
              />
            </div>
          </div>
        </template>
      </div>
      <!-- 聊天输入框 -->
      <div class="chat-area">
        <div class="chat-toolbar">
          <div>
            <el-popover
              class="faceImg-pop"
              v-model="showFace"
              placement="bottom-start"
              width="430"
              trigger="click"
            >
              <img
                v-for="(item, index) in faceList"
                :key="index"
                :src="item.imgSrc"
                @click="sengFaceImg(item.imgSrc)"
                class="face-img"
                alt=""
              />
              <i slot="reference" class="iconfont icon-biaoqing"></i>
            </el-popover>
            <i class="iconfont icon-tupian"></i>
          </div>
          <span class="chat-record">聊天记录</span>
        </div>
        <div
          class="chat-input"
          ref="chatInput"
          contenteditable="true"
          @keyup.enter="sendMyMessage"
        ></div>
        <div class="send-btn">
          <el-button class="add-btn" @click="sendCusMsg">结束会话</el-button>
          <el-button type="primary" class="common-btn" @click="sendMyMessage"
            >发送</el-button
          >
        </div>
      </div>
    </div>
    <!--    右侧客户信息-->
    <div class="customer-info">
      <el-form label-width="100px">
        <div class="info-block">
          <h3 class="sub-title">订单信息</h3>
          <el-form-item label="订单号：">
            <span>100000000</span>
          </el-form-item>
          <el-form-item label="订单状态：">
            <span>咨询中</span>
          </el-form-item>
        </div>
        <div class="info-block">
          <h3 class="sub-title">客户信息</h3>
          <el-form-item label="联系人：">
            <span>arya</span>
          </el-form-item>
          <el-form-item label="会员号：">
            <span>jfk1234567890</span>
          </el-form-item>
          <el-form-item label="电话号码：">
            <span>18712345678</span>
          </el-form-item>
          <el-form-item label="电子邮箱：">
            <span>1234567890@jperation.com</span>
          </el-form-item>
          <el-form-item label="国家地区：">
            <span>中国</span>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { chattingList, faceList } from "./data";
export default {
  data() {
    return {
      showFace: false, // 显示表情包弹出框
      username: "", // 客户姓名
      activeTab: "first", // 活动的会话菜单项
      activeChatId: "", // 正在进行的会话客户id
      chattingList, // 会话中客户列表
      faceList, // 表情包列表
      liningList: [], // 排队中客户列表
      chattingUserInfo: {}, // 正在会话的客户信息
      ChatContentList: [], // 聊天历史记录
      customerChatList: [], // 客户发言
      lastDate: null // 上一次显示的时间戳
    };
  },
  mounted() {
    // this.startWs();
  },
  methods: {
    startWs() {
      let ws = new WebSocket("ws:127.0.0.1:8900");
      ws.onmessage = function(params) {};
    },
    // ...
    handleTabClick(tab) {},
    // 点击客户列表项
    handleUserClick(value) {
      this.activeChatId = value.id;
      this.chattingUserInfo = { ...value };
    },
    // 发送表情包
    sengFaceImg(imgSrc) {
      this.ChatContentList.push({
        content: `<img src=${imgSrc} />`,
        type: "mine"
      });
      this.goToBottom();
      // 创建img标签，插入输入框
      // let img = document.createElement("img");
      // img.src = imgSrc;
      // this.$refs["chatInput"].appendChild(img);
      this.showFace = false;
    },
    // 保持滚动条始终滚动到底部
    goToBottom() {
      let el = this.$refs["chattingContent"];
      this.$nextTick(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight;
      });
    },
    // 发送客户消息
    sendCusMsg() {
      let msg = this.$refs["chatInput"].innerHTML.trim();
      if (msg.length === 0) {
        return this.$toast("warning", "不能发送空消息");
      }
      this.ChatContentList.push({
        content: msg,
        type: "cust",
        date: new Date()
      });
      this.$refs["chatInput"].innerText = "";
      this.goToBottom();
    },
    // 发送回复消息
    sendMyMessage() {
      let msg = this.$refs["chatInput"].innerHTML.trim();
      if (msg.length === 0) {
        return this.$toast("warning", "不能发送空消息");
      }
      this.ChatContentList.push({
        content: msg,
        type: "mine",
        date: new Date()
      });
      this.$refs["chatInput"].innerText = "";
      this.goToBottom();
    }
  }
};
</script>

<style lang="scss">
.hotel-item {
  padding: 15px 0;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    margin-right: 5px;
    border-radius: 50%;
  }
}
</style>
<style lang="scss" scoped>
$baseBorderColor: #ccc;
.chat-container {
  display: flex;
  height: 100%;
  background-color: #fff;
  .user-container {
    width: 20%;
    border-right: 1px solid $baseBorderColor;
    .search-user {
      padding: 20px;
    }
    .el-tabs {
      /deep/ .el-tabs__item {
        width: 140px;
        text-align: center;
      }
    }
    .el-tab-pane {
      // padding: 0 20px;
      margin-top: 20px;
    }
    /deep/.ant-collapse-header {
      color: $baseFontColor;
      // padding-left: 20px;
    }
    /deep/ .el-badge__content.is-fixed {
      right: 20px;
    }
    .user-list-container {
      max-height: 520px;
      overflow-y: auto;
    }
    .user-item-active {
      background-color: $baseHoverColor;
    }
    .user-item {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 20px;
      cursor: pointer;
      &:hover {
        background-color: $baseHoverColor;
      }

      img {
        width: 55px;
        height: 55px;
        margin-right: 10px;
      }
      .chat-user {
        flex: 1;
      }
      .chat-name {
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        font-size: 20px;
        margin-bottom: 10px;
      }
      .chat-time {
        color: $baseFontColor;
        font-size: 14px;
      }
    }
  }

  .chat-content-wrapper {
    // flex: 1;
    width: 60%;
    border-right: 1px solid $baseBorderColor;
    .chatting-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid $baseBorderColor;
      .icon-phone {
        width: 18px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .el-dropdown-link {
        color: $baseFontColor;
      }
    }
    // 消息记录区域
    .chatting-content {
      height: 450px;
      padding: 20px;
      overflow-y: auto;
      border-bottom: 1px solid $baseBorderColor;
      .chat-head {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .chatting-date {
        height: 30px;
        text-align: center;
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 100px;
          height: 30px;
          line-height: 30px;
          border-radius: 6px;
          text-align: center;
          color: #fff;
          background-color: #d8d8d8;
        }
      }
      /* 消息盒子公共样式 */
      .common-chat-content {
        position: relative;
        max-width: 500px;
        white-space: pre-wrap;
        padding: 10px;
        border: 2px solid $baseBorderColor;
        border-radius: 3px;
        font-size: 18px;
      }
      /* 消息盒子箭头 */
      .chat-arrow {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 15px;
        background-color: #fff;
        border-radius: 3px;
        border-top: 2px solid $baseBorderColor; /* right arrow slant */
      }
      /* 客户消息盒子 */
      .customer-chat {
        display: flex;
        margin-bottom: 20px;
        .chat-head {
          margin-right: 20px;
        }
        .customer-chat-content {
          @extend .common-chat-content;
          &::before {
            content: "";
            @extend .chat-arrow;
            left: -7px;
            border-left: 2px solid $baseBorderColor;
            transform: rotate(-45deg);
          }
        }
      }
      /* 我的消息盒子 */
      .mine-chat {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        .chat-head {
          margin-left: 20px;
        }
        .mine-chat-content {
          @extend .common-chat-content;
          &::after {
            content: "";
            @extend .chat-arrow;
            right: -7px;
            border-right: 2px solid $baseBorderColor;
            transform: rotate(45deg);
          }
        }
      }
    }
    /* 输入框工具栏 */
    .chat-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      i {
        font-size: 30px;
        margin-right: 20px;
        color: $baseFontColor;
        cursor: pointer;
      }
      .chat-record {
        cursor: pointer;
      }
    }
    .chat-input {
      width: 100%;
      height: 140px;
      white-space: pre-wrap;
      padding: 10px 20px;
      overflow-y: auto;
      border-top: 1px solid $baseBorderColor;
      // border-bottom: 1px solid $baseBorderColor;
    }
    .send-btn {
      margin-top: 5px;
      padding-right: 30px;
      text-align: right;
    }
  }
  .customer-info {
    flex: 1;
    padding: 20px;
    .info-block {
      margin-bottom: 50px;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>

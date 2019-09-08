<template>
  <div class="message-container">
    <div class="msg-header">
      <span>消息中心</span>
      <i class="el-icon-close" @click="toggleMsgBox"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  methods: {
    // 显示隐藏msgbox
    toggleMsgBox() {
      this.$store.dispatch("app/toggleMsgBox");
    }
  }
};
</script>

<style lang="scss" scoped>
.message-container {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 4rem;
  height: calc(100% - 0.5rem);
  background-color: #fff;
  box-shadow: -2px -1px 2px rgba(0, 0, 0, 0.2);
  z-index: 10;
  .msg-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.5rem;
    font-size: 0.16rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #e4e4e4;
    color: #333;
    i {
      color: #b3b3b3;
      font-size: 0.2rem;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>

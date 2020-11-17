<template>
  <el-dialog
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
    :top="top"
    :fullscreen="fullscreen"
    :center="center"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="common-dialog"
  >
    <div class="cus-dialog-header" slot="title">
      <span class="cus-dialog_title">{{ title }}</span>
      <!-- <i
        class="el-icon-full-screen cus-dialog_fullicon"
        @click="fullscreen = !fullscreen"
      ></i> -->
    </div>
    <slot></slot>
    <div slot="footer" v-if="showFooter">
      <slot name="footer">
        <el-button size="small" type="primary" @click="handleConfirm"
          >确 定</el-button
        >
        <el-button size="small" @click="close">取 消</el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "CommonDialog",
  props: {
    title: {
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: "50%"
    },
    top: {
      type: String,
      default: "10vh"
    }
  },
  data() {
    return {
      fullscreen: false
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:visible", false);
    },
    close() {
      this.$emit("update:visible", false);
    },
    handleConfirm() {
      this.$emit("handleConfirm");
    }
  }
};
</script>

<style lang="scss">
.common-dialog {
  border-radius: 5px;
  font-size: 16px;
  .cus-dialog_close {
    font-size: 25px;
    color: $--color-primary;
    cursor: pointer;
  }
  .cus-dialog {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px !important;
    }
  }
  .el-checkbox {
    margin-bottom: 6px;
  }
  .el-dialog__body,
  .el-dialog__footer {
    padding: 10px 20px;
  }
  .el-dialog__header {
    padding: 10px 20px;
  }
}
</style>

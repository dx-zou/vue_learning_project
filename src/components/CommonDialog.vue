<template>
  <el-dialog
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
    :top="top"
    :fullscreen="fullscreen"
    :center="center"
    custom-class="common-dialog"
  >
    <div class="cus-dialog-header" slot="title">
      <span class="cus-dialog_title">{{ title }}</span>
      <i
        class="el-icon-full-screen cus-dialog_fullicon"
        @click="fullscreen = !fullscreen"
      ></i>
    </div>
    <slot></slot>
    <div slot="footer" v-if="showFooter">
      <slot name="footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm"
          >确 定</el-button
        >
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
  .cus-dialog {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &_title {
        font-size: 18px;
      }
      &_fullicon {
        margin-right: 15px;
        color: #909399;
      }
    }
  }
  .el-dialog__body,
  .el-dialog__footer {
    padding: 10px 20px;
  }
  .el-dialog__header {
    padding: 20px 30px;
  }
}
</style>

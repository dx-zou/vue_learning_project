<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
    :top="top"
    :center="center"
    custom-class="common-dialog"
  >
    <slot></slot>
    <div slot="footer">
      <slot name="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
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
    width: {
      type: String,
      default: "50%"
    },
    top: {
      type: String,
      default: "10vh"
    }
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
  .el-dialog__body, .el-dialog__footer, .el-dialog__header{
    padding: 10px 20px;
  }
}
</style>

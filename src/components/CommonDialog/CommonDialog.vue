<template>
  <el-dialog
    :title="title"
    :visible.sync="showDialog"
    :width="width"
    :before-close="handleClose"
    append-to-body
    center
    :top="top"
    custom-class="common-dialog"
  >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "CommonDialog",
  props: {
    title: {
      default: ""
    },
    showDialog: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: "30%"
    },
    top: {
      type: String,
      default: "15vh"
    }
  },
  methods: {
    handleClose() {
      this.$emit("update:showDialog", false);
    },
    close() {
      this.$emit("update:showDialog", false);
    },
    handleConfirm() {
      this.$emit("handleConfirm");
    }
  }
};
</script>

<style lang="scss">
.common-dialog {
  font-size: 0.16rem;
  border-radius: 0.1rem;
}
</style>

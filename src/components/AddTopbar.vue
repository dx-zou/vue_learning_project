<template>
  <div class="add-top_bar">
    <svg-icon icon-class="back" class="back-icon" @click="$router.go(-1)" />
    <span class="title">{{ title }}</span>
    <div>
      <slot></slot>
      <el-button
        type="primary"
        size="small"
        :loading="isSaving"
        @click="submitForm"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTopbar",
  props: {
    title: {
      type: String,
      default: ""
    },
    isSaving: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    submitForm() {
      this.$emit("handleSubmitForm");
    }
  }
};
</script>

<style lang="scss" scoped>
.add-top_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 15px;
  box-shadow: 1px 2px 5px rgba(0, 21, 41, 0.08);
  font-size: 16px;
}

.back-icon {
  width: 26px;
  height: 26px;
  cursor: pointer;
}
.title {
  font-weight: bold;
  font-size: 26px;
}
</style>

<template>
  <div class="add-top_bar">
    <svg-icon icon-class="back" class="back-icon" @click="$router.go(-1)" />
    <span>{{ title }}</span>
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

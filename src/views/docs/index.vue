<template>
  <div>
    <mavon-editor v-model="value" @save="handleSave" />
    <div class="md-container" v-html="vue_doc"></div>
  </div>
</template>

<script>
// const Markdown = require("markdown-it");
export default {
  data() {
    return {
      vue_doc: require("./static/Vue-interview.md"),
      value: ""
    };
  },
  mounted() {},
  methods: {
    handleSave(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-container {
  h1 {
    font-size: 50px;
    font-weight: bold;
  }
}
</style>

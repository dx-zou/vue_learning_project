<template>
  <div class="app-main_wrapper">
    <rich-editor v-model="value" ref="editor" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },

  mounted() {
    console.log(this.$refs.editor);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
// .app-main_wrapper {
//   height: 100%;
//   padding: 20px;
//   background-color: #fff;
// }
.title {
  font-size: 30px;
}
</style>

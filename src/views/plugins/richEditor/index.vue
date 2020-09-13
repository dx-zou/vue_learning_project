<template>
  <div class="page-wrapper">
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="tinymce" name="tinymceView"></el-tab-pane>
      <el-tab-pane label="quill" name="quillView"></el-tab-pane>
    </el-tabs>
    <transition name="app">
      <component :is="activeName"></component>
    </transition>
  </div>
</template>

<script>
import tinymceView from "./components/tinymce";
const quillView = () => import("./components/quill");
export default {
  components: {
    tinymceView,
    quillView
  },
  data() {
    return {
      activeName: "tinymceView"
    };
  },
  mounted() {
    const name = sessionStorage.getItem("richEditorPane");
    if (name) {
      this.activeName = name;
    }
  },
  methods: {
    handleTabClick(value) {
      sessionStorage.setItem("richEditorPane", value.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: #fff;
}
</style>

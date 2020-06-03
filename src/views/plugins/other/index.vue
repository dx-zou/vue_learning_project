<template>
  <div class="other-container">
    <clipboard />
    <js-pdf />
    <Cropper />
  </div>
</template>

<script>
import Clipboard from "./components/Clipboard";
import JsPdf from "./components/JsPdf";
import Cropper from "./components/cropper";
export default {
  data() {
    return {};
  },
  components: {
    Clipboard,
    JsPdf,
    Cropper
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.other-container {
  min-height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .el-card {
    width: 350px;
    height: 400px;
    margin: 0 15px 15px 0;
    overflow: auto;
  }
}
</style>

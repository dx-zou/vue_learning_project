<template>
  <div class="other-container">
    <clipboard />
    <js-pdf />
  </div>
</template>

<script>
import Clipboard from "./components/Clipboard";
import JsPdf from "./components/JsPdf";
export default {
  data() {
    return {};
  },
  components: {
    Clipboard,
    JsPdf
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.other-container {
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .el-card {
    width: 350px;
    margin-right: 15px;
  }
}
</style>

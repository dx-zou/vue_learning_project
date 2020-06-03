<template>
  <el-card>
    <h1 slot="header">jspdf</h1>
    <el-button type="primary" @click="initJspdf">保存pdf</el-button>
  </el-card>
</template>

<script>
import jsPDF from "jspdf";

export default {
  name: "JsPdf",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    initJspdf() {
      const doc = new jsPDF();
      doc.text("hello world!", 10, 10);
      doc.save("hello.pdf");
    }
  }
};
</script>

<style lang="scss" scoped>
.copy {
  margin: 10px 0;
}
</style>

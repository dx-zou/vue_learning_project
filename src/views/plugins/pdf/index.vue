<template>
  <div>
    <pdf
      src="https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf"
    ></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  data() {
    return {
      pdf_src: ""
    };
  },
  components: {
    pdf
  }
};
</script>

<style lang="scss" scoped></style>

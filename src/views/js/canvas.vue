<template>
  <div>
    <taiji />
    <canvas ref="c1" width="300" height="300"></canvas>
    <clock />
  </div>
</template>

<script>
import taiji from "./components/taiji";
import clock from "./components/clock";
export default {
  data() {
    return {};
  },
  components: {
    taiji,
    clock
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const cas = this.$refs.c1;
      const ctx = cas.getContext("2d"); // 获取绘图环境
      // console.log(ctx);
      ctx.fillStyle = "blue";
      ctx.font = "30px sans-serif";
      ctx.direction = "ltr";
      ctx.fillText("Hello Canvas", 0, 100);
      ctx.strokeText("Hello Canvas", 0, 200);
      // const src = cas.toDataURL("image/png", 0.9);
    }
  }
};
</script>

<style lang="scss" scoped>
// canvas {
//   animation: rotate 15s linear infinite;
// }
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

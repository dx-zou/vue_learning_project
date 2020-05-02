<template>
  <div>
    <canvas ref="cas1" width="500" height="300">您的浏览器不支持canvas</canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const cas = this.$refs.cas1;
      const ctx = cas.getContext("2d");
      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(30, 100);
      ctx.quadraticCurveTo(100, 200, 200, 50);
      ctx.stroke();
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid #ccc;
  background-color: #fff;
}
</style>

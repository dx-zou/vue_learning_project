<template>
  <div>
    <canvas ref="canvas" width="300" height="300"
      >你的浏览器不支持canvas请升级浏览器后重试</canvas
    >
  </div>
</template>

<script>
export default {
  name: "taiji",
  mounted() {
    this.paintCanvas();
  },
  methods: {
    paintCanvas() {
      const cas = this.$refs.canvas;
      const context = cas.getContext("2d");
      const x0 = cas.width / 2;
      const y0 = cas.height / 2;
      // 绘制白色整体白色区域
      context.arc(x0, y0, 100, (Math.PI / 180) * 360, 0);
      context.fillStyle = "white";
      context.fill();
      // 绘制黑色 的太极图
      context.beginPath();
      context.arc(
        x0,
        y0 - 50,
        50,
        (Math.PI / 180) * -90,
        (Math.PI / 180) * 90,
        true
      );
      context.arc(
        x0,
        y0 + 50,
        50,
        (Math.PI / 180) * -90,
        (Math.PI / 180) * 90,
        false
      );
      context.arc(x0, y0, 100, (Math.PI / 180) * 90, (Math.PI / 180) * 270);
      context.fillStyle = "black";
      context.fill();

      // 绘制太极中的小圆点
      context.beginPath();
      context.fillStyle = "black";
      context.arc(
        x0,
        y0 - 50,
        10,
        (Math.PI / 180) * -90,
        (Math.PI / 180) * 270,
        true
      );
      context.fill();

      context.beginPath();
      context.fillStyle = "white";
      context.arc(
        x0,
        y0 + 50,
        10,
        (Math.PI / 180) * -90,
        (Math.PI / 180) * 270,
        false
      );
      context.fill();
    }
  }
};
</script>

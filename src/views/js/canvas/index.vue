<template>
  <div class="canvas-container">
    <taiji />
    <div>
      <canvas ref="c1" width="300" height="300"></canvas>
    </div>
    <clock />
    <rubber />
    <div>
      <canvas ref="c2" width="380" height="400"></canvas>
    </div>
    <div>
      <canvas ref="c3" width="500" height="300"></canvas>
    </div>
    <div>
      <canvas ref="c4" width="400" height="300"></canvas>
    </div>
    <div>
      <canvas ref="c5" width="400" height="300"></canvas>
    </div>
    <div>
      <canvas ref="c6" width="1000" height="300"></canvas>
    </div>
  </div>
</template>

<script>
import taiji from "../components/taiji";
import clock from "../components/clock";
import rubber from "../components/rubber";
export default {
  data() {
    return {};
  },
  components: {
    taiji,
    clock,
    rubber
  },
  mounted() {
    this.drawText();
    this.drawRect();
    this.drawPath();
    this.drawPic();
    this.drawLine();
    this.drawAxis();
  },
  methods: {
    drawText() {
      const cas = this.$refs.c1;
      const ctx = cas.getContext("2d"); // 获取绘图环境
      ctx.fillStyle = "blue";
      ctx.font = "30px sans-serif";
      ctx.direction = "ltr";
      ctx.fillText("Hello Canvas", 0, 100);
      ctx.strokeText("Hello Canvas", 0, 200);
    },
    drawRect() {
      const cas = this.$refs.c2;
      const ctx = cas.getContext("2d");
      ctx.beginPath();
      // 线性渐变
      const gradient = ctx.createLinearGradient(200, 60, 300, 140);
      gradient.addColorStop(0, "blue");
      gradient.addColorStop(0.25, "white");
      gradient.addColorStop(0.5, "purple");
      gradient.addColorStop(0.75, "red");
      gradient.addColorStop(1, "yellow");
      ctx.lineJoin = "round";
      ctx.lineWidth = "10";
      ctx.font = "20px 微软雅黑";
      ctx.fillText("矩形", 30, 30);
      ctx.strokeStyle = "orange";
      ctx.fillStyle = gradient;
      ctx.strokeRect(50, 50, 100, 100);
      ctx.fillRect(200, 60, 100, 100);
      // 径向渐变
      ctx.beginPath();
      const radial = ctx.createRadialGradient(100, 300, 50, 100, 200, 50);
      radial.addColorStop(0, "blue");
      radial.addColorStop(0.25, "white");
      radial.addColorStop(0.5, "purple");
      radial.addColorStop(0.75, "red");
      radial.addColorStop(1, "yellow");
      // 阴影效果
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.shadowBlur = 20;
      ctx.fillStyle = radial;
      ctx.fillRect(50, 200, 100, 100);
      ctx.beginPath();
      // 图案填充
      const img = new Image();
      img.src = require("@/assets/images/gf.jpg");
      const pattern = ctx.createPattern(img, "repeat");
      ctx.fillStyle = pattern;

      ctx.fillRect(160, 200, 200, 200);
    },
    drawPath() {
      const cas = this.$refs.c3;
      const ctx = cas.getContext("2d");
      ctx.beginPath();
      ctx.arc(100, 100, 100, Math.PI / 2, -Math.PI / 2);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(250, 150, 130, 0, Math.PI * 2);
      ctx.arc(250, 150, 100, 0, Math.PI * 2, true);
      ctx.fillStyle = "orange";
      ctx.shadowColor = "red";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 20;
      ctx.fill();
    },
    drawPic() {
      const cas = this.$refs.c4;
      const ctx = cas.getContext("2d");
      ctx.beginPath();
      ctx.arc(50, 60, 30, 0, Math.PI * 2);
      ctx.rect(100, 30, 200, 100);
      ctx.shadowColor = "rgba(200,200,0,0.3)";
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      ctx.shadowBlur = 15;

      ctx.moveTo(10, 10);
      ctx.lineTo(10, 260);
      ctx.lineTo(350, 260);
      ctx.lineTo(350, 10);
      ctx.closePath();
      ctx.fillStyle = "orange";
      ctx.fill();
    },
    drawLine() {
      const cas = this.$refs.c5;
      const ctx = cas.getContext("2d");
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "lightGray";
      const step = 20;
      for (let i = step + 0.5; i < cas.width; i += step) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, cas.height);
        ctx.stroke();
      }
      for (let i = step + 0.5; i < cas.height; i += step) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(cas.width, i);
        ctx.stroke();
      }
    },
    drawAxis() {
      const cas = this.$refs.c6;
      const ctx = cas.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "lightGray";
      ctx.moveTo(60, 60);
      ctx.lineTo(60, cas.height - 60);
      ctx.lineTo(cas.width - 60, cas.height - 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = "orange";
      ctx.fillRect(80, 100, 30, cas.height - 160);

      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.lineJoin = "round";
      ctx.rect(300, 50, 300, 150);
      ctx.stroke();
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas-container {
  display: flex;
  flex-wrap: wrap;
}
canvas {
  border: 1px solid #ddd;
}
</style>

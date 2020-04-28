<template>
  <div>
    <div>
      <el-button type="primary">离屏canvas</el-button>
    </div>
    <canvas ref="cas" v-show="false" :width="width" :height="height"></canvas>
    <img :src="src" alt="离屏canvas" />
  </div>
</template>

<script>
export default {
  name: "clock",
  props: {
    width: {
      type: String,
      default: "300"
    },
    height: {
      type: String,
      default: "300"
    },
    clockRadius: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      imgData: undefined,
      cas: undefined,
      ctx: undefined,
      src: ""
    };
  },
  mounted() {
    this.draw();
    const clock = setInterval(() => {
      this.draw();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(clock);
    });
  },
  methods: {
    draw() {
      this.cas = this.$refs.cas;
      this.ctx = this.cas.getContext("2d");
      this.ctx.clearRect(0, 0, this.cas.width, this.cas.height);
      this.drawCircle(this.ctx, this.cas);
      this.drawNumerals(this.ctx, this.cas);
      this.drawCenter(this.ctx, this.cas);
      this.drawHands(this.ctx, this.cas);
      this.src = this.cas.toDataURL();
    },
    // 保存绘图表面
    saveDrawingSurface() {
      this.imgData = this.ctx.getImageData(
        0,
        0,
        this.cas.width,
        this.cas.height
      );
    },
    // 恢复绘图表面
    restoreDrawingSurface() {
      this.ctx.putImageData(this.imgData, 0, 0);
    },
    // 绘制表盘圆环
    drawCircle() {
      this.ctx.beginPath();
      this.ctx.arc(
        this.cas.width / 2,
        this.cas.height / 2,
        this.clockRadius,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.fillStyle = "white";
      this.ctx.fill();
      this.ctx.stroke();
    },
    // 绘制表盘数字及刻度线
    drawNumerals() {
      const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const spec = [12, 3, 6, 9];
      this.ctx.font = "20px serif";
      this.ctx.fillStyle = "black";
      numerals.forEach(value => {
        const angle = (Math.PI / 6) * (value - 3);
        const numeralWidth = this.ctx.measureText(value).width;
        this.ctx.moveTo(
          150 + Math.cos(angle) * 100,
          150 + Math.sin(angle) * 100
        );
        let width = spec.includes(value) ? 90 : 95;
        this.ctx.lineTo(
          150 + Math.cos(angle) * width,
          150 + Math.sin(angle) * width
        );
        this.ctx.stroke();
        this.ctx.fillText(
          value,
          150 + Math.cos(angle) * 80 - numeralWidth / 2,
          150 + Math.sin(angle) * 80 + numeralWidth / 2
        );
      });
    },
    // 绘制表盘圆心
    drawCenter() {
      this.ctx.beginPath();
      this.ctx.arc(
        this.cas.width / 2,
        this.cas.height / 2,
        8,
        0,
        Math.PI * 2,
        true
      );
      this.ctx.fillStyle = "orange";
      this.ctx.fill();
    },
    // 绘制表针
    drawHand(loc, handRadius) {
      const angle = (Math.PI * 2 * loc) / 60 - Math.PI / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.cas.width / 2, this.cas.height / 2);
      this.ctx.lineTo(
        this.cas.width / 2 + Math.cos(angle) * handRadius,
        this.cas.height / 2 + Math.sin(angle) * handRadius
      );
      if (handRadius === 60) {
        this.ctx.moveTo(this.cas.width / 2, this.cas.height / 2);
        this.ctx.lineTo(
          this.cas.width / 2 - Math.cos(angle) * 20,
          this.cas.height / 2 - Math.sin(angle) * 20
        );
        // this.ctx.strokeStyle = "red";
      }
      this.ctx.stroke();
    },
    // 绘制所有表针
    drawHands() {
      const date = new Date();
      let hour = date.getHours();
      hour = hour > 12 ? hour - 12 : hour;
      this.drawHand((hour + date.getMinutes() / 60) * 5, 35);
      this.drawHand(date.getMinutes(), 50);
      this.drawHand(date.getSeconds(), 60);
    }
  }
};
</script>

<style lang="scss" scoped></style>

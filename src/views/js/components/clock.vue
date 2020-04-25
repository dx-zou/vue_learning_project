<template>
  <canvas ref="cas" :width="width" :height="height"></canvas>
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
      const cas = this.$refs.cas;
      const ctx = cas.getContext("2d");
      ctx.clearRect(0, 0, cas.width, cas.height);
      this.drawCircle(ctx, cas);
      this.drawNumerals(ctx, cas);
      this.drawCenter(ctx, cas);
      this.drawHands(ctx, cas);
    },
    drawCircle(ctx, cas) {
      ctx.beginPath();
      ctx.arc(
        cas.width / 2,
        cas.height / 2,
        this.clockRadius,
        0,
        Math.PI * 2,
        true
      );
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
    },
    drawNumerals(ctx) {
      const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const spec = [12, 3, 6, 9];
      ctx.font = "20px serif";
      ctx.fillStyle = "black";
      numerals.forEach(value => {
        const angle = (Math.PI / 6) * (value - 3);
        const numeralWidth = ctx.measureText(value).width;
        ctx.moveTo(150 + Math.cos(angle) * 100, 150 + Math.sin(angle) * 100);
        let width = spec.includes(value) ? 90 : 95;
        ctx.lineTo(
          150 + Math.cos(angle) * width,
          150 + Math.sin(angle) * width
        );
        ctx.stroke();
        ctx.fillText(
          value,
          150 + Math.cos(angle) * 80 - numeralWidth / 2,
          150 + Math.sin(angle) * 80 + numeralWidth / 2
        );
      });
    },
    drawCenter(ctx, cas) {
      ctx.beginPath();
      ctx.arc(cas.width / 2, cas.height / 2, 8, 0, Math.PI * 2, true);
      ctx.fillStyle = "orange";
      ctx.fill();
    },
    drawHand(ctx, cas, loc, handRadius) {
      const angle = (Math.PI * 2 * loc) / 60 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cas.width / 2, cas.height / 2);
      ctx.lineTo(
        cas.width / 2 + Math.cos(angle) * handRadius,
        cas.height / 2 + Math.sin(angle) * handRadius
      );
      if (handRadius === 60) {
        ctx.moveTo(cas.width / 2, cas.height / 2);
        ctx.lineTo(
          cas.width / 2 - Math.cos(angle) * 20,
          cas.height / 2 - Math.sin(angle) * 20
        );
        // ctx.strokeStyle = "red";
      }
      ctx.stroke();
    },
    drawHands(ctx, cas) {
      const date = new Date();
      let hour = date.getHours();
      hour = hour > 12 ? hour - 12 : hour;

      this.drawHand(ctx, cas, (hour + date.getMinutes() / 60) * 5, 35);
      this.drawHand(ctx, cas, date.getMinutes(), 50);
      this.drawHand(ctx, cas, date.getSeconds(), 60);
    }
  }
};
</script>

<style lang="scss" scoped></style>

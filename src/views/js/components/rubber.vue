<template>
  <div>
    <canvas
      @mousedown="handleMousedown"
      @mouseup="handleMouseup"
      @mousemove="handleMousemove"
      @dblclick="restoreRubber"
      ref="cas"
      :width="width"
      :height="height"
    ></canvas>
    <div ref="rubber" v-show="show" class="rubber"></div>
  </div>
</template>

<script>
export default {
  name: "rubber",
  props: {
    width: {
      type: String,
      default: "500"
    },
    height: {
      type: String,
      default: "400"
    },
    clockRadius: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      show: false,
      imgData: undefined,
      cas: undefined,
      ctx: undefined,
      image: undefined,
      rubber: {},
      mousedown: {},
      rubberRectangle: {},
      dragging: false
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      this.cas = this.$refs.cas;
      this.ctx = this.cas.getContext("2d");
      this.rubber = this.$refs.rubber;
      this.image = new Image();
      this.image.src = require("@/assets/images/gf.jpg");
      this.image.onload = () => {
        this.ctx.drawImage(this.image, 0, 0, this.cas.width, this.cas.height);
      };
    },
    handleMousedown(e) {
      const x = e.clientX,
        y = e.clientY;
      e.preventDefault();
      this.rubberStart(x, y);
    },
    handleMousemove(e) {
      const x = e.clientX,
        y = e.clientY;
      e.preventDefault();
      if (this.dragging) {
        this.rubberStretch(x, y);
      }
    },
    handleMouseup(e) {
      e.preventDefault();
      this.rubberEnd();
    },

    rubberStart(x, y) {
      this.mousedown.x = x;
      this.mousedown.y = y;
      this.rubberRectangle.left = x;
      this.rubberRectangle.top = y;
      this.moveRubber();
      this.show = true;
      this.dragging = true;
    },
    rubberStretch(x, y) {
      this.rubberRectangle.left = x < this.mousedown.x ? x : this.mousedown.x;
      this.rubberRectangle.top = y < this.mousedown.y ? y : this.mousedown.y;
      this.rubberRectangle.width = Math.abs(x - this.mousedown.x);
      this.rubberRectangle.height = Math.abs(y - this.mousedown.y);
      this.moveRubber();
      this.resizeRubber();
    },
    rubberEnd() {
      const obj = this.cas.getBoundingClientRect();
      try {
        this.ctx.drawImage(
          this.cas,
          this.rubberRectangle.left - obj.left,
          this.rubberRectangle.top - obj.top,
          this.rubberRectangle.width,
          this.rubberRectangle.height,
          0,
          0,
          this.cas.width,
          this.cas.height
        );
      } catch (error) {
        console.log(error);
      }
      this.resetRubber();
      this.rubber.style.width = 0;
      this.rubber.style.height = 0;
      this.show = false;
      this.dragging = false;
    },
    moveRubber() {
      this.rubber.style.top = this.rubberRectangle.top + "px";
      this.rubber.style.left = this.rubberRectangle.left + "px";
    },
    resizeRubber() {
      this.rubber.style.width = this.rubberRectangle.width + "px";
      this.rubber.style.height = this.rubberRectangle.height + "px";
    },
    resetRubber() {
      this.rubberRectangle = { top: 0, left: 0, width: 0, height: 0 };
    },
    restoreRubber() {
      this.ctx.clearRect(0, 0, this.cas.width, this.cas.height);
      this.ctx.drawImage(this.image, 0, 0, this.cas.width, this.cas.height);
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  position: relative;
  cursor: crosshair;
  border: thin solid #aaa;
}
.rubber {
  position: absolute;
  border: 2px solid blue;
  cursor: crosshair;
}
</style>

<template>
  <div>
    <el-tag effect="dark">交通信号灯</el-tag>
    <div class="light" ref="light">{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      timer1: null,
      value: 0
    };
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.exec();
  },
  methods: {
    // 交通信号灯颜色循环变化
    sleep(duration) {
      this.value = duration;
      this.timer && clearInterval(this.timer);
      this.timer1 && clearInterval(this.timer1);
      return new Promise(resolve => {
        this.timer = setInterval(() => {
          this.value--;
        }, 1000);
        this.timer1 = setTimeout(resolve, duration * 1000);
      });
    },
    async changeColor(duration, color) {
      this.$refs.light.style.background = color;
      await this.sleep(duration);
    },
    async exec() {
      const flag = true;
      while (flag) {
        await this.changeColor(5, "green");
        await this.changeColor(3, "yellow");
        await this.changeColor(5, "red");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.light {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  font-size: 50px;
  font-weight: bold;
}
</style>

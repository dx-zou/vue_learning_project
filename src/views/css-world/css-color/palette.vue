<template>
  <div class="palette-container">
    <div class="palette-item" v-for="color in colors" :key="color">
      <div :style="{ background: color }" class="color-panel"></div>
      <p
        :style="{ color: color }"
        class="color-value"
        :data-clipboard-text="color"
      >
        {{ color }}
      </p>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";

export default {
  data() {
    return {
      colors: ["#0283d6", "#6c757d", "#1bb99a", "#ff5d48", "#f1b53d", "#696969"]
    };
  },
  mounted() {
    this.initClipboard();
  },
  methods: {
    initClipboard() {
      const clipboard = new ClipboardJS(".color-value");
      clipboard.on("success", e => {
        console.log(e);
        this.$toast(e.text);
      });
      this.$once("hook:beforeDestroy", () => {
        clipboard.destroy();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.palette-container {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  .palette-item {
    width: 100px;
    height: 90px;
    margin: 0 10px 10px 0;
    .color-panel {
      height: 60%;
    }
    .color-value {
      padding: 5px 0;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>

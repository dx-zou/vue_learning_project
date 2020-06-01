<template>
  <div class="palette-container">
    <div class="palette-item" v-for="item in colors" :key="item.color">
      <div :style="{ background: item.color }" class="color-panel"></div>
      <p
        :style="{ color: item.color }"
        class="color-value"
        :data-clipboard-text="item.color"
      >
        {{ item.color }}
      </p>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";

export default {
  data() {
    return {
      colors: [
        {
          color: "#0283d6"
        },
        {
          color: "#6c757d"
        },
        {
          color: "#1bb99a"
        },
        {
          color: "#ff5d48"
        },
        {
          color: "#f1b53d"
        }
      ]
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

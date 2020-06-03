<template>
  <el-card>
    <h1 slot="header">Clipboard 复制到剪贴板</h1>
    <div id="beCopied">
      月落乌啼霜满天，江枫渔火对愁眠。 姑苏城外寒山寺，夜半钟声到客船。
    </div>
    <el-input
      type="textarea"
      v-model="value1"
      placeholder="粘贴复制的文本"
      clearable
    />
    <el-button type="primary" class="copy" data-clipboard-target="#beCopied"
      >复制文本</el-button
    >
    <el-input
      id="input_value"
      v-model="value"
      placeholder="粘贴复制的文本"
      clearable
    />

    <el-button
      type="primary"
      class="copy"
      data-clipboard-action="cut"
      data-clipboard-target="#input_value"
      >剪切文本</el-button
    >
    <el-input
      id="input_value"
      v-model="value"
      placeholder="粘贴复制的文本"
      clearable
    />
    <el-button type="primary" class="copy" data-clipboard-text="复制固定文本"
      >复制固定文本</el-button
    >
  </el-card>
</template>

<script>
import ClipboardJS from "clipboard";

export default {
  name: "Clipboard",
  data() {
    return {
      value: "test clipboard",
      value1: ""
    };
  },
  mounted() {
    this.initClipboard();
  },
  methods: {
    initClipboard() {
      const clipboard = new ClipboardJS(".copy", {
        text: function(trigger) {
          console.log(trigger);
          return "动态设置的";
        }
      });
      clipboard.on("success", () => {
        this.$toast("复制成功");
      });
      this.$once("hook:beforeDestroy", () => {
        clipboard.destroy();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.copy {
  margin: 10px 0;
}
</style>

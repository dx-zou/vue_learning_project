<template>
  <el-card>
    <h2 slot="header">音乐播放</h2>
    <!-- <audio :src="audioSrc" controls :cover="cover" id="audio"></audio> -->
    <div id="canvas-container"></div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // audioSrc: require("@/assets/童话镇.mp3"),
      cover: require("@/assets/images/avatar.jpg")
    };
  },
  mounted() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? true
      : false;

    const mobileOption = {
      size: window.innerWidth - 30,
      radius: 0.25,
      rippleWidth: 2,
      pointRadius: 4
    };

    // eslint-disable-next-line no-undef
    new RhythmRipple(
      "#canvas-container",
      "#audio",
      isMobile ? mobileOption : {}
    );
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  max-width: 500px !important;
  max-height: 500px !important;
  background: #6db2b9;
}
</style>

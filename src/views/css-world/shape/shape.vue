<template>
  <flex-container class="shape-container">
    <triangle />
    <c-polygon />
    <c-loading />
    <wave />
  </flex-container>
</template>

<script>
import triangle from "./components/triangle";
import CPolygon from "./components/polygon";
import CLoading from "./components/loading";
import wave from "./components/wave";
export default {
  data() {
    return {};
  },
  components: {
    triangle,
    CPolygon,
    CLoading,
    wave
  }
};
</script>

<style lang="scss" scoped></style>

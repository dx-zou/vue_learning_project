<template>
  <flex-container class="shape-container">
    <triangle />
    <c-polygon />
    <c-loading />
  </flex-container>
</template>

<script>
import triangle from "./components/triangle";
import CPolygon from "./components/polygon";
import CLoading from "./components/loading";
export default {
  data() {
    return {};
  },
  components: {
    triangle,
    CPolygon,
    CLoading
  }
};
</script>

<style lang="scss" scoped></style>

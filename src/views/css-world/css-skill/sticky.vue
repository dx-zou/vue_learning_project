<template>
  <div class="sticky-wrapper">
    <div class="top" v-sticky>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
  </div>
</template>

<script>
import VueSticky from "vue-sticky";
export default {
  data() {
    return {};
  },
  directives: {
    sticky: VueSticky
  }
};
</script>

<style lang="scss" scoped>
.sticky-wrapper {
  background-color: #fff;
  height: 100%;
}
.top {
  display: flex;
  justify-content: space-between;
  div {
    width: 200px;
    height: 30%;
    background-color: #ccc;
  }
}
</style>

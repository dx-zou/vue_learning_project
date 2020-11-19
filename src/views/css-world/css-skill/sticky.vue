<template>
  <div class="sticky-wrapper">
    <div class="box">
      <div class="shadow">box-shadow</div>
      <div class="outline">outline</div>
      <div class="outline1">outline box-shadow</div>
      <div class="gradient">gradient</div>
      <div class="gradient2">gradient</div>
      <div class="gradient3">gradient</div>
      <div class="gradient4">gradient</div>
      <div class="gradient5">gradient</div>
      <div class="gradient6">gradient</div>
      <div class="gradient7">gradient</div>
      <div class="gradient8">conic-gradient</div>
      <div class="marching-ants"></div>
      <div class="shape1">形状变换</div>
    </div>
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
  height: 200%;
  padding: 15px;
  background-color: #fff;
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
.box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 50px;
  color: #fff;
}
.shadow {
  width: 200px;
  height: 100px;
  background: chocolate;
  box-shadow: 0 0 0 5px rgb(235, 73, 106), 0 0 0 10px cornflowerblue;
}
.outline {
  width: 200px;
  height: 100px;
  padding: 10px;
  outline: 2px dashed #fff;
  outline-offset: -5px;
  background: cadetblue;
}
.outline1 {
  width: 200px;
  height: 100px;
  background: tan;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 0 5px #e82f2f;
  outline: 5px solid #655;
}
.gradient {
  width: 300px;
  height: 100px;
  background: linear-gradient(#fb3 30%, #58a 0, #58a 60%, #ccc 0);
  background-size: 100% 30px;
}
.gradient2 {
  width: 200px;
  height: 100px;
  background: linear-gradient(to right, #fb3 30%, #58a 0, #58a 60%, #ccc 0);
  background-size: 30px 100%;
}
.gradient3 {
  width: 300px;
  height: 100px;
  background: linear-gradient(
    45deg,
    #fb3 25%,
    #58a 0,
    #58a 50%,
    #fb3 0,
    #fb3 75%,
    #58a 0
  );
  background-size: 30px 30%;
}
.gradient4 {
  width: 200px;
  height: 100px;
  margin: 50px;
  background-image: linear-gradient(
      90deg,
      rgba(200, 0, 0, 0.5) 50%,
      transparent 0
    ),
    linear-gradient(rgba(200, 0, 0, 0.5) 50%, transparent 0);
  background-size: 30px 30px;
}
.gradient5 {
  width: 200px;
  height: 100px;
  margin-top: 50px;
  background: #58a;
  background-image: linear-gradient(white 2px, transparent 0),
    linear-gradient(90deg, white 2px, transparent 0),
    linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0),
    linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
  background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}
.gradient6 {
  width: 200px;
  height: 100px;
  margin-top: 50px;
  background: #655;
  background-image: radial-gradient(tan 30%, transparent 0),
    radial-gradient(tan 30%, transparent 0);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
}
.gradient7 {
  width: 200px;
  height: 100px;
  margin-top: 50px;
  background: #eee;
  background-image: linear-gradient(45deg, #bbb 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, #bbb 0),
    linear-gradient(45deg, #bbb 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, #bbb 0);
  background-position: 0 0, 15px 15px, 15px 15px, 30px 30px;
  background-size: 30px 30px;
}
.gradient8 {
  width: 200px;
  height: 100px;
  margin-top: 50px;
  background: conic-gradient(red, orange, yellow, green, blue);
  border-radius: 50% / 100% 100% 0 0;
}
@keyframes ants {
  to {
    background-position: 100%;
  }
}
.marching-ants {
  width: 200px;
  height: 100px;
  padding: 10px;
  margin-top: 50px;
  border: 1px solid transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-45deg, black 0, black 25%, white 0, white 50%) 0 /
      0.6em 0.6em;
  animation: ants 15s linear infinite;
}
.shape1 {
  position: relative;
  width: 100px;
  height: 50px;
  margin-top: 50px;
  // background: #58a;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // z-index: 1;
    transform: skew(45deg);
    background: #58a;
  }
}
</style>

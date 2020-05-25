<template>
  <div class="wow-container">
    <div class="box">WOW.js animation</div>
    <div
      class="box wow slideInRight"
      data-wow-duration="2s"
      data-wow-delay="1s"
    ></div>
    <div class="box wow slideInRight"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft" data-wow-duration="2s"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
    <div class="box wow slideInLeft"></div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initWow();
  },
  methods: {
    initWow() {
      const wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: false, // act on asynchronously loaded content (default is true)
        callback: function() {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: ".app-main" // optional scroll container selector, otherwise use window
      });
      wow.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: orangered;
  margin-bottom: 100px;
  color: #fff;
  font-size: 21px;
}
</style>

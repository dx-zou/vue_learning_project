<template>
  <div class="transition-container">
    <el-button type="primary" @click="show = !show">toggle</el-button>
    <transition name="filter">
      <div key="filter" v-show="show" class="filter">
        <div>hhhhhhhhhhhhhhhhhhh</div>
      </div>
    </transition>
  </div>
</template>

<script>
import bus from "@/utils/bus";
export default {
  data() {
    return {
      show: false
    };
  },
  created() {
    bus.$on("sendData", data => {
      console.log(data);
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.transition-container {
  position: relative;
  .filter {
    position: absolute;
    width: 200px;
    height: 400px;
    right: 0;
    border: 1px solid #ccc;
  }
  .filter-enter,
  .filter-leave-to {
    opacity: 0;
    transform: translateX(230px);
  }
  .filter-enter-active,
  .filter-leave-active {
    transition: all 0.6s ease;
  }

  // .filter-leave-to {
  //   transform: translateX(230px);
  //   opacity: 1;
  // }
  @keyframes bounce-in {
    0% {
      transform: translateX(230px);
    }
    100% {
      transform: translateX(-230px);
    }
  }
}
</style>

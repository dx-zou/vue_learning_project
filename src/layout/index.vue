<template>
  <el-container class="app-wrapper">
    <side-bar></side-bar>
    <el-main>
      <app-header></app-header>
      <transition name="app">
        <div class="app-main">
          <router-view/>
        </div>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import AppHeader from "./AppHeader";
import SideBar from "./Sidebar";
export default {
  name: "layout",
  data() {
    return {};
  },
  components: {
    AppHeader,
    SideBar
  }
};
</script>

<style lang="less" scoped>
.app-wrapper {
  height: 100%;
}
.el-main {
  padding: 0;
  overflow-x: hidden;
}
.app-enter {
  opacity: 0;
  transform: translateX(100%);
}
.app-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.app-enter-active,
.app-leave-active {
  transition: all 0.5s;
}
</style>
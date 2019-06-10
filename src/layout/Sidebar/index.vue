<template>
  <div class="app-sidebar">
    <el-scrollbar class="side-bar" ref="sidebar">
      <el-menu
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>导航
          </template>
          <el-menu-item index="1-1">
            <span @click="$router.push('/home')">首页</span>
          </el-menu-item>
          <el-menu-item index="1-2">
            <span @click="$router.push('/cart')">小球动画</span>
          </el-menu-item>
          <el-menu-item index="1-3">
            <span @click="$router.push('/todolist')">slot</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>组件
          </template>
          <el-menu-item index="2-1">
            <span @click="$router.push({path:'/user/101'})">easy-mock</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span @click="$router.push('/nav')">路由导航守卫</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span @click="$router.push('/vx')">vuex</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    changeWidth() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" >
.side-bar {
  position: fixed;
  height: 100%;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 999;
  transition: width 0.3s ease;
  border-right: 1px solid #ccc;
  .el-scrollbar__view {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
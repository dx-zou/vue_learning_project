<template>
  <div id="app">
    <el-container class="main-container">
      <el-scrollbar class="side-bar" ref="sidebar" v-if="show">
        <el-menu :collapse="isCollapse">
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
              <span @click="$router.push('/todolist')">todo</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>组件
            </template>
            <el-menu-item index="2-1">
              <span @click="$router.push({path:'/user/101'})">user</span>
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
      <el-main>
        <header class="nx-header" v-if="show">
          <div class="left-menu" @click="changeWidth">切换</div>
          <el-menu class="right-menu">
            <el-submenu index="1">
              <template slot="title">我的账户</template>
              <el-menu-item @click="logout">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </header>
        <transition name="app">
          <!-- 路由组件 -->
          <router-view/>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      isCollapse: false
    };
  },
  created() {},
  watch: {
    //监听路由变化
    $route(to, from) {
      this.show = this.$route.name === "login" ? false : true;
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem('role')
      this.$router.push("/login");
      this.$toast("success", "已退出登录");
    },
    changeWidth() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style lang="less">
#app {
  overflow-x: hidden;
  height: 700px;
  .main-container {
    height: 100%;
  }
  .side-bar {
    position: fixed;
    // width: 210px;
    bottom: 0;
    left: 0;
    top: 0;
    z-index: 999;
    transition: width 0.3s ease;
    border-right: 1px solid #ccc;
  }
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .nx-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    .left-menu {
      float: left;
      width: 200px;
      cursor: pointer;
    }
    .right-menu {
      width: 120px;
      height: 50px;
      float: right;
      border: none;
    }
  }
  .el-main {
    padding-left: 230px;
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
}
</style>

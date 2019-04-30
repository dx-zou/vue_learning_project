<template>
  <div id="app">
    <el-container class="main-container">
      <el-header v-if="show">
        <div>
          <el-button type="primary" @click="$router.push('/home')">首页</el-button>
          <el-button type="primary" @click="$router.push('/cart')">小球动画</el-button>
          <el-button type="primary" @click="$router.push('/todolist')">todo</el-button>
          <el-button type="primary" @click="$router.push({path:'/user/101'})">user</el-button>
          <el-button type="primary" @click="$router.push('/nav')">路由导航守卫</el-button>
          <el-button type="primary" @click="$router.push('/vx')">vuex的使用</el-button>
        </div>
        <div>
          <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="show">侧边栏</el-aside>
        <el-main>
          <transition name="app">
            <!-- 路由组件 -->
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
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
      localStorage.removeItem("token");
      this.$router.push("/login");
      this.$toast("success", "已退出登录");
    }
  }
};
</script>
<style lang="less">
#app {
  overflow-x: hidden;
  .main-container {
    flex-direction: column;
  }
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
  }
  .el-aside {
    border-right: 1px solid #ccc;
  }
  .el-main {
    height: 660px;
    overflow-x: hidden;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
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

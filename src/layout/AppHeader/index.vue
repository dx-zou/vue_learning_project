<template>
  <div class="app-header">
    <header class="nx-header">
      <div class="left-menu" @click="changeWidth">切换</div>
      <el-menu class="right-menu">
        <el-submenu index="1">
          <template slot="title">我的账户</template>
          <el-menu-item @click="logout">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </header>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      isCollapse:false
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      this.$router.push("/login");
      this.$toast("success", "已退出登录");
    },
    changeWidth() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
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
    float: right;
    width: 120px;
    height: 50px;
    border: none;
  }
}
</style>
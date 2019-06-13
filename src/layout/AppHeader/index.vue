<template>
  <div class="app-header">
    <header class="nx-header">
      <span class="iconfont iconfengqiehuan1 toggle-icon" @click="toggleSidebar" v-if="!isCollapse"></span>
      <span class="iconfont iconfengqiehuan toggle-icon" @click="toggleSidebar" v-else></span>
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
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "AppHeader",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      this.$router.push("/login");
      this.$toast("success", "已退出登录");
    },
    // 切换侧边栏
    toggleSidebar() {
      this.TOGGLE_SIDEBAR();
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
  .toggle-icon {
    display: inline-block;
    margin-left: 10px;
    font-size: 23px;
    cursor: pointer;
  }
}
</style>
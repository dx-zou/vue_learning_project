<template>
  <header class="app-header">
    <div class="bread-container">
      <span
        class="iconfont icon-qiehuan toggle-icon"
        :class="[isCollapse ? '' : 'is-collapse']"
        @click="toggleSidebar"
      ></span>
      <breadcrumb></breadcrumb>
    </div>
    <el-menu class="right-menu">
      <el-submenu index="1">
        <template slot="title">我的账户</template>
        <el-menu-item @click="logout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
export default {
  name: "AppHeader",
  data() {
    return {};
  },
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),
    logout() {
      sessionStorage.clear();
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
.app-header {
  display: flex;
  height: 0.6rem;
  padding: 0 0.2rem;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .bread-container {
    display: flex;
    align-items: center;
  }
  .right-menu {
    line-height: 0.6rem;
    border: none;
  }
  .toggle-icon {
    margin-right: 0.1rem;
    font-size: 0.2rem;
    cursor: pointer;
  }
  .is-collapse {
    transform: rotate(180deg);
  }
}
</style>

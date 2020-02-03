<template>
  <el-menu
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :default-active="activeIndex"
    :active-text-color="variables.menuActiveText"
    mode="horizontal"
    unique-opened
    @select="handleSelect"
    class="menu-container"
    id="sidebar"
  >
    <el-submenu
      v-for="item in MenuList"
      :item="item"
      :key="item.id"
      ref="subMenu"
      :index="item.index"
    >
      <template slot="title">
        <svg-icon :icon-class="item.svg" />
        <span slot="title">{{ item.title }}</span>
      </template>
      <template v-if="item.children">
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="item.index"
        >
          <router-link :to="{ name: child.title }">
            {{ child.title }}
          </router-link>
        </el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
import MenuList from "./menuData";

export default {
  name: "TopMenu",
  computed: {
    ...mapGetters(["sidebarCollapse", "sideLayout"]),
    variables() {
      return variables;
    },
    MenuList() {
      return MenuList;
    },
    activeIndex() {
      return (
        this.$store.getters.activeIndex ||
        sessionStorage.getItem("activeIndex") ||
        "0"
      );
    }
  },
  methods: {
    // 改变选中的菜单项触发
    handleSelect(key) {
      this.$store.dispatch("app/changeActiveIndex", key);
      sessionStorage.setItem("activeIndex", key);
    }
  }
};
</script>

<style lang="scss" scoped>
  .menu-container {
    margin-left: 20px;
    /deep/ .el-submenu__title {
      padding: 0 15px !important;
    }
    /deep/.svg-icon {
      margin-right: 5px;
    }
    /deep/ .el-icon-arrow-down {
      margin-left: 10px !important;
      margin-top: -1px !important;
    }
  }
</style>
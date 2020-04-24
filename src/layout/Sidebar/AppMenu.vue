<template>
  <el-menu
    :class="!sideLayout && 'menu-container'"
    :mode="sideLayout ? 'vertical' : 'horizontal'"
    :collapse="sideLayout && sidebarCollapse"
    :background-color="menuBgColor"
    :text-color="menuTextColor"
    :active-text-color="variables.menuActiveText"
    :default-active="activeIndex"
    :collapse-transition="false"
    unique-opened
    @select="handleSelect"
    id="sidebar"
  >
    <!-- <sidebar-item v-for="item in MenuList" :item="item" :key="item.id" /> -->
    <template v-for="item in MenuList">
      <el-menu-item v-if="!item.children" :key="item.title" :index="item.index">
        <router-link :to="{ name: item.title }">
          <svg-icon v-if="item.svg" :icon-class="item.svg" />
          <span>
            {{ item.title }}
          </span>
        </router-link>
      </el-menu-item>
      <el-submenu v-else :key="item.title" :index="item.index">
        <template slot="title">
          <svg-icon v-if="item.svg" :icon-class="item.svg" />
          <span slot="title">{{ item.title }}</span>
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.id"
          :item="child"
        />
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
import MenuList from "./menuData";
import SidebarItem from "./SidebarItem";

export default {
  name: "AppMenu",
  computed: {
    ...mapGetters(["sidebarCollapse", "sideLayout", "darkTheme"]),
    variables() {
      return variables;
    },
    MenuList() {
      return MenuList;
    },
    menuBgColor() {
      return this.darkTheme
        ? this.variables.menuBg
        : this.variables.lightMenuBg;
    },
    menuTextColor() {
      return this.darkTheme
        ? this.variables.menuText
        : this.variables.ligthMenuText;
    },
    activeIndex() {
      return (
        this.$store.getters.activeIndex ||
        sessionStorage.getItem("activeIndex") ||
        "0"
      );
    }
  },
  components: {
    SidebarItem
  },
  methods: {
    // 处理菜单栏高亮
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
  /deep/ .svg-icon {
    margin-right: 5px;
  }
  /deep/ .el-icon-arrow-down {
    margin-left: 10px !important;
    margin-top: -1px !important;
  }
}
</style>

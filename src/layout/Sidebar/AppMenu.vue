<template>
  <el-menu
    :class="!sideLayout && 'horizontal-menu-container'"
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
    <template v-for="item in MenuList">
      <el-menu-item v-if="!item.children" :key="item.title" :index="item.index">
        <router-link :to="{ name: item.title }">
          <svg-icon v-if="item.svg" :icon-class="item.svg" />
          <span>{{ item.title }}</span>
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
import tools from "@/utils/arrayTools";

export default {
  name: "AppMenu",
  computed: {
    ...mapGetters(["sidebarCollapse", "sideLayout", "darkTheme", "tabsList"]),
    variables() {
      return variables;
    },
    tabs() {
      return this.tabsList.length
        ? this.tabsList
        : sessionStorage.tabsList
        ? JSON.parse(sessionStorage.tabsList)
        : [];
    },
    // 最多显示页签数量
    maxTabs() {
      return window.innerWidth < 1400 ? 8 : 11;
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
        "dashboard"
      );
    }
  },
  components: {
    SidebarItem
  },
  methods: {
    // 处理菜单栏高亮
    handleSelect(key) {
      this.$store.commit("app/CHANGE_ACTIVEINDEX", key);
      sessionStorage.setItem("activeIndex", key);
      // 更新页签
      if (key === "dashboard") return;
      this.tabs.push({ title: key, index: this.activeIndex });
      const list = tools._uniqueMap(this.tabs, "index");
      this.$store.commit("app/CHANGE_TABS", list);
    }
  }
};
</script>

<style lang="scss">
.horizontal-menu-container {
  margin-left: 20px;
  .el-submenu__title {
    padding: 0 10px !important;
  }
  .svg-icon {
    margin-right: 5px;
  }
  .el-icon-arrow-down {
    margin-left: 10px !important;
  }
}
</style>

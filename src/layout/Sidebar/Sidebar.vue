<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    <sidebar-logo :collapse="sidebarCollapse" v-if="showLogo"></sidebar-logo>
    <el-scrollbar class="side-bar" ref="sidebar">
      <el-menu
        :collapse="sidebarCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :default-active="activeIndex"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        @select="handleSelect"
        class="menu-container"
        id="sidebar"
      >
        <el-menu-item index="1">
          <i class="iconfont icon-home"></i>
          <router-link to="/dashboard" tag="span">dashboard</router-link>
        </el-menu-item>
        <sidebar-item v-for="item in MenuList" :item="item" :key="item.id"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
import SidebarLogo from "./Logo";
import MenuList from "./menuData";
import SidebarItem from "./SidebarItem";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  components: {
    SidebarLogo,
    SidebarItem
  },
  computed: {
    ...mapGetters(["sidebarCollapse", "showLogo"]),
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
        "1"
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

<style lang="scss"></style>

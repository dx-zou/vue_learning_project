<template>
  <el-menu
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :default-active="activeIndex"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"
    mode="horizontal"
    unique-opened
    @select="handleSelect"
    class="menu-container"
    id="sidebar"
  >
    <el-menu-item index="1">
      <i class="iconfont icon-home"></i>
      <router-link to="/dashboard">dashboard</router-link>
    </el-menu-item>
    <sidebar-item
      v-for="item in MenuList"
      :item="item"
      :key="item.id"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.scss";
import MenuList from "./menuData";
import SidebarItem from "./SidebarItem";

export default {
  name: "TopMenu",
  components: {
    SidebarItem
  },
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

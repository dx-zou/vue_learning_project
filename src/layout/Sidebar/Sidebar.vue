<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    <sidebar-logo :collapse="sidebarCollapse" v-if="showLogo"></sidebar-logo>
    <el-scrollbar class="side-bar" ref="sidebar">
      <side-menu />
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarLogo from "./Logo";
import SideMenu from "./SideMenu";

export default {
  name: "SideBar",
  components: {
    SidebarLogo,
    SideMenu
  },
  computed: {
    ...mapGetters(["sidebarCollapse", "showLogo"])
  }
};
</script>

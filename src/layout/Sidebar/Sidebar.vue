<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    <sidebar-logo
      :collapse="sidebarCollapse"
      v-if="showLogo && !fullHeader"
    ></sidebar-logo>
    <el-scrollbar class="side-bar" ref="sidebar">
      <app-menu />
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarLogo from "./Logo";
import AppMenu from "./AppMenu";

export default {
  name: "SideBar",
  components: {
    SidebarLogo,
    AppMenu
  },
  computed: {
    ...mapGetters(["sidebarCollapse", "showLogo", "fullHeader"])
  }
};
</script>

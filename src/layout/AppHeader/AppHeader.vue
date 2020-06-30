<template>
  <header
    :class="[
      'app-header',
      fixedHeader && 'fixed-header',
      darkTheme && 'dark-theme'
    ]"
  >
    <div class="app-header_l">
      <template v-if="sideLayout">
        <sidebar-logo v-if="fullHeader" />
        <hamburger />
      </template>
      <template v-else>
        <sidebar-logo v-if="showLogo" />
        <app-menu />
      </template>
    </div>
    <div>
      <el-input placeholder="搜索..."></el-input>
    </div>
    <div class="app-header_r">
      <!-- <el-badge is-dot id="message">
        <i class="el-icon-message-solid" @click="toggleMsgBox"></i>
      </el-badge> -->
      <user-dropdown />
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import UserDropdown from "@/components/UserDropdown";
import SidebarLogo from "../Sidebar/Logo";
import AppMenu from "../Sidebar/AppMenu";

export default {
  name: "AppHeader",
  data() {
    return {};
  },
  components: {
    Hamburger,
    SidebarLogo,
    AppMenu,
    UserDropdown
  },
  computed: {
    ...mapGetters([
      "sideLayout",
      "showLogo",
      "darkTheme",
      "fixedHeader",
      "fullHeader"
    ])
  },
  methods: {
    // 显示隐藏msgbox
    toggleMsgBox() {
      this.$store.dispatch("app/toggleMsgBox");
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  height: 65px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  transition: width 0.3s ease;
  // box-shadow: 0 1px 5px rgba(0, 21, 41, 0.08);
  // box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  .app-header_l {
    display: flex;
    align-items: center;
  }
  .right-menu {
    line-height: 65px;
    border: none;
  }
  .is-collapse {
    transform: rotate(180deg);
  }
  .app-header_r {
    display: flex;
    align-items: center;
    .el-badge {
      font-size: 20px;
      margin: 0 10px 0 20px;
      color: #333;
      cursor: pointer;
    }
  }
}
.dark-theme {
  background-color: $subMenuBg;
}
</style>

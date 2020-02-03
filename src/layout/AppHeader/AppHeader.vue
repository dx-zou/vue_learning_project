<template>
  <header class="app-header">
    <div class="app-header_l">
      <template v-if="sideLayout">
        <sidebar-logo v-if="showLogo" />
        <top-menu />
      </template>
      <template v-else>
        <hamburger />
        <breadcrumb />
      </template>
    </div>
    <div class="app-header_r">
      <flip-clock />
      <el-badge is-dot id="message">
        <i class="el-icon-message-solid" @click="toggleMsgBox"></i>
      </el-badge>
      <user-dropdown />
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import FlipClock from "@/components/FlipClock";
import UserDropdown from "@/components/UserDropdown";
import SidebarLogo from "../Sidebar/Logo";
import TopMenu from "../Sidebar/TopMenu";

export default {
  name: "AppHeader",
  data() {
    return {
    };
  },
  components: {
    FlipClock,
    Breadcrumb,
    Hamburger,
    SidebarLogo,
    TopMenu,
    UserDropdown
  },
  computed: {
    ...mapGetters([ "sideLayout", "showLogo"])
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
  height: 60px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 0 1px 5px rgba(0, 21, 41, 0.08);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  .app-header_l {
    display: flex;
    align-items: center;
  }
  .right-menu {
    line-height: 60px;
    border: none;
  }
  .toggle-icon {
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
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
.top-menu-layout {
  .app-header {
    background-color: $subMenuBg
  }
}
</style>

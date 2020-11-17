<template>
  <div :class="classObj">
    <div
      v-if="device === 'mobile' && !sidebarCollapse"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <app-header v-if="sideLayout && fullHeader" />

    <side-bar v-if="sideLayout && !fullHeader" />

    <div :class="['main-container', !fixedHeader && 'scroll-header-main']">
      <side-bar v-if="sideLayout && fullHeader" />
      <app-header v-if="!sideLayout || (sideLayout && !fullHeader)" />
      <breadcrumb />
      <div class="app-main">
        <transition name="app">
          <keep-alive v-if="$route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </transition>
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__bounceInDown"
      leave-active-class="animate__animated animate__zoomOutRight"
    >
      <message-box v-if="showMsgBox" />
    </transition>

    <app-settings :show-drawer.sync="showSetting" />
  </div>
</template>

<script>
import AppHeader from "./AppHeader/AppHeader";
import SideBar from "./Sidebar/Sidebar";
import ResizeHandler from "@/mixins/ResizeHandler";
import MessageBox from "@/components/MessageBox";
import AppSettings from "@/components/AppSettings";
import Breadcrumb from "@/components/Breadcrumb";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: {
    AppHeader,
    SideBar,
    MessageBox,
    AppSettings,
    Breadcrumb
  },
  mixins: [ResizeHandler],
  computed: {
    ...mapGetters([
      "sidebarCollapse",
      "device",
      "showMsgBox",
      "fixedHeader",
      "sideLayout",
      "darkTheme",
      "fullHeader",
      "showSetting"
    ]),
    classObj() {
      return {
        "app-wrapper": true,
        hideSidebar: this.sidebarCollapse && this.sideLayout,
        "app-light-theme": !this.darkTheme,
        "top-menu-layout": !this.sideLayout,
        "full-header": this.fullHeader && this.sideLayout,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    // 隐藏siderbar
    handleClickOutside() {
      this.$store.dispatch("settings/closeSideBar");
    }
  }
};
</script>

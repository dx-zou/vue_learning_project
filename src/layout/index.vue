<template>
  <div :class="classObj">
    <div
      v-if="device === 'mobile' && !sidebarCollapse"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <side-bar v-if="sideLayout" />
    <transition
      enter-active-class="animated bounceInDown"
      leave-acti
      ve-class="animated zoomOutRight"
    >
      <message-box v-show="showMsgBox" />
    </transition>
    <div :class="['main-container', !fixedHeader && 'scroll-header-main']">
      <app-header />
      <div class="app-main">
        <transition name="app">
          <keep-alive v-if="$route.meta.keepAlive">
            <router-view />
          </keep-alive>
          <router-view v-else />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./AppHeader/AppHeader";
import SideBar from "./Sidebar/Sidebar";
import ResizeHandler from "@/mixins/ResizeHandler";
import MessageBox from "@/components/MessageBox";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: {
    AppHeader,
    SideBar,
    MessageBox
  },
  mixins: [ResizeHandler],
  computed: {
    ...mapGetters([
      "sidebarCollapse",
      "device",
      "showMsgBox",
      "fixedHeader",
      "sideLayout",
      "darkTheme"
    ]),
    classObj() {
      return {
        "app-wrapper": true,
        hideSidebar: this.sidebarCollapse && this.sideLayout,
        "app-light-theme": !this.darkTheme,
        "top-menu-layout": !this.sideLayout,
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

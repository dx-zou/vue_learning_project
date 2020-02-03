<template>
  <div :class="classObj">
    <div
      v-if="device === 'mobile' && !sidebarCollapse"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <side-bar v-if="!sideLayout"/>
    <transition
      enter-active-class="animated bounceInDown"
      leave-active-class="animated zoomOutRight"
    >
      <message-box v-show="showMsgBox" />
    </transition>
    <div class="main-container">
      <app-header :class="{ 'fixed-header': fixedHeader }" />
      <div class="app-main">
        <transition name="app">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./AppHeader/AppHeader";
import SideBar from "./Sidebar/Sidebar";
import ResizeHandler from "./mixin/ResizeHandler";
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
    ...mapGetters(["sidebarCollapse", "device", "fixedHeader", "showMsgBox", "sideLayout"]),
    classObj() {
      return {
        "app-wrapper": true,
        hideSidebar: this.sidebarCollapse && !this.sideLayout,
        openSidebar: !this.sidebarCollapse,
        "top-menu-layout": this.sideLayout,
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



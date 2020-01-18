<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && !sidebarCollapse"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <side-bar />
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
  name: "layout",
  data() {
    return {};
  },
  components: {
    AppHeader,
    SideBar,
    MessageBox
  },
  mixins: [ResizeHandler],
  computed: {
    ...mapGetters(["sidebarCollapse", "device", "fixedHeader", "showMsgBox"]),
    // // sidebar的折叠状态
    // sidebarCollapse() {
    //   return this.$store.getters.sidebarCollapse;
    // },
    // // 设备值
    // device() {
    //   return this.$store.getters.device;
    // },
    // fixedHeader() {
    //   return this.$store.getters.fixedHeader;
    // },
    classObj() {
      return {
        hideSidebar: this.sidebarCollapse,
        openSidebar: !this.sidebarCollapse,
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

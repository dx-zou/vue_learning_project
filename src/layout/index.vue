<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile' && !sidebarCollapse" class="drawer-bg" @click="handleClickOutside"></div>
    <side-bar></side-bar>
    <div class="main-container">
      <app-header :class="{'fixed-header':fixedHeader}"></app-header>
      <div class="app-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from './AppHeader/AppHeader'
import SideBar from './Sidebar/Sidebar'
import ResizeHandler from './mixin/ResizeHandler'
export default {
  name: 'layout',
  data () {
    return {}
  },
  components: {
    AppHeader,
    SideBar
  },
  mixins: [ResizeHandler],
  computed: {
    sidebarCollapse () {
      return this.$store.getters.sidebarCollapse
    },
    device () {
      return this.$store.state.app.device
    },
    fixedHeader () {
      return this.$store.state.settings.fixedHeader
    },
    classObj () {
      return {
        hideSidebar: this.sidebarCollapse,
        openSidebar: !this.sidebarCollapse,
        // withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('settings/closeSideBar')
    }
  }
}
</script>

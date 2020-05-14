<template>
  <svg-icon
    icon-class="toggle"
    :class="[
      'toggle-icon',
      !sidebarCollapse && 'is-collapse',
      fullHeader && 'margin-left'
    ]"
    @click="toggleSidebar"
    id="toggleSidebar"
  />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Hamburger",
  computed: {
    ...mapGetters(["sidebarCollapse", "fullHeader"])
  },
  methods: {
    // 切换菜单栏
    toggleSidebar() {
      this.$store.dispatch("settings/changeSetting", {
        key: "sidebarCollapse"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle-icon {
  width: 23px;
  height: 23px;
  margin-right: 10px;
  cursor: pointer;
}
.margin-left {
  margin-left: 30px;
}
.is-collapse {
  transform: rotate(180deg);
}
</style>

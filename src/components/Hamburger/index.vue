<template>
  <span
    class="iconfont icon-qiehuan toggle-icon"
    :class="[sidebarCollapse ? '' : 'is-collapse']"
    @click="toggleSidebar"
    id="toggleSidebar"
  ></span>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Hamburger",
  computed: {
    ...mapGetters(["sidebarCollapse"])
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
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.is-collapse {
  transform: rotate(180deg);
}
</style>

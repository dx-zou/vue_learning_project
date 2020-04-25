<template>
  <div class="tab-container">
    <div
      v-for="item in tabsData"
      :key="item.title"
      :class="[
        'tab-item',
        (activeTab === item.index || active === item.index) && 'tab-active'
      ]"
      @mouseenter="handleMouseenter(item.index)"
      @mouseleave="handleMouseleave(item.index)"
      @click.capture="handleTabClick(item.index)"
    >
      <span>{{ item.title }}</span>
      <i
        class="el-icon-close tab-close"
        v-show="
          (activeTab === item.index || active === item.index) &&
            tabsData.length > 1
        "
        @click="handleTabRemove(item.index)"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      active: ""
    };
  },
  computed: {
    ...mapGetters(["tabsList", "activeIndex"]),
    tabsData() {
      return this.tabsList.length
        ? this.tabsList
        : sessionStorage.tabsList
        ? JSON.parse(sessionStorage.tabsList)
        : [];
    },
    activeTab() {
      return this.activeIndex || sessionStorage.activeIndex;
    }
  },
  methods: {
    handleMouseenter(index) {
      this.active = index;
    },
    handleMouseleave() {
      this.active = "";
    },
    handleTabClick(index) {
      if (index === this.activeIndex) return;
      // 更新菜单index
      this.$store.commit("app/CHANGE_ACTIVEINDEX", index);
      sessionStorage.setItem("activeIndex", index);
      this.$router.push({ name: index });
    },
    // 移除页签
    handleTabRemove(targetName) {
      let tabs = this.tabsData;
      let activeName = this.activeIndex;
      tabs.some((tab, index) => {
        if (tab.index === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.index;
          }
          return true;
        }
      });
      // 更新菜单index
      this.$store.commit("app/CHANGE_ACTIVEINDEX", activeName);
      sessionStorage.setItem("activeIndex", activeName);
      // 更新页签
      this.$store.commit(
        "app/CHANGE_TABS",
        tabs.filter(tab => tab.index !== targetName)
      );
      this.$router.push({ name: activeName });
    }
  }
};
</script>

<style lang="scss" scoped>
$border: 1px solid #e4e7ed;
.tab-container {
  display: flex;
  align-items: center;
  border: $border;
  border-bottom: none;
  border-radius: 5px;
  transition: all 0.3s;
  .tab-item {
    height: 40px;
    line-height: 40px;
    border-left: $border;
    border-bottom: $border;
    padding: 0 15px;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1),
      padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:first-child {
      border-left: none;
    }
  }
  .tab-close {
    font-size: 14px;
    margin-left: 10px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      border-radius: 50%;
      color: #fff;
      background-color: #ccc;
    }
  }
  .tab-active {
    color: #409eff;
    border-bottom: none;
    padding: 0 20px;
  }
}
</style>

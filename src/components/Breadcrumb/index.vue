<template>
  <div :class="tabsClass">
    <el-tabs
      v-model="activeTab"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane label="dashboard" name="dashboard"> </el-tab-pane>
      <el-tab-pane
        v-for="item in tabsData"
        :key="item.title"
        :label="item.title"
        :name="item.title"
        closable
      >
      </el-tab-pane>
    </el-tabs>
    <div class="tab-menu">
      <el-dropdown @command="handleMenuClick">
        <el-button type="primary" size="mini">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="other">关闭其它</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    ...mapGetters([
      "tabsList",
      "activeIndex",
      "sidebarCollapse",
      "fullHeader",
      "sideLayout"
    ]),
    tabsData() {
      return this.tabsList.length
        ? this.tabsList
        : sessionStorage.tabsList
        ? JSON.parse(sessionStorage.tabsList)
        : [];
    },
    activeTab: {
      get() {
        return this.activeIndex || sessionStorage.activeIndex;
      },
      set(value) {
        if (value === this.activeIndex) return;
        this.$store.commit("app/CHANGE_ACTIVEINDEX", value);
        sessionStorage.setItem("activeIndex", value);
        this.$router.push({ name: value });
      }
    },
    tabsClass() {
      return {
        "tab-container": true,
        "margin-210": this.fullHeader && this.sideLayout,
        "margin-60": this.fullHeader && this.sideLayout && this.sidebarCollapse
      };
    }
  },
  methods: {
    /**
     * 点击页签this.active
     */
    handleTabClick() {
      // if (this.activeTab === this.activeIndex) return;
      // this.$store.commit("app/CHANGE_ACTIVEINDEX", this.active);
      // sessionStorage.setItem("activeIndex", this.active);
      // this.$router.push({ name: this.active });
    },
    // 移除页签
    handleTabRemove(targetName) {
      const tabs = this.tabsData;
      let activeName = this.activeIndex;
      tabs.some((tab, index) => {
        if (tab.title === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.title;
          }
          return true;
        }
      });
      // 更新页签
      const list = tabs.filter(tab => tab.title !== targetName);
      this.$store.commit("app/CHANGE_TABS", list);
      const name = list.length === 0 ? "dashboard" : activeName;
      // 更新菜单index
      this.$store.commit("app/CHANGE_ACTIVEINDEX", name);
      sessionStorage.setItem("activeIndex", name);
      this.$router.push({ name });
    },
    handleMenuClick(command) {
      if (command === "all") {
        this.closeAll();
      } else if (command === "other") {
        this.closeOther();
      }
    },
    closeAll() {
      // 更新菜单index
      this.$store.commit("app/CHANGE_ACTIVEINDEX", "dashboard");
      sessionStorage.setItem("activeIndex", "dashboard");
      // 更新页签
      this.$store.commit("app/CHANGE_TABS", []);
      if (this.$route.name === "dashboard") return;
      this.$router.push({ name: "dashboard" });
    },
    closeOther() {
      const list = this.tabsData.filter(item => item.title === this.activeTab);
      this.$store.commit("app/CHANGE_TABS", list);
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0px -1px 5px rgba(0, 0, 0, 0.1);
  transition: margin 0.3s;
  .el-tabs {
    width: 90%;
    ::v-deep .el-tabs__header {
      margin-bottom: 0 !important;
    }
    ::v-deep .el-tabs__nav-prev,
    .el-tabs__nav-next {
      font-size: 15px !important;
      color: $--color-primary !important;
    }
  }
}
.margin-210 {
  margin-left: 210px;
}
.margin-60 {
  margin-left: 60px;
}
::v-deep .el-tabs__item {
  color: #ccc;
}
</style>

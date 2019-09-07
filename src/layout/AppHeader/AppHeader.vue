<template>
  <header class="app-header">
    <div class="bread-container">
      <span
        class="iconfont icon-qiehuan toggle-icon"
        :class="[sidebarCollapse ? '' : 'is-collapse']"
        @click="toggleSidebar"
        id="toggleSidebar"
      ></span>
      <breadcrumb></breadcrumb>
    </div>
    <div class="header_r">
      <el-badge is-dot id="message">
        <i class="el-icon-message-solid"></i>
      </el-badge>
      <el-dropdown
        id="userCenter"
        :hide-on-click="false"
        placement="bottom-start"
        @command="handleCommand"
      >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-custom" command="user">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-tools" command="set">项目配置</el-dropdown-item>
          <el-dropdown-item icon="el-icon-eleme" divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        <div class="el-dropdown-link">
          <img src="../../assets/images/avatar.gif" alt="头像" class="avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
      </el-dropdown>
    </div>
    <common-dialog :show-dialog.sync="showDialog" title="项目配置" @handleConfirm="saveSettings">
      <el-form label-width="100px" :model="settingForm" ref="settingForm">
        <el-form-item label="显示Logo">
          <el-radio-group v-model="settingForm.showLogo">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="旋转Logo">
          <el-radio-group v-model="settingForm.rotateLogo">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </common-dialog>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
export default {
  name: "AppHeader",
  data() {
    return {
      showDialog: false,
      settingForm: {
        showLogo: this.showLogo ? 0 : 1,
        rotateLogo: this.rotateLogo ? 0 : 1
      }
    };
  },
  components: {
    Breadcrumb
  },
  computed: {
    ...mapGetters(["sidebarCollapse", "showLogo", "rotateLogo"])
  },
  created() {
    console.log(this.showLogo);
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
      this.$toast("success", "已退出登录");
    },
    // 切换侧边栏
    toggleSidebar() {
      this.$store.dispatch("settings/changeSetting", {
        key: "sidebarCollapse"
      });
    },
    // 点击下拉菜单项的回调
    handleCommand(command) {
      if (command === "set") {
        this.showDialog = true;
      } else if (command === "logout") {
        this.logout();
      }
    },
    // 保存用户设置
    saveSettings() {
      this.showDialog = false;
      this.$store.dispatch("settings/changeSetting", {
        key: "showLogo"
      });
      this.$toast("success", "修改成功");
    }
  }
};
</script>

<style lang="less" scoped>
.app-header {
  display: flex;
  height: 0.5rem;
  padding: 0 0.2rem;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 0 1px 5px rgba(0, 21, 41, 0.08);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  .bread-container {
    display: flex;
    align-items: center;
  }
  .right-menu {
    line-height: 0.5rem;
    border: none;
  }
  .toggle-icon {
    margin-right: 0.1rem;
    font-size: 0.2rem;
    cursor: pointer;
  }
  .is-collapse {
    transform: rotate(180deg);
  }
  .header_r {
    .el-badge {
      font-size: 0.2rem;
      margin-right: 0.1rem;
      color: #333;
      cursor: pointer;
    }
  }
  .el-dropdown-link {
    .avatar {
      height: 0.5rem;
      border-radius: 0.1rem;
      vertical-align: middle;
      cursor: pointer;
    }
    i {
      vertical-align: bottom;
      margin-bottom: 0.1rem;
    }
  }
}
</style>

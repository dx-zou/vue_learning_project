<template>
  <el-dropdown
    id="userCenter"
    :hide-on-click="false"
    placement="bottom-start"
    @command="handleCommand"
  >
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in dropdownList"
        :key="item.name"
        :icon="item.icon"
        :divided="item.divided"
        :command="item.command"
        >{{ item.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
    <div class="el-dropdown-link">
      <img src="../../assets/images/avatar.gif" alt="头像" class="avatar" />
      <i class="el-icon-caret-bottom"></i>
    </div>
    <app-settings :show-drawer.sync="showDrawer" />
  </el-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
import AppSettings from "@/components/AppSettings";
import driver from "@/mixins/startDriver";

export default {
  name: "AppHeader",
  data() {
    return {
      showDrawer: false,
      dropdownList: [
        {
          icon: "el-icon-s-custom",
          command: "user",
          name: "个人中心"
        },
        {
          icon: "el-icon-s-tools",
          command: "set",
          name: "系统设置"
        },
        {
          icon: "el-icon-chat-round",
          command: "local",
          name: "中文"
        },
        {
          icon: "el-icon-thumb",
          command: "driver",
          name: "功能引导"
        },
        {
          icon: "el-icon-switch-button",
          command: "logout",
          divided: true,
          name: "退出登录"
        }
      ]
    };
  },
  components: {
    AppSettings
  },
  computed: {
    ...mapGetters(["locale", "sideLayout", "showLogo"]),
    lang() {
      return this.locale === "en-US" ? "中文" : "English";
    }
  },
  mixins: [driver],
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
      this.$toast("success", "已退出登录");
    },

    // 点击下拉菜单项的回调
    handleCommand(command) {
      switch (command) {
        case "set":
          this.showDrawer = true;
          break;
        case "logout":
          this.logout();
          break;
        case "locale":
          this.$store.dispatch("settings/changeLocale");
          break;
        case "driver":
          this.guide();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  .avatar {
    height: 60px;
    border-radius: 10px;
    vertical-align: middle;
    cursor: pointer;
  }
  i {
    vertical-align: bottom;
    margin-bottom: 10px;
  }
}
</style>

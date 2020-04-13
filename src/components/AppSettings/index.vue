<template>
  <el-drawer
    title="系统设置"
    direction="rtl"
    size="18%"
    :visible.sync="showDrawer"
    :before-close="handleClose"
    @closeDrawe="handleClose"
  >
    <el-form label-width="100px" ref="settingForm" label-position="top">
      <el-form-item label="系统主题风格">
        <el-radio-group
          :value="darkTheme"
          @change="handleSettingChange($event, 'darkTheme')"
        >
          <el-radio :label="true">
            <el-tooltip content="暗黑风格" placement="top">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"
              />
            </el-tooltip>
          </el-radio>
          <el-radio :label="false">
            <el-tooltip content="明亮风格" placement="top">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg"
              />
            </el-tooltip>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="导航布局模式">
        <el-radio-group
          :value="sideLayout"
          @change="handleSettingChange($event, 'sideLayout')"
        >
          <el-radio :label="true">
            <el-tooltip content="侧边布局" placement="top">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"
              />
            </el-tooltip>
          </el-radio>
          <el-radio :label="false">
            <el-tooltip content="顶部布局" placement="top">
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg"
              />
            </el-tooltip>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-form label-width="130px" label-position="left">
      <el-form-item label="显示Logo">
        <el-switch
          :value="showLogo"
          active-color="#ff8c00"
          inactive-color="#dcdfe6"
          @change="handleSettingChange($event, 'showLogo')"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="固定顶部">
        <el-switch
          :value="fixedHeader"
          active-color="#ff8c00"
          inactive-color="#dcdfe6"
          @change="handleSettingChange($event, 'fixedHeader')"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="顶部通栏">
        <el-switch
          :value="fullHeader"
          active-color="#ff8c00"
          inactive-color="#dcdfe6"
          @change="handleSettingChange($event, 'fullHeader')"
        >
        </el-switch>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "sideLayout",
      "showLogo",
      "darkTheme",
      "fixedHeader",
      "fullHeader"
    ])
  },
  methods: {
    handleClose() {
      this.$store.dispatch("settings/changeSetting", {
        key: "showSetting"
      });
    },
    // 改变设置
    handleSettingChange(value, key) {
      this.$store.dispatch("settings/changeSetting", { key });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 20px;
}
</style>

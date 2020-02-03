<template> 
  <el-drawer
    title="系统设置"
    direction="rtl"
    size="21%"
    :visible.sync="showDrawer"
    :before-close="handleClose"
    @closeDrawe="handleClose"
    >
     <el-form label-width="100px"  ref="settingForm" label-position="top">
        <el-form-item label="菜单布局模式">
          <el-radio-group :value="sideLayout" @change="handleChange($event, 'sideLayout')">
            <el-radio :label="false">
              <img src="https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg"/>
            </el-radio>
            <el-radio :label="true">
              <img src="https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg"/>
            </el-radio>
          </el-radio-group>                                   
        </el-form-item>
        <el-form-item label="显示Logo">
          <el-switch
            :value="showLogo"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChange($event, 'showLogo')"
            >
          </el-switch>
        </el-form-item>
      </el-form>
  </el-drawer>
</template>

<script>
import { mapGetters } from "vuex"
  export default {
    props: {
      showDrawer: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(["sideLayout", "showLogo"])
    },
    methods: {
      handleClose() {
        this.$emit("update:showDrawer", false)
      },
      // 保存用户设置
      saveSettings() {
        this.showDialog = false;
        this.$store.dispatch("settings/changeSetting", {
          key: "showLogo"
        });
        this.$toast("success", "修改成功");
      },
      // 改变设置
      handleChange(value, key) {
        this.$store.dispatch("settings/changeSetting", {key})
      }
    },
  }
</script>

<style lang="scss" scoped>
  .el-form {
    padding: 0 20px;
  }
</style>
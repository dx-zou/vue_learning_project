<template>
  <div class="app-sidebar">
    <el-scrollbar class="side-bar" ref="sidebar">
      <el-menu
        :collapse="isCollapse"
        background-color="#293c55"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="my-menu"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="iconfont iconfengshouye1"></i>
            <span slot="title">导航</span>
          </template>
          <el-menu-item index="1-1">
            <span @click="$router.push('/home')">首页</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont iconfengvuejs"></i>
            <span slot="title">VUE</span>
          </template>
          <el-menu-item index="2-1">
            <span @click="$router.push('/vue/route-nav')">路由导航守卫</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span @click="$router.push('/vue/vuex')">vuex</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span @click="$router.push('/vue/slot')">slot</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <span @click="$router.push('/vue/watch-computed')">watch/computed</span>
          </el-menu-item>
          <el-menu-item index="2-5">
            <span @click="$router.push('/vue/transition')">transition</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont iconfengchangyong"></i>
            <span slot="title">常用</span>
          </template>
          <el-menu-item index="3-1">
            <span @click="$router.push('/normal-use/cart')">小球动画</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont iconfengzujian"></i>
            <span slot="title">组件</span>
          </template>
          <el-menu-item index="4-1">
            <span @click="$router.push('/my-components/date-select')">日期选择</span>
          </el-menu-item>
          <el-menu-item index="4-2">
            <span @click="$router.push('/my-components/my-table')">表格组件</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="iconfont iconfengdisanfang"></i>
            <span slot="title">第三方</span>
          </template>
          <el-menu-item index="5-1">
            <span @click="$router.push({path:'/third-party/user/101'})">easy-mock</span>
          </el-menu-item>
          <el-menu-item index="5-2">
            <span @click="$router.push({path:'/third-party/editor'})">富文本编辑器</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  methods: {}
};
</script>

<style lang="less" >
.side-bar {
  position: fixed;
  height: 100%;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 999;
  transition: width 0.3s ease;
  border-right: 1px solid #ccc;
  .el-scrollbar__view {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
  .iconfont {
    margin-right: 10px;
    font-size: 18px;
  }
}
.my-menu:not(.el-menu--collapse) {
  width: 180px;
}
.el-menu--collapse {
  width: 60px;
}
</style>

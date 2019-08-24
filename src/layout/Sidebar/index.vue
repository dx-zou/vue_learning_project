<template>
  <div class="sidebar-container">
    <el-scrollbar class="side-bar" ref="sidebar">
      <sidebar-logo :collapse="isCollapse"></sidebar-logo>
      <el-menu
        :collapse="isCollapse"
        default-active="1"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        class="menu-container"
      >
        <el-menu-item index="1">
          <i class="iconfont icon-shouye1"></i>
          <router-link to="/dashboard" tag="span">dashboard</router-link>
          <!-- <span @click="$router.push('/dashboard')">首页</span> -->
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-vuejs"></i>
            <span slot="title">VUE</span>
          </template>
          <el-submenu index="2-1">
            <template slot="title">
              <i class="iconfont icon-vuejs"></i>
              <span slot="title">VUE</span>
            </template>
            <el-menu-item index="2-1-1">
              <span @click="$router.push('/vue/route-nav')">路由导航守卫</span>
            </el-menu-item>
          </el-submenu>
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
            <i class="iconfont icon-changyong"></i>
            <span slot="title">常用</span>
          </template>
          <el-menu-item index="3-1">
            <span @click="$router.push('/normal-use/cart')">小球动画</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <span @click="$router.push('/normal-use/css-world')">css特效</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont icon-zujian"></i>
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
            <i class="iconfont icon-disanfang"></i>
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
import variables from "@/styles/variables.scss";
import SidebarLogo from "./Logo";
export default {
  name: "SideBar",
  data() {
    return {};
  },
  components: {
    SidebarLogo
  },
  computed: {
    ...mapGetters(["isCollapse"]),
    variables() {
      return variables;
    }
  },
  methods: {}
};
</script>

<style lang="less" >
</style>

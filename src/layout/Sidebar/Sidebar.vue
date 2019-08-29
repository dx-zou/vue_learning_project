<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    <sidebar-logo :collapse="sidebarCollapse" v-if="showLogo"></sidebar-logo>
    <el-scrollbar class="side-bar" ref="sidebar">
      <el-menu
        :collapse="sidebarCollapse"
        default-active="1"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        class="menu-container"
      >
        <sidebar-item v-for="item in MenuList " :item="item" :key="item.id"></sidebar-item>
        <!-- <el-menu-item index="1">
          <i class="iconfont icon-shouye1"></i>
          <router-link to="/dashboard" tag="span">dashboard</router-link>
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
          <el-menu-item index="2-3">
            <span @click="$router.push('/vue/slot')">slot</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <span @click="$router.push('/vue/watch-computed')">watch/computed</span>
          </el-menu-item>
          <el-menu-item index="2-5">
            <span @click="$router.push('/vue/transition')">transition</span>
          </el-menu-item>
        </el-submenu>-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarLogo from './Logo'
import MenuList from './menuData'
import SidebarItem from './SidebarItem'
export default {
  name: 'SideBar',
  data () {
    return {}
  },
  components: {
    SidebarLogo,
    SidebarItem
  },
  computed: {
    ...mapGetters(['sidebarCollapse', 'showLogo']),
    variables () {
      return variables
    },
    MenuList () {
      return MenuList
    }
  },
  methods: {}
}
</script>

<style lang="less"></style>

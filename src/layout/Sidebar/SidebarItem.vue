<template>
  <el-menu-item v-if="!item.children" :index="item.index">
    <!-- <i :class="['iconfont', item.icon]"></i> -->
    <router-link :to="{ name: item.title }">
      {{ item.title }}
    </router-link>
  </el-menu-item>
  <el-submenu v-else ref="subMenu" :index="item.index">
    <template slot="title">
      <svg-icon v-if="item.svg" :icon-class="item.svg" />
      <span slot="title">{{ item.title }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.id"
      :item="child"
    />
  </el-submenu>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

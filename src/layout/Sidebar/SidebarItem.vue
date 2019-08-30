<template>
  <div>
    <el-menu-item v-if="!item.children" :index="item.index">
      <i :class="['iconfont', item.icon]"></i>
      <router-link :to="{name: item.title}" tag="span">{{item.title}}</router-link>
    </el-menu-item>

    <el-submenu v-else ref="subMenu" :index="item.index">
      <template slot="title">
        <i :class="['iconfont', item.icon]"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <sidebar-item v-for="child in item.children" :key="child.id" :item="child" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>

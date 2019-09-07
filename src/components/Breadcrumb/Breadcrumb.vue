<template>
  <el-breadcrumb class="app-breadcrumb" separator="/" id="breadCrumbs">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item key="dashboard">
        <a class="iconfont icon-home" @click.prevent="handleHomeClick"></a>
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="item">
        <span v-if="index === breadList.length- 1" class="no-redirect">{{ item }}</span>
        <a v-else @click.prevent="handleLink(item,index)">{{ item }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      // breadList: null
    };
  },
  computed: {
    breadList() {
      return this.$route.meta.breadcrumbs;
    }
  },
  methods: {
    handleLink(item, index) {
      if (index === 0) {
        this.$router.push({ name: this.breadList[1] });
        return;
      }
      this.$router.push({ name: item });
    },
    // 点击首页面包屑
    handleHomeClick() {
      this.$store.dispatch("app/changeActiveIndex", "1");
      sessionStorage.setItem("activeIndex", "1");
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 0.14rem;
  line-height: 0.5rem;
  margin-left: 0.08rem;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

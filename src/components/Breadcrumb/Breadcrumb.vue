<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/dashboard' }" key="dashboard">dashboard</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in breadList" :key="item">
        <span v-if="index === breadList.length- 1" class="no-redirect">{{ item }}</span>
        <a v-else @click.prevent="handleLink(item,index)">{{ item }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {
      // breadList: null
    }
  },
  computed: {
    breadList () {
      return this.$route.meta.breadcrumbs
    }
  },
  methods: {
    handleLink (item, index) {
      if (index === 0) {
        this.$router.push({ name: this.breadList[1] })
        return
      }
      this.$router.push({ name: item })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

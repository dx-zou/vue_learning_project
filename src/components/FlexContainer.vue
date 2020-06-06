<template functional>
  <div class="c-flex-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.c-flex-container {
  min-height: 100%;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  ::v-deep .el-card {
    max-width: 350px;
    max-height: 300px;
    margin-right: 15px;
  }
}
</style>

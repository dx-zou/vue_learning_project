<template functional>
  <el-card>
    <h2 slot="header">三角形</h2>
    <div class="triangle"></div>
    <div class="triangle1"></div>
    <div class="triangle2"></div>
    <div class="triangle3"></div>
    <div class="triangle4"></div>
  </el-card>
</template>

<style lang="scss" scoped>
$color: #00adb5;
@mixin box {
  display: inline-block;
  width: 0;
  height: 0;
  margin-right: 15px;
  border-style: solid;
}
.triangle {
  @include box;
  border-width: 0 50px 86.6px 50px;
  border-color: transparent transparent $color transparent;
}
.triangle1 {
  @include box;
  border-width: 86.6px 50px 0 50px;
  border-color: $color transparent transparent transparent;
}
.triangle2 {
  @include box;
  border-width: 50px 86.6px 50px 0;
  border-color: transparent $color transparent transparent;
}
.triangle3 {
  @include box;
  border-width: 50px 0 50px 86.6px;
  border-color: transparent transparent transparent $color;
}
.triangle4 {
  @include box;
  border-width: 0 50px 50px 0;
  border-color: transparent $color transparent transparent;
}
</style>

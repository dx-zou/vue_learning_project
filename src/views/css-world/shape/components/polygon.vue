<template functional>
  <el-card>
    <h2 slot="header">多边形</h2>
    <div class="six"></div>
  </el-card>
</template>

<style lang="scss" scoped>
$color: #00adb5;

.six {
  position: relative;
  width: 200px;
  height: 230px;
  margin-left: 30px;
  transform: rotate(-30deg) skewY(30deg) translateZ(-1px);
  overflow: hidden;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: $color;
    transform: skewY(-30deg) rotate(60deg);
  }
}
</style>

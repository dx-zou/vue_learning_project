<template functional>
  <el-card>
    <h2 slot="header">Loading</h2>
    <div class="loading">
      <div class="boxLoading boxLoading1"></div>
      <div class="boxLoading boxLoading2"></div>
      <div class="boxLoading boxLoading3"></div>
      <div class="boxLoading boxLoading4"></div>
      <div class="boxLoading boxLoading5"></div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.loading {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .boxLoading {
    background-color: #00adb5;
    height: 100%;
    width: 6px;
    margin-right: 5px;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
  .boxLoading2 {
    animation-delay: -1.1s;
  }
  .boxLoading3 {
    animation-delay: -1s;
  }
  .boxLoading4 {
    animation-delay: -0.9s;
  }
  .boxLoading5 {
    animation-delay: -0.8s;
  }
  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
}
</style>

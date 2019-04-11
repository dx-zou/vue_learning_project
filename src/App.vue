<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-button type="primary" @click="$router.push('/home')">首页</el-button>
        <el-button type="primary" @click="$router.push('/cart')">小球动画</el-button>
        <el-button type="primary" @click="$router.push('/todolist')">todo</el-button>
        <el-button type="primary" @click="$router.push({path:'/user/101'})">user</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-container>
          <el-main>
            <transition name="app">
              <!-- 路由组件 -->
              <router-view/>
            </transition>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
#app {
  overflow-x: hidden;
  .el-header {
    border-bottom: 1px solid #ccc;
    line-height: 60px;
  }
  .el-aside {
    border-right: 1px solid #ccc;
  }
  .el-footer {
    border-top: 1px solid #ccc;
  }
  .el-main {
    height: 660px;
    overflow-x: hidden;
  }
  .app-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .app-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .app-enter-active,
  .app-leave-active {
    transition: all .5s;
  }
}
</style>

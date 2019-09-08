<template>
  <div class="cart-container">
    <div>
      <el-input-number v-model="num" :step="1"></el-input-number>
      <el-button type="primary" @click="toCart">加入购物车</el-button>
      <transition @enter="enter" @before-enter="beforeEnter" @after-enter="afterEnter">
        <div class="ball" ref="ball" v-show="show"></div>
      </transition>
    </div>
    <div class="cart-wrap">
      <div class="num" ref="count">{{num}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 1,
      show: false
    }
  },
  methods: {
    beforeEnter (el) {
      // 设置小球的初始位置始终位于自身的原点
      el.style.transform = 'translate(0,0)'
    },
    enter (el, done) {
      // el.offsetWidth
      // 分别获取小球元素及商品数量元素相对视口的距离
      var ballPosition = this.$refs.ball.getBoundingClientRect()
      var countPosition = this.$refs.count.getBoundingClientRect()
      var x = countPosition.left - ballPosition.left
      var y = countPosition.top - ballPosition.top
      el.style.transform = `translate(${x}px,${y}px)`
      el.style.transition = `all .4s cubic-bezier(.8,-0.4,1,.89)`
      done()
    },
    afterEnter (el) {
      // 动画结束就隐藏小球
      this.show = !this.show
    },
    toCart () {
      this.num++
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss">
.cart-container {
  position: relative;
  .ball {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    top: 10px;
    left: 83px;
    z-index: 99;
  }
  .cart-wrap {
    margin-top: 200px;
    .num {
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      text-align: center;
      background-color: #ccc;
    }
  }
}
</style>

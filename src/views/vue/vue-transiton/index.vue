<template>
  <div class="transition-container">
    <div style="display:flex">
      <el-button type="primary" @click="show = !show">toggle</el-button>
      <el-button @click="addItem">addItem</el-button>
      <el-button type="danger" @click="shuffleItem">shuffle</el-button>
      <div class="ball-wrapper">
        <el-input-number v-model="num" :step="1" />
        <el-button type="primary" @click="toCart">加入购物车</el-button>
        <transition
          @enter="enter"
          @before-enter="beforeEnter"
          @after-enter="afterEnter"
        >
          <div class="ball" ref="ball" v-show="showball"></div>
        </transition>
      </div>
    </div>
    <div class="box-wrapper">
      <fade-transition name="filter" group :duration="300">
        <div
          class="box"
          v-for="(item, index) in list"
          @click="remove(index)"
          :key="item"
        >
          {{ item }}
        </div>
      </fade-transition>
    </div>
    <div class="cart-wrap">
      <div class="num" ref="count">{{ num }}</div>
    </div>
    <transition name="filter">
      <div key="filter" v-show="show" class="filter">
        <div>transiton go</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { shuffle } from "lodash";
export default {
  data() {
    return {
      show: false,
      num: 1,
      showball: false,
      list: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    remove(index) {
      this.list.splice(index, 1);
    },
    addItem() {
      let randomIndex = Math.floor(Math.random() * this.list.length);
      this.list.splice(randomIndex, 0, Math.random());
    },
    shuffleItem() {
      this.list = shuffle(this.list);
    },
    beforeEnter(el) {
      // 设置小球的初始位置始终位于自身的原点
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      // el.offsetWidth
      // 分别获取小球元素及商品数量元素相对视口的距离
      var ballPosition = this.$refs.ball.getBoundingClientRect();
      var countPosition = this.$refs.count.getBoundingClientRect();
      var x = countPosition.left - ballPosition.left;
      var y = countPosition.top - ballPosition.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = `all .3s cubic-bezier(.16,.64,.89,.81)`;
      // el.style.transition = `all 3s cubic-bezier(.8,-0.4,1,.89)`;
      done();
    },
    afterEnter() {
      // 动画结束就隐藏小球
      this.showball = !this.showball;
    },
    toCart() {
      this.num++;
      this.showball = !this.showball;
    }
  }
};
</script>

<style lang="scss" scoped>
.transition-container {
  position: relative;
  height: 100%;
  padding: 10px;
  background: #fff;
  .box-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
  }
  .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    line-height: 100px;
    margin: 10px 10px 0 0;
    background-color: rgb(108, 141, 213);
    box-shadow: rgba(108, 141, 213, 0.5) 0px 6px 20px;
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    color: #fff;
  }

  .filter {
    position: absolute;
    width: 200px;
    height: 400px;
    right: 0;
    top: 0;
    background: $--color-warning;
    border: 1px solid #ccc;
  }

  .filter-enter,
  .filter-leave-to {
    opacity: 0;
    transform: translateX(230px);
  }

  .filter-enter-active,
  .filter-leave-active {
    transition: all 0.3s ease;
  }
  .ball-wrapper {
    position: relative;
  }
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

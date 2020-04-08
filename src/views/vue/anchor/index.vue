<template>
  <div class="anchor-container">
    <ul class="navs">
      <li
        v-for="item in 5"
        :key="item"
        :class="{ active: active === item - 1 }"
        @click="scrollTo(item - 1)"
      >
        {{ "content-" + (item - 1) }}
      </li>
    </ul>
    <div class="content" ref="content">
      <div class="content-item" v-for="item in 5" :key="item">
        {{ "content-" + (item - 1) }}
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {},
  data() {
    return {
      active: 0 // 当前激活的导航索引
    };
  },
  mounted() {
    const main = document.querySelector(".app-main");
    // 监听滚动事件
    main.addEventListener("scroll", _.throttle(this.onScroll, 200), false);
  },
  beforeDestory() {
    const main = document.querySelector(".app-main");
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    main.removeEventListener("scroll", _.throttle(this.onScroll, 200));
  },
  methods: {
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(".content-item");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop);
      });
      const main = document.querySelector(".app-main");
      // 获取当前文档流的 scrollTop
      const scrollTop = main.scrollTop;
      // 定义当前点亮的导航下标
      let navIndex = 0;
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop > offsetTopArr[n] - 100) {
          navIndex = n;
        }
      }
      this.active = navIndex;
    },
    // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop = document.querySelector(
        `.content-item:nth-child(${index + 1})`
      ).offsetTop;
      const main = document.querySelector(".app-main");
      // 获取当前 offsetTop
      let scrollTop = main.scrollTop;
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50;
      // 判断是往下滑还是往上滑
      scrollTop > targetOffsetTop ? smoothUp() : smoothDown();
      // 定义往下滑函数
      function smoothDown() {
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          main.scrollTop = scrollTop - 50;
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          main.scrollTop = scrollTop - 50;
          requestAnimationFrame(smoothUp);
        }
      }
    }
  }
};
</script>

<style scoped>
.anchor-container {
  display: flex;
}
/* 内容区的样式 */
.content {
  background-color: white;
  width: 600px;
  margin-left: 200px;
}
.content div {
  width: 100%;
  height: 500px;
  font-size: 36px;
  padding: 20px;
  background-color: #fd9495;
}
.content div:nth-child(2n) {
  background-color: #ff8c00;
}
/* 导航栏的样式 */
.navs {
  position: fixed;
  background-color: #efefef;
}
.navs li {
  padding: 0 20px;
  line-height: 1.6;
  font-size: 24px;
}
/* 当导航被点亮后改变颜色 */
.navs .active {
  color: #847ec3;
  background-color: #e2e2e2;
}
</style>

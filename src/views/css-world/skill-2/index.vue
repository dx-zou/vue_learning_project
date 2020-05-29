<template>
  <div class="skill-container">
    <div class="top">
      <div class="top-left">
        <h2>计数器</h2>
        <section>
          <div></div>
          <div></div>
        </section>
        <section>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </div>
      <div class="top-center">
        <h2>文本缩进</h2>
        <p>块级：text-indent: 30px</p>
        <span>内联：margin-left: 30px</span>
      </div>
      <div class="top-right">
        <h2>:focus-within选择器</h2>
        <div class="focus">
          <input type="text" />
          <button>按钮</button>
        </div>
      </div>
      <div class="top-last">
        <h2>target选择器</h2>
        <a href="#1">1</a>
        <a href="#2">2</a>
        <a href="#3">3</a>
        <div class="box">
          <div id="1">1</div>
          <div id="2">2</div>
          <div id="3">3</div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="c-left">
        <img src="@/assets/images/gf.jpg" alt="" />
        <div class="img-box"></div>
      </div>
      <div class="c-center">
        <div class="google"></div>
      </div>
      <div class="c-right">
        <div
          v-for="item in elementList"
          :key="item.ref"
          class="box"
          @mouseenter="handleMouseEnter($event, item.ref)"
          @mouseleave="handleMouseLeave($event, item.ref)"
        >
          <div :ref="item.ref" :class="['content', trans && 'trans']">
            鼠标移入方向
          </div>
        </div>
        <div class="six"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="one-line">
        单行文本截断文本截断文本截断文本截断文本
        截断文本截断文本截断文本截断文本截断
      </div>
      <div class="mutiple-line">
        多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文
        本截断多行文本截断多行文本截断多行文本截断多行文本截断多行
        文本截断多行文本截断多行文本截断多行文本截断
      </div>
    </div>
  </div>
</template>
<script>
import { getMouseDirection } from "@/utils/tools";
export default {
  data() {
    return {
      trans: false,
      moveStyle: {},
      elementList: [
        {
          ref: "ref1"
        },
        {
          ref: "ref2"
        },
        {
          ref: "ref3"
        },
        {
          ref: "ref4"
        }
      ],
      dir: {
        left: {
          top: "0",
          left: "-100%"
        },
        right: {
          top: "0",
          left: "100%"
        },
        bottom: {
          top: "100%",
          left: "0"
        },
        top: {
          top: "-100%",
          left: "0"
        }
      }
    };
  },
  methods: {
    handleMouseEnter(e, ref) {
      this.trans = false;
      const index = getMouseDirection(e);
      const style = this.$refs[ref][0].style;
      const { left, top } = this.dir[index];
      style.left = left;
      style.top = top;
      const timer = setTimeout(() => {
        this.trans = true;
        clearTimeout(timer);
        style.left = "0";
        style.top = "0";
      }, 0);
    },
    handleMouseLeave(e, ref) {
      const index = getMouseDirection(e);
      const style = this.$refs[ref][0].style;
      const { left, top } = this.dir[index];
      style.left = left;
      style.top = top;
    }
  }
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.skill-container {
  @extend .flex;
  flex-direction: column;
  counter-reset: row;

  .top {
    @extend .flex;

    .top-left {
      section {
        margin: 3px;
        line-height: 50px;
        overflow: hidden;
        text-align: center;
        font-size: 20px;
        color: #ff0909;
        background: #415481;
        /*counter-reset: box;*/
        counter-increment: row;

        &:before {
          content: "row:" counter(row);
          float: left;
        }

        div {
          width: 50px;
          height: 50px;
          margin: 3px;
          background: aqua;
          float: left;
          counter-increment: box;

          &:before {
            content: counter(row) "." counter(box);
          }
        }
      }
    }

    .top-center {
      background-color: #ccc;

      p {
        text-indent: 30px;
      }

      span {
        margin-left: 30px;
      }
    }

    .top-right {
      .focus {
        &:focus-within {
          transform: scale(1.5);

          button {
            transition: 2s cubic-bezier(0.2, 1.5, 1.5, 1.5);
          }
        }
      }
    }

    .top-last {
      flex: 1;

      a {
        margin-left: 10px;
        font-size: 20px;

        &:hover {
          color: #22aaff;
        }
      }

      .box {
        @extend .flex;

        div {
          width: 100px;
          height: 100px;
          background-color: #f56c6c;
          transition: all 1s;

          &:target {
            flex: 1;
            background-color: #2d98da;
          }
        }
      }
    }
  }

  .center {
    margin-top: 30px;
    @extend .flex;

    .c-left {
      transform-style: preserve-3d;
      position: relative;
      width: 300px;
      height: 200px;
      perspective: 1000px;
      perspective-origin: 0 0;
      background-color: pink;
      overflow: hidden;

      .img-box {
        width: 200px;
        height: 200px;
        /*position: absolute;*/
        border-radius: 50%;
        color: #f56c6c;
        box-shadow: 0 0 0 800px, 0 0 0 5px palevioletred inset;
        animation: rotate 4s infinite alternate;
        transform: rotate3D(0, 1, 0.1, -30deg);
      }

      @keyframes rotate {
        to {
          transform: rotate3D(0, 1, 0.1, 30deg);
        }
      }

      img {
        width: 300px;
        position: absolute;
        animation: move 6s infinite;
        transform: translateZ(-500px);
      }

      @keyframes move {
        40% {
          transform: translateZ(-180px);
        }
      }
    }

    .c-center {
      div {
        width: 200px;
        height: 200px;
        background: radial-gradient(
            #419af6 26%,
            white 0,
            white 30%,
            transparent 0
          ),
          linear-gradient(120deg, #5dd52f 50%, transparent 0) 0 100% / 115% 44%,
          linear-gradient(60deg, #5dd533 50%, transparent 0) 0 0/ 35% 70%,
          linear-gradient(120deg, #ff0000 50%, transparent 0) 0 0 / 50% 197%,
          linear-gradient(red, red) 0 0 / 100% 29%,
          linear-gradient(#fdeb35, #fce72a);
        background-repeat: no-repeat;
        border-radius: 100%;
        border: 8px solid white;
      }
    }

    .c-right {
      display: flex;
      flex-wrap: wrap;
      flex: 1;

      .box {
        position: relative;
        width: 300px;
        height: 150px;
        border: 1px solid #ccc;
        overflow: hidden;

        &:nth-child(n + 2) {
          border-left: none;
        }

        .content {
          position: absolute;
          width: 100%;
          height: 100%;
          left: -100%;
          top: -100%;
          background-color: lightcoral;
          font-size: 21px;
          color: #fff;
          z-index: 10;
        }
        .trans {
          transition: all 0.2s ease-in-out 0s;
        }
      }
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
          background: orange;
          transform: skewY(-30deg) rotate(60deg);
        }
      }
    }
  }

  .one-line {
    width: 500px;
    background-color: #ccc;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .mutiple-line {
    width: 500px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: #ff0909;
  }
}
</style>

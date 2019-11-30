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
        <h2>google</h2>
        <div class="google"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="one-line">
        单行文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断
      </div>
      <div class="mutiple-line">
        多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断多行文本截断
      </div>
    </div>
  </div>
</template>

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
      flex: 1;
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

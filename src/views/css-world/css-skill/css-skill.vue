<template>
  <div
    class="skill-container"
    ref="skillRef"
    @selectstart="stopCopy($event)"
    @contextmenu="stopCopy($event)"
  >
    <div class="left">
      <div class="box">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <input type="text" size="30" placeholder="弹性布局" />
      </div>
      <div data-content="伪元素的content" class="content"></div>
      <div data-content="伪元素的content2" class="content2 content"></div>
      <div data-content="伪元素的content3" class="content3 content"></div>
      <!-- 进度条 -->
      <div class="progress" style="--percent: 30">css 进度条</div>
      <div class="progress" style="--percent: 60"></div>
      <div class="progress" style="--percent: 80"></div>
      <p class="loading">加载中</p>
      <div class="no-more">无更多数据</div>
      <div class="onepx-border">1px border</div>
      <div class="truncate-text-multiline">
        多行文本截断显示，多行文本截断显示多行文本截断显示，多行文本截断显示，多行文本截断显示，多行文本截断显示
      </div>
    </div>
    <div class="center">
      <h2>计数器</h2>
      <ul>
        <li>List item</li>
        <li>List item</li>
        <li>
          List item
          <ul>
            <li>List item</li>
            <li>List item</li>
            <li>List item</li>
          </ul>
        </li>
      </ul>
      <div class="focus-within">
        <h2>表单聚焦高亮</h2>
        <form>
          <label for="given_name">Given Name:</label>
          <input id="given_name" type="text" /> <br />
          <label for="family_name">Family Name:</label>
          <input id="family_name" type="text" />
        </form>
      </div>
      <div class="none-select">
        <h2>禁止用户选择</h2>
        <span>无法选择哦！！！</span>
      </div>
      <div class="tri"></div>
      <div class="text-blur">文字模糊效果</div>
    </div>
    <div class="right">
      <h1>css属性</h1>
      <div class="right-item">
        <span>font-variant-numeric:</span>
        <p class="font-variant-numeric">98060/1234567</p>
      </div>
      <div class="right-item">
        <span>clip-path:</span>
        <div class="clip-path"></div>
      </div>
      <div class="right-item">
        <span> background-clip:</span>
        <div class=" background-clip">
          background-clip
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    stopCopy(e) {
      // this.$toast("error","禁止复制，禁止右键")
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
.skill-container {
  display: flex;
}
.left {
  .box {
    display: flex;
    width: 400px;
    height: 150px;
    /* justify-content: space-around; */
    flex-wrap: wrap;
    background-color: #ccc;
    .item {
      width: 60px;
      height: 30px;
      margin: auto;
      /*flex: 1;*/
      background-color: orange;
    }

    input {
      height: 30px;
      flex: 1;
    }
  }

  /* 伪元素的content */
  .content {
    width: 300px;
    height: 30px;
    margin-top: 30px;
    background-color: #ccc;
  }

  .content::before {
    content: attr(data-content);
  }

  /* 计数器 */
  .content2::before {
    --name: "这是一个css变量";
    content: var(--name);
  }

  .content3::before {
    --count: 60;
    counter-reset: color var(--count);
    content: counter(color);
  }

  /* 进度条 */
  .progress {
    width: 600px;
    height: 30px;
    border-radius: 15px;
    background-color: #f1f1f1;
    margin-top: 30px;
    box-sizing: border-box;
  }

  .progress::before {
    counter-reset: percent var(--percent);
    content: counter(percent);
    display: inline-block;
    width: calc(100% * var(--percent) / 100);
    max-width: 99%;
    line-height: 30px;
    padding-right: 10px;
    border-radius: 15px;
    text-align: right;
    color: #fff;
    background-color: #2686ff;
    animation: progress 2s ease forwards;
    /* animation: name duration timing-function delay iteration-count direction ba; */
  }

  @keyframes progress {
    from {
      width: 0;
    }

    to {
      width: calc(100% * var(--percent) / 100);
    }
  }

  /* 加载中动画 */
  .loading::after {
    content: ".";
    animation: loading 2s ease-in-out infinite;
  }

  @keyframes loading {
    33% {
      content: ". . .";
    }

    66% {
      content: ". . . . . .";
    }
  }

  .no-more {
    position: relative;
    text-align: center;
  }
  .no-more-style {
    content: "";
    position: absolute;
    width: 200px;
    height: 2px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ccc;
  }
  /* 更多数据 */
  .no-more::after {
    @extend .no-more-style;
    right: 0;
    margin-left: 50px;
  }

  .no-more::before {
    @extend .no-more-style;
    left: 0;
    margin-right: 50px;
  }
  .onepx-border {
    position: relative;
    width: 200px;
    height: 40px;
    color: red;
    font-size: 20px;
    text-align: center;
    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 200%;
      height: 200%;
      left: 0;
      top: 0;
      transform: scale(0.5);
      transform-origin: 0 0;
      padding: 1px;
      border: 1px solid red;
    }
  }
  // 多行文本截断显示
  .truncate-text-multiline {
    overflow: hidden;
    display: block;
    height: 109.2px;
    margin: 0 auto;
    font-size: 26px;
    line-height: 1.4;
    width: 400px;
    position: relative;
  }
  .truncate-text-multiline:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 36.4px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #f5f6f9 50%);
  }
}
.center {
  ul {
    counter-reset: counter;
  }
  li::before {
    counter-increment: counter;
    content: counters(counter, ".") "";
  }
  form {
    border: 3px solid #2d98da;
    color: #000;
    padding: 4px;
  }
  form:focus-within {
    background: #f7b731;
    color: #000;
  }
  .none-select {
    margin-top: 30px;
    -webkit-touch-callout: none;
    user-select: none;
  }
  .tri {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: none;
    border-bottom: 100px solid red;
  }
  .text-blur {
    color: transparent;
    text-shadow: 0 0 2px rgba($color: #000, $alpha: 0.6);
  }
}
.right {
  display: flex;
  flex-wrap: wrap;
  .font-variant-numeric {
    font-size: 30px;
    font-variant-numeric: tabular-nums;
    // font-variant-numeric: slashed-zero;
    font-variant-numeric: diagonal-fractions;
  }
  .right-item {
    margin-right: 20px;
  }
  .clip-path {
    width: 200px;
    height: 100px;
    background: orange;
    clip-path: circle(50%);
  }
  .background-clip {
    width: 400px;
    height: 300px;
    font-size: 60px;
    padding: 30px;
    border: 1px solid #ccc;
    color: #fff;
    text-align: center;
    background: url("../../../assets/images/gf.jpg") content-box no-repeat;
    background-size: cover;
    background-clip: text;
    color: transparent;
  }
}
</style>

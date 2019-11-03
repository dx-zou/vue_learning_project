<template>
  <div class="skill-container">
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
      <div class="onepx-border"></div>
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
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
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
    content: "。";
    animation: loading 2s ease-in-out infinite;
  }

  @keyframes loading {
    33% {
      content: "。。。";
    }

    66% {
      content: "。。。。。。";
    }
  }

  /* 更多数据 */
  .no-more::after {
    /* content: '————————————————'; */
    content: "";
    display: inline-block;
    width: 300px;
    height: 1px;
    background-color: #ccc;
    margin-left: 50px;
  }

  .no-more::before {
    content: "————————————————";
    margin-right: 50px;
  }
  .onepx-border {
    position: relative;
    width: 200px;
    height: 40px;
    color: red;
    text-align: center;
    &::before {
      position: absolute;
      content: "1px border";
      width: 200%;
      height: 200%;
      border: 1px solid red;
      left: 0;
      top: 0;
      font-size: 0.6rem;
      transform: scale(0.5);
      transform-origin: left top;
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
    content: counters(counter, ".") " ";
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
    margin-top: 0.3rem;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    /*-khtml-user-select: none;*/
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
</style>

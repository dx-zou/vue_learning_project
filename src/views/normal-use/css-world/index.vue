<template>
  <div>
    <div class="box">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <input type="text" size="60" placeholder="please" />
    </div>
    <div data-content="伪元素的content" class="content"></div>
    <div data-content="伪元素的content2" class="content2 content"></div>
    <div data-content="伪元素的content3" class="content3 content"></div>
    <!-- 进度条 -->
    <div class="progress" style="--percent: 30"></div>
    <div class="progress" style="--percent: 60"></div>
    <div class="progress" style="--percent: 80"></div>
    <p class="loading">加载中</p>
    <div class="no-more">无更多数据</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 600px;
  height: 300px;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #ccc;
}

.item {
  width: 100px;
  height: 30px;
  /* margin: auto; */
  background-color: orange;
}

input {
  /* width: 100%; */
  height: 30px;
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
</style>
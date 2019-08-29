<template>
  <div class="css-container">
    <div class="gradient-bg">Magic CSS</div>
    <input type="text" placeholder="border color" class="common-input" />
    <h1 class="gradient-text">Full Stack Developer</h1>
    <h1 class>选中文字的颜色</h1>
    <p class="gray">开启灰色模式</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$color: #ccc;
::selection {
  background-color: red;
  color: #fff;
}
.css-container {
  text-align: center;
  .gray {
    width: 100%;
    letter-spacing: 0.3rem;
    font-size: 0.3rem;
    filter: grayscale(100%);
  }
}
input {
  width: 100%;
  height: 0.4rem;
  margin-top: 0.2rem;
  border: 1px solid;
  border-radius: 5px;
  color: #2af;
  text-indent: 0.2rem;
  &:focus {
    border-color: aquamarine;
  }
}
.gradient-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background: linear-gradient(135deg, red, orange, green, blue, purple) left
    center/400% 400%;
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
  animation: move 10s infinite;
}
@keyframes move {
  0%,
  100% {
    background-position-x: left;
  }
  50% {
    background-position-x: right;
  }
}
.gradient-text {
  background-image: linear-gradient(90deg, red, orange);
  background-clip: text;
  line-height: 60px;
  font-size: 60px;
  animation: hue 5s linear infinite;
  -webkit-text-fill-color: transparent;
}
@keyframes hue {
  from {
    filter: hue-rotate(0);
  }
  to {
    filter: hue-rotate(-1turn);
  }
}
</style>

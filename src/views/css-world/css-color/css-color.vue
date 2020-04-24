<template>
  <div class="css-container">
    <div class="gradient-bg">Magic CSS</div>
    <input type="text" placeholder="border color" class="common-input" />
    <h1 class="gradient-text">Full Stack Developer</h1>
    <h1 class>选中文字的颜色</h1>
    <p class="gray">开启滤镜效果模式</p>
    <h1>
      Saul Goodman is. he's the last line of defense for the little guy. You
      getting sold down the river? He's a life raft. You getting stepped on,
      he's a sharp stick. You got Goliath on your back, Saul's the guy with the
      slingshot. He's a righter of wrongs, He's a friend to the friendless,
      That's Saul Goodman
      他是小人物的最后一道防线，你即将被洪流卷走，他就是你的救生筏,
      你被践踏了，他就是你的利刺，你被巨人歌利亚骑在背上,
      索尔就是用弹弓击败他的人. 他伸冤理枉，他帮助无依无靠之人,
      那就是索尔·古德曼
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped>
$color: #ccc;
/* 文字选中的背景色，颜色 */
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
    /* 滤镜效果 */
    filter: grayscale(100%);
  }
}
/* 输入框边框不设颜色，将跟随文字颜色 */
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
/* 背景渐变效果 */
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
/* 文字渐变效果 */
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

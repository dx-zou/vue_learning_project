<template>
  <div>
    <h1 class="title">
      CSS animation 属性是 animation-name，animation-duration,
      animation-timing-function，animation-delay，animation-iteration-count，animation-direction，animation-fill-mode
      和 animation-play-state 属性的一个简写属性形式。
    </h1>
    <div class="ball"></div>
    <div class="view">
      <div class="cylon_eye"></div>
    </div>
    <div class="clock">
      <div class="line1 line"></div>
      <div class="line2 line"></div>
      <div class="line3 line"></div>
      <div class="line4 line"></div>
      <div class="line5 line"></div>
      <div class="line6 line"></div>
      <div class="cover"></div>
      <div class="hour position"></div>
      <div class="minute position"></div>
      <div class="second position"></div>
      <div class="center"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hourInit: "",
      minInit: "",
      secInit: ""
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.ball {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #fd9495;
  animation: move 10s ease-in-out alternate infinite;
}
.title {
  font-size: 30px;
}
@keyframes move {
  from {
    transform: translateX(0);
  }

  25% {
    transform: translate(300px, 200px);
  }
  50% {
    transform: translate(600px, 0);
  }
  to {
    transform: translateX(0);
  }
}
.view {
  width: 600px;
  height: 50px;
  overflow: hidden;
  background-color: #000;
  .cylon_eye {
    width: 20%;
    height: 100%;
    background-color: red;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9) 25%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.9) 75%
    );
    animation: eye_move 5s linear 0s infinite alternate-reverse;
  }
}
@keyframes eye_move {
  from {
    margin-left: -20%;
  }
  to {
    margin-left: 100%;
  }
}

.clock {
  position: relative;
  width: 300px;
  height: 300px;
  margin-top: 100px;
  border: 10px solid #000;
  border-radius: 50%;
  background-color: #fff;
}

.line {
  width: 10px;
  height: 280px;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.line1 {
  transform: translate(-50%, 0) rotate(30deg);
}

.line2 {
  transform: translate(-50%, 0) rotate(60deg);
}

.line3 {
  width: 15px;
  transform: translate(-50%, 0) rotate(90deg);
}

.line4 {
  transform: translate(-50%, 0) rotate(-30deg);
}

.line5 {
  transform: translate(-50%, 0) rotate(-60deg);
}
.line6 {
  width: 15px;
}
.cover {
  width: 260px;
  height: 260px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.center {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
}
.position {
  width: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
}
.hour {
  height: 80px;
  background-color: red;
  transform-origin: bottom;
  animation: clock 43200s linear infinite;
}
.minute {
  height: 100px;
  background-color: rgb(16, 136, 216);
  transform-origin: bottom;
  animation: clock 3600s linear infinite;
}
.second {
  height: 120px;
  background-color: orange;
  transform-origin: bottom;
  animation: clock 60s steps(60) infinite;
}
@keyframes clock {
  from {
    transform: translate(-50%, -100%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -100%) rotate(360deg);
  }
}
</style>

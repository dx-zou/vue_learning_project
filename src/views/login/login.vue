<template>
  <div class="login-wrapper">
    <div class="login-bg"></div>
    <div class="login-overlay"></div>
    <div class="login-container">
      <h1>VUE LEARNING SYS</h1>
      <el-input
        type="text"
        prefix-icon="el-icon-user-solid"
        v-model.trim="userData.username"
        placeholder="username"
        clearable
        autofocus
      ></el-input>
      <el-input
        type="text"
        prefix-icon="el-icon-lock"
        show-password
        clearable
        v-model.trim="userData.password"
        @keyup.native.enter="debounceLogin"
        placeholder="password"
      ></el-input>
      <el-button type="primary" @click="debounceLogin">sign in</el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      userData: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    lodash() {
      return _;
    }
  },
  methods: {
    // debounce login
    debounceLogin: _.debounce(
      function() {
        const { username, password } = this.userData;
        if (!username || !password)
          return this.$toast("warning", "请输入用户名和密码");
        const loading = this.$loading({
          lock: true,
          text: "拼命加载中。。。",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        if(username === "admin" && password === "123") {
          this.$router.push("/dashboard"); 
        }
        loading.close();
        // this.$store.dispatch("user/_login", this.userData).then(res => {
        //   loading.close();
        //   if (res.code === 1) {
        //     this.$toast("success", "登录成功");
        //     this.$router.push("/dashboard");
        //   } else {
        //     this.$toast("error", res.msg);
        //   }
        // });
      },
      1000,
      { leading: true, trailing: true }
    )
  }
};
</script>

<style lang="scss">
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  .login-bg {
    position: fixed;
    width: 6750px;
    height: 100%;
    top: 0;
    left: 0;
    background: #348cb2 url("../../assets/images/bg.jpg") bottom left;
    background-repeat: repeat-x;
    background-size: 2250px auto;
    animation: bg-move 60s linear infinite;
  }
  .login-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    animation: overlay 1.5s forwards;
    background-attachment: fixed, fixed;
    background-image: url("../../assets/images/overlay-pattern.png"),
      url("../../assets/images/overlay.svg");
    background-position: top left, center center;
    background-repeat: repeat, no-repeat;
    background-size: auto, cover;
  }
  @keyframes bg-move {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-2250px, 0, 0);
    }
  }
  @keyframes overlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .login-container {
    position: absolute;
    width: 500px;
    left: 50%;
    top: 40%;
    padding: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 3px 3px 6px #ddd;
    transform: translate(-50%, -50%);
    h1 {
      margin-bottom: 20px;
      text-align: center;
      font-size: 30px;
    }
    .el-input {
      margin-bottom: 30px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>

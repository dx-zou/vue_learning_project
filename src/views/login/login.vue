<template>
  <div class="login-wrapper">
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
        if (!this.userData.username || !this.userData.password)
          return this.$toast("warning", "请输入用户名和密码");
        const loading = this.$loading({
          lock: true,
          text: "拼命加载中。。。",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        this.$store.dispatch("user/_login", this.userData).then(res => {
          loading.close();
          if (res.code === 1) {
            this.$toast("success", "登录成功");
            this.$router.push("/dashboard");
          } else {
            this.$toast("error", res.msg);
          }
        });
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
  background: url("../../assets/images/login-bg.jpg") no-repeat;
  background-size: cover;
  text-align: center;
  .login-container {
    position: absolute;
    width: 500px;
    left: 15%;
    bottom: 20%;
    padding: 0.2rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #ddd;
    h1 {
      margin-bottom: 0.2rem;
      text-align: center;
      color: #333;
      font-size: 0.3rem;
    }
    .el-input {
      margin-bottom: 0.2rem;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>

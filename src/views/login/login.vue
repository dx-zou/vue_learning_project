<template>
  <div class="login-container">
    <el-form
      :model="formData"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="60px"
      class="login-form"
    >
      <el-form-item>
        <h1>登录</h1>
      </el-form-item>
      <el-form-item label="账号" prop="pass">
        <el-input type="text" v-model="account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button>获取账号密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.account === "admin" && this.password === "123456") {
        this.$notify({
          duration: 2000,
          type: "success",
          message: "登录成功"
        });
        localStorage.setItem("token", this.account + Math.random());
        this.$router.push("/home");
      } else {
        this.$toast("error", "账号或密码错误");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 600px;
  margin: 100px auto 0;
  padding: 20px 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #eee;
  h1 {
    text-align: center;
  }
}
</style>
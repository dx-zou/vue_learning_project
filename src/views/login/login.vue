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
        <h1>系统登录</h1>
      </el-form-item>
      <el-form-item label="账号" prop="pass">
        <el-input type="text" v-model="account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-popover
          placement="bottom"
          width="200"
          trigger="hover"
          content="admin/123456;css/654321"
        >
          <el-button slot="reference">获取账号密码</el-button>
        </el-popover>
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
      password: "",
      accounts: [
        { name: "admin", password: "123456", role: "admin" },
        { name: "css", password: "654321", role: "ordinary" }
      ]
    };
  },
  methods: {
    login() {
      //添加loading效果
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //验证账号密码
      var res = this.accounts.some(
        item => this.account === item.name && this.password === item.password
      );
      if (res) {
        setTimeout(() => {
          this.$toast("success", "登陆成功");
          localStorage.setItem("token", this.account + Math.random());
          this.$router.push("/home");
          loading.close();
        }, 500);
      } else {
        loading.close();
        setTimeout(() => {
          this.$toast("error", "账号或密码错误");
        }, 300);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 300px;
  margin-top: 300px;
  margin-left: 900px;
  padding: 20px 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #eee;
  &::before {
    z-index: -999;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/login.png");
    background-size: cover;
  }
  h1 {
    text-align: center;
  }
}
</style>
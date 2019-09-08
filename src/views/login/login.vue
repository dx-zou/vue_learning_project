<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h1>系统登录</h1>
      <el-input
        type="text"
        prefix-icon="el-icon-user-solid"
        v-model.trim="username"
        placeholder="用户名"
        clearable
        autofocus
      ></el-input>
      <el-input
        type="text"
        prefix-icon="el-icon-lock"
        show-password
        v-model.trim="password"
        @keyup.native.enter="login"
        placeholder="密码"
      ></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      accounts: [
        { name: 'admin', password: '123', role: 'admin' },
        { name: 'normal', password: '321', role: 'ordinary' }
      ]
    }
  },
  methods: {
    login () {
      if (!this.username || !this.password) return this.$toast('warning', '请输入用户名和密码')
      // 添加loading效果
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 验证账号密码
      var res = this.accounts.some(
        item => this.username === item.name && this.password === item.password
      )
      if (res) {
        // Cookies.set("token", "Admin-Token");
        sessionStorage.setItem('token', this.username + Math.random())
        setTimeout(() => {
          loading.close()
          this.$toast('success', '登陆成功')
          this.$router.push('/dashboard')
        }, 400)
      } else {
        loading.close()
        setTimeout(() => {
          this.$toast('error', '账号或密码错误')
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" >
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.png") no-repeat;
  background-size: cover;
  text-align: center;
  .login-container {
    position: absolute;
    width: 4rem;
    right: 15%;
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

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <el-form
        :model="formData"
        status-icon
        ref="ruleForm"
        label-position="left"
        label-width="60px"
        class="login-form"
      >
        <h1>系统登录</h1>
        <el-form-item label="账号" prop="pass">
          <el-input type="text" v-model="account" placeholder="请输入用户名" autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="password" @keyup.enter="login" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-popover
            placement="bottom"
            width="200"
            trigger="hover"
            content="admin/123456;normal/654321"
          >
            <!-- <el-button slot="reference">获取账号密码</el-button> -->
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import router from '@/route'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      formData: {},
      account: '',
      password: '',
      accounts: [
        { name: 'admin', password: '123456', role: 'admin' },
        { name: 'normal', password: '654321', role: 'ordinary' }
      ]
    }
  },
  computed: {
    ...mapGetters(['addRouters'])
  },
  methods: {
    ...mapActions(['generateRoutes']),
    ...mapMutations(['SET_ROUTES']),
    login () {
      // 添加loading效果
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 验证账号密码
      var res = this.accounts.some(
        item => this.account === item.name && this.password === item.password
      )
      if (res) {
        // Cookies.set("token", "Admin-Token");
        sessionStorage.setItem('token', this.account + Math.random())
        setTimeout(() => {
          loading.close()
          this.$toast('success', '登陆成功')
          // 登录成功设置token
          sessionStorage.setItem('role', this.account)
          // 设置role
          this.$store.commit('SET_ROLE', this.account)
          // 提交action生成动态路由
          this.$store.dispatch('generateRoutes', this.account)
          router.addRoutes(this.addRouters)
          this.$router.push('/home')
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

<style lang="less" scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/login.png");
  background-size: cover;
  .login-container {
    position: fixed;
    width: 300px;
    right: 15%;
    bottom: 20%;
    padding: 20px 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #ddd;
    // &::before {
    //   position: absolute;
    //   content: "";
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-image: url("../../assets/login.png");
    //   background-size: cover;
    //   z-index: -999;
    // }
    h1 {
      text-align: center;
    }
  }
}
</style>

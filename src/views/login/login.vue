<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="title">我的学习管理系统</div>
      <div class="login-text">登录</div>
      <div class="input-box">
        <label
          :class="['label', nameBlur ? 'blur' : 'focus']"
          ref="name"
          for="name"
          >用户名</label
        >
        <input
          class="input"
          type="text"
          name="name"
          id="name"
          autocomplete="off"
          v-model="userinfo.username"
          @focus="handleFocus('name')"
          @blur="handleBlur('name')"
        />
        <span :class="['spin', !nameBlur && 'spin-active']"></span>
        <i
          v-show="userinfo.username"
          class="el-icon-circle-close close"
          @click="clearInput('username')"
        ></i>
      </div>
      <div class="input-box">
        <label
          :class="['label', passBlur ? 'blur' : 'focus']"
          ref="pass"
          for="password"
          >密码</label
        >
        <input
          class="input"
          :type="showPass ? 'text' : 'password'"
          id="password"
          name="password"
          autocomplete="off"
          v-model="userinfo.password"
          @focus="handleFocus('pass')"
          @blur="handleBlur('pass')"
          @keyup.enter="debounceLogin"
        />
        <i
          v-show="userinfo.password"
          class="el-icon-view close show-pass"
          @click="showPass = !showPass"
        ></i>
        <i
          v-show="userinfo.password"
          class="el-icon-circle-close close"
          @click="clearInput('password')"
        ></i>
        <span :class="['spin', !passBlur && 'spin-active']"></span>
      </div>
      <div class="login-button" v-loading="isLoading">
        <button class="button" @click="debounceLogin">
          <span>登录</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  data() {
    return {
      userinfo: {
        username: "",
        password: ""
      },
      nameBlur: true,
      passBlur: true,
      showPass: false,
      isLoading: false
    };
  },
  mounted() {
    this.userinfo.username && (this.nameBlur = false);
    this.userinfo.password && (this.passBlur = false);
  },
  methods: {
    handleFocus(value) {
      value === "name" && (this.nameBlur = false);
      value === "pass" && (this.passBlur = false);
    },
    handleBlur(value) {
      value === "name" && !this.userinfo.username && (this.nameBlur = true);
      value === "pass" && !this.userinfo.password && (this.passBlur = true);
    },
    clearInput(value) {
      this.userinfo[value] = undefined;
      value === "username" && (this.nameBlur = true);
      value === "password" && (this.passBlur = true);
    },
    debounceLogin: debounce(
      function() {
        const { username, password } = this.userinfo;
        if (!username || !password)
          return this.$toast("请输入用户名和密码", "warning");
        this.isLoading = true;
        if (username === "feng" && password === "654321") {
          sessionStorage.setItem("userToken", "isLogin");
          this.$store.commit("app/CHANGE_ACTIVEINDEX", "dashboard");
          this.$router.push("/dashboard");
        } else {
          this.$toast("用户名或密码错误", "warning");
          this.isLoading = false;
        }
        // this.$store.dispatch("user/_login", this.userinfo).then(res => {
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
$login-color: #ff5d48;
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login/login3.jpg") no-repeat top/cover;
  .login-container {
    position: absolute;
    width: 460px;
    padding: 30px 50px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: 0.3);
    background-color: #fff;
  }
  .title {
    width: 100%;
    line-height: 46px;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 2px;
    color: $login-color;
    position: relative;
    &::before {
      content: "";
      width: 5px;
      height: 100%;
      position: absolute;
      top: 0;
      left: -50px;
      background: $login-color;
    }
  }
  .login-text {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 700;
    color: $login-color;
  }
  .input-box {
    position: relative;
    width: 100%;
    height: 70px;
    margin-top: 30px;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.1);
      z-index: 3;
    }
    .label {
      position: absolute;
      left: 0;
      cursor: pointer;
      z-index: 2;
    }
    .input {
      position: relative;
      width: 80%;
      height: 60px;
      top: 10px;
      border: none;
      outline: none;
      background: transparent;
      font-size: 21px;
      color: rgba($color: #000000, $alpha: 0.8);
    }
    .spin {
      position: absolute;
      width: 0;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: $login-color;
      z-index: 4;
    }
    .close {
      position: absolute;
      right: 0;
      top: 50%;
      // color: #ddd;
      cursor: pointer;
    }
    .show-pass {
      right: 30px;
    }
    .spin-active {
      width: 100%;
    }
    .blur {
      top: 10px;
      line-height: 60px;
      font-size: 21px;
      font-weight: 300;
    }
    .focus {
      top: 0;
      line-height: 16px;
      font-size: 16px;
      font-weight: 100;
    }
  }
  .input,
  .label,
  .spin,
  .button {
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .login-button {
    margin-top: 30px;
    text-align: center;
    .button {
      width: 80%;
      line-height: 50px;
      border: 3px solid rgba($color: #000000, $alpha: 0.1);
      outline: none;
      background: transparent;
      color: rgba($color: #000000, $alpha: 0.2);
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      &:hover {
        color: $login-color;
        border-color: $login-color;
      }
    }
  }
}
</style>

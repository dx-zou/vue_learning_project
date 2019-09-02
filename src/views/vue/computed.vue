<template>
  <div>
    <el-input placeholder="请输入内容"></el-input>
    <h1>计算属性：computed</h1>
    <p>
      计算属性是自动监听依赖值的变化，从而动态返回内容，监听是一个过程，在监听的值变化时，可以触发一个回调，并做一些事情。它有以下几个特点：
      数据可以进行逻辑处理，减少模板中计算逻辑。
      对计算属性中的数据进行监视
      依赖固定的数据类型（响应式数据）
      计算属性由两部分组成：get和set，分别用来获取计算属性和设置计算属性。默认只有get，如果需要set，要自己添加。另外set设置属性，并不是直接修改计算属性，而是修改它的依赖。
    </p>
    <h1>计算属性和methods</h1>
    <p>computed 是可以缓存的，methods 不能缓存；**只要相关依赖没有改变，多次访问计算属性得到的值是之前缓存的计算结果，不会多次执行。**计算属性可以通过闭包来实现传参：</p>
    <h1>侦听属性：watch</h1>
    <p>
      使用 watch 的深度遍历和立即调用功能
      使用 watch 来监听数据变化的时候除了常用到 handler 回调，其实其还有两个参数，便是：
      deep 设置为 true 用于监听对象内部值的变化
      immediate 设置为 true 将立即以表达式的当前值触发回调
    </p>
    <h1>区别</h1>
    <p>
      watch：监测的是属性值， 只要属性值发生变化，其都会触发执行回调函数来执行一系列操作。
      computed：监测的是依赖值，依赖值不变的情况下其会直接读取缓存进行复用，变化的情况下才会重新计算。
      除此之外，有点很重要的区别是：计算属性不能执行异步任务，计算属性必须同步执行。也就是说计算属性不能向服务器请求或者执行异步任务。如果遇到异步任务，就交给侦听属性。watch也可以检测computed属性。
    </p>
    <el-button type="primary" @click="obj.age++">点击</el-button>
    <el-button type="primary" @click="$emit('sendData',123)">点击</el-button>
    <span>{{obj.age}}</span>
  </div>
</template>

<script>
import bus from "@/utils/bus";
export default {
  data() {
    return {
      obj: {
        age: 20
      },
      age: 0
    };
  },
  computed: {
    fullName: {
      // getter
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        // this.fullName = newValue 这种写法会报错
        var names = newValue.split("");
        this.firstName = names[0]; // 对它的依赖进行赋值
        this.lastName = names[names.length - 1];
      }
    }
  },
  watch: {
    obj: {
      handler: function(newVal, oldVla) {
        this.age = newVal.age;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    sendData() {}
  }
};
</script>

<style lang="less" scoped>
</style>

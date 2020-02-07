<template>
  <div class="reg-container">
    <el-input v-model="regExp" placeholder="请输入正则表达式" clearable />
  </div>
</template>

<script>
export default {
  data() {
    return {
      regExp: ""
    };
  },
  mounted() {
    this.catptureRegExp();
    this.replaceRegExp();
  },
  methods: {
    catptureRegExp() {
      // 捕获
      const pattern = /(\d){3,}([a-z]*)/gi;
      const str = "123abc";
      if (pattern.test(str)) {
        console.log(RegExp.$1); // 3
        console.log(RegExp.$2); // abc
      }
      // 反捕获
      const reg = /(?:\d){3,}([a-z]*)/gi;
      if (reg.test(str)) {
        console.log(RegExp.$1); // abc
        console.log(RegExp.$2); //
      }
    },
    replaceRegExp() {
      const pattern = /(\d){3,}([a-z]*)/gi;
      let str = "123abc";
      let res = str.replace(pattern, "$2$1$2");
      console.log("正则替换结果：" + res);
    }
  }
};
</script>

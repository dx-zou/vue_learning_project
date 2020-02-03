<template>
  <div class="app-main_wrapper">
    <div class="title">lodash learning ...</div>
    <ul>
      <li v-for="item in list" :key="item.name">
        <h1 style="font-size:20px">{{ item.name }}</h1>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div>
      <h3>一些小技巧：</h3>
      <ul>
        <li>
          <h2>获取url查询参数</h2>
          <p>
            let params = (new URL(document.location)).searchParams; let name =
            params.get("name");
          </p>
        </li>
        <li>
          <h2>decodeURIComponent</h2>
          <p>
            用于解码由 encodeURIComponent
            方法或者其它类似方法编码的部分统一资源标识符（URI），decodeURIComponent(encodedURI)
          </p>
        </li>
      </ul>
    </div>
    <el-button @click="test">test</el-button>
  </div>
</template>

<script>
// import _ from "lodash";
import tools from "@/utils/tools";
export default {
  data() {
    return {
      list: [{ name: "_.concat", desc: "" }]
    };
  },
  mounted() {
    // this.concatArray();
    // this.test();
  },
  // 组件内导航钩子： 离开前的守卫
  // beforeRouteLeave(to,from,next) {
  //    this.$confirm('检测到未保存的信息, 是否离开?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       next()
  //     }).catch(() => {
  //       this.$toast("warning", "请保存信息后离开")
  //     });
  // },
  methods: {
    // 创建一个新数组，将array与任何数组 或 值连接在一起。
    // concatArray() {
    //   var array = [1];
    //   var other = _.concat(array, 2, [3], [[4]]);
    // },
    test: tools._debounce(function() {
      console.log(123);
    }),
  }
};
</script>

<style lang="scss" scoped>
.app-main_wrapper {
  height: 100%;
  padding: 20px;
  background-color: #fff;
}
.title {
  font-size: 30px;
}
</style>

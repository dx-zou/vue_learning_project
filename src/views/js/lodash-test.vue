<template>
  <div>
    lodash learning ...
    <ul>
      <li v-for="item in list" :key="item.name">
        <h3>{{item.name}}</h3>
        <p>{{item.desc}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import _ from "lodash";
  export default {
    data() {
      return {
        list: [
          {name: '_.concat',desc: "hh"}
        ]
      }
    },
    created() {
      this.concatArray();
    },
    // 组件内导航钩子： 离开前的守卫
    beforeRouteLeave(to,from,next) {
       this.$confirm('检测到未保存的信息, 是否离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          next()
        }).catch(() => {
          this.$toast("warning", "请保存信息后离开")
        });
    },
    methods: {
      // 创建一个新数组，将array与任何数组 或 值连接在一起。
      concatArray() {
        var array = [1];
        var other = _.concat(array, 2, [3], [[4]]);
        console.log(other)
      },

    }
  }
</script>

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

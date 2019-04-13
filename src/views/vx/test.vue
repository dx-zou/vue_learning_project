<template>
  <div class="xx-container">
    <h1>姓名：{{name}}</h1>
    <h1>年龄：{{age}}</h1>
    <h1>大一旬：{{age+number}}而不惑</h1>
    <h1>{{myName}}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      number: 12
    };
  },
  created() {},
  //将state映射到computed 局部计算属性中
  // computed: mapState({
  //   name: state => state.name,
  //   age: "age", //字符串参数 等同于 state => state.age
  //   plusAge(state) {
  //     return state.age + this.number;
  //   },
  // }),
  // computed: mapState(["age", "name"]),
  computed: {
    //将state，getters 混入到局部计算属性中
    ...mapState(["age", "name"]),
    ...mapGetters(["myName"])
  },
  methods: {}
};
</script>

<style lang="">
</style>
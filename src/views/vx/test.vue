<template>
  <div class="xx-container">
    <h1>姓名：{{name}}</h1>
    <h1>年龄：{{age}}</h1>
    <h1>大一旬：{{age+number}}而不惑</h1>
    <h1>{{myName}}</h1>
    <hr>
    <button @click="addTotalCount({count:1})">增加</button>
    <p>总数量：{{count}}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      number: 12
    };
  },
  created() {},
  //1.将state映射到computed 局部计算属性中
  computed: mapState({
    name: state => state.name,
    age: "age", //字符串参数 等同于 state => state.age
    plusAge(state) {
      return state.age + this.number;
    }
  }),
  //将this.age this.name 映射为 this.$store.state.age / name
  computed: mapState(["age", "name"]),
  //2.将state，getters 混入到局部计算属性中
  computed: {
    ...mapState(["age", "name", "count"]),
    ...mapGetters(["myName"])
  },
  methods: {
    //1.this.add() 映射为 this.$store.commit('increment')
    ...mapMutations({
      add: "increment"
    }),
    //2.将this.increment(count) 映射为 this.$store.commit('increment',count)
    ...mapMutations(["increment"]),
    //在组件内部的方法中调用映射过来的方法，也就是commit 了mutations中的方法
    addTotalCount(number) {
      this.increment(number);
      this.add(number);
    }
  }
};
</script>

<style lang="less">
</style>
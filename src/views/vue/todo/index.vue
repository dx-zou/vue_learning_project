<template>
  <div class="todolist-container">
    <div>
      <h3>slot的新用法</h3>
      <fn-todo :todolist="todolist" v-model="count">
        <template v-slot:todo="{ todo }">
          <span v-if="todo.isCompleted">x</span>
          {{ todo.content }}
        </template>
      </fn-todo>
      <h3>父组件的count：{{ count }}</h3>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      todolist: [
        { id: 1, content: "111", isCompleted: false },
        { id: 2, content: "222", isCompleted: false },
        { id: 3, content: "333", isCompleted: false },
        { id: 4, content: "444", isCompleted: true }
      ],
      data: [],
      checkList: [],
      count: 1
    };
  },
  created() {
    // this.getOrgTree()
  },
  methods: {
    getOrgTree() {
      this.$http({
        method: "post",
        url: "http://umapdev.dfmc.com.cn/smart/pc-org/getOrgTree"
      }).then(res => (this.data = res.data.data));
    }
  }
};
</script>

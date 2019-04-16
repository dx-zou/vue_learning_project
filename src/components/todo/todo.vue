<template>
  <div class="todo-container">
    <button @click="add">点击+1</button>
    <p>通过v-model给子组件绑定数据,绕过单向数据流</p>
    <h3>子组件的count：{{count}}</h3>
    <ul>
      <li v-for="todo in todolist" :key="todo.id">
        <slot name="todo" :todo="todo">{{todo.content}}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "fnTodo",
  props: {
    todolist: {
      type: Array
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: this.value
    };
  },
  methods: {
    add() {
      this.count++;
      this.$emit("input", this.count);
    }
  }
};
</script>

<style lang="less">
</style>
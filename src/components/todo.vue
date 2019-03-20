<template>
    <div class="todo-container">
        <ul>
            <li 
            v-for="todo in todolist"
            :key="todo.id"
            >
                <slot name="todo" :todo="todo">{{todo.content}}</slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'fnTodo',
    props: {
        todolist:{
            type: Array,
        }
    },
    data() {
        return {
           
        }
    },
}
</script>

<style lang="less">
    
</style>
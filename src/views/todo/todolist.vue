<template>
    <div class="todolist-container">
        <fn-todo :todolist="todolist">
            <template v-slot:todo="{todo}">
                <span v-if="todo.isCompleted">x</span>
                {{todo.content}}
            </template>
        </fn-todo>
    </div>
</template>
<script>
export default {
    components: {
        
    },
    data() {
        return {
             todolist: [
                {id:1,content:'111',isCompleted: false},
                {id:2,content:'222',isCompleted: false},
                {id:3,content:'333',isCompleted: false},
                {id:4,content:'444',isCompleted: true},
            ]
        }
    },
}
</script>
<template>
    <div class="todolist-container">
        <div>
            <h3>slot的新用法</h3>
            <fn-todo :todolist="todolist">
                <template v-slot:todo="{todo}">
                    <span v-if="todo.isCompleted">x</span>
                    {{todo.content}}
                </template>
            </fn-todo>
        </div>
        <div>
            <h3>树形组件的使用</h3>
            <el-row>
                <el-col :span="12">
                    <el-tree
                    :data="data"
                    :highlight-current="true"
                    @node-expand="handleExpand"
                    >
                    </el-tree>
                </el-col>
                <el-col :span="12">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox 
                        label="复选框 A"
                        >
                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </div>
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
            ],
            data: [],
            checkList:[]

        }
    },
    created() {
        this.getOrgTree()
    },
    methods: {
        getOrgTree() {
            this.$http({
                method: 'post',
                url: 'http://umapdev.dfmc.com.cn/smart/pc-org/getOrgTree',
            })
            .then((res) => {
                this.data = res.data.data
                
            })
        },
        //
        handleExpand(data,node,obj) {
            this.checkList = data.children
        }
    },
}
</script>
<template>
    <div class="home-container">
        <el-form :inline="true" class="demo-form-inline">
            <el-row :gutter="200">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="时间范围">
                            <date-range @getRange="getDateRange"></date-range>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        
                    </div>
                </el-col>
            </el-row>
        </el-form>
        <h3>选择的时间范围：</h3>
        <p>开始时间：{{dateRange.start_time}}</p>
        <p>结束时间：{{dateRange.end_time}}</p>
    </div>
</template>

<script>
import dateRange from '@/components/dateRange.vue'

export default {
    components: {
        dateRange
    },
    data() {
        return {
            dateRange: {
                start_time: '',
                end_time: ''
            }
        }
    },
    created() {
        
    },
    methods: {
        getDateRange(start,end) {
            this.dateRange.start_time = start
            this.dateRange.end_time = end
        }
    }
}
</script>

<style lang="less">
</style>

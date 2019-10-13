<template>
  <div class="date-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="200">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="时间范围">
              <fn-date-range @getRange="getDateRange">
                <!-- 自定义插槽内容 -->
                <!-- <template v-slot:range="slotProps"> -->
                <template #range="{dateRange}">
                  <h3>选择的时间范围：</h3>
                  <p>开始时间：{{ dateRange.start_time }}</p>
                  <p>结束时间：{{ dateRange.end_time }}</p>
                </template>
              </fn-date-range>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <common-select
              :optionList="selectData"
              :value="formData.name"
              @changeValue="handleChange"
            ></common-select>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {
    // fnDateRange,
  },
  data() {
    return {
      dateRange: {
        start_time: "",
        end_time: ""
      },
      selectData: [
        { id: 1, label: "test1", value: 1 },
        { id: 2, label: "test2", value: 2 }
      ],
      formData: {},
    };
  },
  created() {},
  methods: {
    getDateRange(start, end) {
      this.dateRange.start_time = start;
      this.dateRange.end_time = end;
    },
    closeAlert() {
      this.visible = !this.visible;
    },
    handleChange(val) {
      this.$set(this.formData, "name",val)
    }
  }
};
</script>

<style lang="scss">
.date-container {
  .el-row {
    margin-right: 0 !important;
  }
}
</style>

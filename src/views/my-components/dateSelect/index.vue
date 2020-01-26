<template>
  <div class="date-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="200">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="时间范围">
              <date-range @getRange="getDateRange">
                <!-- 自定义插槽内容 -->
                <!-- <template v-slot:range="slotProps"> -->
                <template #range="{dateRange}">
                  <h3>选择的时间范围：</h3>
                  <p>开始时间：{{ dateRange.start_time }}</p>
                  <p>结束时间：{{ dateRange.end_time }}</p>
                </template>
              </date-range>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <draggable
      v-model="dataList"
      :group="{ name: 'people', pull: 'clone', put: false }"
      @start="drag = true"
      @end="handleDragChange"
      @change="handleDragChange"
      @choose="handleDragChange"
      @update="handleDragChange"
    >
      <transition-group>
        <div
          class="draggable-item"
          v-for="element in dataList"
          :key="element.id"
        >
          {{ element.name }}
        </div>
      </transition-group>
    </draggable>
    <el-button type="primary" @click="testDay">dayjs</el-button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import draggable from "vuedraggable";
export default {
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
      dataList: [
        { name: "feng", id: 1 },
        { name: "feeng", id: 2 },
        { name: "fen", id: 3 }
      ]
    };
  },
  components: {
    draggable
  },
  methods: {
    getDateRange(start, end) {
      this.dateRange.start_time = start;
      this.dateRange.end_time = end;
    },
    closeAlert() {
      this.visible = !this.visible;
    },
    handleChange(val) {
      this.$set(this.formData, "name", val);
    },
    /**
     * 
     */
    handleDragChange(e) {
      console.log(e);
    },
    testDay() {
      console.log(dayjs().year())
    }
  }
};
</script>

<style lang="scss">
.date-container {
  .el-row {
    margin-right: 0 !important;
  }
  .draggable-item {
    border-bottom: 1px solid #ccc;
    line-height: 50px;
  }
}
</style>

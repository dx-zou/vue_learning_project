<template>
  <div class="common-wrapper home-wrapper">
    <div class="title">2020年新型冠状病毒肺炎疫情统计数据</div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover" class="preview">
          <data-card
            v-for="item in virusSumData"
            :key="item.title"
            :data="item.num"
            :desc="item.title"
            color="red"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="疫情地图" name="1" >
        <virus-chart :chart-data="chartData" ref="chart1"/>
      </el-tab-pane>
      <el-tab-pane label="全国范围统计图表" name="2" >
        <virus-chart :chart-data="chartData" ref="chart2" />
      </el-tab-pane>
      <el-tab-pane label="数据" name="3" >
        <common-table
          :table-data="chartData.rows"
          :table-columns="tableColumns"
          :is-loading="false"
          :show-operate="false"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入基本模板
import { virusChartData, virusSumData } from "./data";
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
// 引入提示框和title组件
require("echarts/lib/component/title");
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

export default {
  data() {
    return {
      isLoading: false,
      activeName: "1",
      tableColumns: [
        {
          prop: "日期",
          label: "时间"
        },
        {
          prop: "确诊病例",
          label: "确诊病例(人)"
        },
        {
          prop: "疑似病例",
          label: "疑似病例(人)"
        },
        {
          prop: "重症病例",
          label: "重症病例(人)"
        },
        {
          prop: "死亡病例",
          label: "死亡病例(人)"
        },
        {
          prop: "治愈病例",
          label: "治愈病例(人)"
        }
      ]
    };
  },
  computed: {
    chartData() {
      return virusChartData;
    },

    virusSumData() {
      return virusSumData;
    }
  },
  watch: {
    activeName(v) {
      if(v === '3') return;
      this.$nextTick(() => {
        this.$refs[`chart${v}`].$refs["chart"].echarts.resize();
      });
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  box-sizing: border-box;
  background-color: inherit;
  .el-card {
    margin-bottom: 0.2rem;
  }
  #myChart {
    width: 50%;
    height: 60vh;
  }
  .title {
    position: relative;
    padding: 10px 40px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #f77c31;
    background: #fff;
    &::before {
      position: absolute;
      content: "";
      width: 20px;
      height: 20px;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      border-radius: 50%;
      background: #f77c31;
    }
  }
  .preview {
    /deep/ .el-card__body {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>

<template>
  <div class="common-wrapper home-wrapper">
    <div class="title">
      新型冠状病毒肺炎(COVID-19)疫情统计数据
    </div>
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
      <el-tab-pane label="疫情地图" name="1">
        <el-row :gutter="12">
          <el-col :span="10">
            <!-- <virus-map ref="chart1" /> -->
          </el-col>
          <el-col :span="14">
            <common-table
              :table-data="provinceData"
              :table-columns="provinceColumns"
              :is-loading="false"
              :show-operate="false"
              expand-all
            />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="全国范围统计图表" name="2">
        <!-- <virus-chart :chart-data="chartData" ref="chart2" /> -->
      </el-tab-pane>
      <el-tab-pane label="数据" name="3">
        <common-table
          :table-data="chartData.rows"
          :table-columns="tableColumns"
          :is-loading="false"
          :show-operate="false"
          table-height="550px"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 引入基本模板
import {
  virusChartData,
  virusSumData,
  tableColumns,
  provinceData,
  provinceColumns
} from "./data";
// import VirusChart from "./VirusChart";
// import VirusMap from "./VirusMap";
// const VirusMap = () => import("./VirusMap");
// const VirusChart = () => import("./VirusChart");
import tools from "@/utils/tools";
export default {
  data() {
    return {
      isLoading: false,
      activeName: "1"
    };
  },
  // components: {
  //   VirusChart,
  //   VirusMap
  // },
  computed: {
    chartData() {
      return virusChartData;
    },

    virusSumData() {
      return virusSumData;
    },

    tableColumns() {
      return tableColumns;
    },

    provinceData() {
      return provinceData;
    },

    provinceColumns() {
      return provinceColumns;
    }
  },
  watch: {
    activeName(v) {
      if (v === "3") return;
      this.$nextTick(() => {
        this.$refs[`chart${v}`].$refs["chart"].echarts.resize();
      });
    }
  },
  methods: {
    handleTest() {
      tools
        .$ajax("https://finworkflow.totole.com.cn/approval/getPendingList")
        .then(res => {
          console.log(res);
        });
    }
  }
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
    text-align: center;
    font-weight: bold;
    color: #f77c31;
    background: #fff;
    &::before {
      position: absolute;
      content: "";
      width: 15px;
      height: 15px;
      top: 50%;
      left: 33%;
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

<template>
  <div class="home-wrapper" v-loading="isLoading">
    <div ref="myChart" id="myChart"></div>
  </div>
</template>

<script>
// 引入基本模板
import { dateList, codeNum, timeNum } from "./data";
import option from "./chartOption";
let echarts = require("echarts/lib/echarts");
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
      dateList,
      codeNum,
      timeNum,
      isLoading: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let opts = {
        width: "80%",
        height: "80%"
      };
      let myChart = echarts.init(document.getElementById("myChart"), opts);
      let option = {
        title: {
          text: "动态数据",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["最新成交价", "预购队列"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })()
          },
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "价格",
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "预购量",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: "预购队列",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })()
          },
          {
            name: "最新成交价",
            type: "line",
            data: (function() {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })()
          }
        ]
      };
      // 绘制图表
      app.count = 11;
      this.isLoading = false;
      setInterval(function() {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.shift();
        option.xAxis[1].data.push(app.count++);

        myChart.setOption(option);
      }, 2100);
    }
  }
};
</script>

<style lang="less">
.home-wrapper {
  width: 100%;
  box-sizing: border-box;
  #myChart {
    width: 100%;
    height: 50vh;
  }
}
</style>

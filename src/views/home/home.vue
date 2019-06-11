<template>
  <div class="home-wrapper">
    <div ref="myChart" id="myChart"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  components: {},
  data() {
    return {
      dateList: ["06.04", "06.05", "06.06", "06.07", "06.08", "06.09", "06.10"],
      wordNum: [100, 200, 300, 220, 400, 330, 90],
      timeNum: [30, 50, 60, 40, 90, 66, 36]
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      // 基于准备好的dom，初始化echarts实例
      let opts = {
        width: "79%",
        height: "76%"
      };
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      var that = this;
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
      // myChart.setOption({
      //   backgroundColor: "#f9f9f9",
      //   tooltip: {
      //     confine: true,
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "cross",
      //       crossStyle: {
      //         color: "#999"
      //       }
      //     },
      //     showContent: true,
      //     formatter: "{a0}: {c0}<br />{a1}: {c1}"
      //   },
      //   toolbox: {
      //     feature: {
      //       dataView: { show: true, readOnly: false },
      //       magicType: { show: true, type: ["line", "bar"] },
      //       restore: { show: true },
      //       saveAsImage: { show: true }
      //     }
      //   },
      //   grid: {
      //     containLabel: true
      //   },
      //   legend: {
      //     data: ["单词量", "时间量"],
      //     itemGap: 20
      //   },
      //   axisPointer: {
      //     show: true,
      //     type: "line"
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       name: "日期",
      //       data: [
      //         "06.04",
      //         "06.05",
      //         "06.06",
      //         "06.07",
      //         "06.08",
      //         "06.09",
      //         "06.10"
      //       ],
      //       axisLine: {
      //         lineStyle: {
      //           color: "#666"
      //         }
      //       },
      //       axisPointer: {
      //         type: "shadow"
      //         // label: {
      //         //   formatter: function(params) {
      //         //     return "日期  " + params.value;
      //         //   }
      //         // }
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //       // splitLine: { show: false }, //去除网格线
      //       name: "单词(个)",
      //       // min: 0,
      //       axisLabel: {
      //         formatter: "{value}"
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#666"
      //         }
      //       }
      //     },
      //     {
      //       type: "value",
      //       name: "时间(分)",
      //       min: 0,
      //       axisLabel: {
      //         formatter: "{value}"
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#666"
      //         }
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "单词量",
      //       type: "bar",
      //       barWidth: 35,
      //       data: [100, 200, 300, 220, 400, 330, 90],
      //       label: {
      //         normal: {
      //           show: true,
      //           position: "top",
      //           fontSize: 16
      //         }
      //       }
      //     },

      //     {
      //       name: "时间量",
      //       type: "bar",
      //       barWidth: 35,
      //       data: [30, 50, 60, 40, 90, 66, 36],
      //       barStyle: { color: "0FD8C0" },
      //       label: {
      //         normal: {
      //           show: true,
      //           position: "top",
      //           fontSize: 16
      //         }
      //       }
      //     },
      //     {
      //       name: "单词曲线",
      //       type: "line",
      //       data: that.wordNum,
      //       smooth: true
      //     },
      //     {
      //       name: "时间曲线",
      //       type: "line",
      //       data: that.timeNum,
      //       smooth: true
      //     }
      //   ],
      //   color: ["#FFAA33", "#0FD8C0", "#e43c59 ", "#5097d5"]
      // });
    }
  }
};
</script>

<style lang="less">
</style>

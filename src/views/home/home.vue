<template>
  <div class="home-wrapper">
    <div ref="myChart" id="myChart"></div>
  </div>
</template>

<script>
// 引入基本模板
import { dateList, codeNum, timeNum } from './data'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default {
  components: {},
  data () {
    return {
      dateList,
      codeNum,
      timeNum
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initCharts()
    })
  },
  methods: {
    initCharts () {
      // 基于准备好的dom，初始化echarts实例
      let opts = {
        width: '80%',
        height: '80%'
      }
      let myChart = echarts.init(document.getElementById('myChart'), opts)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '最近七天代码记录表',
          subtext: '纯属虚构'
        },
        backgroundColor: '#f9f9f9',
        tooltip: {
          confine: true,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          showContent: true
          // formatter: "{a0}: {c0}<br />{a1}: {c1}"
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        grid: {
          containLabel: true
        },
        legend: {
          data: ['代码量', '时间量'],
          itemGap: 20
        },
        axisPointer: {
          show: true,
          type: 'line'
        },
        xAxis: [
          {
            type: 'category',
            name: '日期',
            data: this.dateList,
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisPointer: {
              type: 'shadow',
              label: {
                formatter: function (params) {
                  return '日期  ' + params.value
                }
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // splitLine: { show: false }, //去除网格线
            name: '代码(行)',
            // min: 0,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          },
          {
            type: 'value',
            name: '时间(分)',
            min: 0,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 94,
            end: 100
          },
          {
            type: 'inside',
            start: 94,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '20%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          {
            name: '代码量',
            type: 'bar',
            barWidth: 35,
            data: this.codeNum,
            label: {
              normal: {
                show: true,
                position: 'top',
                fontSize: 16
              }
            }
          },

          {
            name: '时间量',
            type: 'bar',
            barWidth: 35,
            data: this.timeNum,
            barStyle: { color: '0FD8C0' },
            label: {
              normal: {
                show: true,
                position: 'top',
                fontSize: 16
              }
            }
          },
          {
            name: '单词曲线',
            type: 'line',
            data: this.codeNum,
            smooth: true
          },
          {
            name: '时间曲线',
            type: 'line',
            data: this.timeNum,
            smooth: true
          }
        ],
        color: ['#334b5c', '#b34038', '#e43c59 ', '#54a2d5']
      })
    }
  }
}
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

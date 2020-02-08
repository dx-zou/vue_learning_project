<template>
  <ve-histogram
    height="600px"
    :data="chartData"
    :extend="extend"
    :settings="chartSettings"
    :colors="colors"
    :yAxis="yAxis"
    ref="chart"
  ></ve-histogram>
</template>

<script>
export default {
  name: "VirusChart",
  props: {
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      extend: {
        "xAxis.0.axisLabel.rotate": 0,
        series: {
          label: { show: true, position: "top" }
        }
      },
      chartSettings: {
        showLine: ["确诊病例", "疑似病例", "重症病例", "死亡病例", "治愈病例"]
      },
      markPoint: {
        data: [
          {
            name: "最大值",
            type: "max"
          }
        ]
      },
      dataZoom: [
        {
          type: "slider",
          start: 0,
          end: 20
        }
      ],
      yAxis: {
        maxInterval: 500
      },
      colors: [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ]
    };
  }
};
</script>

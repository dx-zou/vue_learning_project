<template>
  <ve-line
    :data="chartData"
    :extend="extend"
    :settings="chartSettings"
    :mark-point="markPoint"
    :colors="colors"
  ></ve-line>
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
        "xAxis.0.axisLabel.rotate": 45
      },
      chartSettings: {},
      markPoint: {
        data: [
          {
            name: '最大值',
            type: 'max'
          }
        ]
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 20
        }
      ],
      colors: ['#c23531','#2f4554', '#61a0a8',
        '#d48265', '#91c7ae','#749f83', 
        '#ca8622', '#bda29a','#6e7074',
        '#546570', '#c4ccd3']
    };
  }
};
</script>

<style lang="scss" scoped></style>

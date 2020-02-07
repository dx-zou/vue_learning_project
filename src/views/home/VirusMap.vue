<template>
  <ve-map
    height="550px"
    :data="chartData"
    :legend-visible="false"
    :settings="settings"
    :extend="extendOptions"
    log
    ref="chart"
  ></ve-map>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        aspectScale: 0.8,
        selectedMode: "single",
        itemStyle: {}
      },
      extendOptions: {
        color: ["#c23531", "#2f4554", "#61a0a8", "#d48265", "#91c7ae"]
      },
      chartData: {
        columns: ["位置", "确诊", "死亡"],
        rows: [
          {
            位置: "湖北",
            确诊: 22112,
            死亡: 618
          },
          {
            位置: "河南",
            确诊: 914,
            死亡: 3
          },
          {
            位置: "北京",
            确诊: 914,
            死亡: 1
          }
        ]
      }
    };
  }
};
</script>

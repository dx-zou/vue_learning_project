<template functional>
  <div class="data-card-container" style="{width: props.width}">
    <div :style="{ color: props.color }" class="data">{{ props.data }}</div>
    <span>{{ props.desc }}</span>
  </div>
</template>

<style lang="scss" scoped>
.data-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .data {
    margin-bottom: 20px;
    font-size: 26px;
  }
}
</style>

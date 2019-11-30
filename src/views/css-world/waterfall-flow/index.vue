<template>
  <div class="waterfall-container">
    <div class="column">
      <h1>column实现</h1>
      <p>
        由于multi-column布局中子元素的排列顺序是先从上往下再从左至右，
      </p>
      <p>
        这种方式仅适用于数据固定不变的情况，对于滚动加载更多等可动态添加数据的情况就并不适用了
      </p>
      <div v-for="item in 16" :key="item">{{ item }}</div>
    </div>
    <div class="grid">
      <h1>grid 布局实现瀑布流</h1>
      <div v-for="item in 10" :key="item" class="grid-item">{{ item }}</div>
    </div>
    <h1>flex 布局实现瀑布流</h1>
    <div class="flexbox">
      <div v-for="item in 6" :key="item" class="flex-column">
        <div v-for="number in 6" :key="number" class="column-item">
          {{ number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      divList: []
    };
  }
};
</script>

<style lang="scss" scoped>
.waterfall-container {
  .column {
    column-count: 6;
    column-gap: 10px;
    div {
      margin-bottom: 10px;
      border: 1px solid #ccc;
      break-inside: avoid;
      background-color: lightcoral;
      &:nth-child(odd) {
        height: 100px;
      }
      &:nth-child(even) {
        height: 60px;
      }
    }
  }
  .grid {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr; // 分为3行
    grid-template-columns: 1fr 1fr 1fr; // 分为3列
    column-gap: 5px; // 列间距5px
    .grid-item {
      height: 30px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      background-color: lightsalmon;
    }
  }
  .flexbox {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .flex-column {
      width: 200px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      .column-item {
        height: 100px;
        margin-bottom: 10px;
        background-color: lightseagreen;
        &:nth-child(odd) {
          height: 100px;
        }
        &:nth-child(even) {
          height: 60px;
        }
      }
    }
  }
}
</style>

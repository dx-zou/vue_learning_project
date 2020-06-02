<template>
  <div class="transition-container">
    <el-button type="primary" @click="show = !show">toggle</el-button>
    <el-button type="primary" @click="addItem">addItem</el-button>
    <div class="box-wrapper">
      <fade-transition name="filter" group :duration="300">
        <div
          class="box"
          v-for="(item, index) in list"
          @click="remove(index)"
          :key="item"
        ></div>
      </fade-transition>
    </div>
    <transition name="filter">
      <div key="filter" v-show="show" class="filter">
        <div>transiton go</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      list: [1, 2, 3, 4, 5]
    };
  },
  created() {},
  methods: {
    remove(index) {
      this.list.splice(index, 1);
    },
    addItem() {
      let randomIndex = Math.floor(Math.random() * this.list.length);
      this.list.splice(randomIndex, 0, Math.random());
    }
  }
};
</script>

<style lang="scss" scoped>
.transition-container {
  position: relative;
  height: 100%;
  background: #fff;
  .box-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
  }
  .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin-top: 20px;
    margin-right: 10px;
    background-color: rgb(108, 141, 213);
    box-shadow: rgba(108, 141, 213, 0.5) 0px 6px 20px;
    border-radius: 10px;
  }

  .filter {
    position: absolute;
    width: 200px;
    height: 400px;
    right: 0;
    background: $--color-warning;
    border: 1px solid #ccc;
  }
  .filter-enter,
  .filter-leave-to {
    opacity: 0;
    transform: translateX(230px);
  }
  .filter-enter-active,
  .filter-leave-active {
    transition: all 0.3s ease;
  }

  @keyframes bounce-in {
    0% {
      transform: translateX(230px);
    }
    100% {
      transform: translateX(-230px);
    }
  }
}
</style>

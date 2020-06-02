<template>
  <div class="drag-container">
    <div class="drag-box" @dragover="ondragover" @drop="ondrop">
      <div
        :class="['drag-able', dragStart && 'dragging']"
        ref="dragged"
        draggable="true"
        @dragstart="ondragstart"
      ></div>
    </div>
    <div
      v-for="item in list"
      :key="item"
      @dragover="ondragover"
      @drop="ondrop"
      class="drag-box"
    ></div>
    <!-- <div class="drop-zone" @drop="handleDrop" @dragover="ondragover">
      <div class="drag-img" ref="dragImg" draggable="true"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4],
      dragStart: false
    };
  },
  mounted() {
    this.ondrag();
  },
  methods: {
    ondragstart() {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.dragStart = true;
      }, 0);
    },
    ondragover(e) {
      e.preventDefault();
    },
    ondrop(e) {
      this.dragStart = false;
      e.target.appendChild(this.$refs.dragged);
    },
    documentDrop() {
      this.dragStart = false;
    },
    ondrag() {
      document.addEventListener("dragover", this.ondragover);
      document.addEventListener("drop", this.documentDrop);
      this.$once("hook:beforeDestroy", () => {
        document.removeEventListener("dragover", this.ondragover);
        document.removeEventListener("drop", this.documentDrop);
      });
    },
    handleDrop(e) {
      console.log(e);
      const { offsetLeft, offsetTop } = e.target;
      this.$refs.dragImg.style.top = e.clientY - offsetTop + "px";
      this.$refs.dragImg.style.left = e.clientX - offsetLeft + "px";
      // e.target.appendChild(this.$refs.dragImg);
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-container {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  padding: 20px;
  background: #ff7733;
  color: #fff;
  .drag-box {
    width: 280px;
    height: 280px;
    margin-right: 30px;
    background: #fff;
    box-shadow: rgba($color: #000000, $alpha: 0.2) 6px 6px 8px;
  }
  .drag-able {
    position: relative;
    width: 260px;
    height: 260px;
    top: 10px;
    left: 10px;
    background: url("../../assets/images/avatar.jpg") center/cover no-repeat;
  }
  .drag-img {
    position: absolute;
    width: 260px;
    height: 260px;
    top: 30px;
    left: 30px;
    background: url("../../assets/images/avatar.jpg") center/cover no-repeat;
  }
  .drop-zone {
    position: relative;
    width: 100%;
    height: 500px;
  }
  .dragging {
    visibility: hidden;
  }
}
</style>

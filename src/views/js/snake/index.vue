<template>
  <div class="game-container">
    <el-button type="primary" @click="startGame">开始</el-button>
    <div class="map" ref="gameMap"></div>
  </div>
</template>

<script>
import Game from "./game";
export default {
  data() {
    return {};
  },

  methods: {
    startGame() {
      const element = document.querySelector(".map");
      const game = new Game(element);
      game.start();
    }
  }
};
</script>

<style lang="scss" scoped>
.game-container {
  position: relative;
}
.map {
  width: 600px;
  height: 500px;
  margin-top: 10px;
  background: #fff;
}
</style>

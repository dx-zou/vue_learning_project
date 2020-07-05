import Food from "./food";
import Snake from "./snake";
const dir = {
  37: "left",
  38: "top",
  39: "right",
  40: "bottom"
};
class Game {
  constructor(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
  }
  /**
   * 控制方向
   * @memberof Game
   */
  directionControl() {
    document.addEventListener(
      "keydown",
      e => {
        this.snake.direction = dir[e.keyCode];
      },
      false
    );
  }
}

/**
 * 游戏开始
 */
Game.prototype.start = function () {
  this.food.render(this.map);
  this.snake.render(this.map);
  //蛇移动起来
  this.snake.run(this.food,this.snake,this.map);
  //控制蛇移动的方向
  this.directionControl();
};

export default Game;

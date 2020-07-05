import { removeElement } from "./tools";

/**
 * 创建蛇对象
 *
 * @class Snake
 */
class Snake {
  constructor(options = {}) {
    this.options = options;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.direction = options.direction || "right";
    //蛇的初始位置大小
    this.body = [
      { x: 3, y: 5, color: "#0283d6" },
      { x: 2, y: 5, color: "#ff5d48" },
      { x: 1, y: 5, color: "#f1b53d" }
    ];
  }
}
// 记录之前创建的蛇节
const elements = [];

/**
 * 渲染蛇节到map
 *
 * @param {*} map
 */
Snake.prototype.render = function (map) {
  // 先移除当前的蛇节
  removeElement(elements);
  for (let i = 0, len = this.body.length; i < len; i++) {
    // const { width, height } = this;
    // const x = this.body[i].x * this.width + "px";
    // const y = this.body[i].y * this.height + "px";
    // const color = this.body[i].color;
    // addElement(map, elements, { width, height, x, y, color })
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.left = this.body[i].x * this.width + "px";;
    div.style.top = this.body[i].y * this.height + "px";
    div.style.backgroundColor = this.body[i].color;
    map.appendChild(div);
    elements.push(div);
  }
};
//创建控制蛇移动的方法
Snake.prototype.move = function (food, map) {
  //当前蛇节移动到当前蛇节前一个蛇节的位置
  for (let i = this.body.length - 1; i > 0; i--) {
    this.body[i].x = this.body[i - 1].x;
    this.body[i].y = this.body[i - 1].y;
  }
  //控制蛇头移动的方向,判断蛇头的移动方向
  const head = this.body[0];
  switch (this.direction) {
    case "right":
      head.x += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "top":
      head.y -= 1;
      break;
    case "bottom":
      head.y += 1;
      break;
  }
  //判断蛇头是否和食物的坐标重合,如果重合让蛇增加一节
  let headX = head.x * this.width;
  let headY = head.y * this.height;
  if (headX === food.x && headY === food.y) {
    //把当前蛇的最后一节添加到蛇的body中
    //同时食物消失，并随机渲染一个食物到map中
    let last = this.body[this.body.length - 1];
    this.body.push({
      x: last.x,
      y: last.y,
      color: last.color
    });
    //渲染新的事物到map中
    food.render(map);
  }
};
Snake.prototype.run = function (food, snake, map) {
  const timer = setInterval(() => {
    snake.move(food, map);
    snake.render(map);
    //当蛇遇到边界游戏结束
    //获取蛇头坐标
    var maxX = map.offsetWidth / snake.width;
    var maxY = map.offsetHeight / snake.height;
    var headX = snake.body[0].x;
    var headY = snake.body[0].y;
    if (headX < 0 || headX >= maxX) {
      clearInterval(timer);
      alert("GAME OVER!!!");
    }
    if (headY < 0 || headY >= maxY) {
      clearInterval(timer);
      alert("GAME OVER!!!");
    }
  }, 500);
};
export default Snake;

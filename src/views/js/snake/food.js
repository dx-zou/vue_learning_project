import { getRandom, removeElement, addElement } from "./tools";

/**
 * 食物类
 */
class Food {
  constructor(options = {}) {
    this.options = options;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.color = options.color || "#f1b53d";
    this.x = options.x || 0;
    this.y = options.y || 0;
  }
}
const elements = [];

/**
 * 食物渲染方法
 * @param  {[object]} map []
 * @return {[type]}     [description]
 */
Food.prototype.render = function(map) {
  // 先删除之前创建的食物
  removeElement(elements);
  this.x = getRandom(0, map.offsetWidth / this.width - 1) * this.width;
  this.y = getRandom(0, map.offsetHeight / this.height - 1) * this.height;
  const { width, height, x, y, color } = this;
  addElement(map, elements, { width, height, x, y, color });
};

export default Food;

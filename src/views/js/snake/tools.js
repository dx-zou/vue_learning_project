/**
 * 随机数生成
 * @param  {[number]} min [description]
 * @param  {[number]} max [description]
 * @return {[number]}     [description]
 */
export const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 移除节点
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
export const removeElement = function (list) {
  for (let i = list.length - 1; i >= 0; i--) {
    //删除蛇节在map中的div
    list[i].parentNode.removeChild(list[i]);
    //删除数组中的蛇节
    list.splice(i, 1);
  }
};

/**
 * 创建新的节点
 * @param {[type]} map     [description]
 * @param {[type]} list    [description]
 * @param {[type]} context [description]
 */
export const addElement = function (map, list, context) {
  const div = document.createElement("div");
  const { width, height, x, y, color } = context;

  div.style.position = "absolute";
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.backgroundColor = color;
  map.appendChild(div);
  list.push(div);
};

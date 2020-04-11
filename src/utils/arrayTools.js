/**
 * @description 数组去重方法，用于元素是对象的数组
 *
 * @param {*} [arr=[]]
 * @param {string} prop ，要比较的数组元素属性
 */
const _unique = function(arr = [], prop) {
  let obj = {};
  return arr.reduce((prev, cur) => {
    obj[cur[prop]] ? "" : (obj[cur[prop]] = true && prev.push(cur));
    return prev;
  }, []);
};

/**
 * @description 数组去重 Map的键不可重复
 *
 * @param {*} arr
 * @param {*} key
 * @returns
 */
function _uniqueMap(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

/**
 * 冒泡排序
 *
 * @param {*} arr
 * @returns
 */
const bubbleSort = function(arr) {
  let flag = true;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      } else {
        flag = true;
      }
    }
    if (flag) break;
  }
  return arr;
};

/**
 * 快速排序
 *
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 */
const quickSort = function(arr, left, right) {
  if (left < right) {
    let pos = left - 1;
    const pivot = arr[right];
    for (let i = left; i <= right; i++) {
      if (arr[i] <= pivot) {
        pos++;
        [arr[pos], arr[i]] = [arr[i], arr[pos]];
      }
    }
    quickSort(arr, left, pos - 1);
    quickSort(arr, pos + 1, right);
  }
  return arr;
};

/**
 * 数组扁平化 ，reduce方法
 *
 * @param {*} arr
 * @returns
 */
const flatReduce = function(arr) {
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? flatReduce(cur) : cur);
  }, []);
};

/**
 * 数组扁平化，解构
 *
 * @param {*} arr
 * @returns
 */
const flatArray = function(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};

export default {
  _unique,
  _uniqueMap,
  bubbleSort,
  quickSort,
  flatReduce,
  flatArray
};

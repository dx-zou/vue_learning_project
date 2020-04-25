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
 * 冒泡排序改进
 * 在每趟排序中进行正向和反向两遍冒泡的方法
 * 一次可以得到两个最终值(最大者和最小者)
 *
 * @param {*} arr
 * @returns
 */
const bubbleSort2 = function(arr) {
  let [low, high, flag] = [0, arr.length - 1, true, 0];
  console.time("2.改进后冒泡排序耗时");
  while (low < high && flag) {
    flag = false;
    for (
      let i = low;
      i < high;
      i++ //正向冒泡,找到最大者
    ) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        flag = true;
      }
    }
    high--; //修改high值, 前移一位
    for (
      let j = high;
      j > low;
      j-- //反向冒泡,找到最小者
    ) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        flag = true;
      }
    }
    low++; //修改low值,后移一位
  }
  console.timeEnd("2.改进后冒泡排序耗时");
  return arr;
};
// const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
// console.log(bubbleSort2(arr));
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
  bubbleSort2,
  quickSort,
  flatReduce,
  flatArray
};

/**
 * 元素是对象的数组去重
 *
 */
const _unique = function(arr, prop) {
  let obj = {};
  return arr.reduce((prev, cur) => {
    !obj[cur[prop]] && (obj[cur[prop]] = true) && prev.push(cur);
    return prev;
  }, []);
};
const unique = function(arr, prop) {
  return [...new Map(arr.map(item => [item[prop], item])).values()];
};
const uni = function(arr) {
  return [...new Set(arr)];
};
const arr = [
  {
    id: 1,
    name: 121
  },
  {
    id: 1,
    name: 121121
  },
  {
    id: 2,
    name: 1212121
  }
];
const arr1 = [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7];
const a = unique(arr, "id");
console.log(a);
console.log(uni(arr1));
/**
 * 数组扁平化
 */

let count = 0;
const _flat = function(arr) {
  count++;
  return arr.reduce((prev, cur) => {
    return prev.concat(Array.isArray(cur) ? _flat(cur) : cur);
  }, []);
};

const flat = function(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
};
const aa = [1, [2, 3], [4, [5, 6]], [7, [8, [9, 10]]]];

console.log(flat(aa));
console.log(count);

/**
 * call
 */

const _call = function(context, ...args) {
  context = context ? Object(context) : window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

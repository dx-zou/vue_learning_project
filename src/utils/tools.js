/**
 * @description 数组去重方法，用于元素是对象的数组
 *
 * @param {*} [arr=[]]
 * @param {string} prop ，要比较的数组元素属性
 */
const _unique = function(arr = [], prop) {
  return arr.reduce((prev, cur) => {
    let obj = {};
    obj[cur[prop]] ? "" : (obj[cur[prop]] = true && prev.push(cur));
    return prev;
  }, []);
};

/**
 * @description 判断数据类型方法
 *
 * @param {*} data
 */
const _typeof = function(data) {
  const toString = Object.prototype.toString;
  const type =
    data instanceof Element
      ? "element"
      : toString
          .call(data)
          .replace(/\[object\s(.+)\]/, "$1")
          .toLowerCase();
  return type;
};

/**
 * @description 模拟call函数
 *
 */
const _myCall = function(context) {
  // 1.判断有没有传入要绑定的对象，没有默认是window，
  // 如果是基本类型的话通过Object()方法进行转换
  let ctx = Object(context) || window;
  // 把this绑定到 传入的ctx对象
  ctx.fn = this;
  // 2.取出传递的参数 第一个参数是this ,三种处理伪数组的方法
  const args = [...arguments].slice(1);
  // const args = Array.prototype.slice.call(arguments, 1);
  // const args = Array.from(arguments).slice(1);
  // 执行这个方法，并传入参数
  // 改变fn的this指向到ctx对象
  const result = ctx.fn(...args);
  // 删除属性
  delete ctx.fn;
  // 返回结果
  return result;
};

/**
 * @description 模拟apply函数
 *
 * @param {*} context
 * @param {Array} arr
 */
const _myApply = function(context, args = []) {
  let ctx = Object(context) || window;
  ctx.fn = this;
  const type = Array.isArray(args);
  // 判断参数是否是数组类型
  if (!type) {
    throw new Error(
      `second argument to Function.prototype._myApply must be an array`
    );
  }
  const result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};

/**
 * @description 模拟bind函数
 *
 * @param {*} context
 * @returns {Function}
 */
const _myBind = function(context) {
  // 判断this是不是函数，不是就抛出错误
  if (typeof this !== "function") {
    throw new Error(`调用_myBind的对象不是一个函数`);
  }
  const _this = this;
  const args = [...arguments].slice(1);
  const bindFn = function() {
    const args2 = [...arguments];
    // 当这个绑定函数被当做普通函数调用的时候，this指向window。
    // 当做构造函数使用的时候，却是指向这个实例，所以this instanceof bindFn为true，这个实例可以获取到fn()
    // 如果 this instanceof bindFn 说明这是new出来的实例，指向这个实例， 否则指向context
    _this.apply(this instanceof bindFn ? this : context, args.concat(args2));
  };
  // 创建新的函数，绑定原型，防止原型污染
  function NewFn() {}
  NewFn.prototype = _this.prototype;
  bindFn.prototype = new NewFn();
  return bindFn;
};

const _forEach = function(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
};

/**
 * @description 深拷贝方法
 *
 * @param {*} data
 */
const _deepClone = function(target, map = new WeakMap()) {
  if (typeof target === "object") {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    _forEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = _deepClone(target[key], map);
    });
    return cloneTarget;
  } else {
    return target;
  }
};
Function.prototype._myCall = _myCall;
Function.prototype._myApply = _myApply;
Function.prototype._myBind = _myBind;
export default {
  _unique,
  _typeof,
  _deepClone
};

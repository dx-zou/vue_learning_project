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
 * @description 数组去重 Map的键不可重复
 * 
 * @param {*} arr
 * @param {*} key
 * @returns
 */
function _uniqueArray(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}
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
 * @description 模拟call 第二版
 *
 * @param {*} context
 * @param {*} args
 * @returns
 */
const _call = function(context, ...args) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
/**
 * @description 模拟apply函数
 *
 * @param {*} context
 * @param {Array} arr
 */
const _myApply = function(context, args = []) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  const key = Symbol();
  ctx[key] = this;
  const type = Array.isArray(args);
  // 判断参数是否是数组类型
  if (!type) {
    throw new Error(
      `second argument to Function.prototype._myApply must be an array`
    );
  }
  const result = ctx[key](...args);
  delete ctx[key];
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

/**
 * @description 模拟bind第二版
 *
 * @param {*} context
 * @returns function
 */
function _bind(context, ...args1) {
  const _this = this;
  const bindFn = function(...args2) {
    const ctx =
      this instanceof bindFn ? this : (Object(context), [...args1, ...args2]);
    _this.apply(ctx);
  };
  if (this.prototype) {
    bindFn.prototype = Object.create(this.prototype);
  }
  return bindFn;
}
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

/**
 * @description 深拷贝
 *
 * @param {*} obj
 * @param {*} [cache=[]]
 * @returns
 */
const _deep = function(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  // if obj is hit, it is in circular structure
  const hit = cache.filter(c => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }
  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  });
  Object.keys(obj).forEach(key => (copy[key] = deepCopy(obj[key], cache)));

  return copy;
};

/**
 * @description 防抖函数
 *
 * @param {function} fn
 * @param {number} [wait=300]
 * @param {boolean} [leading=true]
 * @returns
 */
function _debounce(fn, wait=1000, leading=true) {
  let timerId, result;
  return function(...args) {
    timerId && clearTimeout(timerId);
    if (leading) {
      if (!timerId) {
        result = fn.apply(this, args)
      }
      timerId = setTimeout(() => {
        timerId = null;
      }, wait);
    } else {
      timerId = setTimeout(() => {
        result = fn.apply(this, args)
      }, wait);
    }
    return result;
  }
}

/**
 * @description 节流函数
 *
 * @param {function} fn
 * @param {number} [wait=1000]
 * @param {boolean} [leading=true] false表示禁用第一次执行
 * @param {boolean} [trailing=true] false表示禁用停止触发的回调
 * @returns function
 */
function _throttle(fn, wait=1000, leading=true, trailing=true) {
  let prev = 0;
  let timerId;
  const later = function(args) {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      fn.apply(this, args)
    }, wait);
  }
  return function(...args) {
    let now = +new Date();
    // 立即执行一次
    if (!leading) {
      return later(args)
    }
    if (now - prev > wait) {
      fn.apply(this, args)
      prev = now;
    }
    if (trailing) {
      later(args)
    }
  }
}
Function.prototype._myCall = _call;
Function.prototype._myApply = _myApply;
Function.prototype._myBind = _bind;
export default {
  _unique,
  _uniqueArray,
  _typeof,
  _deepClone,
  _debounce,
  _throttle
};

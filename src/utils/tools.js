/**
 * 千位分隔符
 *
 * @param {*} num
 * @returns
 */
const commafy = num => {
  const reg = /(\d)(?=(\d{3})+\.)/g;
  return num.toString().replace(reg, ($0, $1) => {
    return $1 + ",";
  });
};
/**
 * 查找字符串中出现次数最多的字符
 *
 */
const findMaxStr = str => {
  let num = 0;
  let char = "";
  // 使其按照一定的次序排列
  str = str
    .split("")
    .sort()
    .join("");

  // 定义正则表达式
  const reg = /(\w)\1+/g;
  str.replace(reg, ($0, $1) => {
    if (num < $0.length) {
      num = $0.length;
      char = $1;
    }
  });
  return [num, char];
};
/**
 * 短横线命名转换为驼峰命名法
 *
 * @param {*} s
 * @returns
 */
const transToUpperCase = s => {
  return s.replace(/-\w/g, $0 => {
    return $0.slice(1).toUpperCase();
  });
};

/**
 * Ajax请求
 * Ajax状态

    0：未初始化。尚未调用 open()方法。
    1：启动。已经调用 open()方法，但尚未调用 send()方法。
    2：发送。已经调用 send()方法，但尚未接收到响应。
    3：接收。已经接收到部分响应数据。
    4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

 */
const $ajax = function(
  url,
  method = "get",
  data,
  config = { timeout: 10000, withCredentials: false, header: {} }
) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const { timeout, withCredentials, header } = config;
    xhr.timeout = timeout;
    xhr.withCredentials = withCredentials;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };
    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", transferComplete);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);
    // loadend 事件可以侦测到所有的三种加载结束条件（abort、load，或 error）
    xhr.addEventListener("loadend", transferLoadend);
    // 服务端到客户端的传输进程（下载）
    function updateProgress(event) {
      if (event.lengthComputable) {
        var percentComplete = (event.loaded / event.total) * 100;
        console.log(percentComplete);
        // ...
      } else {
        // 总大小未知时不能计算进程信息
        console.log("progress", event);
      }
    }

    function transferComplete(res) {
      console.log("load", res);
    }

    function transferFailed(res) {
      console.log("An error occurred while transferring the file.", res);
    }

    function transferCanceled(res) {
      console.log("The transfer has been canceled by the user.", res);
    }
    function transferLoadend(res) {
      console.log("The transfer is loadend.", res);
    }

    // 查询字符串中每个参数的名称和值都必须使用encodeURIComponent()进行编码，然后才能放到URL的末尾；
    // 而且所有名-值对儿都必须由和号（&）分隔
    xhr.open(method, url);

    // 设置 HTTP 请求头的值, 必须在 open() 之后、send() 之前调用 setRequestHeader() 方法。
    for (let key in header) {
      xhr.setRequestHeader(key, header[key]);
    }
    xhr.send(data);
  });
};

/**
 * 深拷贝
 *
 * @param {*} obj
 * @returns
 */
const deepClone = function(obj) {
  let result = obj.constructor === Array ? [] : {};
  for (let key of obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return result;
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
 * @description 模拟call 第二版
 *
 * @param {*} context
 * @param {*} args
 * @returns
 */
const _call = function(context, ...args) {
  // if (context === null || context === undefined) {
  //   context = window;
  // } else {
  //   context = Object(context);
  // }
  context = context ? Object(context) : window;
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
  context[key] = this;
  const type = Array.isArray(args);
  // 判断参数是否是数组类型
  if (!type) {
    throw new Error(
      `second argument to Function.prototype._myApply must be an array`
    );
  }
  const result = context[key](...args);
  delete context[key];
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
  // Object.keys(obj).forEach(key => (copy[key] = deepCopy(obj[key], cache)));

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
function _debounce(fn, wait = 1000, leading = true) {
  let timerId, result;
  return function(...args) {
    timerId && clearTimeout(timerId);
    if (leading) {
      if (!timerId) {
        result = fn.apply(this, args);
      }
      timerId = setTimeout(() => {
        timerId = null;
      }, wait);
    } else {
      timerId = setTimeout(() => {
        result = fn.apply(this, args);
      }, wait);
    }
    return result;
  };
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
function _throttle(fn, wait = 1000, leading = true, trailing = true) {
  let prev = 0;
  let timerId;
  const later = function(args) {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      fn.apply(this, args);
    }, wait);
  };
  return function(...args) {
    let now = +new Date();
    // 立即执行一次
    if (!leading) {
      return later(args);
    }
    if (now - prev > wait) {
      fn.apply(this, args);
      prev = now;
    }
    if (trailing) {
      later(args);
    }
  };
}
/**
 * 判断鼠标移入的方向
 * @param(e) 鼠标事件对象
 */
export const getMouseDirection = function(e) {
  /*以浏览器可视区域的左上角建立坐标系*/
  //表示左上角和右下角及中心点坐标
  //表示左上角和右下角的对角线斜率
  //用getBoundingClientRect比较省事，而且它的兼容性还不错
  const rect = e.target.getBoundingClientRect();
  if (!rect.width) {
    rect.width = rect.right - rect.left;
  }
  if (!rect.height) {
    rect.height = rect.bottom - rect.top;
  }
  //求各个点坐标 注意y坐标应该转换为负值，因为浏览器可视区域左上角为(0,0)，整个可视区域属于第四象限
  const x1 = rect.left;
  const y1 = -rect.top;
  const x4 = rect.left + rect.width;
  const y4 = -(rect.top + rect.height);
  const x0 = rect.left + rect.width / 2;
  const y0 = -(rect.top + rect.height / 2);
  //矩形不够大，不考虑
  if (Math.abs(x1 - x4) < 0.0001) return 4;
  //计算对角线斜率
  const k = (y1 - y4) / (x1 - x4);
  const range = [k, -k];
  //表示鼠标当前位置的点坐标
  const x = e.clientX;
  const y = -e.clientY;
  //表示鼠标当前位置的点与元素中心点连线的斜率
  const kk = (y - y0) / (x - x0);
  //如果斜率在range范围内，则鼠标是从左右方向移入移出的
  if (isFinite(kk) && range[0] < kk && kk < range[1]) {
    //根据x与x0判断左右
    return x > x0 ? "right" : "left";
  } else {
    //根据y与y0判断上下
    return y > y0 ? "top" : "bottom";
  }
};
export default {
  $ajax,
  deepClone,
  _typeof,
  _myCall,
  _deep,
  _myBind,
  _deepClone,
  _debounce,
  _throttle
};

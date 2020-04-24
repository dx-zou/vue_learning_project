/* 
  set 数据结构
  Set结构的实例有以下属性。
  Set.prototype.constructor：构造函数，默认就是Set函数。
  Set.prototype.size：返回Set实例的成员总数。

  Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
  add(value)：添加某个值，返回Set结构本身。
  delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  has(value)：返回一个布尔值，表示该值是否为Set的成员。
  clear()：清除所有成员，没有返回值。
*/
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference);
/**
 * Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
 * 所以属于一种“元编程”（meta programming），即对编程语言进行编程。
   Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
   因此提供了一种机制，可以对外界的访问进行过滤和改写。
   Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
 */
let target = {};
let handler = {
  get: function(target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function(target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
};
var obj = new Proxy(target, handler);
obj.name = "feng";
// console.log(obj);

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
// console.log(difference);

/**
 * WeakSet
 * WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。
 * 首先，WeakSet的成员只能是对象，而不能是其他类型的值。
 * 其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，
 * 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，
 * 不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。
 */
const weakset = new WeakSet([{ a: 1 }, { a: 1 }]);

/**
 * Map数据结构
 * ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，
 * 各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，
 * Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适
 *
 * WeakMap
 * 结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），
 * 不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制
 */
const map = new Map([
  ["name", "feng"],
  ["age", 18]
]);
const k = [5];
map.set(k, 555);
const res = map.get(k);
// console.log(res);
// console.log(map.size);
/**
 * Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
 * 所以属于一种“元编程”（meta programming），即对编程语言进行编程。
   Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，
   因此提供了一种机制，可以对外界的访问进行过滤和改写。
   Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
   方法：set，get，has，delete，size
 */
let target = {};
let handler = {
  get: function(target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function(target, propKey, value, receiver) {
    // console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
};
var obj = new Proxy(target, handler);
obj.name = "feng";
// console.log(obj);

/**
 * class 类
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }
}
const p = new Point(1, 2);
const o = Object.getPrototypeOf(p);
console.log(o);
console.log(p);

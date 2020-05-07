/**
 * 原型继承的实现
 *
 */

function Super(name) {
  this.name = name;
  console.log(name);
}

function Child(name, age) {
  Super.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Super);

Child.prototype.constructor = Child;

const c = new Child("test", 19);

console.log(c.name);

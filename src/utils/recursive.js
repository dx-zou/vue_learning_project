/**
 * 斐波那契数列
 *
 * @param {*} n
 * @returns
 */
function f(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return f(n - 1) + f(n - 2);
}
console.time();
console.log(f(10));

console.timeEnd();

/**
 * promise.all()
 * all的用法：谁跑的慢，以谁为准执行回调。all接收一个数组参数，里面的值最终都算返回Promise对象
 *
 */
let Promise1 = new Promise(function() {});
let Promise2 = new Promise(function() {});
let Promise3 = new Promise(function() {});

let p = Promise.all([Promise1, Promise2, Promise3]);

p.then(
  function() {
    // 三个都成功则成功
  },
  function() {
    // 只要有失败，则失败
  }
);

/**
 * promise.race()
 * race的用法：谁执行的快，以谁为准执行回调
 * 可以用race给某个异步请求设置超时时间，并且在超时后执行相应的操作
 */
// 请求某个图片资源
// function requestImg() {
//   return new Promise((resolve, reject) => {
//     var img = new Image();
//     img.onload = function() {
//       resolve(img);
//     };
//     img.src = "图片的路径";
//   });
// }
// // 延时函数，用于给请求计时
// function timeout() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject("图片请求超时");
//     }, 3000);
//   });
// }

// Promise.race([requestImg(), timeout()])
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const test = new Promise((resolve, reject) => {
  reject(1);
});

test.finally(res => {
  console.log(res);
});

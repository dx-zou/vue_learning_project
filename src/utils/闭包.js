for (var i = 0; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 1000 * i);
}
for (var j = 0; j <= 5; j++) {
  (function(j) {
    setTimeout(function timer() {
      console.log(j);
    }, 1000);
  })(j);
}
for (var k = 0; k <= 5; k++) {
  setTimeout(
    function timer() {
      console.log(k);
    },
    1000,
    k
  );
}
for (let i = 0; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, 1000);
}
for (let i = 0; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

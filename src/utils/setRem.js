windowResize();
window.onresize = windowResize;

function windowResize() {
  var width = document.documentElement.clientWidth || document.body.clientWidth;
  // if (width > 1920) width = 1920;
  // if (width < 320) width = 320;
  document.querySelector("html").style.fontSize = (width / 1800) * 100 + "px";
}

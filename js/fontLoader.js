var cb = function() {
  var f = document.createElement('link'); f.rel = 'stylesheet';
  f.href = '//fonts.googleapis.com/css?family=Open+Sans:400,700';
  var s = document.getElementsByTagName('head')[0]; s.parentNode.insertBefore(f, s);
};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
    webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(cb);
else window.addEventListener('load', cb);

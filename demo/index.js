console.log('here');

var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
var canvas = document.querySelector('canvas');
var ctx    = canvas.getContext('2d');

var pxRatio = window.devicePixelRatio;

var W = w * pxRatio;
var H = h * pxRatio;

canvas.width        = W;
canvas.height       = H;
canvas.style.width  = w + 'px';
canvas.style.height = h + 'px';


var points = new Array(4).fill(0).map(function () {
  return [Math.random() * 100 - 100, Math.random() * 100 - 100, Math.random() * 100 - 100];
});

console.log(points, new wspd.SplitTree(points, 3).root);

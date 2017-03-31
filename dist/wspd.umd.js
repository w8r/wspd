(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.wspd = factory());
}(this, (function () { 'use strict';

var min = Math.min;
var max = Math.max;

/**
 * @typedef {Array<Number>} HyperRect
 */

function bbox (points, dim) {
  var b = new Array(dim * 2);
  var i, j, p, len = points.length;
  for (i = 0; i < dim; i++) {
    b[i]       =  Infinity;
    b[dim + i] = -Infinity;
  }

  for (i = 0; i < len; i++) {
    p = points[i];
    for (j = 0; j < dim; j++) {
      b[j]       = min(b[j], p[j]);
      b[dim + j] = max(b[dim + j], p[j]);
    }
  }
  return b;
}


function getMaxDimension (box, dim) {
  var maxDist = 0, maxDim = 0;
  for (var i = 0; i < dim; i++) {
    var dist = box[dim + i] - box[i];
    if (dist > maxDist) {
      maxDist = dist;
      maxDim = i;
    }
  }
  return { dimension: maxDim, threshold: box[maxDim] + maxDist / 2 };
}


var SplitTree = function SplitTree (points, dimensions) {
  if ( points === void 0 ) points = [];
  if ( dimensions === void 0 ) dimensions = 2;

  this._dim= dimensions;
  this._root = this.build(null, points, this._dim);
};

var prototypeAccessors = { root: {} };


SplitTree.prototype.build = function build (parent, points, dim) {
  if (points.length === 1) { return { parent: parent, points: points, isLeaf: true }; }

  // bounding hyper rectangle
  var hyperrect = bbox(points, dim);
  var node    = { bbox: hyperrect, parent: parent, isLeaf: false };

  // hyperplane
  var ref = getMaxDimension(hyperrect, dim);
    var dimension = ref.dimension;
    var threshold = ref.threshold;
  console.log(points, hyperrect, dimension, threshold);

  var left = [], right = [];

  for (var i = 0, len = points.length; i < len; i++) {
    var p = points[i];
    (p[dimension] < threshold ? left : right).push(p);
  }

  node.left= this.build(node, left,dim);
  node.right = this.build(node, right, dim);

  return node;
};


prototypeAccessors.root.get = function () {
  return this._root;
};

Object.defineProperties( SplitTree.prototype, prototypeAccessors );

SplitTree.bbox = bbox;

var wspd = function () {

};

wspd.SplitTree = SplitTree;

return wspd;

})));
//# sourceMappingURL=wspd.umd.js.map

const { min, max } = Math;

/**
 * @typedef {Array<Number>} HyperRect
 */

function bbox (points, dim) {
  const b = new Array(dim * 2);
  let i, j, p, len = points.length;
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
  let maxDist = 0, maxDim = 0;
  for (let i = 0; i < dim; i++) {
    let dist = box[dim + i] - box[i];
    if (dist > maxDist) {
      maxDist = dist;
      maxDim = i;
    }
  }
  return { dimension: maxDim, threshold: box[maxDim] + maxDist / 2 };
}


export default class SplitTree {


  constructor (points = [], dimensions = 2) {
    this._dim  = dimensions;
    this._root = this.build(null, points, this._dim);
  }


  build (parent, points, dim) {
    if (points.length === 1) return { parent, points, isLeaf: true };

    // bounding hyper rectangle
    const hyperrect = bbox(points, dim);
    const node      = { bbox: hyperrect, parent, isLeaf: false };

    // hyperplane
    const { dimension, threshold } = getMaxDimension(hyperrect, dim);
    console.log(points, hyperrect, dimension, threshold);

    const left = [], right = [];

    for (let i = 0, len = points.length; i < len; i++) {
      let p = points[i];
      (p[dimension] < threshold ? left : right).push(p);
    }

    node.left  = this.build(node, left,  dim);
    node.right = this.build(node, right, dim);

    return node;
  }


  get root () {
    return this._root;
  }
}

SplitTree.bbox = bbox;

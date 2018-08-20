'use strict';

const { random, floor, round, ceil } = Math;

const GLOBAL = {
  width: 0,
  height: 0,
};

const map = (val, start1, end1, start2, end2) =>
  val / (end1 - start1) * (end2 - start2) + start2;

const randomRange = (a, b) =>
  floor(random() * (b - a)) + a;

const setDimentions = (x, y) => {
  GLOBAL.width = x;
  GLOBAL.height = y;
};

const toRGB = (hex) => {
  const str = hex.slice(1);
  if (str.length === 3) {
    return [str[0], str[1], str[2]].map(val => parseInt(val, 16));
  }
  if (str.length === 6) {
    return [
      str.slice(0, 2),
      str.slice(2, 4),
      str.slice(4, 6)
    ].map(val => parseInt(val, 16));
  }
  return;
};

const toHEX = (rgb) => {
  if (rgb.some(v => v > 255)) return;
  return rgb.reduce((res, cur) =>
    res + (cur < 16 ? '0' : '') + cur.toString(16), '#');
};

function Palette(...cls) {
  this.colors = cls;
}

Palette.prototype.getCl = function (val) {
  const [c1, c2] = this.colors;
  return [0, 0, 0].map((e, i) =>
    round(map(val, 0, 1, c1[i], c2[i])));
}

const getXY = (index) =>
  [index % GLOBAL.width, floor(index / GLOBAL.width)];

module.exports = {
  toRGB, toHEX, getXY, setDimentions, map, Palette, randomRange
};

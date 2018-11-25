'use strict';

const { random, floor, round, ceil, min, max } = Math;

const GLOBAL = {
  width: 0,
  height: 0,
};

/**
 * 
 * @param {numbrt} val
 * @param {number} start1
 * @param {number} end1
 * @param {number} start2
 * @param {number} end2
 * @returns {number}
 */
const map = (val, start1, end1, start2, end2) =>
  (val - start1) / (end1 - start1) * (end2 - start2) + start2;

const numMap = (start, end, length) =>
  new Array(length).fill().map((v, i) => map(i, 0, length, start, end));


const randomRange = (a, b) =>
  floor(random() * (b - a)) + a;

const setDimentions = (x, y) => {
  GLOBAL.width = x;
  GLOBAL.height = y;
};

/**
 * @param {string} hex
 * @returns {number[]}
 */
const toRGB = (hex) => {
  const str = hex.slice(1);
  if (str.length === 3) {
    return [str[0] + str[0], str[1] + str[1], str[2] + str[2]]
      .map(val => parseInt(val, 16));
  }
  if (str.length === 6) {
    return [
      str.slice(0, 2),
      str.slice(2, 4),
      str.slice(4, 6)
    ].map(val => parseInt(val, 16));
  }
  throw new Error('Bad HEX color value');
};

/**
 * @param {number[]} rgb
 * @returns {number[]}
 */
const RGBtoHSV = (rgb) => {
  const
    [R, G, B] = rgb.map(v => v / 255),
    MAX = max(R, G, B),
    MIN = min(R, G, B),
    DIF = MAX - MIN;

  const
    H = MAX === MIN ? 0 :
      (MAX === R && G >= B) ? 60 * (G - B) / DIF :
        (MAX === R && G < B) ? 60 * (G - B) / DIF + 360 :
          (MAX === G) ? 60 * (B - R) / DIF + 120 :
            (MAX === B) ? 60 * (R - G) / DIF + 240 : 0,

    S = MAX === 0 ? 0 : (1 - MIN / MAX),

    V = MAX;

  return [H, S, V];
};

/**
 * @param {number[]} hsv
 * @returns {number[]}
 */
const HSVtoRGB = (hsv) => {
  const
    [H, S, V] = [hsv[0], hsv[1] * 100, hsv[2] * 100],
    Hi = floor(H / 60),
    Vmin = (100 - S) * V / 100,
    a = (V - Vmin) * (H % 60) / 60,
    Vinc = Vmin + a,
    Vdec = V - a;
  return [
    [V, Vinc, Vmin],
    [Vdec, V, Vmin],
    [Vmin, V, Vinc],
    [Vmin, Vdec, V],
    [Vinc, Vmin, V],
    [V, Vmin, Vdec],
  ][Hi].map(v => round(v / 100 * 255));
};

/**
 * @param {number[]} rgb
 * @returns {string} A hex value of color
 */
const toHEX = (rgb) => {
  if (rgb.some(v => v > 255 || v < 0)) throw new Error('Bad rgb array');
  return rgb.reduce((res, cur) =>
    res + (cur < 16 ? '0' : '') + round(cur).toString(16), '#');
};

/**
 * 
 * @param {number[]} color1
 * @param {number[]} color2
 * @param {number} length
 * @returns {number[]}
 */

const getMap1d = (color1, color2, length) =>
  new Array(length).fill().map((v, i) =>
    [
      round(map(i, 0, length, color1[0], color2[0])),
      round(map(i, 0, length, color1[1], color2[1])),
      round(map(i, 0, length, color1[2], color2[2])),
    ]);


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

const fromXY = (x, y) => y * GLOBAL.width + x;

module.exports = {
  toRGB, toHEX, HSVtoRGB, RGBtoHSV,
  setDimentions, getXY, fromXY,
  Palette, randomRange,
  map, numMap,
  getMap1d,
};

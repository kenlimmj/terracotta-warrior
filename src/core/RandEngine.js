/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-23 21:28:39
 */

'use strict';

import seedRandom from 'seedrandom';

const defaultImgProviderUrl = '//lorempixel.com';
const defaultRNGSeed = 5;

export default class {
  constructor(options = {}) {
    this.imgProviderUrl = options.imgProviderUrl || defaultImgProviderUrl;
    this.seed = options.seed || defaultRNGSeed;

    seedRandom(this.seed, {
      global: true
    });
  }

  randFullNumber(digits = 3) {
    let result = "";

    for (let i = 0; i < digits; i++) {
      result += Math.floor(Math.random() * 9);
    }

    return result;
  }

  randRange(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randFromArray(arr) {
    return arr[this.randRange(0, arr.length)];
  }

  randBoolean() {
    return Math.random() > 0.5 ? true : false;
  }

  randImage(width = 500, height = 500, category = '') {
    return this.imgProviderUrl + '/' + width + '/' + height + '/' + category;
  }
}
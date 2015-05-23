/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 21:54:18
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-23 22:54:25
 */

'use strict';

import RandEngine from './RandEngine';
import TextFactory from './TextFactory';

const defaultIntegralOperator = '\\int\\!';
const defaultTrigOperators = [
  '\\sin',
  '\\asin',
  '\\cos',
  '\\acos',
  '\\tan',
  '\\atan'
];

const defaultFracOperator = '\\frac';
const defaultNumOperators = ['+', '-'];

const defaultEqualityOperators = [
  '=',
  '\\neq',
  '\\Rightarrow',
  '\\approx'
];

const defaultSuperOperator = '^';
const defaultSubOperator = '_';

const defaultTradMathDispEnv = ['$$', '$$'];
const defaultTradMathInlineEnv = ['$', '$'];

const defaultModernMathDispEnv = ['\[', '\]'];
const defaultModernMathInlineEnv = ['\(', '\)'];

export default class {
  constructor(options = {}) {
    this.engine = options.engine || new RandEngine();
    this.tf = new TextFactory({
      engine: this.engine
    });

    this.integralOperator = options.integralOperator ||
      defaultIntegralOperator;
    this.trigOperators = options.trigOperators || defaultTrigOperators;

    this.fracOperator = options.fracOperator || defaultFracOperator;
    this.numOperators = options.numOperators || defaultNumOperators;

    this.equalityOperators = options.equalityOperators ||
      defaultEqualityOperators;

    this.superOperator = options.superOperator || defaultSuperOperator;
    this.subOperator = options.subOperator || defaultSubOperator;

    this.tradMathDispEnv = options.tradMathDispEnv || defaultTradMathDispEnv;
    this.tradMathInlineEnv = options.tradMathInlineEnv ||
      defaultTradMathInlineEnv;

    this.modernMathDispEnv = options.modernMathDispEnv ||
      defaultModernMathDispEnv;
    this.modernMathInlineEnv = options.modernMathInlineEnv ||
      defaultModernMathInlineEnv;
  }

  randTerm(size = this.engine.randRange(2, 4)) {
    let result = [];

    for (let i = 0; i < size; i++) {
      result.push(this.tf.randLetter());
    }

    // TODO: Fix grouping of adjacent terms
    return result.sort().reduce((prevVal, currVal) => {
      if (prevVal === currVal) {
        return prevVal + this.superOperator + 2;
      } else {
        return prevVal + currVal;
      }
    }, '');
  }

  randExpression(size = this.engine.randRange(3, 5)) {
    let result = this.randTerm();

    for (let i = 0; i < size; i++) {
      result += this.engine.randFromArray(this.numOperators) + this.randTerm();
    }

    return result;
  }

  randFrac() {
    let numerator = "{" + this.randExpression() + "}";
    let denominator = "{" + this.randExpression() + "}";

    return this.fracOperator + numerator + denominator;
  }

  randCommand(type = this.engine.randFromArray(['exp', 'frac'])) {
    let upperLimit = this.superOperator + this.randTerm(1);
    let lowerLimit = this.subOperator + this.randTerm(1);
    let mainTerm = null;

    switch (type) {
      case 'exp':
        mainTerm = this.randExpression();
        break;
      case 'frac':
      default:
        mainTerm = this.randFrac();
        break;
    }

    return integralOperator + lowerLimit + upperLimit + " " + mainTerm +
      " \\,d" + this.randTerm(1);
  }

  randEquation(size = this.engine.randRange(3, 6)) {
    let result = '';

    for (let i = 0; i < size; i++) {
      let currentTerm = null;
      let diceRoll = this.engine.randRange(0, 2);

      switch (diceRoll) {
        case '0':
          currentTerm = this.randFrac();
          break;
        case '1':
          currentTerm = this.randCommand();
          break;
        case '2':
        default:
          currentTerm = this.randExpression();
          break;
      }

      if (i === 0) {
        result += currentTerm;
      } else {
        result += " " + this.engine.randFromArray(this.equalityOperators) +
          " " + currentTerm;
      }
    }

    return result;
  }

  wrapMath(eqn, opts = {}) {
    let style = opts.style || 'traditional';
    let mode = opts.display || 'display';

    let openEnv = null;
    let closeEnv = null;

    switch (mode) {
      case 'inline':
        switch (style) {
          case 'modern':
            openEnv = this.modernMathInlineEnv[0];
            closeEnv = this.modernMathInlineEnv[1];
            break;
          case 'traditional':
          default:
            openEnv = this.tradMathInlineEnv[0];
            closeEnv = this.tradMathInlineEnv[1];
            break;
        }
        break;
      case 'display':
      default:
        switch (style) {
          case 'modern':
            openEnv = this.modernMathDispEnv[0];
            closeEnv = this.modernMathDispEnv[1];
            break;
          case 'traditional':
          default:
            openEnv = this.tradMathDispEnv[0];
            closeEnv = this.tradMathDispEnv[1];
            break;
        }
        break;
    }

    return openEnv + eqn + closeEnv;
  }
}
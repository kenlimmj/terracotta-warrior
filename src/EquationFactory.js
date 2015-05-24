/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 21:54:18
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 10:46:08
 */

'use strict';

import countBy from 'lodash/collection/countBy';
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
  '\\approx',
  '\\equiv'
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
    this.tf = new TextFactory({ engine: this.engine });

    this.integralOperator = options.integralOperator || defaultIntegralOperator;
    this.trigOperators = options.trigOperators || defaultTrigOperators;
    this.fracOperator = options.fracOperator || defaultFracOperator;
    this.numOperators = options.numOperators || defaultNumOperators;
    this.equalityOperators = options.equalityOperators || defaultEqualityOperators;
    this.superOperator = options.superOperator || defaultSuperOperator;
    this.subOperator = options.subOperator || defaultSubOperator;

    this.tradMathDispEnv = options.tradMathDispEnv || defaultTradMathDispEnv;
    this.tradMathInlineEnv = options.tradMathInlineEnv || defaultTradMathInlineEnv;
    this.modernMathDispEnv = options.modernMathDispEnv || defaultModernMathDispEnv;
    this.modernMathInlineEnv = options.modernMathInlineEnv || defaultModernMathInlineEnv;
  }

  randTerm(size = this.engine.randRange(2, 4)) {
    let variables = [];
    let result = '';

    // Generate a random coefficient for the term
    let coeff = this.engine.randRange(1, 10);

    // Generate a list of variables to use in the term
    for (let i = 0; i < size; i++) {
      variables.push(this.tf.randLetter());
    }

    // Count the number of occurrences of each variable and sort them by alphabetical order
    let countedVariables = countBy(variables.sort());

    // Group and apply the correct coefficients to variables that occur more than once
    for (let item in countedVariables) {
      if (countedVariables[item] > 1) {
        result += item + this.superOperator + countedVariables[item];
      } else {
        result += item;
      }
    }

    // If the generated coefficient is greater than 1, append it to the result before returning
    if (coeff > 1) {
      return coeff + result;
    } else {
      return result;
    }
  }

  randExpression(size = this.engine.randRange(3, 5), sorted = true) {
    let terms = [];
    let result = '';

    // Generate the requested number of terms in the expression
    for (let i = 0; i < size; i++) {
      terms.push(this.randTerm());
    }

    // Sort the terms by alphabetical order
    if (sorted) { terms = terms.sort(); }

    for (let i = 0; i < size; i++) {
      if (i !== 0) {
        result += this.engine.randFromArray(this.numOperators) + terms[i];
      } else {
        result += terms[i];
      }
    }

    return result;
  }

  randFrac() {
    // Generate the numerator of the fraction and encapsulate it
    let numerator = "{" + this.randExpression() + "}";

    // Generate the denominator of the fraction and encapsulate it
    let denominator = "{" + this.randExpression() + "}";

    // Combine results with the fraction operator
    return this.fracOperator + numerator + denominator;
  }

  randIntegral(type = this.engine.randFromArray(['exp', 'frac'])) {
    // Generate the lower and upper limits used with the command
    let upperLimit = this.superOperator + this.randTerm(1);
    let lowerLimit = this.subOperator + this.randTerm(1);

    // Initialize a placeholder for the main term that follows the command
    let mainTerm = null;

    // Generate either an expression or a fraction with equal probability
    switch (type) {
      case 'exp':
        mainTerm = this.randExpression();
        break;
      case 'frac':
      default:
        mainTerm = this.randFrac();
        break;
    }

    // Combine everything and add an integration variable
    return this.integralOperator + lowerLimit + upperLimit + " " + mainTerm + " \\,d" + this.randTerm(1);
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
        result += " " + this.engine.randFromArray(this.equalityOperators) + " " + currentTerm;
      }
    }

    return result;
  }

  wrapMath(eqn, opts = {}) {
    // Establish defaults for the kind of wrapper used
    let style = opts.style || 'traditional';
    let mode = opts.display || 'display';

    // Initialize placeholders
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
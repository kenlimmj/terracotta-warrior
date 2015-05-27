/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 21:54:18
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-26 13:32:13
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodashCollectionCountBy = require('lodash/collection/countBy');

var _lodashCollectionCountBy2 = _interopRequireDefault(_lodashCollectionCountBy);

var _RandEngine = require('./RandEngine');

var _RandEngine2 = _interopRequireDefault(_RandEngine);

var _TextFactory = require('./TextFactory');

var _TextFactory2 = _interopRequireDefault(_TextFactory);

var defaultIntegralOperator = '\\int\\!';
var defaultTrigOperators = ['\\sin', '\\asin', '\\cos', '\\acos', '\\tan', '\\atan'];

var defaultFracOperator = '\\frac';
var defaultNumOperators = ['+', '-'];

var defaultEqualityOperators = ['=', '\\neq', '\\Rightarrow', '\\approx', '\\equiv'];

var defaultSuperOperator = '^';
var defaultSubOperator = '_';

var defaultTradMathDispEnv = ['$$', '$$'];
var defaultTradMathInlineEnv = ['$', '$'];

var defaultModernMathDispEnv = ['[', ']'];
var defaultModernMathInlineEnv = ['(', ')'];

var _default = (function () {
  var _class = function _default() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, _class);

    this.engine = options.engine || new _RandEngine2['default']();
    this.tf = new _TextFactory2['default']({ engine: this.engine });

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
  };

  _createClass(_class, [{
    key: 'randTerm',
    value: function randTerm() {
      var size = arguments[0] === undefined ? this.engine.randRange(2, 4) : arguments[0];

      var variables = [];
      var result = '';

      // Generate a random coefficient for the term
      var coeff = this.engine.randRange(1, 10);

      // Generate a list of variables to use in the term
      for (var i = 0; i < size; i++) {
        variables.push(this.tf.randLetter());
      }

      // Count the number of occurrences of each variable and sort them by alphabetical order
      var countedVariables = (0, _lodashCollectionCountBy2['default'])(variables.sort());

      // Group and apply the correct coefficients to variables that occur more than once
      for (var item in countedVariables) {
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
  }, {
    key: 'randExpression',
    value: function randExpression() {
      var size = arguments[0] === undefined ? this.engine.randRange(3, 5) : arguments[0];
      var sorted = arguments[1] === undefined ? true : arguments[1];

      var terms = [];
      var result = '';

      // Generate the requested number of terms in the expression
      for (var i = 0; i < size; i++) {
        terms.push(this.randTerm());
      }

      // Sort the terms by alphabetical order
      if (sorted) {
        terms = terms.sort();
      }

      for (var i = 0; i < size; i++) {
        if (i !== 0) {
          result += this.engine.randFromArray(this.numOperators) + terms[i];
        } else {
          result += terms[i];
        }
      }

      return result;
    }
  }, {
    key: 'randFrac',
    value: function randFrac() {
      // Generate the numerator of the fraction and encapsulate it
      var numerator = '{' + this.randExpression() + '}';

      // Generate the denominator of the fraction and encapsulate it
      var denominator = '{' + this.randExpression() + '}';

      // Combine results with the fraction operator
      return this.fracOperator + numerator + denominator;
    }
  }, {
    key: 'randIntegral',
    value: function randIntegral() {
      var type = arguments[0] === undefined ? this.engine.randFromArray(['exp', 'frac']) : arguments[0];

      // Generate the lower and upper limits used with the command
      var upperLimit = this.superOperator + this.randTerm(1);
      var lowerLimit = this.subOperator + this.randTerm(1);

      // Initialize a placeholder for the main term that follows the command
      var mainTerm = null;

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
      return this.integralOperator + lowerLimit + upperLimit + ' ' + mainTerm + ' \\,d' + this.randTerm(1);
    }
  }, {
    key: 'randEquation',
    value: function randEquation() {
      var size = arguments[0] === undefined ? this.engine.randRange(3, 6) : arguments[0];

      var result = '';

      for (var i = 0; i < size; i++) {
        var currentTerm = null;
        var diceRoll = this.engine.randRange(0, 2);

        switch (diceRoll) {
          case '0':
            currentTerm = this.randFrac();
            break;
          case '1':
            currentTerm = this.randIntegral();
            break;
          case '2':
          default:
            currentTerm = this.randExpression();
            break;
        }

        if (i === 0) {
          result += currentTerm;
        } else {
          result += ' ' + this.engine.randFromArray(this.equalityOperators) + ' ' + currentTerm;
        }
      }

      return result;
    }
  }, {
    key: 'wrapMath',
    value: function wrapMath(eqn) {
      var opts = arguments[1] === undefined ? {} : arguments[1];

      // Establish defaults for the kind of wrapper used
      var style = opts.style || 'traditional';
      var mode = opts.mode || 'display';

      // Initialize placeholders
      var openEnv = null;
      var closeEnv = null;

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
  }]);

  return _class;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=EquationFactory.js.map
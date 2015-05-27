/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 18:43:49
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _seedrandom = require('seedrandom');

var _seedrandom2 = _interopRequireDefault(_seedrandom);

var defaultImgProviderUrl = '//lorempixel.com';
var defaultRNGSeed = 4;

var _default = (function () {
  var _class = function _default() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, _class);

    this.imgProviderUrl = options.imgProviderUrl || defaultImgProviderUrl;
    this.seed = options.seed || defaultRNGSeed;

    (0, _seedrandom2['default'])(this.seed, {
      global: true
    });
  };

  _createClass(_class, [{
    key: 'randFullNumber',
    value: function randFullNumber() {
      var digits = arguments[0] === undefined ? 3 : arguments[0];

      var result = '';

      for (var i = 0; i < digits; i++) {
        result += Math.floor(Math.random() * 9);
      }

      return result;
    }
  }, {
    key: 'randRange',
    value: function randRange() {
      var min = arguments[0] === undefined ? 0 : arguments[0];
      var max = arguments[1] === undefined ? 1 : arguments[1];

      // Swap the inputs if max is smaller than min
      if (max < min) {
        var temp = max;
        max = min;
        min = temp;
      }

      return Math.floor(Math.random() * (max - min) + min);
    }
  }, {
    key: 'randFromArray',
    value: function randFromArray(arr) {
      return arr[this.randRange(0, arr.length)];
    }
  }, {
    key: 'randBoolean',
    value: function randBoolean() {
      return Math.random() > 0.5 ? true : false;
    }
  }, {
    key: 'randImage',
    value: function randImage() {
      var width = arguments[0] === undefined ? 500 : arguments[0];
      var height = arguments[1] === undefined ? 500 : arguments[1];
      var category = arguments[2] === undefined ? '' : arguments[2];

      return this.imgProviderUrl + '/' + width + '/' + height + '/' + category;
    }
  }]);

  return _class;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=RandEngine.js.map
/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 20:58:28
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-23 21:53:00
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _RandEngine = require('./RandEngine');

var _RandEngine2 = _interopRequireDefault(_RandEngine);

var _TextFactory = require('./TextFactory');

var _TextFactory2 = _interopRequireDefault(_TextFactory);

var defaultItemSyntax = '- ';
var defaultEnumSyntax = '* ';
var defaultQuoteSyntax = '> ';

var _default = (function () {
  var _class = function _default() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, _class);

    this.engine = options.engine || new _RandEngine2['default']();
    this.tf = new _TextFactory2['default']({
      engine: this.engine
    });

    this.itemSyntax = options.itemSyntax || defaultItemSyntax;
    this.enumSyntax = options.enumSyntax || defaultEnumSyntax;
    this.quoteSyntax = options.quoteSyntax || defaultQuoteSyntax;
  };

  _createClass(_class, [{
    key: 'randImageMarkup',
    value: function randImageMarkup() {
      var altText = '![' + this.tf.randTitle() + ']';
      var markupImage = '(' + this.engine.randImage() + ')';

      return altText + markupImage;
    }
  }, {
    key: 'randItemList',
    value: function randItemList() {
      var size = arguments[0] === undefined ? this.engine.randRange(3, 5) : arguments[0];

      var result = '';

      for (var i = 0; i < size; i++) {
        if (i === size - 1) {
          result += this.itemSyntax + this.tf.randSentence();
        } else {
          result += this.itemSyntax + this.tf.randSentence() + '\n';
        }
      }

      return result;
    }
  }, {
    key: 'randEnumList',
    value: function randEnumList() {
      var size = arguments[0] === undefined ? this.engine.randRange(3, 5) : arguments[0];

      var result = '';

      for (var i = 0; i < size; i++) {
        // Always start the list with "*." because Markdown
        // ignores the actual characters used for each item
        if (i === size - 1) {
          result += this.enumSyntax + this.tf.randSentence();
        } else {
          result += this.enumSyntax + this.tf.randSentence() + '\n';
        }
      }

      return result;
    }
  }, {
    key: 'randQuote',
    value: function randQuote() {
      return this.quoteSyntax + this.tf.randSentence();
    }
  }, {
    key: 'randContent',
    value: function randContent() {
      var size = arguments[0] === undefined ? this.engine.randRange(3, 7) : arguments[0];
      var noRepeat = arguments[1] === undefined ? false : arguments[1];

      var result = this.tf.randParagraph();
      var prevRoll = -1;

      for (var i = 1; i < size; i++) {
        var diceRoll = this.engine.randRange(0, 5);

        if (noRepeat) {
          while (diceRoll === prevRoll) {
            diceRoll = this.engine.randRange(0, 5);
          }
        }

        prevRoll = diceRoll;

        switch (diceRoll) {
          case 0:
            result += '\n\n' + this.randEnumList();
            break;
          case 1:
            result += '\n\n' + this.randItemList();
            break;
          case 2:
            // result += "\n\n" + Equation.wrapMath(Equation.randEquation());
            break;
          case 3:
            result += '\n\n' + this.randQuote();
            break;
          case 4:
            result += '\n\n' + this.randImageMarkup();
            break;
          case 5:
          default:
            result += '\n\n' + this.randParagraph();
            break;
        }
      }

      return result;
    }
  }]);

  return _class;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=MarkdownFactory.js.map
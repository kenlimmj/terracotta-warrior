/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-25 16:19:14
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

// List of characters in the alphabet.
var defaultCharList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// List of punctuation used in the middle of sentences
var defaultBasePuncList = [',', ';', ' -', ':'];

// List of punctuation used at the end of sentences
var defaultEndingPuncList = ['.', '?', '!'];

// Flag to toggle whether enhanced punctuation is used
var defaultEnhancedPunctuation = false;

// List of punctuation whose correct display may or may not be supported
var defaultEnhancedPuncList = defaultBasePuncList.concat([' ---', ' --', '...']);

// List of default words from the Lorem Ipsum library
var defaultWordList = ['a', 'ab', 'accusamus', 'accusantium', 'ad', 'adipisci', 'alias', 'aliquam', 'aliquid', 'amet', 'animi', 'aperiam', 'architecto', 'asperiores', 'aspernatur', 'assumenda', 'at', 'atque', 'aut', 'autem', 'beatae', 'blanditiis', 'commodi', 'consectetur', 'consequatur', 'consequuntur', 'corporis', 'corrupti', 'culpa', 'cum', 'cumque', 'cupiditate', 'debitis', 'delectus', 'deleniti', 'deserunt', 'dicta', 'dignissimos', 'distinctio', 'dolor', 'dolore', 'dolorem', 'doloremque', 'dolores', 'doloribus', 'dolorum', 'ducimus', 'ea', 'eaque', 'earum', 'eius', 'eligendi', 'enim', 'eos', 'error', 'esse', 'est', 'et', 'eum', 'eveniet', 'ex', 'excepturi', 'exercitationem', 'expedita', 'explicabo', 'facere', 'facilis', 'fuga', 'fugiat', 'fugit', 'harum', 'hic', 'id', 'illo', 'illum', 'impedit', 'in', 'incidunt', 'inventore', 'ipsa', 'ipsum', 'iste', 'itaque', 'iure', 'iusto', 'labore', 'laboriosam', 'laborum', 'laudantium', 'libero', 'magnam', 'magni', 'maiores', 'maxime', 'minima', 'minus', 'modi', 'molestiae', 'molestias', 'mollitia', 'nam', 'natus', 'necessitatibus', 'nemo', 'neque', 'nesciunt', 'nihil', 'nisi', 'nobis', 'non', 'nostrum', 'nulla', 'numquam', 'occaecati', 'odio', 'odit', 'officia', 'officiis', 'omnis', 'optio', 'pariatur', 'perferendis', 'perspiciatis', 'placeat', 'porro', 'possimus', 'praesentium', 'provident', 'quae', 'quaerat', 'quam', 'quas', 'quasi', 'qui', 'quia', 'quibusdam', 'quidem', 'quis', 'quisquam', 'quo', 'quod', 'quos', 'ratione', 'recusandae', 'reiciendis', 'rem', 'repellat', 'repellendus', 'reprehenderit', 'repudiandae', 'rerum', 'saepe', 'sapiente', 'sed', 'sequi', 'similique', 'sint', 'sit', 'soluta', 'sunt', 'suscipit', 'tempora', 'tempore', 'temporibus', 'tenetur', 'totam', 'ullam', 'unde', 'ut', 'vel', 'velit', 'veniam', 'veritatis', 'vero', 'vitae', 'voluptas', 'voluptate', 'voluptatem', 'voluptates', 'voluptatibus', 'voluptatum'];

// Capitalizes the first character of every word in the input string
// unless it is a connecting word
var toTitleCase = function toTitleCase(input) {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function (match, index, title) {
    if (index > 0 && index + match.length !== title.length && match.search(smallWords) > -1 && title.charAt(index - 2) !== ':' && (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') && title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};

var _default = (function () {
  var _class = function _default() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, _class);

    this.engine = options.engine || new _RandEngine2['default']();

    this.charList = options.charList || defaultCharList;
    this.wordList = options.wordList || defaultWordList;
    this.endingPuncList = options.endingPuncList || defaultEndingPuncList;

    // Switch the punctuation list depending on whether enhanced
    // punctuation is requested
    if (options.enhancedPunctuation) {
      this.puncList = options.puncList || defaultBasePuncList;
    } else {
      this.puncList = options.puncList || defaultEnhancedPuncList;
    }
  };

  _createClass(_class, [{
    key: 'randLetter',
    value: function randLetter() {
      // Draw a letter at random from the character list
      return this.engine.randFromArray(this.charList);
    }
  }, {
    key: 'randWord',
    value: function randWord() {
      // Draw a word at random from the word list
      return this.engine.randFromArray(this.wordList);
    }
  }, {
    key: 'randTitle',
    value: function randTitle() {
      var size = arguments[0] === undefined ? this.engine.randRange(3, 10) : arguments[0];

      // Seed the result with a random word
      var result = this.randWord();

      // Add to the result until the desired length is reached
      for (var i = 1; i < size; i++) {
        result += ' ' + this.randWord();
      }

      // Convert the result to title case, because title.
      return toTitleCase(result);
    }
  }, {
    key: 'randSentence',
    value: function randSentence() {
      var size = arguments[0] === undefined ? this.engine.randRange(10, 25) : arguments[0];
      var widowThreshold = arguments[1] === undefined ? 5 : arguments[1];

      // Seed the result with a capitalized random word
      var result = toTitleCase(this.randWord());

      // Add to the result until the desired length is reached
      for (var i = 1; i < size; i++) {
        // Insert punctuation before a word only if punctuation has not
        // already been inserted recently, and if we are not too close
        // to the end of the sentence. This makes everything more realistic.
        if (i > 1 && i % this.engine.randRange(11, 15) === 1 && size - i > widowThreshold) {
          result += this.engine.randFromArray(this.puncList) + ' ' + this.randWord();
        } else {
          result += ' ' + this.randWord();
        }
      }

      // Append ending punctuation
      return result + this.engine.randFromArray(this.endingPuncList);
    }
  }, {
    key: 'randParagraph',
    value: function randParagraph() {
      var size = arguments[0] === undefined ? this.engine.randRange(4, 10) : arguments[0];

      // Seed the result with a random sentence
      var result = this.randSentence();

      // Add to the result until the desired length is reached
      for (var i = 1; i < size; i++) {
        result += ' ' + this.randSentence();
      }

      return result;
    }
  }]);

  return _class;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=TextFactory.js.map
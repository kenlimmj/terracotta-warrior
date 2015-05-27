/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 18:03:39
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

// List of first names
var defaultFirstNameList = ['Admirable', 'Amusing', 'Annoying', 'Anonymous', 'Applaudable', 'Attacked', 'Baked', 'Balancing', 'Banging', 'Bare', 'Bathing', 'Battling', 'Beaming', 'Begging', 'Bespectacled', 'Biting', 'Blessed', 'Blinking', 'Blotting', 'Blue', 'Blushing', 'Boasting', 'Boiling', 'Bolting', 'Borrowing', 'Bouncing', 'Boxing', 'Braking', 'Breathing', 'Bubbling', 'Bumping', 'Burning', 'Buzzing', 'Camping', 'Caring', 'Charging', 'Cheering', 'Chewing', 'Childof', 'Chopping', 'Clapping', 'Confused', 'Confusing', 'Dancing', 'Derping', 'Dreaming', 'Droopy', 'Drumming', 'Exciting', 'Expanding', 'Exploding', 'Fatherof', 'Flapping', 'Flashing', 'Floating', 'Glowing', 'Green', 'Grinning', 'Grumpy', 'Hammering', 'Happy', 'Hopping', 'Itching', 'Jogging', 'Jolly', 'Jumping', 'Kicking', 'Legless', 'Long', 'Many', 'Motherof', 'Much', 'Nodding', 'Oblivious', 'Odd', 'Orange', 'Pecking', 'Pinching', 'Pink', 'Pointing', 'Poking', 'Popping', 'Prancing', 'Preaching', 'Punching', 'Reigning', 'Rhyming', 'Rolling', 'Sailing', 'Sexy', 'Shopping', 'Short', 'Shrugging', 'Shy', 'Smiling', 'Smoking', 'Sniffing', 'Snoring', 'Sparkling', 'Squeaking', 'Tickling', 'Traveling', 'Very', 'Wandering', 'Wanting', 'Waving', 'Whistling', 'Winking', 'Wobbling', 'Wrecking', 'Wriggling', 'Yawning', 'Yelling', 'Yellow'];

// List of last names
var defaultLastNameList = ['Actress', 'Amoeba', 'Bacon', 'Batman', 'Beach', 'Bieber', 'Bike', 'Bulbasaur', 'Bunny', 'Butler', 'Button', 'Cactus', 'Camel', 'Candle', 'Bacteriophage', 'Carrot', 'Cat', 'Chair', 'Charmander', 'Cheeseburger', 'Clover', 'Comb', 'Cookie', 'Cupcake', 'Derp', 'Desert', 'Dish', 'Doge', 'Doubledown', 'Dragons', 'Earthworm', 'Elephant', 'Faucet', 'Filetmignon', 'Flower', 'Flute', 'Foot', 'Football', 'Frog', 'Gandalf', 'Glitter', 'Godzilla', 'Hedgehog', 'Hobbit', 'Hodor', 'Hulk', 'Iguana', 'Kitty', 'Knot', 'Leaf', 'Lizard', 'Llama', 'Lobster', 'Mermaid', 'Miley', 'Mimosa', 'Mosquito', 'Mushroom', 'Mystique', 'Nibblets', 'Munchkin', 'Olive', 'Omelet', 'Pelican', 'Pancake', 'Panda', 'Pen', 'Penguin', 'Phone', 'Piano', 'Pikachu', 'Pillar', 'Pipe', 'Ball', 'Pocket', 'Potato', 'Potter', 'Powder', 'Rainbows', 'Record', 'Rose', 'Saiyan', 'Salad', 'Salt', 'Scorpio', 'Senor', 'Sherlock', 'Silk', 'Skates', 'Smeagol', 'Snape', 'Spaghetti', 'Speedboat', 'Spiderman', 'Squirtle', 'Statue', 'Stool', 'Streetlight', 'Suarez', 'Subway', 'Superman', 'Tadpole', 'TARDIS', 'Town', 'Tulip', 'Turnip', 'Ukelele', 'Unicorn', 'Vacuum', 'Vampire', 'Wolverine', 'Worm', 'Xylophone'];

var _default = (function () {
  var _class = function _default() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, _class);

    this.engine = options.engine || new _RandEngine2['default']();

    this.firstNameList = options.firstNameList || defaultFirstNameList;
    this.lastNameList = options.lastNameList || defaultLastNameList;
  };

  _createClass(_class, [{
    key: 'randUsername',
    value: function randUsername() {
      var numSize = arguments[0] === undefined ? 3 : arguments[0];

      // Generate a first and last name
      var firstName = this.engine.randFromArray(this.firstNameList);
      var lastName = this.engine.randFromArray(this.lastNameList);

      // Generate a number to make the username unique
      var id = this.engine.randFullNumber(numSize);

      return firstName + lastName + id;
    }
  }, {
    key: 'randAvatarUrl',
    value: function randAvatarUrl() {
      var width = arguments[0] === undefined ? 500 : arguments[0];
      var height = arguments[1] === undefined ? 500 : arguments[1];

      // Directly generates a random image with an abstract category
      return this.engine.randImage(width, height, 'abstract');
    }
  }]);

  return _class;
})();

exports['default'] = _default;
module.exports = exports['default'];
//# sourceMappingURL=UserFactory.js.map
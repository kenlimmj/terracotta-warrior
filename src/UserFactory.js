/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 18:03:39
 */

'use strict';

import RandEngine from './RandEngine';

// List of first names
const defaultFirstNameList = [
  'Admirable', 'Amusing', 'Annoying', 'Anonymous', 'Applaudable', 'Attacked',
  'Baked', 'Balancing', 'Banging', 'Bare', 'Bathing', 'Battling', 'Beaming',
  'Begging', 'Bespectacled', 'Biting', 'Blessed', 'Blinking', 'Blotting',
  'Blue', 'Blushing', 'Boasting', 'Boiling', 'Bolting', 'Borrowing',
  'Bouncing', 'Boxing', 'Braking', 'Breathing', 'Bubbling', 'Bumping',
  'Burning', 'Buzzing', 'Camping', 'Caring', 'Charging', 'Cheering',
  'Chewing', 'Childof', 'Chopping', 'Clapping', 'Confused', 'Confusing',
  'Dancing', 'Derping', 'Dreaming', 'Droopy', 'Drumming', 'Exciting',
  'Expanding', 'Exploding', 'Fatherof', 'Flapping', 'Flashing', 'Floating',
  'Glowing', 'Green', 'Grinning', 'Grumpy', 'Hammering', 'Happy', 'Hopping',
  'Itching', 'Jogging', 'Jolly', 'Jumping', 'Kicking', 'Legless', 'Long',
  'Many', 'Motherof', 'Much', 'Nodding', 'Oblivious', 'Odd', 'Orange',
  'Pecking', 'Pinching', 'Pink', 'Pointing', 'Poking', 'Popping', 'Prancing',
  'Preaching', 'Punching', 'Reigning', 'Rhyming', 'Rolling', 'Sailing',
  'Sexy', 'Shopping', 'Short', 'Shrugging', 'Shy', 'Smiling', 'Smoking',
  'Sniffing', 'Snoring', 'Sparkling', 'Squeaking', 'Tickling', 'Traveling',
  'Very', 'Wandering', 'Wanting', 'Waving', 'Whistling', 'Winking',
  'Wobbling', 'Wrecking', 'Wriggling', 'Yawning', 'Yelling', 'Yellow'
];

// List of last names
const defaultLastNameList = [
  'Actress', 'Amoeba', 'Bacon', 'Batman', 'Beach', 'Bieber', 'Bike',
  'Bulbasaur', 'Bunny', 'Butler', 'Button', 'Cactus', 'Camel', 'Candle',
  'Bacteriophage', 'Carrot', 'Cat', 'Chair', 'Charmander', 'Cheeseburger',
  'Clover', 'Comb', 'Cookie', 'Cupcake', 'Derp', 'Desert', 'Dish', 'Doge',
  'Doubledown', 'Dragons', 'Earthworm', 'Elephant', 'Faucet', 'Filetmignon',
  'Flower', 'Flute', 'Foot', 'Football', 'Frog', 'Gandalf', 'Glitter',
  'Godzilla', 'Hedgehog', 'Hobbit', 'Hodor', 'Hulk', 'Iguana', 'Kitty',
  'Knot', 'Leaf', 'Lizard', 'Llama', 'Lobster', 'Mermaid', 'Miley', 'Mimosa',
  'Mosquito', 'Mushroom', 'Mystique', 'Nibblets', 'Munchkin', 'Olive',
  'Omelet', 'Pelican', 'Pancake', 'Panda', 'Pen', 'Penguin', 'Phone', 'Piano',
  'Pikachu', 'Pillar', 'Pipe', 'Ball', 'Pocket', 'Potato', 'Potter', 'Powder',
  'Rainbows', 'Record', 'Rose', 'Saiyan', 'Salad', 'Salt', 'Scorpio', 'Senor',
  'Sherlock', 'Silk', 'Skates', 'Smeagol', 'Snape', 'Spaghetti', 'Speedboat',
  'Spiderman', 'Squirtle', 'Statue', 'Stool', 'Streetlight', 'Suarez',
  'Subway', 'Superman', 'Tadpole', 'TARDIS', 'Town', 'Tulip', 'Turnip',
  'Ukelele', 'Unicorn', 'Vacuum', 'Vampire', 'Wolverine', 'Worm', 'Xylophone'
];

export default class {
  constructor(options = {}) {
    this.engine = options.engine || new RandEngine();

    this.firstNameList = options.firstNameList || defaultFirstNameList;
    this.lastNameList = options.lastNameList || defaultLastNameList;
  }

  randUsername(numSize = 3) {
    // Generate a first and last name
    let firstName = this.engine.randFromArray(this.firstNameList);
    let lastName = this.engine.randFromArray(this.lastNameList);

    // Generate a number to make the username unique
    let id = this.engine.randFullNumber(numSize);

    return firstName + lastName + id;
  }

  randAvatarUrl(width = 500, height = 500) {
    // Directly generates a random image with an abstract category
    return this.engine.randImage(width, height, 'abstract');
  }
}
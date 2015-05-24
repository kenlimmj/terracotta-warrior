/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 21:37:25
 */

'use strict';

import RandEngine from "./RandEngine";

// List of characters in the alphabet.
const defaultCharList = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

// List of punctuation used in the middle of sentences
const defaultBasePuncList = [',', ';', ' -', ':'];

// List of punctuation used at the end of sentences
const defaultEndingPuncList = ['.', '?', '!'];

// Flag to toggle whether enhanced punctuation is used
const defaultEnhancedPunctuation = false;

// List of punctuation whose correct display may or may not be supported
const defaultEnhancedPuncList = defaultBasePuncList.concat([
  ' ---',
  ' --',
  '...'
]);

// List of default words from the Lorem Ipsum library
const defaultWordList = [
  'a', 'ab', 'accusamus', 'accusantium', 'ad', 'adipisci', 'alias', 'aliquam',
  'aliquid', 'amet', 'animi', 'aperiam', 'architecto', 'asperiores',
  'aspernatur', 'assumenda', 'at', 'atque', 'aut', 'autem', 'beatae',
  'blanditiis', 'commodi', 'consectetur', 'consequatur', 'consequuntur',
  'corporis', 'corrupti', 'culpa', 'cum', 'cumque', 'cupiditate', 'debitis',
  'delectus', 'deleniti', 'deserunt', 'dicta', 'dignissimos', 'distinctio',
  'dolor', 'dolore', 'dolorem', 'doloremque', 'dolores', 'doloribus',
  'dolorum', 'ducimus', 'ea', 'eaque', 'earum', 'eius', 'eligendi', 'enim',
  'eos', 'error', 'esse', 'est', 'et', 'eum', 'eveniet', 'ex', 'excepturi',
  'exercitationem', 'expedita', 'explicabo', 'facere', 'facilis', 'fuga',
  'fugiat', 'fugit', 'harum', 'hic', 'id', 'illo', 'illum', 'impedit', 'in',
  'incidunt', 'inventore', 'ipsa', 'ipsum', 'iste', 'itaque', 'iure', 'iusto',
  'labore', 'laboriosam', 'laborum', 'laudantium', 'libero', 'magnam',
  'magni', 'maiores', 'maxime', 'minima', 'minus', 'modi', 'molestiae',
  'molestias', 'mollitia', 'nam', 'natus', 'necessitatibus', 'nemo', 'neque',
  'nesciunt', 'nihil', 'nisi', 'nobis', 'non', 'nostrum', 'nulla', 'numquam',
  'occaecati', 'odio', 'odit', 'officia', 'officiis', 'omnis', 'optio',
  'pariatur', 'perferendis', 'perspiciatis', 'placeat', 'porro', 'possimus',
  'praesentium', 'provident', 'quae', 'quaerat', 'quam', 'quas', 'quasi',
  'qui', 'quia', 'quibusdam', 'quidem', 'quis', 'quisquam', 'quo', 'quod',
  'quos', 'ratione', 'recusandae', 'reiciendis', 'rem', 'repellat',
  'repellendus', 'reprehenderit', 'repudiandae', 'rerum', 'saepe', 'sapiente',
  'sed', 'sequi', 'similique', 'sint', 'sit', 'soluta', 'sunt', 'suscipit',
  'tempora', 'tempore', 'temporibus', 'tenetur', 'totam', 'ullam', 'unde',
  'ut', 'vel', 'velit', 'veniam', 'veritatis', 'vero', 'vitae', 'voluptas',
  'voluptate', 'voluptatem', 'voluptates', 'voluptatibus', 'voluptatum'
];

// Capitalizes the first character of every word in the input string
// unless it is a connecting word
let toTitleCase = function (input) {
  let smallWords =
    /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (match, index,
    title) => {
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index -
        1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
}

export default class {
  constructor(options = {}) {
    this.engine = options.engine || new RandEngine();

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
  }

  randLetter() {
    // Draw a letter at random from the character list
    return this.engine.randFromArray(this.charList);
  }

  randWord() {
    // Draw a letter at random from the word list
    return this.engine.randFromArray(this.wordList);
  }

  randTitle(size = this.engine.randRange(3, 10)) {
    // Seed the result with a random word
    let result = this.randWord();

    // Add to the result until the desired length is reached
    for (var i = 1; i < size; i++) {
      result += " " + this.randWord();
    }

    // Convert the result to title case, because title.
    return toTitleCase(result);
  }

  randSentence(
    size = this.engine.randRange(10, 25),
    puncSpacing = this.engine.randRange(11, 15),
    widowThreshold = 5
  ) {
    // Seed the result with a capitalized random word
    let result = toTitleCase(this.randWord());

    // Add to the result until the desired length is reached
    for (let i = 1; i < size; i++) {
      // Insert punctuation before a word only if punctuation has not
      // already been inserted recently, and if we are not too close
      // to the end of the sentence. This makes everything more realistic.
      if (i > 1 && i % puncSpacing === 1 && size - i > widowThreshold) {
        result += this.engine.randFromArray(this.puncList) + " " + this.randWord();
      } else {
        result += " " + this.randWord();
      }
    }

    // Append ending punctuation
    return result + this.engine.randFromArray(this.endingPuncList);
  }

  randParagraph(size = this.engine.randRange(3, 10)) {
    // Seed the result with a random sentence
    let result = this.randSentence();

    // Add to the result until the desired length is reached
    for (let i = 1; i < size; i++) {
      result += " " + this.randSentence();
    }

    return result;
  }
}
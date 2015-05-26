/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 20:58:28
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-26 16:22:50
 */

'use strict';

import RandEngine from './RandEngine';
import TextFactory from './TextFactory';
import EquationFactory from '.EquationFactory';

const defaultItemSyntax = '- ';
const defaultEnumSyntax = '* ';
const defaultQuoteSyntax = '> ';

export default class {
  constructor(options = {}) {
    this.engine = options.engine || new RandEngine();
    this.tf = new TextFactory({ engine: this.engine });
    this.ef = new EquationFactory({ engine: this.engine });

    this.itemSyntax = options.itemSyntax || defaultItemSyntax;
    this.enumSyntax = options.enumSyntax || defaultEnumSyntax;
    this.quoteSyntax = options.quoteSyntax || defaultQuoteSyntax;
  }

  randImageMarkup(width = 500, height = 500) {
    let altText = "![" + this.tf.randTitle() + "]";
    let markupImage = "(" + this.engine.randImage(width, height) + ")";

    return altText + markupImage;
  }

  randItemList(size = this.engine.randRange(3, 5)) {
    let result = '';

    for (let i = 0; i < size; i++) {
      if (i === size - 1) {
        result += this.itemSyntax + this.tf.randSentence();
      } else {
        result += this.itemSyntax + this.tf.randSentence() + "\n";
      }
    }

    return result;
  }

  randEnumList(size = this.engine.randRange(3, 5)) {
    let result = '';

    for (let i = 0; i < size; i++) {
      // Always start the list with "*." because Markdown
      // ignores the actual characters used for each item
      if (i === size - 1) {
        result += this.enumSyntax + this.tf.randSentence();
      } else {
        result += this.enumSyntax + this.tf.randSentence() + "\n";
      }
    }

    return result;
  }

  randQuote() {
    return this.quoteSyntax + this.tf.randSentence();
  }

  randContent(size = this.engine.randRange(3, 7), noConsecutive = false) {
    let result = this.tf.randParagraph();
    let prevRoll = -1;

    for (let i = 1; i < size; i++) {
      let diceRoll = this.engine.randRange(0, 5);

      if (noConsecutive) {
        while (diceRoll === prevRoll) {
          diceRoll = this.engine.randRange(0, 5);
        }
      }

      prevRoll = diceRoll;

      switch (diceRoll) {
      case 0:
        result += "\n\n" + this.randEnumList();
        break;
      case 1:
        result += "\n\n" + this.randItemList();
        break;
      case 2:
        result += "\n\n" + ef.wrapMath(ef.randEquation());
        break;
      case 3:
        result += "\n\n" + this.randQuote();
        break;
      case 4:
        result += "\n\n" + this.randImageMarkup();
        break;
      case 5:
      default:
        result += "\n\n" + this.randParagraph();
        break;
      }
    }

    return result;
  }
}
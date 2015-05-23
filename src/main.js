/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 12:31:23
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-23 22:53:40
 */

'use strict';

import RandEngine from './core/RandEngine';
import TextFactory from './core/TextFactory';
import UserFactory from './core/UserFactory';
import MarkdownFactory from './core/MarkdownFactory';
import EquationFactory from './core/EquationFactory';

let generator = new RandEngine();

let tf = new TextFactory({
  engine: generator
});

let uf = new UserFactory({
  engine: generator
});

let mf = new MarkdownFactory({
  engine: generator
});

let ef = new EquationFactory({
  engine: generator
});

console.group('TextFactory');
console.log(tf.randLetter());
console.log(tf.randWord());
console.log(tf.randTitle());
console.log(tf.randSentence());
console.log(tf.randParagraph());
console.groupEnd();

console.group('UserFactory');
console.log(uf.randUsername());
console.log(uf.randAvatarUrl());
console.groupEnd();

console.group('MarkdownFactory');
console.log(mf.randImageMarkup());
console.log(mf.randItemList());
console.log(mf.randEnumList());
console.log(mf.randQuote());
console.log(mf.randContent());
console.groupEnd();

console.group('EquationFactory');
console.log(ef.randTerm());
console.log(ef.randExpression());
console.log(ef.randFrac());
console.log(ef.randEquation());
console.groupEnd();
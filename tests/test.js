/*
 * @Author: Lim Mingjie, Kenneth
 * @Date:   2015-05-23 09:39:42
 * @Last Modified by:   Lim Mingjie, Kenneth
 * @Last Modified time: 2015-05-24 18:43:39
 */

var tw = require('../dist/terracottaWarrior');
var assert = require('assert');

var numRunsPerTest = 1000;

var re = new tw.RandEngine();
var tf = new tw.TextFactory({ engine: re });
var uf = new tw.UserFactory({ engine: re });
var ef = new tw.EquationFactory({ engine: re });
var mf = new tw.MarkdownFactory({ engine: re });

describe('RandEngine', function() {
  describe('#randFullNumber', function() {
    it('should always return a string representation', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert.equal(typeof(re.randFullNumber()), 'string');
      }
    });

    it('should return an empty string if input is 0', function() {
      var result = re.randFullNumber(0);
      assert.equal(result.length, 0);
      assert.equal(result, '');
    });

    it('should return 3 digits with no input provided', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert.equal(re.randFullNumber().length, 3);
      }
    });

    it('should return the correct number of digits requested', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert.equal(re.randFullNumber(i).length, i);
      }
    });
  });

  describe('#randRange', function() {
    it('should always return a number', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert.equal(typeof(re.randRange()), 'number');
      }
    });

    it('should always return a number between 0 and 1 with no input provided', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert(0 <= re.randRange() <= 1);
      }
    });

    it('should return a predictable number if the range is clamped', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert.equal(re.randRange(i, i), i);
      }
    });

    it('should always return a number within the range provided', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert(0 <= re.randRange(0, i + 1) <= (i + 1));
      }
    });
  });

  describe('#randFromArray', function() {
    // TODO
  });

  describe('#randBoolean', function() {
    it('should always return a boolean', function() {
      for (var i = 0; i < numRunsPerTest; i++) {
        assert.equal(typeof(re.randBoolean()), 'boolean');
      }
    });
  });
});
var Equation = (function() {
    var integralOperator = '\\int\\!',
        trigOperators = ['\\sin', '\\cos', '\\tan'],
        fracOperator = '\\frac',
        numOperators = ['+', '-'],
        equalityOperators = ['=', '\\Rightarrow', '\\approx'],
        superscriptOperator = '^',
        subscriptOperator = '_';

    return {
        randTerm: function(size) {
            var result = [],
                size = size || 2,
                coeff = Math.floor(RandUtils.randRange(1, 9));

            for (var i = 0; i < RandUtils.randRange(1, size); i++) {
                result.push(Type.randLetter());
            }

            var acc = result.sort().reduce(function(prevVal, currVal) {
                if (prevVal === currVal) {
                    return prevVal + superscriptOperator + 2;
                } else {
                    return prevVal + currVal;
                }
            }, "");

            return acc;
        },
        randExpression: function(size) {
            var result = Equation.randTerm(),
                size = size || 3;

            for (var i = 0; i < Math.floor(Math.random() * size); i++) {
                result += RandUtils.randFromArray(numOperators) + Equation.randTerm();
            }

            return result;
        },
        randFrac: function() {
            var numerator = "{" + Equation.randExpression() + "}",
                denominator = "{" + Equation.randExpression() + "}";

            return fracOperator + numerator + denominator;
        },
        randCommand: function() {
            var upperLimit = superscriptOperator + Equation.randTerm(1),
                lowerLimit = subscriptOperator + Equation.randTerm(1);

            if (Math.random() > 0.5) {
                var mainTerm = Equation.randExpression();
            } else {
                var mainTerm = Equation.randFrac();
            }

            return integralOperator + lowerLimit + upperLimit + " " + mainTerm + " \\,d" + Equation.randTerm(1);
        },
        randEquation: function(size) {
            var result = "",
                size = size || 3;

            for (var i = 0; i < Math.random() * size; i++) {
                var diceRoll = Math.random();

                if (diceRoll > 2 / 3) {
                    var currentTerm = Equation.randFrac();
                } else if (diceRoll < 1 / 3) {
                    var currentTerm = Equation.randCommand();
                } else {
                    var currentTerm = Equation.randExpression();
                }

                if (i === 0) {
                    result += currentTerm;
                } else {
                    result += " " + RandUtils.randFromArray(equalityOperators) + " " + currentTerm;
                }
            }

            return result;
        },
        wrapMath: function(eqn, mode) {
            var mathDisplayEnv = "$$",
                mathInlineEnv = "$";

            var mode = mode || "display";

            if (mode === "display") {
                var wrapEnv = mathDisplayEnv;
            } else {
                var wrapEnv = mathInlineEnv;
            }

            return wrapEnv + eqn + wrapEnv;
        }
    }
})();
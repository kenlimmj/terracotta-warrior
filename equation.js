var Equation = (function() {
    var commandOperators = ['\\int\\!', '\\sum', '\\max', '\\min'],
        trigOperators = ['\\sin', '\\cos', '\\tan'],
        fracOperator = '\\frac',
        numOperators = ['+', '-'],
        equalityOperators = ['=', '\\Rightarrow', '\\approx'];

    return {
        randTerm: function(size) {
            var result = "",
                size = size || 3;

            for (var i = 0; i < Math.floor(Math.random() * size); i++) {
                result += Type.randLetter();
            }

            return Math.floor(Math.random() * 9) + result;
        },
        randExpression: function(size) {
            var result = Equation.randTerm(),
                size = size || 3;

            for (var i = 0; i < Math.floor(Math.random() * size); i++) {
                result += Util.randFromArray(numOperators) + Equation.randTerm();
            }

            return result;
        },
        randFrac: function() {
            var numerator = "{" + Equation.randExpression() + "}",
                denominator = "{" + Equation.randExpression() + "}";

            return fracOperator + numerator + denominator;
        },
        randCommand: function() {
            var upperLimit = "^" + Equation.randTerm(),
                lowerLimit = "_" + Equation.randTerm(),
                startCommand = Util.randFromArray(commandOperators);

            if (Math.random() > 0.5) {
                var mainTerm = Equation.randExpression();
            } else {
                var mainTerm = Equation.randFrac();
            }

            return startCommand + lowerLimit + upperLimit + mainTerm;
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
                    result += Util.randFromArray(equalityOperators) + currentTerm;
                }
            }
        },
        wrapMath: function(eqn,mode) {
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
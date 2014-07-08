var Markdown = (function() {
    return {
        randImageMarkup: function() {
            var altText = "![" + Type.randTitle() + "]",
                markupImage = "(" + RandUtils.randImage() + ")";

            return altText + markupImage;
        },
        randItemList: function(size) {
            var size = size || RandUtils.randRange(3, 5),
                result = "";

            for (var i = 0; i < size; i++) {
                result += "- " + Type.randSentence() + "\n";
            }

            return result;
        },
        randEnumList: function(size) {
            var size = size || RandUtils.randRange(3, 5),
                result = "";

            for (var i = 0; i < size; i++) {
                // Always start the list with "1." because Markdown
                // ignores the actual numbers used
                if (i === size - 1) {
                    result += "1. " + Type.randSentence();
                } else {
                    result += "1. " + Type.randSentence() + "\n";
                }
            }

            return result;
        },
        randQuote: function() {
            return "> " + Type.randSentence();
        },
        randContent: function(size) {
            var size = size || RandUtils.randRange(3, 7),
                result = Type.randParagraph();

            for (var i = 0; i < size; i++) {
                var diceRoll = Math.random();

                if (diceRoll < 1 / 6) {
                    result += "\n\n" + Markdown.randEnumList();
                } else if (1 / 6 <= diceRoll < 2 / 6) {
                    result += "\n\n" + Markdown.randItemList();
                } else if (2 / 6 <= diceRoll < 3 / 6) {
                    result += "\n\n" + Equation.wrapMath(Equation.randEquation());
                } else if (3 / 6 <= diceRoll < 4 / 6) {
                    result += "\n\n" + Type.randParagraph();
                } else if (4 / 6 <= diceRoll < 5 / 6) {
                    result += "\n\n" + Markdown.randImageMarkup();
                } else {
                    result += "\n\n" + Markdown.randQuote();
                }
            }

            return result;
        }
    }
})();
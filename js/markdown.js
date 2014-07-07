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
            var size = size || RandUtils.randRange(3,7),
                result = "";

            for (var i = 0; i < size; i++) {

            }
        }
    }
})();
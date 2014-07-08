String.prototype.toTitleCase = function() {
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

    return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {
        if (index > 0 && index + match.length !== title.length &&
            match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
            (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
            title.charAt(index - 1).search(/[^\s-]/) < 0) {
            return match.toLowerCase();
        }

        if (match.substr(1).search(/[A-Z]|\../) > -1) {
            return match;
        }

        return match.charAt(0).toUpperCase() + match.substr(1);
    });
};

var Type = (function() {
    var charList = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    var punctuationList = [",", ";", " -"];

    var loremList = [
        "alias", "consequatur", "aut", "perferendis", "sit", "voluptatem", "accusantium",
        "doloremque", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore",
        "veritatis", "et", "quasi", "architecto", "beatae", "vitae", "dicta", "sunt",
        "explicabo", "aspernatur", "aut", "odit", "aut", "fugit", "sed", "quia",
        "consequuntur", "magni", "dolores", "eos", "qui", "ratione", "voluptatem",
        "sequi", "nesciunt", "neque", "dolorem", "ipsum", "quia", "dolor", "sit",
        "amet", "consectetur", "adipisci", "velit", "sed", "quia", "non", "numquam",
        "eius", "modi", "tempora", "incidunt", "ut", "labore", "et", "dolore", "magnam",
        "aliquam", "quaerat", "voluptatem", "ut", "enim", "ad", "minima", "veniam",
        "quis", "nostrum", "exercitationem", "ullam", "corporis", "nemo", "enim",
        "ipsam", "voluptatem", "quia", "voluptas", "sit", "suscipit", "laboriosam",
        "nisi", "ut", "aliquid", "ex", "ea", "commodi", "consequatur", "quis", "autem",
        "vel", "eum", "iure", "reprehenderit", "qui", "in", "ea", "voluptate", "velit",
        "esse", "quam", "nihil", "molestiae", "et", "iusto", "odio", "dignissimos",
        "ducimus", "qui", "blanditiis", "praesentium", "laudantium", "totam", "rem",
        "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores", "et", "quas",
        "molestias", "excepturi", "sint", "occaecati", "cupiditate", "non", "provident",
        "sed", "ut", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "similique",
        "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollitia", "animi", "id",
        "est", "laborum", "et", "dolorum", "fuga", "et", "harum", "quidem", "rerum",
        "facilis", "est", "et", "expedita", "distinctio", "nam", "libero", "tempore",
        "cum", "soluta", "nobis", "est", "eligendi", "optio", "cumque", "nihil",
        "impedit", "quo", "porro", "quisquam", "est", "qui", "minus", "id", "quod",
        "maxime", "placeat", "facere", "possimus", "omnis", "voluptas", "assumenda",
        "est", "omnis", "dolor", "repellendus", "temporibus", "autem", "quibusdam",
        "et", "aut", "consequatur", "vel", "illum", "qui", "dolorem", "eum", "fugiat",
        "quo", "voluptas", "nulla", "pariatur", "at", "vero", "eos", "et", "accusamus",
        "officiis", "debitis", "aut", "rerum", "necessitatibus", "saepe", "eveniet",
        "ut", "et", "voluptates", "repudiandae", "sint", "et", "molestiae", "non",
        "recusandae", "itaque", "earum", "rerum", "hic", "tenetur", "a", "sapiente",
        "delectus", "ut", "aut", "reiciendis", "voluptatibus", "maiores", "doloribus",
        "asperiores", "repellat"
    ];

    return {
        randLetter: function() {
            return RandUtils.randFromArray(charList);
        },
        randWord: function() {
            return RandUtils.randFromArray(loremList);
        },
        randTitle: function(size) {
            var size = size || RandUtils.randRange(3, 10),
                result = Type.randWord();

            for (var i = 0; i < size; i++) {
                result += " " + Type.randWord();
            }

            return result.toTitleCase();
        },
        randSentence: function(size) {
            var size = size || RandUtils.randRange(10, 25),
                result = Type.randWord().toTitleCase();

            for (var i = 0; i < size; i++) {
                if (i > 1 && i % RandUtils.randRange(11, 15) === 1 && size - i > 5) {
                    result += RandUtils.randFromArray(punctuationList) + " " + Type.randWord();
                } else {
                    result += " " + Type.randWord();
                }
            }

            return result + ".";
        },
        randParagraph: function(size) {
            var size = size || RandUtils.randRange(4, 10),
                result = Type.randSentence();

            for (var i = 0; i < size; i++) {
                result += " " + Type.randSentence();
            }

            return result;
        }
    }
})();
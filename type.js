var Type = (function() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz",
        loremList = [
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
            return Type.alphabet.charAt(Math.floor(Math.random() * Type.alphabet.length));
        },
        randWord: function() {
            return Util.randFromArray(loremList);
        },
        randTitle: function(size) {
          var size = size || Util.randRange(3, 10),
              result = "";

          for (var i = 0; i < size; i++) {
              result += Type.randWord();
          }

          return result;
        },
        randSentence: function(size) {
            var size = size || Util.randRange(10, 25),
                result = "";

            for (var i = 0; i < size; i++) {
                result += Type.randWord();
            }

            return result + ".";
        },
        randParagraph: function(size) {
            var size = size || Util.randRange(4, 10),
                result = "";

            for (var i = 0; i < size; i++) {
                result += Type.randSentence();
            }

            return result;
        }
    }
})();
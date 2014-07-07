var Markdown = (function() {
    return {
        randImageMarkup = function(width, height) {
            var width = width || 500,
                height = height || 500,
                providerUrl = "//lorempixel.com",

            return providerUrl + "/" + width + "/" + height;
        }
    }
})();
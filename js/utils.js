var RandUtils = (function() {
    return {
        randFullNumber: function(digits) {
            var result = "";

            for (var i = 0; i < digits; i++) {
                result += Math.floor(Math.random() * 9);
            }

            return result;
        },
        randRange: function(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        randFromArray: function(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },
        randBoolean: function() {
            return Math.random() > 0.5 ? true : false;
        },
        randImage: function(width, height) {
            var width = width || 500,
                height = height || 500,
                providerUrl = "//lorempixel.com";

            return providerUrl + "/" + width + "/" + height;
        }
    }
})();
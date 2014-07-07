var User = (function() {
    var firstName = ['Bouncing', 'Crazy', 'Happy', 'Cute', 'Shy', 'Dancing', 'Legless', 'Sexy'],
        lastName = ['Pikachu', 'Gandalf', 'Godzilla', 'Sherlock', 'Amoeba', 'Hedgehog', 'Panda', 'TARDIS', 'Snape', 'Hulk', 'Llama'];

    return {
        randUsername: function() {
            return RandUtils.randFromArray(Username.firstName) + RandUtils.randFromArray(Username.lastName) + RandUtils.randFullNumber(3);
        },
        randAvatarUrl: function(width,height) {
            var width = width || 500,
                height = height || 500,
                providerUrl = "//lorempixel.com",
                category = "people";

            return providerUrl + "/" + width + "/" + height + "/" + category;
        }
    }
})();
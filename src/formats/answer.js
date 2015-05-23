var Answer = (function() {
    return {
        generate: function() {
            return {
                mdContent: Markdown.randContent(),
                approved: RandUtils.randBoolean(),
                flagStatus: RandUtils.randBoolean(),
                votes: Math.floor(Math.random() * 500)
            }
        }
    }
})();
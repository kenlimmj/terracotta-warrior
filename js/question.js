var Question = (function() {
    return {
        generate: function() {
            return {
                title: Type.randTitle(),
                mdContent: Markdown.randContent(),
                answerStatus: false,
                openStatus: RandUtils.randBoolean()
            }
        }
    }
})();
/**
 *  Render index page
 *  GET(/)
 *  @function
 */
exports.renderIndex = (req, res) => {
    res.render('main')
}

/**
 *  Render chat page
 *  GET(/)
 *  @function
 */
exports.renderChat = (req, res) => {
    res.render('chat')
}

/**
 *  Get error page
 *  GET(*)
 * @function
 */
exports.wildcard = (req, res) => {
    res.render('404')
}

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
 * Reset session id to generate new session id
 * POST(/session/resetid)
 * @function
 */
exports.clearSession = (req, res) => {
    req.session.session_id = null
    res.send('Session ID cleared')
}
exports.clearChatSession = (req, res) => {
    req.session.session_id = null
    req.session.chat = null
    res.send('Chat session cleared')
}

/**
 *  Get error page
 *  GET(*)
 * @function
 */
exports.wildcard = (req, res) => {
    res.render('404')
}

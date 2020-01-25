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
    let session_id_cleared = false
    req.session.session_id = null
    if (!req.session.session_id) {
        session_id_cleared = true
    }
    console.log('log')
    res.send(session_id_cleared)
}

/**
 *  Get error page
 *  GET(*)
 * @function
 */
exports.wildcard = (req, res) => {
    res.render('404')
}

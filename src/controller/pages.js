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

exports.clearSession = (req, res) => {
    console.log('-Clear id- endpoint reached')
    let session_id_cleared = false
    req.session.session_id = null
    if (!req.session.session_id) {
        session_id_cleared = true
    }

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

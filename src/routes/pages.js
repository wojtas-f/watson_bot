const express = require('express')
const { renderIndex, wildcard, renderChat } = require('../controller/pages')

const router = express.Router()

router.route('/chat').get(renderChat)
router.route('').get(renderIndex)

router.get('/api/session', (req, res) => {
    res.send(req.session.session_id + ' :ID sesji')
})

router.get('/api/session/null', (req, res) => {
    let ok = 'Not'
    req.session.session_id = null
    if (!req.session.session_id) {
        ok = 'Done'
    }
    res.send(ok)
})

router.route('/*').get(wildcard)

module.exports = router

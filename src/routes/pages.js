const express = require('express')
const { renderIndex, wildcard, renderChat } = require('../controller/pages')

const router = express.Router()

router.route('/chat').get(renderChat)
router.route('').get(renderIndex)

router.get('/api/session', (req, res) => {
    res.send(req.session.session_id + ' :ID sesji')
})

router.post('/api/session/resetid', (req, res) => {
    console.log('Cleare id endpoint reached')
    let session_id_cleared = false
    req.session.session_id = null
    if (!req.session.session_id) {
        session_id_cleared = true
    }
    res.send(session_id_cleared)
})

router.route('/*').get(wildcard)

module.exports = router

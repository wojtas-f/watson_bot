const express = require('express')
const { renderIndex, wildcard, renderChat } = require('../controller/pages')

const router = express.Router()

router.route('/chat').get(renderChat)
router.route('').get(renderIndex)

router.get('/api/session', (req, res) => {
    res.send(req.session.session_id + ' :ID sesji')
})

router.route('/*').get(wildcard)

module.exports = router

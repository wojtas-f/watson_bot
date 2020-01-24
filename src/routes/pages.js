const express = require('express')
const {
    renderIndex,
    wildcard,
    renderChat,
    clearSession
} = require('../controller/pages')

const router = express.Router()

router.route('/chat').get(renderChat)
router.route('').get(renderIndex)
router.route('/api/session/resetid').post(clearSession)
router.route('/*').get(wildcard)

module.exports = router

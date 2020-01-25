const express = require('express')
const {
    renderIndex,
    wildcard,
    renderChat,
    clearSession,
    clearChatSession
} = require('../controller/pages')

const router = express.Router()

router.route('/chat').get(renderChat)
router.route('').get(renderIndex)
router.route('/session/resetid').post(clearSession)
router.route('/session/clear/chat').post(clearChatSession)
router.route('/*').get(wildcard)

module.exports = router

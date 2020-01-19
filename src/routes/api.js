const express = require('express')
const {
    renderIndex,
    sendMessage,
    wildcard,
    renderChat
} = require('../controller/api')
const router = express.Router()

router.route('/api/message').post(sendMessage)
router.route('/chat').get(renderChat)
router.route('').get(renderIndex)
router.route('/*').get(wildcard)

module.exports = router

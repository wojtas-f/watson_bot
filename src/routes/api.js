const express = require('express')
const { sendMessage, loadChatCotnent } = require('../controller/api')
const router = express.Router()

router.route('/api/message').post(sendMessage)
router.route('/api/chat/content').get(loadChatCotnent)
module.exports = router

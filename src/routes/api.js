const express = require('express')
const { sendMessage } = require('../controller/api')
const router = express.Router()

router.route('/api/message').post(sendMessage)

module.exports = router

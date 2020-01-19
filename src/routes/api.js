const express = require('express')
const { renderIndex, sendMessage, wildcard } = require('../controller/api')
const router = express.Router()

router.route('/api/message').post(sendMessage)
router.route('').get(renderIndex)
router.route('/*').get(wildcard)

module.exports = router

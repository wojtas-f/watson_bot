const express = require('express')
const { renderIndex, wildcard, renderChat } = require('../controller/pages')

const router = express.Router()

router.route('/chat').get(renderChat)
router.route('').get(renderIndex)
router.route('/*').get(wildcard)

module.exports = router

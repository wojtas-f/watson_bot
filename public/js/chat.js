const _ = require('lodash')
require('@babel/polyfill') // to use async functions with webpack

const { displayMessageOnChatScreen } = require('./renderMessage')
const { sendMessageToAssistant } = require('./sendMessage')
const { sendResponseToController } = require('./messageController')

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

const loadChatContent = async () => {
    const res = await fetch('/api/chat/content')
    if (res.status === 204) {
        return
    }
    const data = await res.json()
    data.forEach((item) => {
        sendResponseToController(item.intent, item.message)
    })
}

loadChatContent()

$messageForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    deactivateButton()
    const message_content = e.target.message.value

    let user_intent = 'Ask_Assistant'
    if (messageIsEmpty(message_content)) {
        activateButton()
        const warning_content = 'The message can not be empty'
        user_intent = 'Warning'
        sendResponseToController(user_intent, warning_content)
        return
    }

    sendResponseToController(user_intent, message_content)
    const { assistant_response, intent } = await sendMessageToAssistant(
        message_content
    )

    await sendResponseToController(intent, assistant_response)
    activateButton()
})

const messageIsEmpty = (message_content) => {
    if (message_content === '') {
        return true
    }
    return false
}

const activateButton = () => {
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
}

const deactivateButton = () => {
    $messageFormButton.setAttribute('disabled', 'disabled')
}

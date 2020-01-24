const _ = require('lodash')
require('@babel/polyfill') // to use async functions with webpack

const { displayMessageOnChatScreen } = require('./renderMessage')
const { sendMessageToAssistant } = require('./sendMessage')
const { sendResponseToController } = require('./messageController')

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

// TODO: add penguin tech support with picture of completely broken mashine (asking if the pc looks like this)

$messageForm.addEventListener('submit', async e => {
    e.preventDefault()
    deactivateButton()
    const message_content = e.target.message.value
    const msgIsEmpty = messageIsEmpty(message_content)
    if (msgIsEmpty) {
        activateButton()
        const warning_content = 'The message can not be empty'
        displayMessageOnChatScreen({ warning_content, identity: 'warning' })
        return
    }

    displayMessageOnChatScreen({ message_content, identity: 'user' })
    const { assistant_response, intent } = await sendMessageToAssistant(
        message_content
    )
    await sendResponseToController(intent, assistant_response)
    activateButton()
})

const messageIsEmpty = message_content => {
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

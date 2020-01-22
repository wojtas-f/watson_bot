const _ = require('lodash')
require('@babel/polyfill') // to use async functions with webpack

const { displayMessageOnChatScreen } = require('./messageTemplates')
const { sendMessageToAssistant } = require('./sendMessage')
const { clearChat } = require('./displayController')

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

// TODO: add penguin tech support with picture of completely broken mashine (asking if the pc looks like this)
// TODO: add webpack and refactor this file

$messageForm.addEventListener('submit', async e => {
    e.preventDefault()
    deactivateButton()
    // // TODO: Rectrict the option to send empty message

    const message_content = e.target.message.value
    displayMessageOnChatScreen({ message_content, identity: 'user' })

    const { assistant_response, intent } = await sendMessageToAssistant(
        message_content
    )

    displayMessageOnChatScreen({ assistant_response, identity: 'watson' })

    if (endConversationIntent(intent)) {
        setTimeout(clearChat(), 1000)
    }

    activateButton()
})

const endConversationIntent = intent => {
    if (intent === 'General_Ending') {
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

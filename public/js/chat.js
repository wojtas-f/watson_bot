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

    displayMessageOnChatScreen({ assistant_response, identity: 'watson' })

    await checkIntent(intent)

    activateButton()
})

const messageIsEmpty = message_content => {
    if (message_content === '') {
        return true
    }
    return false
}

const endConversationIntent = intent => {
    if (intent === 'General_Ending') {
        return true
    }
    return false
}

const checkIntent = async intent => {
    if (intent === 'General_Ending') {
        setTimeout(clearChat(), 1000)
    }
    if (intent === 'Session_restart') {
        const restart = await fetch('/api/session/resetid', { method: 'post' })
        console.log('Session ID cleared', restart)
    }
}

const activateButton = () => {
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
}

const deactivateButton = () => {
    $messageFormButton.setAttribute('disabled', 'disabled')
}

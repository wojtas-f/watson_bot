const _ = require('lodash')
require('@babel/polyfill') // to use async functions with webpack

const { userTemplate, assistantTemplate } = require('./messageTemplates')
const { sendMessageToAssistant } = require('./sendMessage')

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $chatDisplay = document.querySelector('#chat-display')

// TODO: add penguin tech support with picture of completely broken mashine (asking if the pc looks like this)
// TODO: add webpack and refactor this file

$messageForm.addEventListener('submit', async e => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.message.value

    const userOutput = userTemplate(message)
    updateChatDisplay(userOutput)

    const { assistant_response, intent } = await sendMessageToAssistant(message)
    const assistantOutput = assistantTemplate(assistant_response)
    // TODO: Rectrict the option to send empty message
    updateChatDisplay(assistantOutput)
    setButtonAndView(intent)
})

const setButtonAndView = intent => {
    if (intent === 'General_Ending') {
        console.log('Clear it now')
        setTimeout(() => {
            $chatDisplay.innerHTML = ''
        }, 1000)
    }
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    scrollToBottom()
}

const updateChatDisplay = messageTemplate => {
    $chatDisplay.innerHTML += messageTemplate
}

function scrollToBottom() {
    $chatDisplay.scrollTop =
        $chatDisplay.scrollHeight - $chatDisplay.clientHeight
}

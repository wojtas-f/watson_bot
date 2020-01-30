const $chatDisplay = document.querySelector('#chat-display')

export const updateChatDisplay = messageTemplate => {
    const message = document.createElement('div')
    message.innerHTML = messageTemplate

    document.getElementById('chat-display').appendChild(message)
}

export const setDisplayToViewNewMessage = () => {
    $chatDisplay.scrollTop =
        $chatDisplay.scrollHeight - $chatDisplay.clientHeight
}

export const clearChat = () => {
    $chatDisplay.innerHTML = ''
}

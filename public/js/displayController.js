const $chatDisplay = document.querySelector('#chat-display')

export const updateChatDisplay = messageTemplate => {
    $chatDisplay.innerHTML += messageTemplate
}

export const setDisplayToViewNewMessage = () => {
    $chatDisplay.scrollTop =
        $chatDisplay.scrollHeight - $chatDisplay.clientHeight
}

export const clearChat = () => {
    $chatDisplay.innerHTML = ''
}

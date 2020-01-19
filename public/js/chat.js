const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $chatDisplay = document.querySelector('#chat-display')

$messageForm.addEventListener('submit', e => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.message.value
    const output = userMessage(message)
    updateChatDisplay(output)
})

const updateChatDisplay = messageTemplate => {
    $chatDisplay.innerHTML += messageTemplate
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
}

const userMessage = msg_content => {
    return `
        <div class="ui grid">
            <div class="eight wide column">
                <div class="ui blue message user-input msg user">
                    <p>${msg_content}</p>
                </div>
            </div>
            <div class="eight wide column time-display">
                    <p class="user-time">Time</p>
            </div>
        </div>
`
}
const assistMessage = `
<hr class="break">
    <div class="ui grid">
        <div class="eight wide column time-display">
            <p class="assist-time">Time</p>
        </div>
    <div class="eight wide column">
        <div class="ui success message user-input msg assist">
            <p>Thanks. I'm fine</p>
        </div>
    </div>
</div>
`

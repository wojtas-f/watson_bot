console.log('Success')

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $chatDisplay = document.querySelector('#chat-display')

$messageForm.addEventListener('submit', async e => {
    e.preventDefault()
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.message.value

    const userOutput = userMessage(message)
    updateChatDisplay(userOutput)

    const assistantResponse = await sendMessageToAssistant(message)
    const assistantOutput = assistMessage(assistantResponse)
    updateChatDisplay(assistantOutput)

    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value = ''
    $messageFormInput.focus()
    scrollToBottom()
})

const updateChatDisplay = messageTemplate => {
    $chatDisplay.innerHTML += messageTemplate
}

const sendMessageToAssistant = async userInput => {
    const formData = { message: userInput }

    const res = await fetch('/api/message', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(formData)
    })
    let data = await res.json()
    return data
}

const userMessage = msg_content => {
    const time = getCurrentTime()
    return `
        <div class="ui grid">
            <div class="eight wide column">
                <div class="ui blue message user-input msg user">
                    <p>${msg_content}</p>
                </div>
            </div>
            <div class="eight wide column time-display">
                    <p class="time">${time}</p>
            </div>
        </div>
`
}
const assistMessage = msg_content => {
    const time = getCurrentTime()

    return `
    <hr class="break">
        <div class="ui grid">
            <div class="eight wide column time-display">
                <p class="time">${time}</p>
            </div>
        <div class="eight wide column">
            <div class="ui success message user-input msg assist">
                <p>${msg_content}</p>
            </div>
        </div>
    </div>
    `
}

function scrollToBottom() {
    $chatDisplay.scrollTop =
        $chatDisplay.scrollHeight - $chatDisplay.clientHeight
}

const getCurrentTime = () => {
    const this_time = new Date()
    const this_hour = this_time.getHours()
    const this_Minutes = this_time.getMinutes()
    const time = `${this_hour}:${this_Minutes}`
    return time
}

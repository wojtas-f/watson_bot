const {
    updateChatDisplay,
    setDisplayToViewNewMessage
} = require('./displayController')

export const displayMessageOnChatScreen = input_object => {
    const { message_content, assistant_response, identity } = input_object

    const time = getCurrentTime()

    let outputMessage = `<div class="ui grid">`

    if (identity === 'user') {
        outputMessage += messageTemplate(message_content)
        outputMessage += timeTemplate(time)
    }
    if (identity === 'watson') {
        outputMessage += timeTemplate(time)
        outputMessage += messageTemplate(assistant_response)
    }
    outputMessage += `</div>`
    updateChatDisplay(outputMessage)
    setDisplayToViewNewMessage()
}

const timeTemplate = time => {
    return `<div class="ten wide column time-display">
        <p class="time">${time}</p>
    </div>`
}

const messageTemplate = message => {
    return `<div class="six wide column">
        <div class="ui success message user-input msg assist">
            <p>${message}</p>
        </div>
    </div>`
}

const getCurrentTime = () => {
    const this_time = new Date()
    const this_hour = this_time.getHours()
    const this_Minutes = this_time.getMinutes()
    const time = `${this_hour}:${this_Minutes}`
    return time
}

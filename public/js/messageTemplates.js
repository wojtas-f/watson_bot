const {
    updateChatDisplay,
    setDisplayToViewNewMessage
} = require('./displayController')

export const displayMessageOnChatScreen = input_object => {
    const {
        warning_content,
        message_content,
        assistant_response,
        identity
    } = input_object

    const time = getCurrentTime()

    let outputMessage = `<div class="ui grid">`

    if (identity === 'user') {
        const className = 'success'
        outputMessage += messageTemplate(message_content, className)
        outputMessage += timeTemplate(time)
    }
    if (identity === 'watson') {
        const className = 'blue'
        outputMessage += timeTemplate(time)
        outputMessage += messageTemplate(assistant_response, className)
    }
    if (identity === 'warning') {
        outputMessage += warningTemplate(warning_content, time)
    }
    outputMessage += `</div>`
    updateChatDisplay(outputMessage)
    setDisplayToViewNewMessage()
}

const timeTemplate = time => {
    return `
    <div class="ten wide column time-display">
        <p class="time">${time}</p>
    </div>
    `
}

const messageTemplate = (message, className) => {
    return `
    <div class="six wide column">
        <div class="ui ${className} message">
            <p>${message}</p>
        </div>
    </div>
    `
}

const warningTemplate = (warning, time) => {
    return `
    <div class="sixteen wide column">
        <div class="ui negative message">
            <p>${warning}</p>
            <p>${time}</p>
        </div>
    </div>
    `
}

const getCurrentTime = () => {
    const this_time = new Date()
    const this_hour = this_time.getHours()
    const this_Minutes = this_time.getMinutes()
    const time = `${this_hour}:${this_Minutes}`
    return time
}

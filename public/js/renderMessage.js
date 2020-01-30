const {
    updateChatDisplay,
    setDisplayToViewNewMessage
} = require('./displayController')
const { messageTemplate } = require('./templates/message')
const { imageTemplate } = require('./templates/image')
const { timeTemplate } = require('./templates/time')
const { warningTemplate } = require('./templates/warning')

//TODO: use document.createElement
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
    if (identity === 'image_bot') {
        const className = 'blue'
        outputMessage += timeTemplate(time)
        outputMessage += imageTemplate(assistant_response, className)
    }
    outputMessage += `</div>`
    updateChatDisplay(outputMessage)
    setDisplayToViewNewMessage()
}

const getCurrentTime = () => {
    const this_time = new Date()
    const this_hour = this_time.getHours()
    const this_Minutes = this_time.getMinutes()
    const time = `${this_hour}:${this_Minutes}`
    return time
}

const { clearChat } = require('./displayController')
const { displayMessageOnChatScreen } = require('./renderMessage')

export const sendResponseToController = async (intent, message) => {
    switch (intent) {
        case 'Warning':
            displayMessageOnChatScreen({
                warning_content: message,
                identity: 'warning'
            })
            break
        case 'General_Ending':
            await fetch('/session/clear/chat', { method: 'post' })
            displayMessageOnChatScreen({
                assistant_response: message,
                identity: 'watson'
            })
            setTimeout(clearChat(), 2000)
            break
        case 'Ask_Assistant':
            displayMessageOnChatScreen({
                message_content: message,
                identity: 'user'
            })
            break
        case 'Session_restart':
            await fetch('/session/resetid', {
                method: 'post'
            })

            displayMessageOnChatScreen({
                assistant_response: message,
                identity: 'watson'
            })
            break
        case 'Display_image':
            displayMessageOnChatScreen({
                assistant_response: message,
                identity: 'image_bot'
            })
            break
        default:
            displayMessageOnChatScreen({
                assistant_response: message,
                identity: 'watson'
            })
    }
}

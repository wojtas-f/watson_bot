const { clearChat } = require('./displayController')
const { displayMessageOnChatScreen } = require('./renderMessage')

export const sendResponseToController = async (intent, assistant_response) => {
    switch (intent) {
        case 'General_Ending':
            setTimeout(clearChat(), 1000)
            break
        case 'Session_restart':
            const restart = await fetch('/api/session/resetid', {
                method: 'post'
            })
            console.log('Session ID cleared', restart)
            break
        case 'Display_image':
            console.log('Display image')
            displayMessageOnChatScreen({
                assistant_response,
                identity: 'image_bot'
            })
            break
        default:
            console.log('Display message')
            displayMessageOnChatScreen({
                assistant_response,
                identity: 'watson'
            })
    }
}

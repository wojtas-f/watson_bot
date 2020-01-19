const { state } = require('./appState')

const addMessageToState = (user_input, assistant_response) => {
    state.conversation.push({
        user_input,
        assistant_response
    })
}

const renderPage = (user_input, assistant_response) => {
    addMessageToState(user_input, assistant_response)
    const output = state.conversation
    return output
}

module.exports = renderPage

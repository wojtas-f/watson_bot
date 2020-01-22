export const sendMessageToAssistant = async userInput => {
    const formData = { message: userInput }

    const res = await fetch('/api/message', {
        method: 'post',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(formData)
    })
    let data = await res.json()
    const assistant_response = data.assistant_response
    const intent = data.intent

    return { assistant_response, intent }
}

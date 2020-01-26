const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

// TODO: Fix the problem withe the Session id when user did not end the conversation

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY
    }),
    url: process.env.ASSISTANT_URL
})

const payload = {
    assistantId: '',
    sessionId: '',
    input: {
        message_type: 'text',
        text: ''
    }
}

/**
 *  Return message
 *  POST(/api/message)
 *  @function
 */
exports.sendMessage = async (req, res) => {
    if (!req.session.session_id) {
        req.session.session_id = await startSession()
    }

    let assistantId = process.env.ASSISTANT_ID
    let userInputMessage = req.body.message

    payload.assistantId = assistantId
    payload.sessionId = req.session.session_id
    payload.input.text = userInputMessage

    saveMessage(req, userInputMessage, (intent = 'Ask_Assistant'))

    assistant.message(payload, (err, data) => {
        let assistant_response = ''
        let intent = ''
        if (err) {
            assistant_response =
                'Ups,something went wrong. Please, refresh the page and try again'
            intent = 'Session_error'

            if (isInvalidId(err.message, err.headers.connection, err.code)) {
                assistant_response =
                    'Wait a second please. I have to restart the session.'
                intent = 'Session_restart'
            }

            return res.json({ assistant_response, intent })
        }

        const res_type = data.result.output.generic[0].response_type
        intent = checkIntent(data.result.output.intents[0])
        assistant_response = data.result.output.generic[0].text

        if (intent === 'General_Ending') {
            endSession(req.session.session_id, assistantId)
            req.session.session_id = null
        }

        if (responseIsImage(res_type)) {
            assistant_response = data.result.output.generic[0].source
            intent = 'Display_image'
        }

        saveMessage(req, assistant_response, intent)
        res.json({ assistant_response, intent })
    })
}

/**
 *  Return message
 *  GET(/api/chat/content)
 *  @function
 */
exports.loadChatCotnent = (req, res) => {
    let code
    if (!req.session.chat) {
        code = 204
    } else {
        code = 200
    }
    res.status(code).send(req.session.chat)
}

const saveMessage = (req, message, intent) => {
    if (!req.session.chat) {
        req.session.chat = []
    }
    const chat = req.session.chat
    chat.push({ message, intent })
}

const checkIntent = intents_first_element => {
    let intent = ''
    if (intents_first_element === undefined) {
        intent = 'Irrelevant'
    } else {
        intent = intents_first_element.intent
    }
    return intent
}

const responseIsImage = response_type => {
    if (response_type === 'image') {
        return true
    }
    return false
}

const isInvalidId = (message, connection, code) => {
    if (
        message === 'Invalid Session' &&
        connection === 'close' &&
        code === 404
    ) {
        return true
    }
    return false
}

const startSession = async () => {
    let SESSION_ID
    await assistant
        .createSession({
            assistantId: process.env.ASSISTANT_ID || '{assistant_id}'
        })
        .then(res => {
            console.log('Watson Assistant Session started')
            SESSION_ID = res.result.session_id
        })
        .catch(err => {
            console.log(err)
        })
    return SESSION_ID
}

const endSession = (sessionId, assistantId) => {
    assistant
        .deleteSession({
            assistantId,
            sessionId
        })
        .then(res => {
            console.log(JSON.stringify(res, null, 2))
        })
        .catch(err => {
            console.log(err)
        })
}

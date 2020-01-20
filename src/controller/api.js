const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY
    }),
    url: process.env.ASSISTANT_URL
})

/**
 *  Return message
 *  POST(/api/message)
 *  @function
 */
exports.sendMessage = async (req, res) => {
    if (!req.session.session_id) {
        sessionId = await startSession()
        console.log('2: sessionId')
    }

    let assistantId = process.env.ASSISTANT_ID
    let userInputMessage = ''

    if (req.body.message) {
        userInputMessage = req.body.message
    }

    const payload = {
        assistantId,
        sessionId: req.session.session_id,
        input: {
            message_type: 'text',
            text: userInputMessage
        }
    }

    // Send the input to the assistant service
    assistant.message(payload, (err, data) => {
        if (err) {
            console.log('THE BIG BAD ERROR')
            const status =
                err.code !== undefined && err.code > 0 ? err.code : 500
            return res.status(status).json(err)
        }

        console.log(data.result.output.intents[0].intent)

        const intent = data.result.output.intents[0].intent

        let assistant_response = data.result.output.generic[0].text

        if (intent === 'General_Ending') {
            endSession(req.session.session_id, assistantId)
            req.session.session_id = null
        }
        res.json(assistant_response)
    })
}

const startSession = async () => {
    await assistant
        .createSession({
            assistantId: process.env.ASSISTANT_ID || '{assistant_id}'
        })
        .then(res => {
            console.log('1: ', res.result.session_id)
            return res.result.session_id
        })
        .catch(err => {
            console.log(err)
        })
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

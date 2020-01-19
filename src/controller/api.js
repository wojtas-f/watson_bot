const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')
const state = require('../appState')

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: new IamAuthenticator({
        apikey: process.env.ASSISTANT_IAM_APIKEY
    }),
    url: process.env.ASSISTANT_URL
})

assistant
    .createSession({
        assistantId: process.env.ASSISTANT_ID || '{assistant_id}'
    })
    .then(res => {
        state.session_id = res.result.session_id
    })
    .catch(err => {
        console.log(err)
    })

/**
 *  Render index page
 *  GET(/)
 *  @function
 */
exports.renderIndex = (req, res) => {
    res.render('main')
}

/**
 *  Render chat page
 *  GET(/)
 *  @function
 */
exports.renderChat = (req, res) => {
    res.render('chat')
}

/**
 *  Return message
 *  POST(/api/message)
 *  @function
 */
exports.sendMessage = (req, res) => {
    let assistantId = process.env.ASSISTANT_ID

    let userInputMessage = ''
    console.log(req.body)
    if (req.body.message) {
        userInputMessage = req.body.message
    }
    console.log('User input: ', userInputMessage)
    var payload = {
        assistantId: assistantId,
        sessionId: state.session_id,
        input: {
            message_type: 'text',
            text: userInputMessage
        }
    }

    // Send the input to the assistant service
    assistant.message(payload, function(err, data) {
        if (err) {
            console.log(err)
            const status =
                err.code !== undefined && err.code > 0 ? err.code : 500
            return res.status(status).json(err)
        }

        let assistant_response = data.result.output.generic[0].text
        res.json(assistant_response)
    })
}

/**
 *  Get error page
 *  GET(*)
 * @function
 */
exports.wildcard = (req, res) => {
    res.render('404')
}

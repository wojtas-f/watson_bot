const express = require('express')
const state = require('./keys')
const app = express()
const renderPage = require('./templates/message')

app.use(express.static('./public')) // load UI from public folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

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
        //console.log(JSON.stringify(res, null, 2))
        console.log(res.result.session_id)
        state.session_id = res.result.session_id
    })
    .catch(err => {
        console.log(err)
    })

//TODO: SEND MESSAGE
app.post('/api/message', function(req, res) {
    let assistantId = process.env.ASSISTANT_ID

    let textIn = ''

    if (req.body.message) {
        textIn = req.body.message
    }

    var payload = {
        assistantId: assistantId,
        sessionId: state.session_id,
        input: {
            message_type: 'text',
            text: textIn
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

        const assistant_response = data.result.output.generic[0].text
        return res.send(renderPage(textIn, assistant_response))
    })
})

module.exports = app

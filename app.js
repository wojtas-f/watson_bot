const express = require('express')
const state = require('./keys')
const app = express()

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

//TODO: CREATE SESSION

// app.get('/api/session', (req, res) => {
//     assistant
//         .createSession({
//             assistantId: process.env.ASSISTANT_ID || '{assistant_id}'
//         })
//         .then(res => {
//             //console.log(JSON.stringify(res, null, 2))
//             console.log(res.result)
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })

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

    var textIn = ''

    if (req.body.message) {
        textIn = req.body.message
        console.log('1 Exists', textIn)
    }

    var payload = {
        assistantId: assistantId,
        sessionId: state.session_id,
        input: {
            message_type: 'text',
            text: textIn
        }
    }
    console.log(payload.session_id)
    // Send the input to the assistant service
    assistant.message(payload, function(err, data) {
        console.log('2 Sending')
        if (err) {
            console.log('3 Error')
            console.log(err)
            const status =
                err.code !== undefined && err.code > 0 ? err.code : 500
            return res.status(status).json(err)
        }
        console.log('4 Success')
        return res.json(data)
    })
})

module.exports = app

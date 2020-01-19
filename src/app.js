const express = require('express')
const state = require('./appState')
const app = express()
const prepareOutput = require('./message')
const hbs = require('hbs')
const path = require('path')
const AssistantV2 = require('ibm-watson/assistant/v2')
const { IamAuthenticator } = require('ibm-watson/auth')

const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static('./public')) // load UI from public folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.get('', (req, res) => {
    res.render('main')
})

//TODO: SEND MESSAGE
app.post('/api/message', function(req, res) {
    let assistantId = process.env.ASSISTANT_ID

    let userInputMessage = ''

    if (req.body.message) {
        userInputMessage = req.body.message
    }

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

        const assistant_response = data.result.output.generic[0].text
        const output = prepareOutput(userInputMessage, assistant_response)
        res.render('main', { output })
    })
})

module.exports = app

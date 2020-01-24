const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const APIRoutes = require('./routes/api')
const PageRoutes = require('./routes/pages')
const cors = require('cors')
const cookieSession = require('cookie-session')

const publicDirectoryPath = path.join(__dirname, '../dist')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
app.use(cors())
app.set('trust proxy', 1) // trust first proxy

app.use(express.static(publicDirectoryPath))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cookieSession({
        name: 'session',
        keys: ['key1', 'key2']
    })
)

app.use(APIRoutes)
app.use(PageRoutes)

module.exports = app

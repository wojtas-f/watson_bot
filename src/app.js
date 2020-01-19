const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const APIRoutes = require('./routes/api')
const cors = require('cors')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
app.use(cors())

app.use(express.static(publicDirectoryPath)) // load UI from public folder
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(APIRoutes)

module.exports = app

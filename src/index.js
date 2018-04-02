const express = require('express')
const bodyParser = require('body-parser')
const printii = require('printii')(__dirname)
const utils = require('./utils')

printii()

const app = express()
const port = process.env.PORT || 8080
const limit = process.env.LIMIT || 288 // logging once every 5' this is a day of logs
let state = false

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.get('/on', (req, res) => {
  console.log('/on called', req.params, req.body)
  state = true
  
  res
    .status(200)
    .send({state})
})

app.get('/off', (req, res) => {
  console.log('/off called', req.params, req.body)
  state = false
  
  res
    .status(200)
    .send({state})
})

app.get('/switch', (req, res) => {
  console.log('/switch called', req.params, req.body)
  state = !state

  res
    .status(200)
    .send({on: true})
})

app.get('/state', (req, res) => {
  console.log('/state called', req.params, req.body)
  
  res
    .status(200)
    .send({state})
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
  utils.logLine()
})

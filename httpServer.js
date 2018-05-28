'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const util = require('util')
const methodOverride = require('method-override')
const http = require('http')
const process = require('process')
const socket = require('net')
const moment = require('moment')
const config = require('./config')

global.app = new express()
app.set('port', process.env.PORT || config.serverConfig.httpPort)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(logger('dev'))

http.createServer(app).listen(app.get('port'), () => {
    console.log(util.format('# [HTTP Server running at %d] [pid:%d] [%s]', config.serverConfig.httpPort, process.pid, moment().format('YYYY-MM-DD HH:mm:ss')));
});

app.get('/get', (req, res) => {

    const client = new socket.Socket()
    client.connect(config.clientConfig.serverPort, config.clientConfig.serverHost, () => {
        client.write(req.query.param || `[HTTP GET Method] : this time : ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    })
    res.status(200).send(util.format('[Get Response] [%s] Hello World', moment().format('YYYY-MM-DD HH:mm:ss')))
})

app.post('/post', (req, res) => {

    const client = new socket.Socket()
    client.connect(config.clientConfig.serverPort, config.clientConfig.serverHost, () => {
        client.write(req.query.param || `[HTTP POST Method] : this time : ${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    })
    res.status(200).send(util.format('[Post Response] [%s] Hello World', moment().format('YYYY-MM-DD HH:mm:ss')))
})

'use strict'

const process = require('process')
const socket = require('net')
const config = require('./config')
const moment = require('moment')

let clients = []
let receiveData // 이진 데이터를 받아서 컨버팅하기 위한 변수 선언

const socketServer = new socket.createServer((connection) => {

  clients.push(connection)
  console.log('# [Client Connected] [%s]', moment().format('YYYY-MM-DD HH:mm:ss'))
  connection.on('data', (data) => {
      console.log('# [Receive Data] [%s] %s', moment().format('YYYY-MM-DD HH:mm:ss'), data.toString())
      broadcast(data, connection)
  })

  connection.on('end', () => {
    console.log('# [Client Disconnected] [%s]', moment().format('YYYY-MM-DD HH:mm:ss'))
  })

  const broadcast = (message, sender) => {
      clients.forEach((client) => {
          if (client === sender) return
          client.write(message)
      })
  }
})

socketServer.listen(9001, () => {
    console.log('# [Socket Server running at %d] [%s]', config.serverConfig.socketPort, moment().format('YYYY-MM-DD HH:mm:ss'))
})

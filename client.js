const socket = require('net')
const moment = require('moment')
const config = require('./config')
let receiveData
const client = new socket.Socket()

client.connect(config.clientConfig.serverPort, config.clientConfig.serverHost, () => {
    console.log('# [Client] [Connected Success] [%s]', moment().format('YYYY-MM-DD HH:mm:ss'))
    client.on('data', (data) => {
        receiveData = 0 // 들어온 이진 데이터를 받기 위한 변수 초기화
        for (let i = 0; i < data.length; i++) {
          receiveData += String.fromCharCode(data[i]) // 이진 데이터 컨버팅
        }
        controller(receiveData)
    })
})

/**
 * TODO
 * @desc 데이터에 따른 컨트롤 처리 로직
 */
const controller = (result) => {
  switch (result) {
    case '01' : console.log('# this is first logic'); break
    case '02' : console.log('# this is second logic'); break
    case '03' : console.log('# this is third logic'); break
    default : console.log('this is exception')
  }
}

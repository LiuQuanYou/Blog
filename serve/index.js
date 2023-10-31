//1.导入模块
const express = require('express')
var bodyParser = require('body-parser')

//2.创建服务器
let server = express()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

const cors = require('cors')
server.use(cors())

const user = require('./api/user.js')
const upload = require("./api/upload")
const uploads = require("./api/uploads")
server.use('/user', user)
server.use('/upload', upload)
server.use('/uploads', uploads)

//3.开启服务器
server.listen(8002, () => {
    console.log('服务器已启动,在端口号8002')
})

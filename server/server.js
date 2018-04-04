
const express = require('express')
const path = require('path')
const filterKeywords = require('./utils/filter')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000
var users = []

io.on('connection', function (socket) {
  console.log('io is connected!')
  // 登录、验证是否已存在
  socket.once('login', function (data) {

    if (users.length && (findIndex(users, data.name) >= 0)) {
      socket.emit('login', {
        status: 'err',
        text: '用户名已存在，请重新输入'
      })
    } else {
      users.push(data)
      // 设置当前用户的nickName
      socket.nickName = data.name
      console.log(data.name + '进入了房间')
      console.log('当前用户:', users)
      socket.emit('login', {
        status: 'ok',
        text: '登录成功'
      })
      socket.emit('sys', {
        text: socket.nickName + '进入了房间',
        count: users.length,
        users: users
      })
    }
  })

  // 用户发送消息
  socket.on('message', function (data) {
    // let newData = filterKeywords(data)
    socket.broadcast.emit('message', data)
  })

  // 用户断开连接
  socket.on('disconnect', function () {
    let index = findIndex(users, socket.nickName)
    
    if (index >= 0) {
      users.splice(index, 1)
    }

    if (socket.nickName) {
      // 离开房间通知
      io.emit('sys', {
        text: socket.nickName + '离开了房间',
        count: users.length,
        users: users
      })
    }
    console.log(socket.nickName + '离开了房间')
    console.log('当前用户', users)
  })
})

function findIndex (obj, item) {
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].name === item) {
      return i
    }
  }
}

http.listen(PORT, function () {
  console.log('socket is running at port: ' + PORT)
});

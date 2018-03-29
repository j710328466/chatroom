
// const express = require('express')
// const path = require('path')
// const app = express()
const http = require('http').createServer()
const io = require('socket.io')(http)

const PORT = process.env.PORT || 3000
var users = []

io.on('connection', function (socket) {
  console.log('io is connected!')
  socket.nickName = '未知用户'

  // 登录、验证是否已存在
  socket.on('login', function (data) {
    if (users.indexOf(data.name) >= 0) {
      console.log(data.name + '已存在，请重新输入')
      socket.emit('login', {
        status: 'err',
        text: '用户名已存在，请重新输入'
      })
      return;
    } else {
      users.push(data.name)
      // 设置当前用户的nickName
      socket.nickName = data.name
      console.log(data.name + '进入了房间')
      console.log('当前用户:', users)
      io.emit('sys', {
        text: socket.nickName + '进入了房间',
        count: users.length,
        users: users
      })
      socket.emit('login', {
        status: 'ok',
        text: '登录成功'
      })
    }
  })

  // 用户发送消息
  socket.on('message', function (data) {
    console.log(data)
    socket.broadcast.emit('message', data)
  })

  // socket.on('disconnect', function () {
  //   let index = users.indexOf(socket.nickName)
    
  //   if (index >= 0) {
  //     users.splice(index, 1)
  //   }

  //   // 离开房间通知
  //   io.emit('sys', {
  //     text: socket.nickName + '离开了房间',
  //     count: users.length,
  //     users: users
  //   })
  //   console.log(socket.nickName + '离开了房间')
  //   console.log('当前用户', users)
  // })
})

http.listen(PORT, function () {
  console.log('socket is listening on port: ' + PORT)
})

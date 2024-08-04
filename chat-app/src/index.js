// Path is module provides utilities for working with file and directory paths bawaan dari node js
const path = require('path')
const http = require('http')//bawaan dari node js
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

// ini route dengan memanggil file css, js, and html di url secara static
app.use(express.static(publicDirectoryPath))

// let count = 0

//server (emit) => client (recieve) - countUpdated
//client (emit) => server (recieve) - increment

io.on('connection', (socket) => {
    console.log('New WebSocket Connection')

    //ini untuk penyiaran dan deklarasi pesan
    // socket.emit('message', generateMessage('Welcome!'))//generateMessage dari folder utils/messages.js

    //broadcast --> to all connected clients except the sender/untuk memberi tahu klien lain connect
    // socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    //ini untuk pemanggilan room socket
    socket.on('join', (options, callback) => {//callback untuk pemanggilan acknowledgement
        const { error, user } = addUser({ id: socket.id, ...options })//ini seperti callback dan ..options berisi username & room

        if(error) {
            return callback(error)
        }

        socket.join(user.room)//Adds the socket to the given room or to the list of rooms

        //ini deklarasi/penyiaran
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))//ini untuk mengirimkan ke beberapa orang di room

        //ini dekslarasi/penyiaran ulang untuk list user di room
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()

        //socket.emit(), io.emit(), socket.broadcast.emit()
        //io.to().emit(), socket.broadcast.to().emit()--> ini untuk mengirimkan ke beberapa orang di room
    })

    //ini untuk pemanggilan pesan
    socket.on('sendMessage', (messageClient, callback)=>{
        // console.log(socket.id)
        const user = getUser(socket.id)

        const filter = new Filter()//ini untuk filter bad words

        if (filter.isProfane(messageClient)) {
            return callback( 'Profanity is not allowed!' )
        }

        io.to(user.room).emit('message', generateMessage(user.username, messageClient))//ini deklarasi ulang untuk setiap connection/everyone
        callback()//ini untuk memanggil acknowledgement
    })

    //ini untuk pemanggilan location
    socket.on('sendLocation', (coords, callback)=>{
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longtitude}`))//ini deklarasi untuk setiap connection/everyone
        callback()//ini untuk memanggil acknowledgement
    })

    //ini untuk disconnect artinya jika klien terputus maka akan mengirimkan pesan sebagai berikut 
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            //ini deklarasi/penyiaran
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })

    // //ini untuk penyiaran dan deklarasi
    // socket.emit('countUpdated', count)

    // //ini pemnaggilan penyaran
    // socket.on('increament', ()=>{
    //     count++
    //     // socket.emit('countUpdated', count)//ini untuk penyiaran dan deklarasi ulang dan ini untuk specific
    //     io.emit('countUpdated', count)//ini deklarasi ulang untuk setiap connection/everyone
    // })
})

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})
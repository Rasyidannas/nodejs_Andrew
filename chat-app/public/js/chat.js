const socket = io()//ini untuk initialize

//Elements
const $messageForm = document.querySelector('#message-form')//$messageFrom ini hanya konvension penulisan
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates message
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
//location.search ini untuk mengakses data form pada url
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true })//ini dari library qs di script chat.html

//ini untuk autoscrolling 
const autoscroll = ()=>{
    //New message element
    const $newMessage = $messages.lastElementChild

    //weight of the new message
    const newMessageStyles = getComputedStyle($newMessage)//getComputedStyle ini untuk mengembalikan nilai CSS
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)//ini sama denagn nilai margin-bottom = 16px
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin//offsetHeight ini mengembalikan nilai height elemen

    //Visible height
    const visibleHeight = $messages.offsetHeight

    //Height of messages container
    const containerHeight = $messages.scrollHeight//scrollHeight ini mengukur tinggi konten

    //How far have I sdrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight//scrollTop ini akan menambahkan tinggi elemen dan membuat ke bawah

    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }

    // console.log(newMessageMargin)
    // console.log(visibleHeight)
    // console.log(containerHeight)
    // console.log(newMessageHeight)
    // console.log(scrollOffset)
}

//ini pemanggilan pesan
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {//ini seperti HBS/EJS
        username: message.username,
        message: message.text,//ini bentuk dari object karena .emit dipanggil dengan function generateMessage yang mengembalikan object
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)//ini yang akan meletakkan di dalam hml berid messages
    autoscroll()
})


//ini pemanggilan location
socket.on('locationMessage', (message)=>{
    console.log(message)
    const locationUrl = Mustache.render(locationMessageTemplate, {//ini seperti HBS/EJS
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', locationUrl)//ini untuk penempatan
    autoscroll()
})

//pemangilan roomData yang berisi list users di room
socket.on('roomData', ({ room, users }) => {
    // console.log(room)
    // console.log(users)
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

//server (emit) -> client(recieve) --acknowledgement--> server

//client (emit) -> server(recieve) --acknowledgement--> client

//ini utnuk button submit pesan
$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()//ini untuk mencegah refresh yang dikarenakan tingkah laku default form

    $messageFormButton.setAttribute('disabled', 'disabled')//disable button

    // const messageClient = $messageFormInput.value
    const messageClient = e.target.elements.message.value//ini alternatif untuk $messageFormInput.value
    
    //ini penyiaran dan deklarasi
    socket.emit('sendMessage', messageClient, (error)=>{//ini argument ketiga(acknowledgements)
        $messageFormButton.removeAttribute('disabled')//enable ini untuk menyalakan lagi pada line 25
        $messageFormInput.value = ''//ini untuk menghapus form pessan setelah terkirim
        $messageFormInput.focus()

        //ini untuk acknowledgement
        if(error){
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

//ini untuk button share location
document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your bowser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')//disable button

    navigator.geolocation.getCurrentPosition((position) => {//iniAPI dari MDN
        // console.log(position)

        //ini untuk penyiaran dan deklarasi
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude

        }, (error)=>{
            //ini untuk acknowledgement
            if(error){
                return console.log(error);
            }
            $sendLocationButton.removeAttribute('disabled')//enable ini untuk menyalakan lagi pada line 48
            console.log('Location shared')
        })
    })
})

// //ini pemanggilan penyiaran
// socket.on('countUpdated', (count)=>{//ini dari index.js
//     console.log('The account has been updated!', count);
// })

// document.querySelector('#increament').addEventListener('click', ()=>{
//     console.log('Clicked');
//     socket.emit('increament')//ini penyiaran dan deklarasi
// })

//ini untuk penyiaran atau deklarasi untuk room
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/' //ini direct ke homepage
    }
})


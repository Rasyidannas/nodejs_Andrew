const users = []

//Function addUser
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Valdate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    //Check for existing user
    const existingUser = users.find((user) => {//users ini mengacu pada array users diatas
        return user.room === room && user.username === username
    })

    //validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    //Store user
    const user = { id, username, room }
    users.push(user)//ini untuk menambahkan data baru di array users
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {//findIndex mengembalikan nilai 0/-1
        return user.id === id
    })

    if (index !== -1){//jika index true/ada(user ditemukan)
        return users.splice(index, 1)[0]//0 adalah key index di users array
    }
}

//function user
const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}

//function users in room
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()

    return users.filter((user) => {//filter akan mengembalikan semua isi user atau array user
        return user.room === room
    })
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}


// FOR TEST FUNCTION
// addUser({
//     id: 22,
//     username: 'Rasyid',
//     room: 'Surabaya'
// })

// addUser({
//     id: 23,
//     username: 'Ciko',
//     room: 'Surabaya'
// })

// addUser({
//     id: 24,
//     username: 'rasyid',
//     room: 'Sidoarjo'
// })

// console.log(users)

// const user = getUser(24)

// console.log(user);

// const userList = getUserInRoom('surabaya')
// console.log(userList);
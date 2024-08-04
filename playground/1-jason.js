const fs = require('fs')
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book)//stringify for save data in JSON
// // console.log(bookJSON);
// fs.writeFileSync('1-json.json', bookJSON)//in membuat file baru berisi bookJSON

// const parseData = JSON.parse(bookJSON)//parse unutk menmanggil data dari JSON
// console.log(parseData.author);

//ini untuk membaca data dari file 1-json.json
// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title);


const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
//ini utnuk mendeklarasikan ulang
data.name = 'rasyid',
data.age = 22

const fillJSON = JSON.stringify(data)
fs.writeFileSync('1-json.json', fillJSON)
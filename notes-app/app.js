//This for connect to File System
// const fs = require('fs')

// writeFileSync ini untuk membuat file
// fs.writeFileSync('notes.txt', 'This file created by Node.js and replace old file!')

//ini untuk mnambahkan data di notes.txt
// fs.appendFileSync('notes.txt', ' Added data with appendFileSync')


// const add = require('./utils.js')

// const sum = add(2, 2)
// console.log(sum);


// Challenge this connect with notes.js
const chalk = require('chalk')//this is for make color word 
const validator = require('validator')//ini untuk form validasi
const notes = require('./notes.js')//ini untuk memanggil semua yang ada di notes.js
const yargs = require('yargs');//Yargs helps you build interactive command line tools, by parsing arguments and generating an elegant user interface. atau hampir sama dengan process.argv
const { argv } = require('process');//ini untuk mengindentifikasi di command line
const { demandOption } = require('yargs');


//INI PERCOBAAN VALIDATOR AND CHALK
// console.log(validator.isEmail('Rasyid@gmail.com'))//isEmail ini validator for email && output true and false
// console.log(validator.isURL('https://mead.io'))//isURL ini validator for url && output true and false
// const greenMsg = chalk.green.inverse.bold('Success!')
// console.log(greenMsg)


//process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched || ini juga bisa mnegembalikan apa yang kita ketik ketika memalakukan node app.js
// console.log(process.argv) 

// const command = process.argv[2]
// if(command === 'add'){
//     console.log('Adding note!');
// }else if(command === 'remove'){
//     console.log('Removing note!');
// }

//yargs
//Customize yargs version
yargs.version('1.1.0')//ini mengubah version dari yargs
//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,//ini berarti wajib diisi
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.addNote(argv.title, argv.body)
    }
})
//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note!',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.removeNote(argv.title)
    }
})
//create list command
yargs.command({
    command: 'list',
    describe: 'List your note',
    handler: ()=>{
        notes.listNotes()
    }
})
//create read command
yargs.command({
    command:'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.readNotes(argv.title)
    }
})

yargs.parse()//ini untuk menjalankan yargs
// console.log(yargs.argv);


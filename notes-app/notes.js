const fs = require('fs')
const chalk = require('chalk')//this is for make color word 



const getNotes = ()=>'Your notes called and printed'

//ini untuk add command
const addNote = (title, body)=>{
    const notes = loadNotes()
    //ini untuk mengecek jika ada title yang sama
    const duplicateNote = notes.find((note)=>note.title === title)

    //ini utnuk debug
    // debugger

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)//ini utnuk notes di app.js
        console.log(chalk.green.inverse('New note added!'));
    }else{
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

//ini untuk remove dan akan menghapus note di notes.json
const removeNote = (title)=>{
    const notes = loadNotes()
    //ini untuk mengecek jika ada title yang tidak sama
    const notesToKeep = notes.filter((note)=>{
        return note.title !== title//ini akan mengambalikan title yang tidak sama dan yang sama akan hilang
    })

    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note Removed!"));
    }else{
        console.log(chalk.red.inverse("No more found!"));
    }
}

//ini untuk list command dan akan menampilkan notes.title
const listNotes = ()=>{
    const notes = loadNotes()

    console.log(chalk.inverse('your notes'));

    notes.forEach((note)=>{
        console.log(note.title);
    })
}

const readNotes = (title)=>{
    const notes = loadNotes()

    //ini untuk mengecek jika ada title yang sama
    const noteFind = notes.find((note)=>note.title === title)

    if(noteFind){
        console.log(chalk.inverse(noteFind.title));
        console.log(noteFind.body);
    }else{
        console.log(chalk.red.inverse("Note not found!"));
    }
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)//ini untuk menyimpan data
    fs.writeFileSync('notes.json', dataJSON)//ini untuk membuat file notes.json 
}

const loadNotes = ()=>{
    try{//ini untuk jika file notes.json ada
        const dataBuffer = fs.readFileSync('notes.json')//ini utnuk membaca file tetapi berupa angka untuk file notes.json
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)//ini untuk mengambil data
    }catch(e){//ini untuk error
        return []
    }    
}

//single exports
// module.exports = getNotes //in iuntuk mengesport deklarasi dan dapat dipanggil dengan require

//multiple exports
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
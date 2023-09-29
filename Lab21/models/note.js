const fs = require("fs")

var notes = JSON.parse(fs.readFileSync('./notes.json'))

function submit() {
    fs.writeFileSync('./notes.json', JSON.stringify(notes, null, '  '))
}

module.exports = {
    GetAll: () => {
        notes = JSON.parse(fs.readFileSync('./notes.json'))
        return notes
    },
    Add(note) {

        if (note.name && note.number)
            notes.push(note)
        submit()
    },
    Update(note) {
        let to_upd = notes.find(n => n.name == note.name)
        if (to_upd) {
            to_upd.number = note.number
            submit()
        } else throw new Error('Person does not exist')
    },
    Delete(fio) {
        console.log(fio);
        let to_del = notes.find(n => n.name == fio)
        if (to_del) {
            notes = notes.filter(n => n != to_del)
            submit()
        }
        else throw new Error('Person does not exist')
    }
}
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();
const dB = require('./db/db.json');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//get notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('/api/notes', (req, res) => {
  res.json(dB)
});


app.post('/api/notes', (req, res) => {
  const addedNote = createNote(req.body, dB)
  res.json(addedNote)
});

const createNote = (body, notesArr) => {
  const newNote = body
  body.id = notesArr.length
  notesArr.push(newNote)
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArr)
  )
  return newNote;
}



app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, dB)
  res.json(true)
})

const deleteNote = (id, notesArr) => {
  for (let index = 0; index < notesArr.length; index++) {
    let note = notesArr[index];
    if (note.id == id) {
      notesArr.splice(index, 1)
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr)
      )
      break
    }

  }
}
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

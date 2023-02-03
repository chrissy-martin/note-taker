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



app.delete("/api/notes/:id", function (req, res) {
  let jsonFilePath = path.join(__dirname, "/db/db.json");
  // request to delete note by id.
  for (let i = 0; i < database.length; i++) {

      if (database[i].id == req.params.id) {
          // Splice takes i position, and then deletes the 1 note.
          database.splice(i, 1);
          break;
      }
  }
  // Write the db.json file again.
  fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

      if (err) {
          return console.log(err);
      } else {
          console.log("Your note was deleted!");
      }
  });
  res.json(database);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


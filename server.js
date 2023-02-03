// const PORT = process.env.PORT || 3001;
// const fs = require('fs');
// const path = require('path');

// const express = require('express');
// const app = express();
// const dB = require('./db/db.json');


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

// //get notes
// app.get('/notes', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/notes.html'));
// });


// app.get('/api/notes', (req, res) => {
//   res.json(dB)
// });


// app.post('/api/notes', (req, res) => {
//   const addedNote = createNote(req.body, dB)
//   res.json(addedNote)
// });

// const createNote = (body, notesArr) => {
//   const newNote = body
//   body.id = notesArr.length
//   notesArr.push(newNote)
//   fs.writeFileSync(
//     path.join(__dirname, './db/db.json'),
//     JSON.stringify(notesArr)
//   )
//   return newNote;
// }



// app.delete("/api/notes/:id", function (req, res) {
//   let jsonFilePath = path.join(__dirname, "/db/db.json");
//   // request to delete note by id.
//   for (let i = 0; i < database.length; i++) {

//       if (database[i].id == req.params.id) {
//           // Splice takes i position, and then deletes the 1 note.
//           database.splice(i, 1);
//           break;
//       }
//   }
//   // Write the db.json file again.
//   fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

//       if (err) {
//           return console.log(err);
//       } else {
//           console.log("Your note was deleted!");
//       }
//   });
//   res.json(database);
// });

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`);
// });


const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/notes", (req, res) => {
  console.log(`Hitting the API/Notes Route`);
  res.json(db);
})

app.post("/api/notes", (req, res) => {
  console.log(`Hitting the API/Notes Route (with post request)`);

  let newNote = req.body;
  newNote.id = uuidv4();
  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db), (err) => {
    if(err) throw err;
  });
  res.send(db)
})

app.delete("/api/notes/:id", (req, res) => {
  db.forEach((note, i) => {
    if (note.id === req.params.id) {db.splice(i, 1)}
  })

  // db.splice(db.indexOf(req.params.id), 1);
  fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
    if(err) throw err;
  })
  res.send(db)
})

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
{
  console.log(`Listening at ${PORT}`);
})
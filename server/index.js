const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const morgan = require('morgan');
const db = require('../database/index');
const bodyParser = require('body-parser');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(express.static(path.resolve('public')));

// GET routes
app.get('/fileTree', (req, res) => {
  let fileTree = { root: [] }
  db.getAllFolders(folders => {
    db.getAllFiles(files => {
      fileTree.root = folders.filter(folder => folder.path === '/').concat(files.filter(file => file.path === '/'));
      res.json(fileTree);
    })
  })
});

app.get('/:folder_id', (req, res) => {
  // get all contents of a folder
})

// POST routes
app.post('/folder', (req, res) => {
  const { name, path } = req.body;
  db.saveFolderData({ name, path }, document => {
      res.send(document);
    })
})

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
});
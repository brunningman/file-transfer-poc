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
app.get('/fileTree', async (req, res) => {
  let folders = await db.getAllFolders();
  folders = folders.map(folder => {
    return {
      name: folder._doc.name,
      children: [],
      type: 'folder',
      path: folder._doc.path
    }
  });
  let files = await db.getAllFiles();
  files = files.map(file => {
    return {
      name: folder._doc.name,
      children: [],
      type: 'file',
      path: file._doc.path
    }
  });
  let entities = folders.concat(files)
    .sort((a, b) => a.name - b.name)
    .map((item, index) => {
      return { ...item, id: index + 2};
    });


  let fileTree = {
    id: 1,
    name: 'root',
    children: [],
    type: 'folder',
    path: '/'
  }
  const buildTree = (root, items) => {
    items.forEach(item => {
      console.log(2, item.id);
      if(item.type === 'file') {
        root.children.push(item);
      } else {
        root.children.push(item);
        let next = root.children[root.children.length - 1];
        buildTree(next, items.filter(item => item.path === next.path + next.name));
      }
    });
  }

  console.log(1, entities)
  buildTree(fileTree, await entities);
  console.log(3, fileTree);
  res.json(fileTree);
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
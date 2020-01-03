const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/file_metadata', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', () => {
  console.log('Mongoose connection successful');
})

const fileSchema = new mongoose.Schema({
  path: String,
  name: String,
  s3_id: String
});

const folderSchema =  new mongoose.Schema({
  path: String,
  name: String
})

const File = mongoose.model('File', fileSchema);
const Folder = mongoose.model('Folder', folderSchema);

const getAllFiles = async cb => {
  const files = await File.find();

  return files;
}

const getAllFolders = async cb => {
  const folders = await Folder.find();

  return folders;
}

const saveFileData = async (fileInfo, cb) => {
  const document = await File.create({
    path: fileInfo.path,
    name: fileInfo.name,
    s3_id: ''
  });

  cb(document);
}

const saveFolderData = async (folderInfo, cb) => {
  const document = await Folder.create({
    path: folderInfo.path,
    name: folderInfo.name
  });

  cb(document);
}

module.exports = {
  saveFileData,
  saveFolderData,
  getAllFiles,
  getAllFolders
}
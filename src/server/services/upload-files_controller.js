const multer = require('multer');
const mongoose = require('mongoose');
const MediaFile = mongoose.model("MediaFile");

function uploadFiles(req, res) {

  console.log('file', req.body, req.data)
  let filePath = '';
  let fileName = '';
  let fileData = {};

  // fileData.author = req.body.file.author;
  // fileData.type = req.body.file.dataType;


  const storage = multer.diskStorage({
    destination: (req, file, callback) => {


      filePath = `./src/server/public/media/${file.fieldname}`;

      console.log('dest', file)
      callback(null, filePath);
    },
    filename: (req, file, callback) => {
      fileName = `img-${Date.now()}.${file.mimetype.split("/").pop()}`;

      fileData.fileName = fileName;
      fileData.path = file.fieldname + '/' + fileName

      callback(null, fileName);
    }
  });

  let upload = multer({ storage: storage }).single('images');

  upload(req, res, (err) => {

    if (err) {
      console.log(err, 'field', err.field);
      return res.status(400).send({ message: 'Incorrect file' });
    }

    let data = {
      fileType: req.file.mimetype.substring(0, req.file.mimetype.indexOf('/')),
      fileName: req.file.filename,
      path: req.file.path,
      authorName: 'Author',
    };

    let mediaFile = new MediaFile(data);

    console.log('fileData', req.file);

    return saveFileData(req, res, mediaFile);
  });

};

async function saveFileData(req, res, fileData) {

  return await fileData.save((err) => {

    if (err) {
      return console.error(err);
    }

    getAllFiles(req, res);
  });

}

function getAllFiles(req, res) {

  MediaFile.find({}, (err, docs) => {
    // mongoose.disconnect();

    if (docs && docs.length === 0) {
      return res.status(200).send({ respType: 'empty', message: 'Files not found' });
    }

    if (err) {
      return console.error('error', err);
    }

    res.status(200).send(docs);
  })
}


function deleteImage(req, res) {
  MediaFile.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.error(err);
    }

    res.status(200).send(result);
  })
}


function handleImage(img) {

}

function handleVideo(video) {

}


module.exports = {
  uploadFiles,
  getAllFiles,
  deleteImage
};
const multer = require('multer');

exports.uploadFiles = (req, res) => {

  console.log('file', req.body)
  let filePath = '';
  let fileName = '';

  const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
      filePath = `./src/server/public/media/${file.fieldname}`;

      console.log('dest', file)
      callback(null, filePath);
    },
    filename: (req, file, callback)=>{
      fileName = `img-${Date.now()}.${file.mimetype.split("/").pop()}`;

      callback(null, fileName);
    }
  });

  let upload = multer({storage: storage}).single('images');

  upload(req, res, (err)=>{
    if(err) {
      console.log(err, 'field', err.field);
      return res.status(400).send({ message: 'Incorrect file' });
    }

    return res.status(200).send(filePath)
  });



};

function handleImage(img) {

}

function handleVideo(video) {

}
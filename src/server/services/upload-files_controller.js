exports.uploadFiles = (req, res) => {
  let file = req.body.file;
  let fileName = file.name;

  const storage = multer.diskStorage({
    destination: `./src/server/public/media/${req.body.fileType}`,
    fileName: (req, file, callback)=>{
      callback(null, `${file.fieldName}-${Date.now()}`)
    }
  });

  let upload = multer({storage: storage});



};

function handleImage(img) {

}

function handleVideo(video) {

}
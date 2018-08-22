const multer = require("multer");


//**REFERENCE
//https://www.npmjs.com/package/multer */

//specifying mimetype array
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif":"gif"
  };
  
  //handling the storage of images/file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "images");
    },
    
    //specifying how the file name will be composed
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
  });

  module.exports = multer({ storage: storage }).single("image");

  
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: "resume/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})

const fileUploader = multer({
  storage,
  fileFilter:async (req, file, cb) => {
    const supportedFile = /pdf/;
    const extension = await path.extname(file.originalname);
    if(file.originalname){
      req.body.resumeId = file?.originalname
    }
    if(supportedFile.test(extension)){
      cb(null, true);
    } else{
      cb(new Error("Resume format must be pdf"));
    }

  },
  limits: {
    fileSize: 5000000,
  }
})

module.exports = fileUploader;
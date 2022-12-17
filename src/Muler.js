import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url'
  

const imageFilter = function(req,file,cb) {
    if(!file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|PNG|png|gif|GIF)$/)){
        req.fileValidationError = "Only image files are allowed"
        return cb(new Error('Only image files are allowed'),false)
    }
    cb(null,true)
}

const fileStorageEngine = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,path.join(__dirname, 'image'))
    },
    filename : (req,file,cb) =>{
        cb(null,Date.now() + file.originalname.toLowerCase().split(' ').join('-'))
    }
})

const upload = multer({storage : fileStorageEngine,fileFilter : imageFilter})


//set up upload image
// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg'
//   };
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       const isValid = FILE_TYPE_MAP[file.mimetype];
//       let uploadError = new Error('invalid image type');
  
//       if (isValid) {
//         uploadError = null;
//       }
//       cb(uploadError, 'image');
//     },
//     filename: function (req, file, cb) {
//       const fileName = file.originalname.split(' ').join('-');
//       const extension = FILE_TYPE_MAP[file.mimetype];
//       cb(null, `${fileName}-${Date.now()}.${extension}`);
//     }
//   });
//   const upload = multer({ storage: storage });

export default upload
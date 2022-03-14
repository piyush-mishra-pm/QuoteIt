const multer = require('multer');
const { v1: uuid } = require('uuid');
// multer gives us mime like: 'image/png'
// we need to extract 'png' from it.
// So we can use this map to specify the mappings between mime and extensions.
const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
};

const imageUpload = multer({
    
    limits:500*1000, // 500 Kb
    
    storage: multer.diskStorage({

        destination:(req,file,cb)=> {
            cb(null,'uploads/images');
        },

        filename:(req,file,cb)=>{
            // Extracting the file extension:
            const fileExtension=MIME_TYPE_MAP[file.mimetype];
            cb(null,`${uuid()}.${fileExtension}`);
        },

        fileFilter:(req,file,cb)=>{
            const isValid = !!MIME_TYPE_MAP[file.mimetype];
            let error = isValid ? null : new Error('Image has invalid mime type!');
            cb(error, isValid);
        }
    })

});

module.exports = imageUpload;
import multer from 'multer';
import { generateId } from '../utils/generateToken.js';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        // console.log("Multer storage setting destination")
        // cb(null, "uploads/profiles")
        cb(null, "uploads")
    },
    filename(req, file, cb) {
        // console.log("multer storage generate file name")
        // console.log(file.mimetype)
        const id = generateId();
        const filename = file.originalname.split(".").shift()
        const extName = file.originalname.split(".").pop();
        const fileName = `admin_${filename}_${id}.${extName}`;
        cb(null, fileName);
    },
});


// upload profilpic 
export const adminProfilePic = multer({storage}).single("image")
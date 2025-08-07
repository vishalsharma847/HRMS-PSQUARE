// accept pdf import multer from 'multer';
import multer from 'multer';
import { generateId } from '../utils/generateToken.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads'); // or any other directory
  },
  filename(req, file, cb) {
    const id = generateId();
    const filename = file.originalname.split('.').shift();
    const extName = file.originalname.split('.').pop();
    const fileName = `resume_${filename}_${id}.${extName}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

export const resumeupload = multer({
  storage,
  fileFilter,
}).single('resume');
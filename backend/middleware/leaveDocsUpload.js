import multer from 'multer';
import { generateId } from '../utils/generateToken.js';


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads'); // or 'uploads/leavedocs' if you want a subfolder
  },
  filename(req, file, cb) {
    const id = generateId();
    const filename = file.originalname.split(".").shift();
    const extName = file.originalname.split(".").pop();
    const fileName = `leavedoc_${filename}_${id}.${extName}`;
    cb(null, fileName);
  },
});

// Accept images, PDFs, Word docs, etc.
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, Word docs, or image files are allowed'), false);
  }
};

export const leaveDocupload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: limit to 5MB
}).single("document"); // Field name in your form must be "document"



{/* <input type="file" name="document" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" /> */}
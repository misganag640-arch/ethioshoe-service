import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
  destination: (_r,_f,cb) => cb(null,'uploads/'),
  filename: (_r,file,cb) => cb(null, Date.now()+'-'+file.originalname)
});
export const upload = multer({ storage, limits:{ fileSize: 5*1024*1024 }});

import multer from 'multer';
import path from 'path';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${uuid()}`;
    const ext = path.extname(file.originalname || '') || '.bin';
    cb(null, `${unique}${ext}`);
  },
});

export const upload = multer({ storage });

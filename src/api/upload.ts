import { Router } from 'express';
import multer from 'multer';
import storage from '../models/file';

const router = Router();

const upload = multer({ storage });

router.post('/upload', upload.array('files'), (req, res) => {
  // After files have been stored, we can send a response back to the client
  res.status(200).json({ message: 'Files uploaded successfully' });
});

export default router;

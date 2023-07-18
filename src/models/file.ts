import multer from 'multer';
import path from 'path';
import { FILE_KEYS, ASSETS_DIR } from '../utils/constants';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    // Here, we specify where we want Multer to save your files.
    cb(null, ASSETS_DIR);
  },
  filename: (req, file, cb) => {
    // Get the unique ID from the request
    const entityID = req.body.entityID;

    // Get the key code from the request
    const keyCode = req.body.key;

    // Get the key value from the keys object
    const key = FILE_KEYS[keyCode];

    // Add key and extension to the unique ID
    const extension = path.extname(file.originalname);
    const fileName = `${entityID}${key}${extension}`;

    cb(null, fileName);
  }
});

export default storage;
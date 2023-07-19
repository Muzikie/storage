import multer from 'multer';
import path from 'path';
import { FILE_KEYS, ASSETS_DIR } from '../utils/constants';
import type { FileKeys } from '../utils/types';

const regex = /^(\w{32})(\w{2})(.*)$/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ASSETS_DIR);
  },
  filename: (req, file, cb) => {
    const match = file.originalname.match(regex);

    if (match) {
      const entityID = match[1];
      const keyCode = match[2] as FileKeys;
      const originalName = match[3];
      // Get the key value from the keys object
      const key = FILE_KEYS[keyCode];

      // Add key and extension to the unique ID
      const extension = path.extname(originalName);
      const fileName = `${entityID}${key}${extension}`;

    cb(null, fileName);
    } else {
      cb(new Error('Invalid file name'), '');
    }
  }
});

export default storage;
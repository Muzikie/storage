import { Router } from 'express';
import { FILE_KEYS, ASSETS_DIR } from '../utils/constants';

const router = Router();

router.get('/images/:id/:key', (req, res) => {
    const { id, key } = req.params;

    // If no matching key, return an error
    if (!FILE_KEYS[key]) {
      res.status(400).json({ error: 'Invalid key provided.' });
      return;
    }

    // Construct the path for the image
    // We are assuming all image files will have .jpg extension
    // We will modify uploaded images to correct dimension and file type
    const imagePath = `${ASSETS_DIR}/${id}${FILE_KEYS[key]}.jpg`;

    // Redirect to the static file
    res.redirect(imagePath);
});

export default router;

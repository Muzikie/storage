import express from 'express';
import path from 'path';
import cors from 'cors';

import uploadRouter from './api/upload';
import imagesRouter from './api/images';
import audiosRouter from './api/audios';
import statusRouter from './api/status';
import { API_PREFIX, Images_DIR } from './utils/constants';

const app = express();

// Support CORS from Muzikie subdomains
app.use(cors({
origin: [/^https?:\/\/([a-z0-9]+[.])*muzikie[.]com$/]
}));

// Serving static files
app.use('/', express.static(path.join(__dirname, `.${Images_DIR}`)));

// registering routes
app.use(API_PREFIX, uploadRouter);
app.use(API_PREFIX, imagesRouter);
app.use(API_PREFIX, audiosRouter);
app.use(API_PREFIX, statusRouter);

export default app;

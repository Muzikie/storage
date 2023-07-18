import express from 'express';
import cors from 'cors';
import path from 'path';
import { ASSETS_DIR } from './utils/constants';

const app = express();

app.use(cors({
  origin: [/^https?:\/\/([a-z0-9]+[.])*muzikie[.]com$/]
}));

// Serving static files
app.use(ASSETS_DIR, express.static(path.join(__dirname, `..${ASSETS_DIR}`)));

export default app;

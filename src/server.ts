import app from './app';
import uploadRouter from './api/upload';
import imagesRouter from './api/images';
import audiosRouter from './api/audios';
import { API_PREFIX } from './utils/constants';

app.use(API_PREFIX, uploadRouter);
app.use(API_PREFIX, imagesRouter);
app.use(API_PREFIX, audiosRouter);

const port = process.env.PORT || 4009;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

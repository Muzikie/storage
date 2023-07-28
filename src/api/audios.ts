import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { Audios_DIR, FILE_KEYS, RPC_WS_URL } from '../utils/constants';
import type { UploadParams } from '../utils/types';
import WebSocket from 'ws';

const router = Router();

// Create a WebSocket client
let ws = new WebSocket(RPC_WS_URL);

router.get('/audio/:id/:key', async (req, res) => {
  const { id, key } = req.params as UploadParams;
  const address = req.headers['address'];

  if (!FILE_KEYS[key] || !address) {
    res.status(400).json({ error: 'Invalid key provided.' });
    return;
  }

  const audioPath = path.join(__dirname, `..${Audios_DIR}/${id}${FILE_KEYS[key]}.mp3`);

  fs.stat(audioPath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.sendStatus(404);
      }
      res.end(err);
    }

    // Handle range headers (used for audio seek)
    const range = req.headers.range;
    if (!range) {
      const err = new Error('Wrong range');
      return res.end(err);
    }

    const [start_str, end_str] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(start_str, 10);
    const end = end_str ? parseInt(end_str, 10) : stats.size - 1;
    
    // Check for user's active subscription via WebSocket
    ws.send(JSON.stringify({ method: 'subscription_getAccount', params: { address } }));
    ws.on('message', (data) => {
      const response = JSON.parse(data.toString());
      if (!response.success) {
        res.status(403).send('Insufficient credit');
        return;
      }

      // Create headers
      const contentLength = end - start + 1;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'audio/mpeg', // Assuming audio is in mp3 format
      };
  
      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);
  
      // create audio read stream for this particular chunk
      const audioStream = fs.createReadStream(audioPath, { start, end });
  
      // Stream the audio chunk to the client
      audioStream.pipe(res);
    });
  });
});

export function closeWebSocket() {
  if (ws) {
    ws.close();
  }
}

export default router;

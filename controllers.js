const fs = require("fs");

function uploadFile(req, res) {
  const id = req.params.id;
  const file = req.file;

  let extension =  '';
  if (file.mimetype.indexOf('image') > -1) {
    extension = '.jpg';
  } else if (file.mimetype.indexOf('audio') > -1) {
    extension = '.mp3';
  }

  try {
    // Save the file with the given ID
    fs.renameSync(file.path, `uploads/${id}${extension}`);
  
    res.send({
      error: false,
      message: 'File uploaded successfully!'
    });
  } catch (e) {
    res.status(500);
    res.send({
      error: true,
      message: 'File uploaded successfully!'
    });
  }
}

function streamFile(req, res) {
  try {
    const id = req.params.id;
    const filePath = `./uploads/${id}.mp3`;
    const range = req.headers.range;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }

  } catch (error) {
    res.status(404).json({
      status: 404,
      message: 'File not found!',
    });
  }
}

module.exports = {
  uploadFile,
  streamFile,
};

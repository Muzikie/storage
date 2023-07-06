const fs = require("fs");

function uploadFile(req, res) {
  console.log('uploadFile params', req.params);
  console.log('uploadFile file', req.file);
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
    console.log('Fucking success');
  
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
  const id = req.params.id;

  // Stream the file with the given ID
  const filePath = `uploads/${id}`;
  const stream = fs.createReadStream(filePath);

  stream.on("open", () => {
    // Set appropriate headers
    res.set("Content-Type", "application/octet-stream");
    res.set("Content-Disposition", `attachment; filename="${id}"`);

    // Start streaming the file
    stream.pipe(res);
  });

  stream.on("error", (err) => {
    res.status(404).send("File not found!");
  });
}

module.exports = {
  uploadFile,
  streamFile,
};

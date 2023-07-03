const express = require("express");
const { validateUpload, upload } = require("./validators");
const { uploadFile, streamFile } = require("./controllers");

const router = express.Router();

router.post("/upload/:id", upload.single("file"), validateUpload, uploadFile);
router.get("/stream/:id", streamFile);

module.exports = router;

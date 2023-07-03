const multer = require("multer");
const { allowedFileTypes } = require("./config");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  // Check if the uploaded file type is allowed
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

function validateUpload(req, res, next) {
  // Validate req.params and req.file to ensure they meet your requirements
  // For example, check if req.params.id is present and if req.file exists
  // You can add additional validation logic as per your needs

  // If validation fails, send an error response
  if (!req.params.id || !req.file) {
    return res.status(400).json({ error: "Invalid request parameters" });
  }

  // If validation passes, move to the next middleware
  next();
}

module.exports = {
  validateUpload,
  upload,
};

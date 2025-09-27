// middlewares/uploadMiddleware.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create 'uploads' folder if it doesn't exist
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "").replace(/\s/g, "_");
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

// Filter only PDF, DOC, DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .pdf, .doc, .docx files allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

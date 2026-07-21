const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  if (mimeType !== "application/pdf" || fileExt !== ".pdf") {
    const error = new Error("Only PDF files are allowed.");
    error.code = "INVALID_FILE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB limit
  },
});

module.exports = upload;

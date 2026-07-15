const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure media directory exists
const mediaDir = path.join(__dirname, "..", "media");
if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mediaDir);
  },
  filename: (req, file, cb) => {
    // Prefix with timestamp to avoid collisions
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, uniquePrefix + "-" + safeName);
  },
});

// Filter: accept only PDF
const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
  ];
  if (allowed.includes(file.mimetype) || file.originalname.toLowerCase().endsWith(".pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max
});

// @desc    Upload a pitch deck file
// @route   POST /api/upload/pitch-deck
// @access  Public
router.post("/pitch-deck", upload.single("pitchDeck"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded or invalid file type. Please upload a PDF." });
  }

  const fileUrl = `/media/${req.file.filename}`;

  res.json({
    success: true,
    fileUrl,
    originalName: req.file.originalname,
    fileName: req.file.filename,
  });
});

// Error handler for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;

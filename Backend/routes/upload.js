const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { uploadFromStream, deleteFromCloudinary } = require("../services/uploadService");
const TemporaryUpload = require("../models/TemporaryUpload");

// @desc    Upload a pitch deck file
// @route   POST /api/upload/pitch-deck
// @access  Public
router.post("/pitch-deck", (req, res) => {
  upload.single("pitchDeck")(req, res, async (err) => {
    // Handle multer specific or filter errors
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          code: "FILE_TOO_LARGE",
          message: "File is too large. Max limit is 20 MB."
        });
      }
      if (err.code === "INVALID_FILE") {
        return res.status(400).json({
          success: false,
          code: "INVALID_FILE",
          message: err.message
        });
      }
      return res.status(400).json({
        success: false,
        code: "UPLOAD_ERROR",
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        code: "NO_FILE",
        message: "No file uploaded. Please upload a PDF."
      });
    }

    // Extract oldPublicId (if replacing a temporary upload) and other context
    const { oldPublicId } = req.body || req.query || {};
    const founderEmail = req.body.founderEmail || req.body.email || req.query.founderEmail || "anonymous";
    const uploadPurpose = req.body.uploadPurpose || req.query.uploadPurpose || "application";

    // Handle consecutive upload: delete the previous temporary file from Cloudinary and DB
    if (oldPublicId) {
      try {
        await deleteFromCloudinary(oldPublicId, {
          founderEmail,
          message: "Consecutive upload cleanup"
        });
        await TemporaryUpload.deleteOne({ publicId: oldPublicId });
      } catch (delErr) {
        console.error(`Error deleting consecutive upload target ${oldPublicId}:`, delErr);
      }
    }

    try {
      const folder = "startup-pitch-decks";
      
      // Stream buffer directly to Cloudinary
      const result = await uploadFromStream(req.file.buffer, folder, {
        founderEmail,
        message: "Pitch deck upload"
      });

      // Track the upload in our TemporaryUpload collection
      const tempUpload = await TemporaryUpload.create({
        publicId: result.public_id,
        assetId: result.asset_id,
        secureUrl: result.secure_url,
        originalFileName: req.file.originalname,
        uploadedBy: founderEmail,
        uploadPurpose: uploadPurpose,
      });

      // Return production-ready structured response
      res.json({
        success: true,
        pitchDeck: {
          assetId: result.asset_id,
          publicId: result.public_id,
          url: result.secure_url,
          originalFileName: req.file.originalname,
          uploadedAt: tempUpload.createdAt,
          size: req.file.size,
          mimeType: req.file.mimetype
        },
        // Maintain backwards compatibility:
        fileUrl: result.secure_url,
        fileName: result.public_id,
        originalName: req.file.originalname
      });
    } catch (uploadErr) {
      console.error("Cloudinary upload stream execution failed:", uploadErr);
      res.status(500).json({
        success: false,
        code: "UPLOAD_FAILURE",
        message: "Failed to upload file to Cloudinary. Please try again.",
        error: uploadErr.message || uploadErr
      });
    }
  });
});

// @desc    Test Cloudinary configuration and connection
// @route   GET /api/upload/test-config
// @access  Public
router.get("/test-config", async (req, res) => {
  const config = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "Configured" : "Missing",
    apiKey: process.env.CLOUDINARY_API_KEY ? "Configured" : "Missing",
    apiSecret: process.env.CLOUDINARY_API_SECRET ? "Configured" : "Missing",
  };

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(400).json({
      success: false,
      message: "One or more Cloudinary environment variables are missing on the server.",
      config
    });
  }

  try {
    // Attempt a dummy upload
    const dummyBuffer = Buffer.from("Cloudinary Diagnostics Test");
    const result = await uploadFromStream(dummyBuffer, "diagnostics", {
      founderEmail: "system-diagnostics",
      message: "Diagnostics connection test"
    });

    // Cleanup the diagnostics file
    try {
      await deleteFromCloudinary(result.public_id, { message: "Diagnostics cleanup" });
    } catch (delErr) {
      console.error("Failed to delete diagnostics file:", delErr);
    }

    return res.json({
      success: true,
      message: "Cloudinary configuration and connection test succeeded!",
      config
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cloudinary connection test failed. See error details.",
      error: error.message || error,
      config
    });
  }
});


// @desc    Delete a pitch deck file from Cloudinary (temporary file cleanup)
// @route   DELETE /api/upload/pitch-deck
// @access  Public
router.delete("/pitch-deck", async (req, res) => {
  const { publicId } = req.body || req.query || {};
  if (!publicId) {
    return res.status(400).json({
      success: false,
      code: "MISSING_PUBLIC_ID",
      message: "publicId is required."
    });
  }

  try {
    await deleteFromCloudinary(publicId, { message: "Manual temporary file deletion" });
    await TemporaryUpload.deleteOne({ publicId });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      code: "DELETE_FAILURE",
      message: error.message
    });
  }
});

module.exports = router;

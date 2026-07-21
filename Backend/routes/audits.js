const express = require("express");
const router = express.Router();
const Audit = require("../models/Audit");
const TemporaryUpload = require("../models/TemporaryUpload");

// @desc    Get all audit requests
// @route   GET /api/audits
// @access  Public
router.get("/", async (req, res) => {
  try {
    const audits = await Audit.find({}).sort({ createdAt: -1 });
    const formatted = audits.map((a) => {
      const obj = a.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Create a new audit request
// @route   POST /api/audits
// @access  Public
router.post("/", async (req, res) => {
  const { pitchDeck } = req.body || {};
  const publicId = pitchDeck ? pitchDeck.publicId : null;
  const founderEmail = req.body.email || "N/A";

  try {
    const newAudit = await Audit.create(req.body);

    // Remove tracking from TemporaryUpload on successful save
    if (publicId) {
      await TemporaryUpload.deleteOne({ publicId });
    }

    const obj = newAudit.toObject();
    obj.id = obj._id;
    res.status(201).json({ success: true, audit: obj });
  } catch (error) {
    console.error("Audit creation failed in database, cleaning up file:", error);

    // Cleanup Cloudinary file immediately to prevent orphan uploads
    if (publicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(publicId, {
          founderEmail,
          message: "Audit creation error cleanup"
        });
        await TemporaryUpload.deleteOne({ publicId });
      } catch (cleanupErr) {
        console.error(`Failed to clean up file ${publicId} on audit creation error:`, cleanupErr);
      }
    }

    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete an audit request
// @route   DELETE /api/audits
// @access  Public
router.delete("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID required in request body" });
  }

  try {
    const deleted = await Audit.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Audit booking not found" });
    }

    // Clean up associated Cloudinary file
    if (deleted.pitchDeck && deleted.pitchDeck.publicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(deleted.pitchDeck.publicId, {
          founderEmail: deleted.email || "N/A",
          message: "Audit delete cleanup (body method)"
        });
      } catch (delErr) {
        console.error(`Failed to delete Cloudinary file ${deleted.pitchDeck.publicId} during audit deletion:`, delErr);
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete an audit request by URL param
// @route   DELETE /api/audits/:id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Audit.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Audit booking not found" });
    }

    // Clean up associated Cloudinary file
    if (deleted.pitchDeck && deleted.pitchDeck.publicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(deleted.pitchDeck.publicId, {
          founderEmail: deleted.email || "N/A",
          message: "Audit delete cleanup (param method)"
        });
      } catch (delErr) {
        console.error(`Failed to delete Cloudinary file ${deleted.pitchDeck.publicId} during audit deletion:`, delErr);
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

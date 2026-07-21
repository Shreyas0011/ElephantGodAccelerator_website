const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const TemporaryUpload = require("../models/TemporaryUpload");

// @desc    Get all applications
// @route   GET /api/applications
// @access  Public
router.get("/", async (req, res) => {
  try {
    const apps = await Application.find({}).sort({ createdAt: -1 });
    const formattedApps = apps.map((app) => {
      const obj = app.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(formattedApps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Create a new application
// @route   POST /api/applications
// @access  Public
router.post("/", async (req, res) => {
  const { pitchDeck } = req.body || {};
  const publicId = pitchDeck ? pitchDeck.publicId : null;
  const founderEmail = req.body.founderEmail || req.body.email || "N/A";

  try {
    const newApp = await Application.create(req.body);

    // Remove tracking from TemporaryUpload on successful save
    if (publicId) {
      await TemporaryUpload.deleteOne({ publicId });
    }

    const obj = newApp.toObject();
    obj.id = obj._id;
    res.status(201).json({ success: true, application: obj });
  } catch (error) {
    console.error("Application creation failed in database, cleaning up file:", error);
    
    // Cleanup Cloudinary file immediately to prevent orphan uploads
    if (publicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(publicId, {
          founderEmail,
          message: "Creation error cleanup"
        });
        await TemporaryUpload.deleteOne({ publicId });
      } catch (cleanupErr) {
        console.error(`Failed to clean up file ${publicId} on creation error:`, cleanupErr);
      }
    }

    res.status(500).json({ error: error.message });
  }
});

// @desc    Update an application
// @route   PUT /api/applications/:id
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ error: "Application not found" });
    }

    const oldPublicId = app.pitchDeck ? app.pitchDeck.publicId : null;
    const newPublicId = req.body.pitchDeck ? req.body.pitchDeck.publicId : null;

    // Delete old Cloudinary pitch deck if replaced
    if (newPublicId && oldPublicId && oldPublicId !== newPublicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(oldPublicId, {
          applicationId: app._id,
          founderEmail: app.founderEmail || app.email || "N/A",
          message: "Pitch deck update replacement"
        });
      } catch (delErr) {
        console.error(`Failed to delete old pitch deck ${oldPublicId} on update:`, delErr);
      }
    }

    const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Clear TemporaryUpload tracking for the new file if successfully saved
    if (newPublicId && oldPublicId !== newPublicId) {
      await TemporaryUpload.deleteOne({ publicId: newPublicId });
    }

    const obj = updatedApp.toObject();
    obj.id = obj._id;
    res.json({ success: true, application: obj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete an application (body ID)
// @route   DELETE /api/applications
// @access  Public
router.delete("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID required in request body" });
  }

  try {
    const deletedApp = await Application.findByIdAndDelete(id);
    if (!deletedApp) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Clean up associated Cloudinary file
    if (deletedApp.pitchDeck && deletedApp.pitchDeck.publicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(deletedApp.pitchDeck.publicId, {
          applicationId: deletedApp._id,
          founderEmail: deletedApp.founderEmail || deletedApp.email || "N/A",
          message: "Application delete cleanup (body method)"
        });
      } catch (delErr) {
        console.error(`Failed to delete Cloudinary file ${deletedApp.pitchDeck.publicId} during deletion:`, delErr);
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete an application by URL param
// @route   DELETE /api/applications/:id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Clean up associated Cloudinary file
    if (deletedApp.pitchDeck && deletedApp.pitchDeck.publicId) {
      const { deleteFromCloudinary } = require("../services/uploadService");
      try {
        await deleteFromCloudinary(deletedApp.pitchDeck.publicId, {
          applicationId: deletedApp._id,
          founderEmail: deletedApp.founderEmail || deletedApp.email || "N/A",
          message: "Application delete cleanup (param method)"
        });
      } catch (delErr) {
        console.error(`Failed to delete Cloudinary file ${deletedApp.pitchDeck.publicId} during deletion:`, delErr);
      }
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

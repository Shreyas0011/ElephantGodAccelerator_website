const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

// @desc    Get all applications
// @route   GET /api/applications
// @access  Public (Can add protect/adminOnly middleware if requested, but current frontend expects simple fetch)
router.get("/", async (req, res) => {
  try {
    const apps = await Application.find({}).sort({ createdAt: -1 });
    // Map _id to id to match frontend expectation
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
  try {
    const newApp = await Application.create(req.body);
    const obj = newApp.toObject();
    obj.id = obj._id;
    res.status(201).json({ success: true, application: obj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete an application
// @route   DELETE /api/applications
// @access  Public (Handles both body id and route param id)
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
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

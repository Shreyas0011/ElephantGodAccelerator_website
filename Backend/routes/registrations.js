const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Public
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    const formatted = registrations.map((r) => {
      const obj = r.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Create a new registration
// @route   POST /api/registrations
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newReg = await Registration.create(req.body);
    const obj = newReg.toObject();
    obj.id = obj._id;
    res.status(201).json({ success: true, registration: obj });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete a registration by URL param
// @route   DELETE /api/registrations/:id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete a registration via body ID
// @route   DELETE /api/registrations
// @access  Public
router.delete("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID required in request body" });
  }

  try {
    const deleted = await Registration.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Registration not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

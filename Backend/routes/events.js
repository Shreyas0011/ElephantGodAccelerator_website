const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    const formatted = events.map((ev) => {
      const obj = ev.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
router.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    const obj = newEvent.toObject();
    obj.id = obj._id.toString();
    res.status(201).json(obj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Event not found" });
    }
    const obj = updated.toObject();
    obj.id = obj._id.toString();
    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

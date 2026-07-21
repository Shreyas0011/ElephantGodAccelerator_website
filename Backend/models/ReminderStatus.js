const mongoose = require("mongoose");

const ReminderStatusSchema = new mongoose.Schema(
  {
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
    },
    reminder24hSent: {
      type: Boolean,
      default: false,
      required: true,
    },
    reminder2hSent: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReminderStatus", ReminderStatusSchema);

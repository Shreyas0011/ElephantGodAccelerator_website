const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    eventDate: {
      type: String,
      required: true,
    },
    eventTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Registration", RegistrationSchema);

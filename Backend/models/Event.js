const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    desc: String,
    date: {
      type: String,
      required: [true, "Date is required (YYYY-MM-DD)"],
      unique: true,
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    capacity: String,
    formFields: {
      type: [String],
      default: [
        "Founder Name",
        "Email Address",
        "Startup Name",
        "Sector",
        "Revenue",
        "Assistant Required For",
        "Funding Requirement",
        "Company Profile",
        "Product Details",
        "Website Address"
      ],
    },
    externalLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);

const mongoose = require("mongoose");

const TemporaryUploadSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    assetId: {
      type: String,
      required: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    uploadedBy: {
      type: String,
    },
    uploadPurpose: {
      type: String,
      enum: ["application", "audit"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TemporaryUpload", TemporaryUploadSchema);

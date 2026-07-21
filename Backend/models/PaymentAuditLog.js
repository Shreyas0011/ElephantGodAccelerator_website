const mongoose = require("mongoose");

const PaymentAuditLogSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },
    transactionId: {
      type: String,
    },
    merchantTxnNo: {
      type: String,
      required: true,
      index: true,
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentAuditLog", PaymentAuditLogSchema);

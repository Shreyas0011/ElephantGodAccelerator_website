const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    merchantTxnNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    txnID: {
      type: String,
    },
    paymentID: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
      required: true,
    },
    paymentMode: {
      type: String,
    },
    paymentSubInstType: {
      type: String,
    },
    responseCode: {
      type: String,
    },
    respDescription: {
      type: String,
    },
    paymentDateTime: {
      type: Date,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);

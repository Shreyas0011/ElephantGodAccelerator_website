const Receipt = require("../models/Receipt");
const Event = require("../models/Event");
const PaymentAuditLog = require("../models/PaymentAuditLog");

async function generateReceiptNumber() {
  const today = new Date();
  const datePart = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  // Count receipts created today
  const count = await Receipt.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  });
  
  const seqPart = String(count + 1).padStart(6, "0");
  return `EGA-${datePart}-${seqPart}`;
}

async function createReceipt(payment, registration) {
  // Prevent duplicate receipt generation
  const existing = await Receipt.findOne({ merchantTxnNo: payment.merchantTxnNo });
  if (existing) return existing;

  const receiptNumber = await generateReceiptNumber();
  
  const event = await Event.findOne({ date: registration.eventDate });
  const eventId = event ? event._id : null;
  const eventTime = event ? event.time : (registration.eventTime || "TBA");

  const founderName = registration["Founder Name"] || registration["founderName"] || registration["name"] || "Founder";
  const startupName = registration["Startup Name"] || registration["startupName"] || registration["name"] || "Startup";
  const email = registration["Email Address"] || registration["email"] || "dummy@gmail.com";

  const receipt = await Receipt.create({
    receiptNumber,
    registrationId: registration._id,
    eventId,
    eventName: registration.eventTitle,
    eventDate: registration.eventDate,
    eventTime,
    founderName,
    startupName,
    email,
    amount: payment.amount,
    paymentMode: payment.paymentMode || "ONLINE",
    transactionId: payment.txnID || "—",
    merchantTxnNo: payment.merchantTxnNo,
    paymentStatus: "PAID",
    paymentDateTime: payment.paymentDateTime || new Date(),
  });

  // Audit Log: Receipt Generated
  await PaymentAuditLog.create({
    event: "Receipt Generated",
    merchantTxnNo: payment.merchantTxnNo,
    transactionId: payment.txnID,
    registrationId: registration._id,
    eventId,
    message: `Receipt ${receiptNumber} generated successfully.`,
  });

  return receipt;
}

module.exports = {
  createReceipt,
  generateReceiptNumber,
};

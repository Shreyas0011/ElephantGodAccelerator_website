const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Payment = require("../models/Payment");
const Receipt = require("../models/Receipt");
const PaymentAuditLog = require("../models/PaymentAuditLog");
const { createReceipt } = require("../services/receiptService");
const { sendRegistrationConfirmation, sendInternalAdminNotification } = require("../services/emailService");
const { generateReceiptPDF } = require("../utils/pdfGenerator");

const {
  generateMerchantTxnNo,
  formatDateToYYYYMMDDHHMMSS,
  calculateHashV1,
} = require("../services/paymentService");

// Internal helper to process successful payment status updates
async function handleSuccessfulPayment(payment, registration) {
  try {
    // 1. Confirm RSVP registration status is PAID
    if (registration.paymentStatus !== "PAID") {
      registration.paymentStatus = "PAID";
      await registration.save();
    }

    // 2. Confirm payment record status is SUCCESS
    if (payment.status !== "SUCCESS") {
      payment.status = "SUCCESS";
      await payment.save();
    }

    // 3. Check/Generate receipt
    let receipt = await Receipt.findOne({ merchantTxnNo: payment.merchantTxnNo });
    if (!receipt) {
      receipt = await createReceipt(payment, registration);

      // Log: Payment Success
      const event = await Event.findOne({ date: registration.eventDate });
      const eventId = event ? event._id : null;
      await PaymentAuditLog.create({
        event: "Payment Success",
        merchantTxnNo: payment.merchantTxnNo,
        transactionId: payment.txnID,
        registrationId: registration._id,
        eventId,
        message: `Payment status marked SUCCESS. Receipt ${receipt.receiptNumber} generated successfully.`,
      });

      // 4. Send Confirmation Email (with receipt PDF attachment) in background
      sendRegistrationConfirmation(receipt, event || { title: registration.eventTitle, date: registration.eventDate, time: "TBA", location: "Online" })
        .then(() => {
          // Log: Email Sent
          PaymentAuditLog.create({
            event: "Email Sent",
            merchantTxnNo: payment.merchantTxnNo,
            transactionId: payment.txnID,
            registrationId: registration._id,
            eventId,
            message: `Confirmation email sent to ${receipt.email}`,
          });
        })
        .catch(err => console.error("Error sending registration confirmation email:", err));

      // 5. Send Internal Admin Alert Notification in background
      sendInternalAdminNotification(receipt)
        .catch(err => console.error("Error sending admin notification email:", err));
    }
    return receipt;
  } catch (error) {
    console.error("Error executing handleSuccessfulPayment utility flow:", error);
    throw error;
  }
}

// @desc    Initiate payment check or register directly if event is free
// @route   POST /api/payment/initiate
// @access  Public
router.post("/initiate", async (req, res) => {
  const { eventDate, eventTitle, ...rsvpForm } = req.body;

  if (!eventDate || !eventTitle) {
    return res.status(400).json({ error: "eventDate and eventTitle are required" });
  }

  const customerEmailID = rsvpForm["Email Address"] || rsvpForm["email"];

  try {
    // 1. Check for duplicate registration where paymentStatus = PAID
    if (customerEmailID) {
      const duplicatePaidRegistration = await Registration.findOne({
        eventDate,
        eventTitle,
        $or: [
          { "Email Address": customerEmailID },
          { "email": customerEmailID }
        ],
        paymentStatus: "PAID"
      });

      if (duplicatePaidRegistration) {
        return res.status(400).json({
          error: "You have already completed payment for this registration.",
          alreadyPaid: true
        });
      }
    }

    // 2. Find the event
    const event = await Event.findOne({ date: eventDate });
    const eventId = event ? event._id : null;
    
    // Fallback: If event does not exist or is not paid, register directly (free RSVP)
    if (!event || !event.isPaid || event.price <= 0) {
      const registration = await Registration.create({
        eventDate,
        eventTitle,
        ...rsvpForm,
        paymentStatus: "FREE",
      });
      return res.json({
        redirect: false,
        registration,
        message: "Registration completed successfully (Free event).",
      });
    }

    // 3. Event is paid, initiate checkout
    const amount = event.price;
    const merchantTxnNo = generateMerchantTxnNo();

    // Create the registration as PENDING
    const registration = await Registration.create({
      eventDate,
      eventTitle,
      ...rsvpForm,
      paymentStatus: "PENDING",
      paymentTxnNo: merchantTxnNo,
    });

    // Create a pending Payment record
    const payment = await Payment.create({
      registrationId: registration._id,
      merchantTxnNo,
      amount,
      status: "PENDING",
    });

    // Extract customer details
    const customerName = rsvpForm["Founder Name"] || rsvpForm["name"] || "Founders";
    const customerMobileNo = rsvpForm["Mobile Number"] || rsvpForm["phone"] || "9090909090";

    // Log: Payment Initiated
    await PaymentAuditLog.create({
      event: "Payment Initiated",
      merchantTxnNo,
      registrationId: registration._id,
      eventId,
      message: `Payment initiated by ${customerEmailID} for amount ₹${amount.toFixed(2)}`,
    });

    // Build initiateSale request payload
    const payload = {
      merchantId: process.env.ICICI_MERCHANT_ID,
      merchantTxnNo,
      amount: amount.toFixed(2), // must be numeric string formatted to 2 decimals
      currencyCode: "356", // INR
      payType: "0", // Redirection mode
      customerEmailID: customerEmailID || "dummy@gmail.com",
      customerName,
      customerMobileNo,
      transactionType: "SALE",
      txnDate: formatDateToYYYYMMDDHHMMSS(),
      returnURL: process.env.ICICI_RETURN_URL,
    };

    if (process.env.ICICI_AGGREGATOR_ID) {
      payload.aggregatorID = process.env.ICICI_AGGREGATOR_ID;
    }

    // Compute secureHash
    const secureHash = calculateHashV1(payload, process.env.ICICI_SECRET_KEY);
    payload.secureHash = secureHash;

    console.log("Initiating ICICI Sale Request for:", merchantTxnNo, "Payload:", payload);

    const apiResponse = await fetch(process.env.ICICI_INITIATE_SALE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("ICICI PG initiateSale returned HTTP error:", apiResponse.status, errorText);
      throw new Error(`Payment Gateway responded with HTTP error: ${apiResponse.status}`);
    }

    const resJson = await apiResponse.json();
    console.log("ICICI PG initiateSale response:", resJson);

    // ICICI success response code is "R1000" for checkout initiation
    if (resJson.responseCode !== "R1000") {
      payment.status = "FAILED";
      payment.respDescription = resJson.respDescription || "Checkout initiation failed";
      payment.responseCode = resJson.responseCode;
      await payment.save();

      registration.paymentStatus = "FAILED";
      await registration.save();

      // Log: Payment Failed on Initiation
      await PaymentAuditLog.create({
        event: "Payment Failed",
        merchantTxnNo,
        registrationId: registration._id,
        eventId,
        message: `Checkout initiation failed. Gateway code: ${resJson.responseCode}, Desc: ${resJson.respDescription}`,
      });

      return res.status(400).json({
        error: resJson.respDescription || "Payment gateway initiation failed",
        code: resJson.responseCode,
      });
    }

    // Update payment meta with Gateway redirect detail
    payment.metadata = {
      tranCtx: resJson.tranCtx,
      redirectURI: resJson.redirectURI,
    };
    await payment.save();

    // Return redirection details to frontend
    res.json({
      redirect: true,
      redirectURL: `${resJson.redirectURI}?tranCtx=${resJson.tranCtx}`,
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ error: error.message || "Failed to initiate payment flow" });
  }
});

// @desc    ICICI Bank PG post-checkout callback (redirect handler)
// @route   POST /api/payment/callback
// @access  Public
router.post("/callback", async (req, res) => {
  const callbackData = req.body;
  console.log("Captured ICICI Callback URL-Encoded Body:", callbackData);

  const {
    merchantTxnNo,
    responseCode,
    respDescription,
    txnID,
    paymentID,
    paymentMode,
    paymentSubInstType,
    paymentDateTime,
    secureHash: receivedHash,
  } = callbackData;

  if (!merchantTxnNo) {
    console.error("Callback missing merchantTxnNo");
    return res.redirect(`${process.env.FRONTEND_URL}/events/payment-status?status=failed&reason=Missing%20transaction%20number`);
  }

  try {
    // Fetch Payment and Registration
    const payment = await Payment.findOne({ merchantTxnNo });
    if (!payment) {
      console.error("Payment record not found for transaction:", merchantTxnNo);
      return res.redirect(`${process.env.FRONTEND_URL}/events/payment-status?status=failed&reason=Payment%20record%20not%20found`);
    }

    const registration = await Registration.findOne({ paymentTxnNo: merchantTxnNo });
    const event = registration ? await Event.findOne({ date: registration.eventDate }) : null;
    const eventId = event ? event._id : null;

    // Log: Callback Received
    await PaymentAuditLog.create({
      event: "Callback Received",
      merchantTxnNo,
      transactionId: txnID,
      registrationId: payment.registrationId,
      eventId,
      message: `Callback payload processed. Bank response: ${responseCode} (${respDescription})`,
    });

    // If payment is already SUCCESS, ignore duplicate callback triggers and redirect
    if (payment.status === "SUCCESS") {
      console.log(`Callback ignored. Payment ${merchantTxnNo} already marked SUCCESS.`);
      return res.redirect(`${process.env.FRONTEND_URL}/events/payment-status?status=success&txnNo=${merchantTxnNo}`);
    }

    // 1. Verify Secure Hash to prevent request spoofing
    const computedHash = calculateHashV1(callbackData, process.env.ICICI_SECRET_KEY);
    
    if (computedHash !== (receivedHash || "").toLowerCase()) {
      console.error("Callback Hash Mismatch! Computed:", computedHash, "Received:", receivedHash);
      
      // Update transaction status to failed
      payment.status = "FAILED";
      payment.respDescription = "Security hash mismatch (spoofing attempt)";
      await payment.save();

      if (registration) {
        registration.paymentStatus = "FAILED";
        await registration.save();
      }

      // Log: Hash Failed
      await PaymentAuditLog.create({
        event: "Hash Failed",
        merchantTxnNo,
        transactionId: txnID,
        registrationId: payment.registrationId,
        eventId,
        message: `Hash mismatch. Computed: ${computedHash}, Received: ${receivedHash}`,
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/events/payment-status?status=failed&txnNo=${merchantTxnNo}&reason=Security%20hash%20verification%20failed`
      );
    }

    // Log: Hash Verified
    await PaymentAuditLog.create({
      event: "Hash Verified",
      merchantTxnNo,
      transactionId: txnID,
      registrationId: payment.registrationId,
      eventId,
      message: "Callback secure hash verified successfully.",
    });

    // Update payment logs
    payment.txnID = txnID;
    payment.paymentID = paymentID;
    payment.paymentMode = paymentMode;
    payment.paymentSubInstType = paymentSubInstType;
    payment.responseCode = responseCode;
    payment.respDescription = respDescription;

    if (paymentDateTime) {
      const year = paymentDateTime.substring(0, 4);
      const month = paymentDateTime.substring(4, 6);
      const day = paymentDateTime.substring(6, 8);
      const hour = paymentDateTime.substring(8, 10);
      const min = paymentDateTime.substring(10, 12);
      const sec = paymentDateTime.substring(12, 14);
      payment.paymentDateTime = new Date(`${year}-${month}-${day}T${hour}:${min}:${sec}+05:30`);
    } else {
      payment.paymentDateTime = new Date();
    }

    const isSuccess = responseCode === "0000" || responseCode === "000";

    if (isSuccess) {
      await handleSuccessfulPayment(payment, registration);
      console.log(`Payment SUCCESS for merchantTxnNo: ${merchantTxnNo}`);
      return res.redirect(`${process.env.FRONTEND_URL}/events/payment-status?status=success&txnNo=${merchantTxnNo}`);
    } else {
      payment.status = "FAILED";
      await payment.save();

      if (registration) {
        registration.paymentStatus = "FAILED";
        await registration.save();
      }

      // Log: Payment Failed
      await PaymentAuditLog.create({
        event: "Payment Failed",
        merchantTxnNo,
        transactionId: txnID,
        registrationId: payment.registrationId,
        eventId,
        message: `Payment failed. Gateway response: ${respDescription}`,
      });

      console.log(`Payment FAILED for merchantTxnNo: ${merchantTxnNo}. Code: ${responseCode}, Desc: ${respDescription}`);
      return res.redirect(
        `${process.env.FRONTEND_URL}/events/payment-status?status=failed&txnNo=${merchantTxnNo}&reason=${encodeURIComponent(
          respDescription || "Transaction rejected by bank"
        )}`
      );
    }
  } catch (error) {
    console.error("Error in callback handler:", error);
    return res.redirect(
      `${process.env.FRONTEND_URL}/events/payment-status?status=failed&txnNo=${merchantTxnNo}&reason=Internal%20Server%20Error`
    );
  }
});

// @desc    Get status of payment from DB, triggers server-to-server status check if pending
// @route   GET /api/payment/status/:txnNo
// @access  Public
router.get("/status/:txnNo", async (req, res) => {
  const { txnNo } = req.params;

  try {
    const payment = await Payment.findOne({ merchantTxnNo: txnNo });
    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    const registration = await Registration.findById(payment.registrationId);
    const event = registration ? await Event.findOne({ date: registration.eventDate }) : null;
    const eventId = event ? event._id : null;

    // If still pending in our DB, poll the gateway to check if status was updated but callback was missed
    if (payment.status === "PENDING") {
      console.log(`Payment ${txnNo} is PENDING. Polling status check directly with ICICI command API.`);

      const statusPayload = {
        merchantId: process.env.ICICI_MERCHANT_ID,
        merchantTxnNo: txnNo,
        originalTxnNo: txnNo,
        transactionType: "STATUS",
      };

      if (process.env.ICICI_AGGREGATOR_ID) {
        statusPayload.aggregatorID = process.env.ICICI_AGGREGATOR_ID;
      }

      // Compute hash for status request
      const secureHash = calculateHashV1(statusPayload, process.env.ICICI_SECRET_KEY);
      statusPayload.secureHash = secureHash;

      // Command API requires application/x-www-form-urlencoded
      const formParams = new URLSearchParams(statusPayload).toString();

      const apiResponse = await fetch(process.env.ICICI_COMMAND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formParams,
      });

      if (apiResponse.ok) {
        const resJson = await apiResponse.json();
        console.log("ICICI Command API Status response:", resJson);

        // Verify Hash of status response (excluding secureHash)
        const responseHash = calculateHashV1(resJson, process.env.ICICI_SECRET_KEY);
        
        if (responseHash === (resJson.secureHash || "").toLowerCase()) {
          // Log: Status API Success
          await PaymentAuditLog.create({
            event: "Status API Success",
            merchantTxnNo: txnNo,
            transactionId: resJson.txnID,
            registrationId: payment.registrationId,
            eventId,
            message: `Status poll succeeded. TxnStatus: ${resJson.txnStatus}`,
          });

          // Check original transaction status
          // responseCode = "000" / "0000" indicates status request was processed successfully
          // txnStatus = "SUC" indicates the transaction succeeded
          if (
            (resJson.responseCode === "0000" || resJson.responseCode === "000") &&
            resJson.txnStatus === "SUC"
          ) {
            payment.status = "SUCCESS";
            payment.txnID = resJson.txnID;
            payment.paymentID = resJson.paymentID || resJson.txnAuthID;
            payment.paymentMode = resJson.paymentMode;
            payment.responseCode = resJson.txnResponseCode;
            payment.respDescription = resJson.txnRespDescription;
            await payment.save();

            const updatedReg = await Registration.findOneAndUpdate(
              { paymentTxnNo: txnNo },
              { paymentStatus: "PAID" },
              { new: true }
            );

            await handleSuccessfulPayment(payment, updatedReg);
            console.log(`Payment status check updated payment ${txnNo} to SUCCESS.`);
          } else if (resJson.txnStatus === "REJ" || resJson.txnStatus === "ERR") {
            payment.status = "FAILED";
            payment.responseCode = resJson.txnResponseCode;
            payment.respDescription = resJson.txnRespDescription;
            await payment.save();

            await Registration.findOneAndUpdate(
              { paymentTxnNo: txnNo },
              { paymentStatus: "FAILED" }
            );

            // Log: Payment Failed
            await PaymentAuditLog.create({
              event: "Payment Failed",
              merchantTxnNo: txnNo,
              transactionId: resJson.txnID,
              registrationId: payment.registrationId,
              eventId,
              message: `Payment status checked as FAILED. Code: ${resJson.txnResponseCode}, Desc: ${resJson.txnRespDescription}`,
            });

            console.log(`Payment status check updated payment ${txnNo} to FAILED.`);
          }
        } else {
          console.error("Status check signature mismatch! Computed:", responseHash, "Received:", resJson.secureHash);
          
          // Log: Status API Failed
          await PaymentAuditLog.create({
            event: "Status API Failed",
            merchantTxnNo: txnNo,
            registrationId: payment.registrationId,
            eventId,
            message: `Signature mismatch verification failed on Status check.`,
          });
        }
      } else {
        console.error("Status check API request failed with status:", apiResponse.status);
      }
    }

    const receipt = await Receipt.findOne({ merchantTxnNo: txnNo });

    // Return the enriched payment record details
    res.json({
      status: payment.status,
      merchantTxnNo: payment.merchantTxnNo,
      txnID: payment.txnID || "—",
      amount: payment.amount,
      respDescription: payment.respDescription,
      paymentMode: payment.paymentMode || "ONLINE",
      paymentDateTime: payment.paymentDateTime || payment.updatedAt,
      receiptNo: receipt ? receipt.receiptNumber : "—",
      eventName: registration ? registration.eventTitle : "—",
      eventDate: registration ? registration.eventDate : "—",
      eventTime: receipt ? receipt.eventTime : (event ? event.time : "TBA"),
      founderName: registration ? (registration["Founder Name"] || registration.founderName || registration.name || "—") : "—",
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({ error: error.message || "Failed to query status" });
  }
});

// @desc    Download receipt PDF
// @route   GET /api/payment/receipt/:txnNo/download
// @access  Public
router.get("/receipt/:txnNo/download", async (req, res) => {
  const { txnNo } = req.params;
  try {
    const payment = await Payment.findOne({ merchantTxnNo: txnNo });
    if (!payment) return res.status(404).json({ error: "Payment record not found." });

    const registration = await Registration.findById(payment.registrationId);
    if (!registration) return res.status(404).json({ error: "Registration not found." });

    let receipt = await Receipt.findOne({ merchantTxnNo: txnNo });
    if (!receipt && payment.status === "SUCCESS") {
      // Re-trigger receipt creation on demand if it is missing
      receipt = await createReceipt(payment, registration);
    }

    if (!receipt) {
      return res.status(404).json({ error: "Receipt not generated yet. Payment might not be complete." });
    }

    const pdfBuffer = await generateReceiptPDF(receipt);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="receipt-${receipt.receiptNumber}.pdf"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error downloading receipt PDF:", error);
    res.status(500).json({ error: "Failed to download receipt PDF" });
  }
});

// @desc    Get dashboard metrics for payments (Admin Tab)
// @route   GET /api/payment/admin/dashboard
// @access  Public (protected via admin portal check)
router.get("/admin/dashboard", async (req, res) => {
  try {
    const payments = await Payment.find().populate("registrationId").sort({ createdAt: -1 });
    const receipts = await Receipt.find({});
    
    // Map receipts to payments by merchantTxnNo for fast indexing
    const receiptMap = new Map();
    receipts.forEach(r => {
      receiptMap.set(r.merchantTxnNo, r.receiptNumber);
    });

    let totalRevenue = 0;
    let todayRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;
    let failedCount = 0;
    let refundedCount = 0;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const formattedPayments = payments.map(p => {
      const reg = p.registrationId || {};
      const status = p.status;
      const amount = p.amount || 0;

      if (status === "SUCCESS") {
        totalRevenue += amount;
        paidCount++;
        if (p.createdAt >= startOfToday && p.createdAt <= endOfToday) {
          todayRevenue += amount;
        }
      } else if (status === "PENDING") {
        pendingCount++;
      } else if (status === "FAILED") {
        failedCount++;
      } else if (status === "REFUNDED") {
        refundedCount++;
      }

      return {
        id: p._id,
        merchantTxnNo: p.merchantTxnNo,
        txnID: p.txnID || "—",
        amount,
        status,
        paymentMode: p.paymentMode || "—",
        paymentDateTime: p.paymentDateTime || p.updatedAt,
        createdAt: p.createdAt,
        receiptNo: receiptMap.get(p.merchantTxnNo) || "—",
        founderName: reg["Founder Name"] || reg["founderName"] || reg["name"] || "—",
        startupName: reg["Startup Name"] || reg["startupName"] || reg["name"] || "—",
        email: reg["Email Address"] || reg["email"] || "—",
        eventTitle: reg.eventTitle || "—",
        eventDate: reg.eventDate || "—",
      };
    });

    // Payment Success Rate: (Paid / (Paid + Failed)) * 100
    const totalConcluded = paidCount + failedCount;
    const successRate = totalConcluded > 0 ? parseFloat(((paidCount / totalConcluded) * 100).toFixed(1)) : 100.0;

    // Average Ticket Size
    const avgTicketSize = paidCount > 0 ? parseFloat((totalRevenue / paidCount).toFixed(2)) : 0.00;

    res.json({
      summary: {
        totalRevenue,
        todayRevenue,
        paidRegistrations: paidCount,
        pendingPayments: pendingCount,
        failedPayments: failedCount,
        refundedPayments: refundedCount,
        paymentSuccessRate: successRate,
        averageTicketSize: avgTicketSize,
      },
      payments: formattedPayments,
    });
  } catch (error) {
    console.error("Error retrieving admin payments metrics:", error);
    res.status(500).json({ error: error.message || "Failed to load dashboard payments data" });
  }
});

module.exports = router;

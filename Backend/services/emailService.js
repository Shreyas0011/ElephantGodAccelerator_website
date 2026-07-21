const nodemailer = require("nodemailer");
const { generateReceiptPDF } = require("../utils/pdfGenerator");
const PaymentAuditLog = require("../models/PaymentAuditLog");

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    console.warn("SMTP settings are incomplete. Emails might fail to send.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

async function sendMailWithRetry(mailOptions, retries = 3) {
  let attempt = 0;
  let lastError;
  while (attempt < retries) {
    try {
      const transporter = getTransporter();
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      attempt++;
      lastError = err;
      console.error(`Email delivery attempt ${attempt}/${retries} failed:`, err.message);
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  throw lastError;
}

async function sendRegistrationConfirmation(receipt, event) {
  const fromName = process.env.SMTP_FROM_NAME || "Elephant God Accelerator";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "info@elephantgodaccelerator.com";

  try {
    // 1. Generate receipt PDF
    const pdfBuffer = await generateReceiptPDF(receipt);

    // 2. Construct Responsive HTML Body
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #030712; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #0c0f1d; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
    .header { background-color: #0c0f1d; padding: 30px; text-align: center; border-bottom: 2px solid #D4AF37; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; }
    .header p { color: #D4AF37; margin: 5px 0 0; font-size: 11px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }
    .content { padding: 30px; color: #ffffff; }
    .greeting { font-size: 15px; color: #ffffff; line-height: 1.6; margin-bottom: 20px; }
    .section-title { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #D4AF37; margin: 25px 0 10px; border-bottom: 1px solid #1e293b; padding-bottom: 5px; letter-spacing: 1px; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .details-table td { padding: 6px 0; font-size: 13px; vertical-align: top; }
    .label { color: #94a3b8; font-weight: 600; width: 180px; }
    .value { color: #f8fafc; font-weight: 500; }
    .highlight { color: #D4AF37; font-weight: 700; }
    .footer { background-color: #080a14; padding: 20px; text-align: center; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; }
    .footer a { color: #D4AF37; text-decoration: none; }
    .info-box { background-color: rgba(212, 175, 55, 0.04); border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 8px; padding: 15px; margin-top: 25px; }
    .info-box p { margin: 5px 0; font-size: 12px; color: #e2e8f0; line-height: 1.6; }
    .info-box-title { font-weight: bold; color: #D4AF37; margin-bottom: 5px !important; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ELEPHANT GOD ACCELERATOR</h1>
      <p>Global Capital Alliance</p>
    </div>
    <div class="content">
      <p class="greeting">Hello ${receipt.founderName},</p>
      <p class="greeting">Your registration has been successfully confirmed. We are excited to welcome you to the event.</p>
      
      <div class="section-title">Event Details</div>
      <table class="details-table">
        <tr>
          <td class="label">Event Name</td>
          <td class="value">${receipt.eventName}</td>
        </tr>
        <tr>
          <td class="label">Event Date</td>
          <td class="value">${receipt.eventDate}</td>
        </tr>
        <tr>
          <td class="label">Event Time</td>
          <td class="value">${receipt.eventTime}</td>
        </tr>
        <tr>
          <td class="label">Venue</td>
          <td class="value">${event.location || "Online"}</td>
        </tr>
        ${event.location && event.location.toLowerCase() !== "online" ? `
        <tr>
          <td class="label">Google Maps Link</td>
          <td class="value"><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}" style="color: #D4AF37; text-decoration: underline;">Open in Maps</a></td>
        </tr>` : ""}
        <tr>
          <td class="label">Organizer Contact</td>
          <td class="value">info@elephantgodaccelerator.com</td>
        </tr>
      </table>

      <div class="section-title">Founder Details</div>
      <table class="details-table">
        <tr>
          <td class="label">Founder Name</td>
          <td class="value">${receipt.founderName}</td>
        </tr>
        <tr>
          <td class="label">Startup Name</td>
          <td class="value">${receipt.startupName}</td>
        </tr>
        <tr>
          <td class="label">Registered Email</td>
          <td class="value">${receipt.email}</td>
        </tr>
      </table>

      <div class="section-title">Payment Details</div>
      <table class="details-table">
        <tr>
          <td class="label">Amount Paid</td>
          <td class="value highlight">₹${receipt.amount.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="label">Payment Status</td>
          <td class="value" style="color: #10b981; font-weight: bold;">${receipt.paymentStatus}</td>
        </tr>
        <tr>
          <td class="label">Payment Mode</td>
          <td class="value">${receipt.paymentMode || "ONLINE"}</td>
        </tr>
        <tr>
          <td class="label">Transaction ID</td>
          <td class="value">${receipt.transactionId || "—"}</td>
        </tr>
        <tr>
          <td class="label">Merchant Txn Number</td>
          <td class="value">${receipt.merchantTxnNo}</td>
        </tr>
        <tr>
          <td class="label">Receipt Number</td>
          <td class="value highlight">${receipt.receiptNumber}</td>
        </tr>
        <tr>
          <td class="label">Payment Date</td>
          <td class="value">${new Date(receipt.paymentDateTime).toLocaleString("en-IN")}</td>
        </tr>
      </table>

      <div class="info-box">
        <p class="info-box-title">IMPORTANT INFORMATION</p>
        <p>• Please arrive 30 minutes before the scheduled time.</p>
        <p>• Bring a valid government ID for check-in.</p>
        <p>• Carry this confirmation email (digital copy is sufficient) and PDF receipt.</p>
        <p>• If you have any questions, simply reply to this email.</p>
      </div>
    </div>
    <div class="footer">
      <p>Elephant God Accelerator &bull; <a href="mailto:${fromEmail}">${fromEmail}</a></p>
      <p><a href="https://www.elephantgodaccelerator.com">https://www.elephantgodaccelerator.com</a></p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: receipt.email,
      subject: `🎉 Registration Confirmed – ${receipt.eventName}`,
      html: htmlBody,
      attachments: [
        {
          filename: `receipt-${receipt.receiptNumber}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // 4. Send with retry logic
    await sendMailWithRetry(mailOptions);
    console.log(`Confirmation email sent successfully to ${receipt.email}`);

    // Audit Log: Email Sent
    await PaymentAuditLog.create({
      event: "Email Sent",
      merchantTxnNo: receipt.merchantTxnNo,
      transactionId: receipt.transactionId,
      registrationId: receipt.registrationId,
      eventId: receipt.eventId,
      message: `Confirmation email sent successfully to ${receipt.email}`,
    });

  } catch (error) {
    console.error("Failed to deliver confirmation email:", error);
    
    // Audit Log: Retry Attempt / Email Failed
    await PaymentAuditLog.create({
      event: "Retry Attempt",
      merchantTxnNo: receipt.merchantTxnNo,
      transactionId: receipt.transactionId,
      registrationId: receipt.registrationId,
      eventId: receipt.eventId,
      message: `Nodemailer delivery failed after max retries. Error: ${error.message}`,
    });
  }
}

async function sendInternalAdminNotification(receipt) {
  const fromName = process.env.SMTP_FROM_NAME || "Elephant God Accelerator";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "info@elephantgodaccelerator.com";

  try {
    const adminEmail = "info@elephantgodaccelerator.com";
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: adminEmail,
      subject: "New Paid Registration",
      text: `Hello Admin,

A new paid registration has been completed.

Founder details:
• Founder Name: ${receipt.founderName}
• Startup Name: ${receipt.startupName}
• Email: ${receipt.email}

Event details:
• Event Name: ${receipt.eventName}
• Amount: ₹${receipt.amount.toFixed(2)}
• Receipt Number: ${receipt.receiptNumber}
• Transaction ID: ${receipt.transactionId || "—"}
• Payment Date: ${new Date(receipt.paymentDateTime).toLocaleString("en-IN")}

Regards,
Elephant God Accelerator`,
    };

    await sendMailWithRetry(mailOptions);
    console.log("Internal admin notification sent successfully.");
  } catch (error) {
    console.error("Failed to send internal admin notification email:", error.message);
  }
}

async function sendEventReminderEmail(registration, event, is24h = true) {
  const fromName = process.env.SMTP_FROM_NAME || "Elephant God Accelerator";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "info@elephantgodaccelerator.com";
  
  const email = registration["Email Address"] || registration["email"];
  const founderName = registration["Founder Name"] || registration["founderName"] || registration["name"] || "Founder";
  
  if (!email) return;

  const timeframe = is24h ? "24 hours" : "2 hours";

  try {
    const mapsLink = event.location && event.location.toLowerCase() !== "online" && !event.location.toLowerCase().includes("zoom")
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
      : null;

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: `Reminder: ${event.title} starts in ${timeframe}`,
      text: `Hello ${founderName},

This is a reminder that the event "${event.title}" starts in ${timeframe}.

Event Details:
• Event Name: ${event.title}
• Date: ${event.date}
• Time: ${event.time}
• Venue: ${event.location || "Online"}
${mapsLink ? `• Google Maps Link: ${mapsLink}` : ""}

Please arrive 30 minutes before the scheduled time and bring a valid photo ID card for entry verification.

For any questions or support, reply directly to this email or reach us at info@elephantgodaccelerator.com.

Regards,
Elephant God Accelerator`,
    };

    await sendMailWithRetry(mailOptions);
    
    // Audit Log: Reminder Sent
    await PaymentAuditLog.create({
      event: "Reminder Sent",
      merchantTxnNo: registration.paymentTxnNo || "—",
      registrationId: registration._id,
      eventId: event._id,
      message: `Reminder email (${timeframe}) sent successfully to ${email}`,
    });

  } catch (error) {
    console.error(`Failed to send ${timeframe} reminder email:`, error);
  }
}

module.exports = {
  sendRegistrationConfirmation,
  sendInternalAdminNotification,
  sendEventReminderEmail,
};

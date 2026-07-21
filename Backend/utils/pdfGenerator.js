const PDFDocument = require("pdfkit");

function generateReceiptPDF(receipt) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];

    doc.on("data", chunk => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", err => reject(err));

    // Top gold branding bar
    doc.rect(0, 0, 595.28, 15).fill("#D4AF37");

    // Stylized vector badge (geometric logo)
    // Draw gold outer circle
    doc.circle(80, 65, 20).fill("#D4AF37");
    // Draw white initials inside
    doc.fillColor("#FFFFFF").fontSize(12).font("Helvetica-Bold").text("EGA", 68, 59);

    // Header branding
    doc.fillColor("#000000").fontSize(18).font("Helvetica-Bold").text("ELEPHANT GOD ACCELERATOR", 115, 45);
    doc.fillColor("#666666").fontSize(8).font("Helvetica").text("Fueling Indian Startups with Global Capital Alliance", 115, 65);
    
    // Receipt header right-aligned
    doc.fillColor("#D4AF37").fontSize(16).font("Helvetica-Bold").text("PAYMENT RECEIPT", 350, 45, { align: "right" });
    doc.fillColor("#666666").fontSize(8).font("Helvetica").text(`Receipt No: ${receipt.receiptNumber}`, 350, 65, { align: "right" });

    doc.moveDown(3);
    doc.strokeColor("#E0E0E0").lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1.5);

    // Bill to / Event section
    const currentY = doc.y;
    doc.fillColor("#333333").fontSize(9).font("Helvetica-Bold").text("Billed To:", 50, currentY);
    doc.fillColor("#000000").fontSize(11).font("Helvetica-Bold").text(receipt.founderName, 50, currentY + 12);
    doc.fillColor("#555555").fontSize(9).font("Helvetica").text(`Startup: ${receipt.startupName}`, 50, currentY + 25);
    doc.text(`Email: ${receipt.email}`, 50, currentY + 37);

    doc.fillColor("#333333").fontSize(9).font("Helvetica-Bold").text("Event Details:", 300, currentY);
    doc.fillColor("#000000").fontSize(11).font("Helvetica-Bold").text(receipt.eventName, 300, currentY + 12, { width: 245 });
    doc.fillColor("#555555").fontSize(9).font("Helvetica").text(`Event Date: ${receipt.eventDate}`, 300, doc.y + 2);
    doc.text(`Event Time: ${receipt.eventTime}`, 300, doc.y + 2);

    doc.moveDown(3.5);
    const tableY = doc.y;

    // Draw Table Header
    doc.rect(50, tableY, 495, 22).fill("#F7F7F7");
    doc.fillColor("#333333").fontSize(9).font("Helvetica-Bold").text("Transaction / Payment Details", 60, tableY + 7);
    doc.text("Status / Mode", 330, tableY + 7);
    doc.text("Amount", 480, tableY + 7, { align: "right" });

    // Table rows
    let rowY = tableY + 22;
    
    // Row helper
    const drawRow = (label, detail, rightDetail, amountStr) => {
      doc.rect(50, rowY, 495, 22).fill(rowY % 44 === 0 ? "#FCFCFC" : "#FFFFFF");
      doc.fillColor("#444444").fontSize(9).font("Helvetica").text(label, 60, rowY + 7);
      if (detail) {
        doc.fillColor("#888888").fontSize(8).text(detail, 160, rowY + 8);
      }
      if (rightDetail) {
        doc.fillColor("#444444").fontSize(9).text(rightDetail, 330, rowY + 7);
      }
      if (amountStr) {
        doc.fillColor("#000000").fontSize(9).font("Helvetica").text(amountStr, 480, rowY + 7, { align: "right" });
      }
      doc.strokeColor("#EAEAEA").lineWidth(0.5).moveTo(50, rowY + 22).lineTo(545, rowY + 22).stroke();
      rowY += 22;
    };

    drawRow("Merchant Txn ID", receipt.merchantTxnNo, receipt.paymentMode || "ONLINE", `INR ${receipt.amount.toFixed(2)}`);
    drawRow("Gateway Txn ID", receipt.transactionId || "—", receipt.paymentStatus, "");
    drawRow("Payment Time", receipt.paymentDateTime ? new Date(receipt.paymentDateTime).toLocaleString("en-IN") : "—", "", "");
    
    // Total Amount Box
    rowY += 10;
    doc.rect(330, rowY, 215, 30).fill("#FDFBF7");
    doc.strokeColor("#D4AF37").lineWidth(1).rect(330, rowY, 215, 30).stroke();
    doc.fillColor("#333333").fontSize(9).font("Helvetica-Bold").text("Total Paid", 340, rowY + 11);
    doc.fillColor("#D4AF37").fontSize(11).font("Helvetica-Bold").text(`INR ${receipt.amount.toFixed(2)}`, 400, rowY + 10, { align: "right", width: 135 });

    // Terms / Note
    rowY += 55;
    doc.fillColor("#999999").fontSize(8).font("Helvetica-Bold").text("IMPORTANT NOTE FOR FOUNDERS:", 50, rowY);
    doc.font("Helvetica").text("Please preserve this receipt and present it along with a valid ID card at the venue. Seats are allocated on a first-come, first-served basis. If you need any assistance, reach out to info@elephantgodaccelerator.com.", 50, rowY + 10, { width: 495, lineGap: 3 });

    // Footer lines
    doc.strokeColor("#EAEAEA").lineWidth(1).moveTo(50, 750).lineTo(545, 750).stroke();
    doc.fillColor("#999999").fontSize(8).font("Helvetica").text("Elephant God Accelerator • info@elephantgodaccelerator.com • https://www.elephantgodaccelerator.com", 50, 760, { align: "center", width: 495 });

    doc.end();
  });
}

module.exports = {
  generateReceiptPDF,
};

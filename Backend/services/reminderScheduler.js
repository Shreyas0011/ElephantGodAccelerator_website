const cron = require("node-cron");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const ReminderStatus = require("../models/ReminderStatus");
const { sendEventReminderEmail } = require("./emailService");
const PaymentAuditLog = require("../models/PaymentAuditLog");

function getEventTargetDate(dateStr, timeStr) {
  let hour = 0;
  let minute = 0;
  try {
    const cleanTime = timeStr.split(/[-–—]/)[0].trim().toUpperCase();
    const match = cleanTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const isPm = match[3] === "PM";
      if (isPm && h < 12) h += 12;
      if (!isPm && h === 12) h = 0;
      hour = h;
      minute = m;
    } else {
      const matchHr = cleanTime.match(/(\d{1,2})\s*(AM|PM)/);
      if (matchHr) {
        let h = parseInt(matchHr[1], 10);
        const isPm = matchHr[2] === "PM";
        if (isPm && h < 12) h += 12;
        if (!isPm && h === 12) h = 0;
        hour = h;
      }
    }
  } catch (e) {
    console.error("Error parsing event time string:", timeStr, e);
  }
  const [yr, mo, dy] = dateStr.split("-").map(Number);
  return new Date(yr, mo - 1, dy, hour, minute);
}

async function runReminderChecks() {
  try {
    const now = new Date();
    const events = await Event.find({});

    for (const event of events) {
      const eventTime = getEventTargetDate(event.date, event.time);
      const diffHrs = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);

      // We send reminders only in appropriate time frames:
      // 24h reminder when event starts within 24.5 hours and more than 2 hours.
      // 2h reminder when event starts within 2.5 hours and not past yet.
      const send24h = diffHrs <= 24.5 && diffHrs > 2.0;
      const send2h = diffHrs <= 2.5 && diffHrs > 0.0;

      if (!send24h && !send2h) continue;

      // Find registrations for this event that are PAID or FREE
      const registrations = await Registration.find({
        eventDate: event.date,
        eventTitle: event.title,
        paymentStatus: { $in: ["PAID", "FREE"] },
      });

      for (const reg of registrations) {
        let status = await ReminderStatus.findOne({ registrationId: reg._id });
        if (!status) {
          // By creating the ReminderStatus record, we initialize the tracker
          status = await ReminderStatus.create({ registrationId: reg._id });
        }

        if (send24h && !status.reminder24hSent) {
          // Log "Reminder Scheduled"
          await PaymentAuditLog.create({
            event: "Reminder Scheduled",
            merchantTxnNo: reg.paymentTxnNo || "—",
            registrationId: reg._id,
            eventId: event._id,
            message: `Scheduled 24-hour reminder email for ${reg["Email Address"] || reg.email || "founder"}.`,
          });

          await sendEventReminderEmail(reg, event, true);
          status.reminder24hSent = true;
          await status.save();
        }

        if (send2h && !status.reminder2hSent) {
          // Log "Reminder Scheduled"
          await PaymentAuditLog.create({
            event: "Reminder Scheduled",
            merchantTxnNo: reg.paymentTxnNo || "—",
            registrationId: reg._id,
            eventId: event._id,
            message: `Scheduled 2-hour reminder email for ${reg["Email Address"] || reg.email || "founder"}.`,
          });

          await sendEventReminderEmail(reg, event, false);
          status.reminder2hSent = true;
          await status.save();
        }
      }
    }
  } catch (error) {
    console.error("Error in runReminderChecks scheduler execution:", error);
  }
}

function startScheduler() {
  // Check every 10 minutes: "*/10 * * * *"
  cron.schedule("*/10 * * * *", () => {
    console.log("Running scheduled event reminder checks...");
    runReminderChecks().catch(err => console.error("Error in reminder checks:", err));
  });
  console.log("Cron-based Event Reminder scheduler initialized successfully.");
}

module.exports = {
  startScheduler,
  runReminderChecks,
  getEventTargetDate,
};

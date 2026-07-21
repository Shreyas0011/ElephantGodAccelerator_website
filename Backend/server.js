require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// Connect to Database
connectDB().then(async () => {
  try {
    const User = require("./models/User");
    // Seed Admin
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const adminPassword = process.env.ADMIN_PASSWORD || "ega@admin2026";
      await User.create({
        name: "EGA Admin",
        email: "admin@elephantgod.com",
        password: adminPassword,
        role: "admin"
      });
      console.log(`Default admin user seeded (admin@elephantgod.com / ${adminPassword})`);
    }

    // Seed Default Events
    const Event = require("./models/Event");
    const defaultEvents = [
      {
        date: "2026-06-05",
        title: "EGA Masterclass: Go-To-Market and Retail Sprints",
        desc: "An intensive strategy session led by Meera Nair mapping consumer retail networks, distributor incentives, and GTM rollouts in tier-2 cities.",
        time: "03:00 PM IST",
        location: "Bengaluru Hub & Zoom",
        capacity: "Limited to 50 founders",
        formFields: [
          "Founder Name", "Email Address", "Startup Name", "Sector", "Revenue",
          "Assistant Required For", "Funding Requirement", "Company Profile", "Product Details", "Website Address"
        ]
      },
      {
        date: "2026-06-12",
        title: "Seed Valuation & Capital Structuring Audit",
        desc: "EGA partners sit down with cohort CFOs to structure valuation projections, ESOP pools, and liquidation preferences prior to demo day.",
        time: "11:00 AM IST",
        location: "EGA Boardroom",
        capacity: "Invite Only",
        formFields: [
          "Founder Name", "Email Address", "Startup Name", "Sector", "Revenue",
          "Assistant Required For", "Funding Requirement", "Company Profile", "Product Details", "Website Address"
        ]
      },
      {
        date: "2026-06-18",
        title: "Cohort 12 Demo Day: B2B Scaling Showcase",
        desc: "12 selected Indian hardware, AI, and logistics startups pitch in front of 40+ active venture capital funds, family offices, and HNI syndicates.",
        time: "02:00 PM IST",
        location: "Hotel Grand Sheraton, Bengaluru",
        capacity: "VCs and Accredited Angels only",
        formFields: [
          "Founder Name", "Email Address", "Startup Name", "Sector", "Revenue",
          "Assistant Required For", "Funding Requirement", "Company Profile", "Product Details", "Website Address"
        ]
      },
      {
        date: "2026-06-25",
        title: "Venture Terms & Cap Tables Masterclass",
        desc: "An active negotiation drill detailing anti-dilution clauses, liquidation preferences, and MCA compliance requirements.",
        time: "04:00 PM IST",
        location: "Online (Zoom)",
        capacity: "Public registration open",
        formFields: [
          "Founder Name", "Email Address", "Startup Name", "Sector", "Revenue",
          "Assistant Required For", "Funding Requirement", "Company Profile", "Product Details", "Website Address"
        ]
      },
      {
        date: "2026-07-02",
        title: "Night School : Special Edition",
        desc: "Night School returns — and this one's different. This Thursday, the room belongs to Ramani Iyer, co-founder of JustDial. The man who built a company that still makes 1,300 crores a year, retained people for 25 and 30 years, and turned every adverse condition into a way to make money. The topic? A surprise. Ramani doesn't do scripts. He reads the room and the curriculum emerges from there. Sales, retention, building without funding, reading people, manufacturing serendipity, or something nobody saw coming. You'll find out when you walk in.",
        time: "08:30 PM – 11:30 PM IST",
        location: "The Hub Bengaluru",
        capacity: "Limited Seats only",
        externalLink: "https://nas.com/thehubbengaluru/events/night-school-special-edition",
        formFields: [
          "Founder Name", "Email Address", "Startup Name", "Sector", "Revenue",
          "Assistant Required For", "Funding Requirement", "Company Profile", "Product Details", "Website Address"
        ]
      }
    ];

    for (const ev of defaultEvents) {
      await Event.findOneAndUpdate({ date: ev.date }, ev, { upsert: true, new: true });
    }
    console.log("Cohort events upserted and seeded in database successfully");
  } catch (err) {
    console.error("Error seeding default admin:", err.message);
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.send("Elephant God Accelerator API is running...");
});

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/audits", require("./routes/audits"));
app.use("/api/events", require("./routes/events"));
app.use("/api/registrations", require("./routes/registrations"));
app.use("/api/payment", require("./routes/payment"));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

// Initialize Event Reminder Cron Scheduler
const { startScheduler } = require("./services/reminderScheduler");
startScheduler();

// Initialize Temporary Uploads Cleanup Scheduler
const { startCleanupScheduler } = require("./services/cleanupScheduler");
startCleanupScheduler();

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

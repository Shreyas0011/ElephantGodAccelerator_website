require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to Database
connectDB().then(async () => {
  try {
    const User = require("./models/User");
    // Seed Admin
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      await User.create({
        name: "EGA Admin",
        email: "admin@elephantgod.com",
        password: "ega@admin2026",
        role: "admin"
      });
      console.log("Default admin user seeded (admin@elephantgod.com / ega@admin2026)");
    }

    // Seed Default Events
    const Event = require("./models/Event");
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
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
        }
      ];
      await Event.insertMany(defaultEvents);
      console.log("Default cohort events seeded in database");
    }
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
app.use("/api/applications", require("./routes/applications"));
app.use("/api/audits", require("./routes/audits"));
app.use("/api/events", require("./routes/events"));
app.use("/api/registrations", require("./routes/registrations"));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});

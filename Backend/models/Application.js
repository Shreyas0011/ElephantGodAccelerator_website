const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["acceleration", "membership"],
      required: true,
    },
    // Common fields
    founderName: {
      type: String,
      required: [true, "Founder name is required"],
    },
    startupName: {
      type: String,
      required: [true, "Startup name is required"],
    },
    
    // Acceleration specific fields
    sector: String,
    revenue: String,
    fundingReq: String,
    website: String,
    assistantReq: String,
    companyProfile: String,
    productDetails: String,

    // Membership specific fields
    founderEmail: String,
    founderPhone: String,
    founderLinkedin: String,
    startupWebsite: String,
    startupSector: String,
    startupLocation: String,
    startupElevator: String,
    startupStage: String,
    startupTeam: String,
    startupRevenue: String,
    startupRegistered: String,
    startupRaised: String,
    startupFundingReq: String,
    pitchDeck: String,
    scorecardPercentage: Number,
    
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);

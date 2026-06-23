"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight,
  Upload,
  User,
  Briefcase,
  TrendingUp,
  Coins,
} from "lucide-react";

export default function ApplyPage() {
  // --- Scorecard State ---
  const [scoreStep, setScoreStep] = useState<"welcome" | "quiz" | "result">("welcome");
  const [currentQ, setCurrentQ] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [finalScore, setFinalScore] = useState(0);

  const scorecardQ = [
    {
      q: "What is your current development stage?",
      options: [
        { text: "Idea or Conceptual phase", val: 1 },
        { text: "Prototype or MVP launched with beta users", val: 3 },
        { text: "Product-Market Fit (PMF) with consistent growth", val: 5 },
      ],
    },
    {
      q: "What are your monthly recurring revenue (MRR) levels?",
      options: [
        { text: "Pre-revenue or pre-sales", val: 1 },
        { text: "Under ₹2 Lakhs per month", val: 3 },
        { text: "₹2 Lakhs - ₹5 Lakhs (or above) per month", val: 5 },
      ],
    },
    {
      q: "What is your core team setup?",
      options: [
        { text: "Single founder, no full-time team", val: 1 },
        { text: "Co-founders + 1-5 full-time members", val: 3 },
        { text: "Co-founders + established management & 5+ employees", val: 5 },
      ],
    },
    {
      q: "Do you have customer validation or repeat purchases?",
      options: [
        { text: "No validation; product is in development", val: 1 },
        { text: "Initial customer signups and pilot projects active", val: 3 },
        { text: "High customer retention and repeating transactions", val: 5 },
      ],
    },
    {
      q: "What is your prior fundraising history?",
      options: [
        { text: "Bootstrapped completely", val: 2 },
        { text: "Raised grants or friends & family funding", val: 4 },
        { text: "Raised angel syndicate or institutional pre-seed", val: 5 },
      ],
    },
  ];

  const handleSelectOption = (val: number) => {
    const nextAnswers = [...quizAnswers, val];
    setQuizAnswers(nextAnswers);

    if (currentQ < scorecardQ.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Compute total score (max possible = 25)
      const total = nextAnswers.reduce((sum, item) => sum + item, 0);
      const percentage = Math.round((total / 25) * 100);
      setFinalScore(percentage);
      setScoreStep("result");
    }
  };

  const getVerdict = (pct: number) => {
    if (pct >= 80) return { title: "Highly Funding Ready", desc: "Your metrics match institutional VC expectations. You are ready for matchmaking rounds." };
    if (pct >= 50) return { title: "Moderate Readiness", desc: "Your startup shows solid validation. Our acceleration tracks will bridge your CRM and financial gaps." };
    return { title: "Foundation Phase", desc: "Your project requires product scaling. We recommend our mentorship and shared services tracks." };
  };

  const resetScorecard = () => {
    setScoreStep("welcome");
    setCurrentQ(0);
    setQuizAnswers([]);
    setFinalScore(0);
  };

  // --- Tab Selection State ---
  const [applyType, setApplyType] = useState<"acceleration" | "membership">("acceleration");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode");
      if (mode === "membership") {
        setApplyType("membership");
      }
    }
  }, []);

  // --- Acceleration Program Form State ---
  const [accFormData, setAccFormData] = useState({
    founderName: "",
    startupName: "",
    sector: "",
    revenue: "",
    assistantReq: "",
    fundingReq: "",
    companyProfile: "",
    productDetails: "",
    website: "",
  });
  const [accSubmitted, setAccSubmitted] = useState(false);

  const handleAccInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setAccFormData({ ...accFormData, [e.target.name]: e.target.value });
  };

  const handleSubmitAcc = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      type: "acceleration",
      ...accFormData,
    };
    
    const apps = JSON.parse(localStorage.getItem("ega_applications") || "[]");
    apps.push({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    localStorage.setItem("ega_applications", JSON.stringify(apps));

    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to post to API, using localStorage fallback", err);
    }
    
    setAccSubmitted(true);
  };

  // --- Wizard Application State ---
  const [wizardStep, setWizardStep] = useState(1);
  const [formData, setFormData] = useState({
    founderName: "",
    founderEmail: "",
    founderPhone: "",
    founderLinkedin: "",
    startupName: "",
    startupWebsite: "",
    startupSector: "",
    startupLocation: "",
    startupElevator: "",
    startupStage: "",
    startupTeam: "",
    startupRevenue: "",
    startupRegistered: "",
    startupRaised: "",
    startupFundingReq: "",
  });
  const [fileUploaded, setFileUploaded] = useState<string | null>(null);
  const [appSubmitted, setAppSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileUploaded(file.name);
    }
  };

  const handleNextStep = () => {
    // Basic validation check for required fields in current step
    if (wizardStep === 1) {
      if (!formData.founderName || !formData.founderEmail || !formData.founderPhone) {
        alert("Please fill in all required fields.");
        return;
      }
    } else if (wizardStep === 2) {
      if (!formData.startupName || !formData.startupSector || !formData.startupLocation || !formData.startupElevator) {
        alert("Please fill in all required fields.");
        return;
      }
    } else if (wizardStep === 3) {
      if (!formData.startupStage || !formData.startupTeam || !formData.startupRevenue || !formData.startupRegistered) {
        alert("Please fill in all required fields.");
        return;
      }
    }
    setWizardStep(wizardStep + 1);
  };

  const handlePrevStep = () => {
    setWizardStep(wizardStep - 1);
  };

  const handleSubmitApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUploaded) {
      alert("Please upload your pitch deck file.");
      return;
    }

    const payload = {
      type: "membership",
      ...formData,
      pitchDeck: fileUploaded,
      scorecardPercentage: finalScore,
    };

    const apps = JSON.parse(localStorage.getItem("ega_applications") || "[]");
    apps.push({
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...payload,
    });
    localStorage.setItem("ega_applications", JSON.stringify(apps));

    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to post to API, using localStorage fallback", err);
    }

    setAppSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 bg-bg-dark">
      {/* --- Scorecard / Application Hero --- */}
      <section className="relative py-12 overflow-hidden border-b border-gray-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full">
            {applyType === "acceleration" ? "Accelerator Cohort 2026" : "Venture Metric Tool"}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4">
            {applyType === "acceleration" ? "Apply for Acceleration" : "Startup Funding Readiness Scorecard"}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {applyType === "acceleration"
              ? "Apply to our flagship acceleration program. Get operations scaling, CRM automation support, and strategic funding syndication."
              : "Assess your startup's core metrics against traditional venture capital expectations in India. Complete our quick quiz to view recommendations."}
          </p>
        </div>
      </section>

      {/* --- Segment/Tab Control --- */}
      <div className="flex justify-center mt-10 mb-6">
        <div className="bg-bg-surface border border-gray-200/50 rounded-full p-1.5 flex items-center gap-1 shadow-lg">
          <button
            type="button"
            onClick={() => setApplyType("acceleration")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              applyType === "acceleration"
                ? "bg-gold text-bg-dark font-extrabold shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Apply for Acceleration
          </button>
          <button
            type="button"
            onClick={() => setApplyType("membership")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              applyType === "membership"
                ? "bg-gold text-bg-dark font-extrabold shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            For Club Membership
          </button>
        </div>
      </div>

      {applyType === "acceleration" ? (
        /* --- Apply for Acceleration Form Section --- */
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl">
              {accSubmitted ? (
                <div className="text-center py-16 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-2">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-white">
                    Application Submitted!
                  </h3>
                  <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                    Thank you for applying to our acceleration track. Our cohort team will review your sector, revenue model, and operational needs.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/"
                      className="px-6 py-2.5 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg"
                    >
                      Return Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitAcc} className="flex flex-col gap-6">
                  <div className="text-center mb-4">
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-bg-dark border border-gray-200 px-3 py-1 rounded-full">
                      Step 1 of 1
                    </span>
                    <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-4">
                      Startup Acceleration Application
                    </h2>
                    <p className="text-gray-500 text-xs mt-1">
                      Complete this profile to apply for the Elephant God Accelerator program.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Founder name */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Founder Name *
                      </label>
                      <input
                        type="text"
                        name="founderName"
                        required
                        value={accFormData.founderName}
                        onChange={handleAccInputChange}
                        placeholder="Full name of founder"
                        className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Startup name */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Startup Name *
                      </label>
                      <input
                        type="text"
                        name="startupName"
                        required
                        value={accFormData.startupName}
                        onChange={handleAccInputChange}
                        placeholder="Name of your startup"
                        className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sector */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Sector *
                      </label>
                      <select
                        name="sector"
                        required
                        value={accFormData.sector}
                        onChange={handleAccInputChange}
                        className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="" className="text-gray-500">Select Sector</option>
                        <option value="Healthcare" className="text-gray-700">Healthcare</option>
                        <option value="Consumer Brands" className="text-gray-700">Consumer Brands</option>
                        <option value="Mobility" className="text-gray-700">Mobility</option>
                        <option value="Sustainability" className="text-gray-700">Sustainability</option>
                        <option value="Technology" className="text-gray-700">Technology & SaaS</option>
                        <option value="Other" className="text-gray-700">Other</option>
                      </select>
                    </div>

                    {/* Revenue */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Revenue *
                      </label>
                      <select
                        name="revenue"
                        required
                        value={accFormData.revenue}
                        onChange={handleAccInputChange}
                        className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="" className="text-gray-500">Select Level</option>
                        <option value="Pre-revenue" className="text-gray-700">Pre-revenue</option>
                        <option value="Under 2L" className="text-gray-700">Under ₹2 Lakhs / month</option>
                        <option value="2L - 5L" className="text-gray-700">₹2 Lakhs - ₹5 Lakhs / month</option>
                        <option value="Above 5L" className="text-gray-700">Above ₹5 Lakhs / month</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Funding requirement */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Funding Requirement *
                      </label>
                      <select
                        name="fundingReq"
                        required
                        value={accFormData.fundingReq}
                        onChange={handleAccInputChange}
                        className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                      >
                        <option value="" className="text-gray-500">Select Requirement</option>
                        <option value="Under 25L" className="text-gray-700">Under ₹25 Lakhs</option>
                        <option value="25L - 1Cr" className="text-gray-700">₹25 Lakhs - ₹1 Crore</option>
                        <option value="1Cr - 5Cr" className="text-gray-700">₹1 Crore - ₹5 Crores</option>
                        <option value="Mentorship only" className="text-gray-700">Strategic Mentorship Only</option>
                      </select>
                    </div>

                    {/* Website address */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Website Address *
                      </label>
                      <input
                        type="url"
                        name="website"
                        required
                        value={accFormData.website}
                        onChange={handleAccInputChange}
                        placeholder="https://www.yourstartup.com"
                        className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  {/* Assistant required for */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Assistant required for *
                    </label>
                    <textarea
                      name="assistantReq"
                      required
                      rows={2}
                      value={accFormData.assistantReq}
                      onChange={handleAccInputChange}
                      placeholder="Specify operation assistance needed (e.g. Sales, CRM setup, hiring, scaling operations, etc.)"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  {/* Company profile */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Company Profile *
                    </label>
                    <textarea
                      name="companyProfile"
                      required
                      rows={3}
                      value={accFormData.companyProfile}
                      onChange={handleAccInputChange}
                      placeholder="Describe your company history, team size, vision, and market segment"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Product Details *
                    </label>
                    <textarea
                      name="productDetails"
                      required
                      rows={3}
                      value={accFormData.productDetails}
                      onChange={handleAccInputChange}
                      placeholder="Describe your product offering, features, tech stack, and customer traction"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold resize-none"
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-md shadow-primary/10 hover:shadow-primary/20 cursor-pointer"
                    >
                      Submit Acceleration Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      ) : (
        /* --- For Club Membership (Scorecard & Wizard) --- */
        <>
          {/* --- Scorecard Quiz Section --- */}
          <section className="py-12">
            <div className="max-w-xl mx-auto px-4">
              <div className="glass-card rounded-2xl p-6 border border-gray-200 relative">
                <AnimatePresence mode="wait">
                  {scoreStep === "welcome" && (
                    <motion.div
                      key="welcome"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 flex flex-col items-center gap-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        <ClipboardCheck className="w-7 h-7" />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white">
                        Start Evaluation
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                        Answer 5 structural questions regarding product-market fit, team capacity, operational scalability, and financials.
                      </p>
                      <button
                        onClick={() => setScoreStep("quiz")}
                        className="mt-4 px-6 py-3 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg hover:shadow-lg flex items-center gap-1 cursor-pointer"
                      >
                        Begin Quiz <ChevronRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {scoreStep === "quiz" && (
                    <motion.div
                      key="quiz"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex flex-col gap-5 text-left"
                    >
                      {/* Progress Line */}
                      <div className="w-full bg-bg-surface-light h-1 rounded-full overflow-hidden">
                        <div
                          className="bg-gold h-full transition-all duration-300"
                          style={{ width: `${((currentQ + 1) / scorecardQ.length) * 100}%` }}
                        />
                      </div>

                      <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider">
                        Question {currentQ + 1} of {scorecardQ.length}
                      </span>

                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {scorecardQ[currentQ].q}
                      </h3>

                      <div className="flex flex-col gap-3 mt-2">
                        {scorecardQ[currentQ].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(opt.val)}
                            className="w-full text-left p-4 rounded-xl bg-bg-surface border border-gray-200 hover:border-gold/50 hover:bg-gold/10 transition-all text-xs sm:text-sm text-gray-500 hover:text-white cursor-pointer"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {scoreStep === "result" && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4 flex flex-col items-center gap-5"
                    >
                      {/* SVG Radial Gauge */}
                      <div className="relative w-36 h-36">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="72"
                            cy="72"
                            r="60"
                            className="stroke-gray-200 stroke-[8] fill-none"
                          />
                          <motion.circle
                            cx="72"
                            cy="72"
                            r="60"
                            className="stroke-gold stroke-[8] fill-none"
                            strokeDasharray={2 * Math.PI * 60}
                            initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - finalScore / 100) }}
                            transition={{ duration: 1 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-white">{finalScore}%</span>
                          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                            Readiness
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display font-black text-lg text-white mb-1">
                          {getVerdict(finalScore).title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                          {getVerdict(finalScore).desc}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={resetScorecard}
                          className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg text-xs hover:text-white cursor-pointer"
                        >
                          Retake Quiz
                        </button>
                        <a
                          href="#apply-form"
                          className="px-4 py-2 bg-cta-gradient text-[#ffffff] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center"
                        >
                          Proceed to Application
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* --- Cohort Application Wizard Section --- */}
          <section id="apply-form" className="py-16 border-t border-gray-200 bg-bg-surface">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-bg-dark border border-gray-200 px-3 py-1 rounded-full">
                  Accelerator Cohort 2026
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-4">
                  EGA Cohort Application
                </h2>
              </div>

              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200">
                {appSubmitted ? (
                  <div className="text-center py-16 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-2">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-black text-2xl text-white">
                      Application Submitted!
                    </h3>
                    <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                      Thank you for submitting your cohort application to Elephant God Accelerator. Our analyst team will review your pitch deck and readiness score.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/"
                        className="px-6 py-2.5 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg"
                      >
                        Return Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitApp} className="flex flex-col gap-6">
                    {/* Step Indicators */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-2">
                      {[
                        { step: 1, label: "Founder", icon: <User className="w-4 h-4" /> },
                        { step: 2, label: "Startup", icon: <Briefcase className="w-4 h-4" /> },
                        { step: 3, label: "Metrics", icon: <TrendingUp className="w-4 h-4" /> },
                        { step: 4, label: "Capital", icon: <Coins className="w-4 h-4" /> },
                      ].map((node) => (
                        <div key={node.step} className="flex items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                              wizardStep >= node.step
                                ? "bg-gold border-gold text-bg-dark"
                                : "bg-bg-surface border-gray-300 text-gray-500"
                            }`}
                          >
                            {node.icon}
                          </div>
                          <span
                            className={`text-xs font-bold uppercase tracking-wider hidden sm:inline ${
                              wizardStep >= node.step ? "text-gold" : "text-gray-500"
                            }`}
                          >
                            {node.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Step 1: Founder details */}
                    {wizardStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-4 text-left"
                      >
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          Founder Profile
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="founderName"
                              required
                              value={formData.founderName}
                              onChange={handleInputChange}
                              placeholder="E.g., Shreyas Kumar"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="founderEmail"
                              required
                              value={formData.founderEmail}
                              onChange={handleInputChange}
                              placeholder="name@company.com"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Phone Number (WhatsApp) *
                            </label>
                            <input
                              type="text"
                              name="founderPhone"
                              required
                              value={formData.founderPhone}
                              onChange={handleInputChange}
                              placeholder="+91 XXXXX XXXXX"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              LinkedIn URL
                            </label>
                            <input
                              type="url"
                              name="founderLinkedin"
                              value={formData.founderLinkedin}
                              onChange={handleInputChange}
                              placeholder="https://linkedin.com/in/username"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-2.5 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Startup details */}
                    {wizardStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-4 text-left"
                      >
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          Startup Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Startup Name *
                            </label>
                            <input
                              type="text"
                              name="startupName"
                              required
                              value={formData.startupName}
                              onChange={handleInputChange}
                              placeholder="E.g., Ingo Electric"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Website / Pitch Link
                            </label>
                            <input
                              type="url"
                              name="startupWebsite"
                              value={formData.startupWebsite}
                              onChange={handleInputChange}
                              placeholder="https://www.company.com"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Sector *
                            </label>
                            <select
                              name="startupSector"
                              required
                              value={formData.startupSector}
                              onChange={handleInputChange}
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="" className="text-gray-500">Select Sector</option>
                              <option value="Healthcare" className="text-gray-700">Healthcare</option>
                              <option value="Consumer Brands" className="text-gray-700">Consumer Brands</option>
                              <option value="Mobility" className="text-gray-700">Mobility</option>
                              <option value="Sustainability" className="text-gray-700">Sustainability</option>
                              <option value="Technology" className="text-gray-700">Technology & SaaS</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Headquarters Location *
                            </label>
                            <input
                              type="text"
                              name="startupLocation"
                              required
                              value={formData.startupLocation}
                              onChange={handleInputChange}
                              placeholder="E.g., Bengaluru"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Elevator Pitch *
                          </label>
                          <textarea
                            name="startupElevator"
                            required
                            rows={3}
                            value={formData.startupElevator}
                            onChange={handleInputChange}
                            placeholder="Explain in 2 sentences what customer problem you solve..."
                            className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div className="flex justify-between mt-4">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg text-xs hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> Previous
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-2.5 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Metrics details */}
                    {wizardStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-4 text-left"
                      >
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          Traction & Systems
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Current Stage *
                            </label>
                            <select
                              name="startupStage"
                              required
                              value={formData.startupStage}
                              onChange={handleInputChange}
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="" className="text-gray-500">Select Stage</option>
                              <option value="Idea" className="text-gray-700">Idea / Conceptual</option>
                              <option value="Validation" className="text-gray-700">Validation / Prototype</option>
                              <option value="PMF" className="text-gray-700">Product Market Fit</option>
                              <option value="Growth" className="text-gray-700">Growth / Scaling</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Team Size (inc. Co-founders) *
                            </label>
                            <input
                              type="number"
                              name="startupTeam"
                              required
                              min={1}
                              value={formData.startupTeam}
                              onChange={handleInputChange}
                              placeholder="E.g., 4"
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Monthly Revenue *
                            </label>
                            <select
                              name="startupRevenue"
                              required
                              value={formData.startupRevenue}
                              onChange={handleInputChange}
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="" className="text-gray-500">Select Level</option>
                              <option value="Pre-revenue" className="text-gray-700">Pre-revenue</option>
                              <option value="Under 2L" className="text-gray-700">Under ₹2 Lakhs / month</option>
                              <option value="2L - 5L" className="text-gray-700">₹2 Lakhs - ₹5 Lakhs / month</option>
                              <option value="Above 5L" className="text-gray-700">Above ₹5 Lakhs / month</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Entity Registration *
                            </label>
                            <select
                              name="startupRegistered"
                              required
                              value={formData.startupRegistered}
                              onChange={handleInputChange}
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="" className="text-gray-500">Select Registration</option>
                              <option value="Pvt Ltd" className="text-gray-700">Private Limited (Pvt Ltd)</option>
                              <option value="LLP" className="text-gray-700">Limited Liability Partnership (LLP)</option>
                              <option value="Partnership" className="text-gray-700">Partnership Firm</option>
                              <option value="Unregistered" className="text-gray-700">Not Registered Yet</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg text-xs hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> Previous
                          </button>
                          <button
                            type="button"
                            onClick={handleNextStep}
                            className="px-6 py-2.5 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            Next Step <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Capital & Deck */}
                    {wizardStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col gap-4 text-left"
                      >
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          Funding & Pitch Deck
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Prior Funding Raised *
                            </label>
                            <select
                              name="startupRaised"
                              required
                              value={formData.startupRaised}
                              onChange={handleInputChange}
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="" className="text-gray-500">Select Raised Amount</option>
                              <option value="Bootstrapped" className="text-gray-700">None (Bootstrapped)</option>
                              <option value="Under 10L" className="text-gray-700">Under ₹10 Lakhs</option>
                              <option value="10L - 50L" className="text-gray-700">₹10 Lakhs - ₹50 Lakhs</option>
                              <option value="Above 50L" className="text-gray-700">Above ₹50 Lakhs</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              Funding Requirement *
                            </label>
                            <select
                              name="startupFundingReq"
                              required
                              value={formData.startupFundingReq}
                              onChange={handleInputChange}
                              className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                            >
                              <option value="" className="text-gray-500">Select Requirement</option>
                              <option value="Under 25L" className="text-gray-700">Under ₹25 Lakhs</option>
                              <option value="25L - 1Cr" className="text-gray-700">₹25 Lakhs - ₹1 Crore</option>
                              <option value="1Cr - 5Cr" className="text-gray-700">₹1 Crore - ₹5 Crores</option>
                              <option value="Mentorship only" className="text-gray-700">Strategic Mentorship Only</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 mt-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Upload Pitch Deck (PDF, Max 10MB) *
                          </label>
                          <div className="relative border border-dashed border-gray-300 rounded-xl p-8 text-center bg-bg-surface hover:bg-bg-surface-light/80 transition-all flex flex-col items-center justify-center cursor-pointer">
                            <input
                              type="file"
                              required
                              accept=".pdf,.ppt,.pptx"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="w-8 h-8 text-gold mb-3" />
                            <h4 className="font-display font-semibold text-sm text-white mb-1">
                              {fileUploaded ? fileUploaded : "Drag & Drop Pitch Deck File"}
                            </h4>
                            <p className="text-[10px] text-gray-500">
                              PDF, PPT, or PPTX. Max size 10MB.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between mt-4">
                          <button
                            type="button"
                            onClick={handlePrevStep}
                            className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg text-xs hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> Previous
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-3 bg-cta-gradient text-[#ffffff] font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5 shadow-md shadow-primary/10 hover:shadow-primary/20 cursor-pointer"
                          >
                            Submit Cohort Application
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

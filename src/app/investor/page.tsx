"use client";

import React, { useState } from "react";
import { Award, Send, Coins } from "lucide-react";

export default function InvestorPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fundName: "",
    investorType: "",
    ticketSize: "",
    location: "",
    preferredSector: "",
    preferredStage: "",
    thesis: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const investors = JSON.parse(localStorage.getItem("ega_investors") || "[]");
    investors.push({
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("ega_investors", JSON.stringify(investors));

    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen">
      {/* Page Header */}
      <section className="relative py-12 overflow-hidden border-b border-gray-200 bg-gradient-to-r from-bg-dark to-bg-surface/30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-wider bg-bg-surface border border-gray-200 px-3 py-1 rounded-full">
            Capital Alliance
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-4 mb-4">
            Investor & Partner Network
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Access curated investment deal flows, co-invest alongside institutional leads, and partner with growth-stage startups validated by our execution framework.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gray-200">
            {submitted ? (
              <div className="text-center py-16 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-2">
                  <Award className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="font-display font-black text-2xl text-white">
                  Registration Successful!
                </h3>
                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                  Thank you for registering your investment thesis. A member of our venture syndicate team will reach out to match your thesis parameters with active deal flows.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2 border-b border-gray-200 pb-3">
                  <Coins className="w-5 h-5 text-gold" />
                  Investor Registration Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="E.g., Anil Hegde"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@fund.com"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Fund / Syndicate Name *
                    </label>
                    <input
                      type="text"
                      name="fundName"
                      required
                      value={formData.fundName}
                      onChange={handleInputChange}
                      placeholder="E.g., Vedic Ventures"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Investor Type *
                    </label>
                    <select
                      name="investorType"
                      required
                      value={formData.investorType}
                      onChange={handleInputChange}
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="" className="text-gray-500">Select Category</option>
                      <option value="Angel Network" className="text-gray-700">Angel Network / Syndicate</option>
                      <option value="Family Office" className="text-gray-700">Family Office</option>
                      <option value="Venture Capital" className="text-gray-700">Venture Capital (VC) Fund</option>
                      <option value="Corporate Venture" className="text-gray-700">Corporate Venture arm</option>
                      <option value="Individual HNI" className="text-gray-700">Individual HNI Angel</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Typical Ticket Size *
                    </label>
                    <select
                      name="ticketSize"
                      required
                      value={formData.ticketSize}
                      onChange={handleInputChange}
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="" className="text-gray-500">Select Range</option>
                      <option value="₹10L - ₹50L" className="text-gray-700">₹10 Lakhs - ₹50 Lakhs</option>
                      <option value="₹50L - ₹2Cr" className="text-gray-700">₹50 Lakhs - ₹2 Crores</option>
                      <option value="₹2Cr - ₹5Cr" className="text-gray-700">₹2 Crores - ₹5 Crores</option>
                      <option value="Above ₹5Cr" className="text-gray-700">Above ₹5 Crores</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Preferred Location HQ
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="E.g., Bengaluru, Mumbai"
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Preferred Sector Focus *
                    </label>
                    <select
                      name="preferredSector"
                      required
                      value={formData.preferredSector}
                      onChange={handleInputChange}
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="" className="text-gray-500">Select Sector</option>
                      <option value="Healthcare" className="text-gray-700">Healthcare & MedTech</option>
                      <option value="Consumer Brands" className="text-gray-700">Consumer Brands / FMCG</option>
                      <option value="Mobility" className="text-gray-700">Mobility & Automotive</option>
                      <option value="Sustainability" className="text-gray-700">Sustainability / CleanTech</option>
                      <option value="Technology" className="text-gray-700">Technology & SaaS</option>
                      <option value="AI & Data" className="text-gray-700">AI & Big Data</option>
                      <option value="Sector Agnostic" className="text-gray-700">Sector Agnostic</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Preferred Startup Stage *
                    </label>
                    <select
                      name="preferredStage"
                      required
                      value={formData.preferredStage}
                      onChange={handleInputChange}
                      className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="" className="text-gray-500">Select Stage</option>
                      <option value="Idea" className="text-gray-700">Idea / Concept</option>
                      <option value="Validation" className="text-gray-700">Validation / Prototype</option>
                      <option value="PMF" className="text-gray-700">Product Market Fit</option>
                      <option value="Growth" className="text-gray-700">Growth Round</option>
                      <option value="Scale" className="text-gray-700">National Scale-up</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Investment Thesis / Mandates *
                  </label>
                  <textarea
                    name="thesis"
                    required
                    rows={4}
                    value={formData.thesis}
                    onChange={handleInputChange}
                    placeholder="Describe technology structures, founder qualities, or metrics you evaluate..."
                    className="bg-bg-surface border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-cta-gradient text-[#ffffff] font-semibold rounded-lg hover:shadow-lg hover:shadow-secondary/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Register & Request Vetted Dealflows
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

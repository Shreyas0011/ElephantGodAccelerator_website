"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Send, Sparkles, Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";
import RoleSelector from "@/components/RoleSelector";

export default function DownloadPage() {
  const { openMeetingModal } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    designation: "",
    phone: "",
    role: "Startup",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const downloads = JSON.parse(
      localStorage.getItem("ega_profile_downloads") || "[]"
    );
    downloads.push({
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("ega_profile_downloads", JSON.stringify(downloads));

    setSubmitted(true);

    // Trigger file download
    const mockPdfContent = `ELEPHANTGOD ACCELERATOR (EGA) CORPORATE PROFILE 2026\n\n` +
      `Chief Mentor: Ramani Iyer (Co-Founder, JustDial Ltd.)\n` +
      `Focus: Startup Acceleration, Funding Networks, Operations Re-engineering\n` +
      `Headquarters: Bengaluru, India\n\n` +
      `Download requested by: ${formData.name}\n` +
      `Organization: ${formData.org}\n` +
      `Category: ${formData.role}\n` +
      `Date: ${new Date().toLocaleDateString()}\n`;
    
    const blob = new Blob([mockPdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "EGA_Corporate_Profile_2026.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-24 pb-16 bg-bg-dark min-h-screen">
      {/* Page Header */}
      <section className="relative py-12 overflow-hidden border-b border-white/5 bg-gradient-to-r from-bg-dark to-white/[0.01]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-extrabold text-gold uppercase tracking-wider">
            Corporate Deck
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white mt-2 mb-4">
            Download EGA Corporate Profile
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Gain deeper insights into our venture accelerator architecture, shared services playbooks, compliance systems, and investment cohorts.
          </p>
        </div>
      </section>

      {/* Form Container */}
      <section className="py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="glass-card rounded-3xl p-6 border border-gold/15 text-left">
            {submitted ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-2">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="font-display font-black text-xl text-white">
                  Profile Downloaded!
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  The corporate profile text file (EGA_Corporate_Profile_2026.txt) has been generated and downloaded.
                </p>
                <div className="w-full border-t border-white/5 pt-6 flex flex-col gap-3">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                    Need Custom Strategic Auditing?
                  </span>
                  <button
                    onClick={openMeetingModal}
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-bg-dark font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" /> Schedule Strategic Audit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2 border-b border-white/5 pb-3">
                  <FileText className="w-5 h-5 text-gold" />
                  Lead Capture Form
                </h3>

                <RoleSelector
                  selectedRole={formData.role}
                  onChange={(role) => setFormData({ ...formData, role })}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="E.g., Aarav Sharma"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    name="org"
                    required
                    value={formData.org}
                    onChange={handleInputChange}
                    placeholder="E.g., ABC Tech"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    required
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="E.g., Chief Investment Officer"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-secondary text-bg-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Corporate Profile PDF
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

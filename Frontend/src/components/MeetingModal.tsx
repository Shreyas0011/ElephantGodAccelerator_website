"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Calendar, Clock, Sparkles, Upload } from "lucide-react";
import { useApp } from "@/context/AppContext";

import { API_URL } from "@/lib/api";

export default function MeetingModal() {
  const { isMeetingModalOpen, closeMeetingModal } = useApp();
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [pitchDeck, setPitchDeck] = useState<string | null>(null);
  const [fileObj, setFileObj] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPitchDeck(file.name);
      setFileObj(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !date || !timeSlot) return;
    if (!fileObj) {
      setUploadError("Please upload the pitch deck to proceed.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    let pitchDeckMeta = null;
    if (fileObj) {
      try {
        const formData = new FormData();
        formData.append("pitchDeck", fileObj);
        formData.append("founderEmail", email || "");
        formData.append("uploadPurpose", "audit");

        const uploadRes = await fetch(`${API_URL}/upload/pitch-deck`, {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.message || err.error || "File upload failed.");
        }
        const uploadData = await uploadRes.json();
        pitchDeckMeta = uploadData.pitchDeck;
      } catch (err: any) {
        setIsUploading(false);
        setUploadError(err.message || "Failed to upload pitch deck.");
        return;
      }
    }

    const auditData = {
      email,
      date,
      timeSlot,
      pitchDeck: pitchDeckMeta,
    };

    try {
      await fetch(`${API_URL}/audits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auditData),
      });

      // Keep localStorage backup
      const meetings = JSON.parse(localStorage.getItem("ega_meetings") || "[]");
      meetings.push({
        id: Date.now(),
        ...auditData,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("ega_meetings", JSON.stringify(meetings));

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setDate("");
        setTimeSlot("");
        setPitchDeck(null);
        setFileObj(null);
        setIsUploading(false);
        closeMeetingModal();
      }, 2000);
    } catch (err) {
      console.error("Failed to submit strategy audit request", err);
      setUploadError("Failed to submit request. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isMeetingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMeetingModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-bg-surface border border-gold/15 rounded-2xl shadow-2xl p-6 overflow-hidden z-10"
          >
            {/* Header Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-primary to-secondary blur-sm" />

            {/* Close button */}
            <button
              onClick={closeMeetingModal}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5 border border-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 text-gold animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Consultation Confirmed
                </h3>
                <p className="text-gray-400 text-sm">
                  A verification link and Calendar invite have been dispatched.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-display font-extrabold text-xl text-white flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  Schedule 1:1 Consultation
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Book a strategic audit session with an EGA partner to evaluate your startup operations and funding readiness.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Work Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Time Slot
                      </label>
                      <select
                        required
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="" className="bg-bg-surface text-gray-400">
                          Select time
                        </option>
                        <option value="10:00 AM" className="bg-bg-surface text-white">
                          10:00 AM IST
                        </option>
                        <option value="11:30 AM" className="bg-bg-surface text-white">
                          11:30 AM IST
                        </option>
                        <option value="02:30 PM" className="bg-bg-surface text-white">
                          02:30 PM IST
                        </option>
                        <option value="04:30 PM" className="bg-bg-surface text-white">
                          04:30 PM IST
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Upload Pitch Deck (PDF Only) *
                    </label>
                    <div className="relative border border-dashed border-white/10 hover:border-gold/30 rounded-lg p-4 text-center bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        required
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-5 h-5 text-gold mb-1.5" />
                      <h4 className="font-display font-medium text-xs text-white">
                        {pitchDeck ? pitchDeck : "Select or drag pitch deck PDF"}
                      </h4>
                      <p className="text-[9px] text-gray-500 mt-0.5">
                        PDF only. Max 10MB.
                      </p>
                    </div>
                    <p className="text-[10px] text-gold/80 mt-1 font-medium">
                      Please upload the pitch deck to proceed
                    </p>
                  </div>

                  {uploadError && (
                    <p className="text-red-500 text-xs font-semibold text-center mt-1">{uploadError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-secondary text-bg-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Clock className="w-4 h-4" />
                    {isUploading ? "Uploading pitch deck..." : "Confirm Consultation Slot"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

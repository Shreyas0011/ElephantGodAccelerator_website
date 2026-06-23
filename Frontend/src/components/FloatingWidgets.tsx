"use client";

import React from "react";
import { MessageCircle, Calendar } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function FloatingWidgets() {
  const { openMeetingModal } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer"
      >
        <MessageCircle className="w-6 h-6 fill-[#ffffff] stroke-none" />
      </a>

      {/* Schedule Button */}
      <button
        onClick={openMeetingModal}
        aria-label="Schedule Meeting"
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary text-bg-dark flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer border border-gold/10"
      >
        <Calendar className="w-5 h-5" />
      </button>
    </div>
  );
}
